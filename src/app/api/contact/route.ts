/**
 * Route API POST /api/contact — envoie un email via Resend.
 *
 * Pipeline :
 *  1. Rate limit par IP (3 req / minute)
 *  2. Parse + validation Zod (même schéma que côté client)
 *  3. Honeypot : si rempli, on répond "ok" silencieusement (on ne fait rien)
 *  4. Envoi Resend (from=onboarding@resend.dev, reply-to=email du visiteur)
 *  5. Réponses HTTP explicites : 200 / 400 / 429 / 500
 *
 * Points d'archi importants :
 *  - **Runtime Node.js** (par défaut en App Router) — nécessaire pour resend SDK.
 *    Si on voulait Edge : il faudrait appeler l'API Resend en fetch brut.
 *  - **Never trust the client** : même si le form valide avec Zod côté client,
 *    on re-valide ici. Un curl peut court-circuiter le form.
 *  - **Pas de données loggées** : on ne console.log ni le message ni l'email
 *    pour éviter que des logs Vercel exposent accidentellement du contenu privé.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

import { rateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/schemas/contact";

// Instancié au premier appel puis réutilisé (serverless-friendly).
// Si la clé manque, `new Resend(undefined)` ne throw pas ici — l'erreur
// surgira au .emails.send() et sera catchée. On préfère que l'API continue
// de fonctionner (valider, rate-limiter) même si l'env est mal configuré.
const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = {
  max: 3,
  windowMs: 60_000, // 1 minute
};

export async function POST(request: Request) {
  // --- 1. Rate limit -------------------------------------------------------
  // En prod Vercel, l'IP arrive via le header `x-forwarded-for`.
  // En dev local, ce header est absent → on fallback sur "unknown"
  // (donc tous les dev locaux partagent le même bucket, c'est voulu).
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(ip, RATE_LIMIT);

  if (!limit.ok) {
    return NextResponse.json(
      { error: "Trop de messages. Réessaie dans une minute." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  // --- 2. Parse + validation -----------------------------------------------
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload JSON invalide." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(rawBody);
  if (!parsed.success) {
    // On ne renvoie pas le détail des erreurs Zod au client (pas un form public
    // typique — on évite de divulguer la shape interne). Un message générique suffit.
    return NextResponse.json(
      { error: "Formulaire invalide. Vérifie les champs et réessaie." },
      { status: 400 },
    );
  }

  const { name, email, message, honeypot } = parsed.data;

  // --- 3. Honeypot ---------------------------------------------------------
  // Un humain ne remplit JAMAIS ce champ (caché en CSS).
  // On renvoie un 200 bidon pour que le bot pense avoir réussi.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  // --- 4. Envoi Resend -----------------------------------------------------
  const to = process.env.CONTACT_EMAIL_TO;
  if (!to) {
    // Env mal configuré côté serveur — erreur 500 générique côté client,
    // détails uniquement dans les logs Vercel.
    console.error("[/api/contact] CONTACT_EMAIL_TO manquant dans .env");
    return NextResponse.json(
      { error: "Serveur mal configuré. Réessaie plus tard." },
      { status: 500 },
    );
  }

  try {
    const result = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // adresse par défaut Resend (pas besoin de domaine vérifié)
      to: [to],
      replyTo: email, // important : "Répondre" dans ta boîte va au visiteur
      subject: `[Portfolio] Nouveau message de ${name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });

    if (result.error) {
      console.error("[/api/contact] Resend error:", result.error);
      return NextResponse.json({ error: "Envoi impossible. Réessaie plus tard." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Unexpected error:", err);
    return NextResponse.json({ error: "Erreur inattendue. Réessaie plus tard." }, { status: 500 });
  }
}
