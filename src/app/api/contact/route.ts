/**
 * Route API POST /api/contact — envoie un email via Resend.
 *
 * Pipeline :
 *  1. Détermine la locale du visiteur (body.locale, fallback defaultLocale)
 *  2. Rate limit par IP (3 req / minute)
 *  3. Parse + validation Zod avec les messages de la locale (même fabrique
 *     que côté client)
 *  4. Honeypot : si rempli, on répond "ok" silencieusement
 *  5. Envoi Resend (from=onboarding@resend.dev, reply-to=email du visiteur)
 *  6. Réponses HTTP explicites : 200 / 400 / 429 / 500
 *
 * Localisation :
 *  - Toutes les réponses d'erreur sont dans la langue du visiteur (messages du dict)
 *  - Le SUJET de l'email reçu par Mathieu est aussi dans la langue du visiteur
 *    → décision éditoriale explicite : Mathieu sait tout de suite si le·a
 *    candidat·e écrit en français ou en anglais, avant même d'ouvrir le mail
 *
 * Points d'archi :
 *  - **Runtime Node.js** (par défaut en App Router) — nécessaire pour resend SDK
 *  - **Never trust the client** : on re-valide la shape du body côté serveur
 *  - **Pas de données loggées** : on ne console.log ni le message ni l'email
 *    pour éviter que des logs Vercel exposent accidentellement du contenu privé
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { rateLimit } from "@/lib/rate-limit";
import { createContactFormSchema } from "@/lib/schemas/contact";

// Instancié au premier appel puis réutilisé (serverless-friendly).
// Si la clé manque, `new Resend(undefined)` ne throw pas ici — l'erreur
// surgira au .emails.send() et sera catchée.
const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = {
  max: 3,
  windowMs: 60_000, // 1 minute
};

/**
 * Messages serveur-side par locale (ceux qui ne viennent PAS du schéma Zod).
 * Volontairement dupliqués avec les dicts client plutôt que parsés du JSON —
 * permet à cette route de rester 100% synchronisée avec les messages sans
 * charger tout le dict pour 4 strings.
 */
const API_MESSAGES: Record<Locale, {
  rateLimit: string;
  invalidPayload: string;
  invalidForm: string;
  misconfigured: string;
  sendFailed: string;
  unexpected: string;
  emailSubject: (name: string) => string;
  emailIntro: (name: string, email: string) => string;
}> = {
  fr: {
    rateLimit: "Trop de messages. Réessaie dans une minute.",
    invalidPayload: "Payload JSON invalide.",
    invalidForm: "Formulaire invalide. Vérifie les champs et réessaie.",
    misconfigured: "Serveur mal configuré. Réessaie plus tard.",
    sendFailed: "Envoi impossible. Réessaie plus tard.",
    unexpected: "Erreur inattendue. Réessaie plus tard.",
    emailSubject: (name) => `[Portfolio] Nouveau message de ${name}`,
    emailIntro: (name, email) => `De : ${name} <${email}>`,
  },
  en: {
    rateLimit: "Too many messages. Try again in a minute.",
    invalidPayload: "Invalid JSON payload.",
    invalidForm: "Invalid form. Check the fields and try again.",
    misconfigured: "Server misconfigured. Please try again later.",
    sendFailed: "Could not send. Please try again later.",
    unexpected: "Unexpected error. Please try again later.",
    emailSubject: (name) => `[Portfolio] New message from ${name}`,
    emailIntro: (name, email) => `From: ${name} <${email}>`,
  },
};

export async function POST(request: Request) {
  // --- 1. Parse body en premier pour connaître la locale -------------------
  // On veut localiser TOUTES les réponses, y compris le rate limit. Donc on
  // parse le body avant de rate-limiter.
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    // Pas de body valide → on ne connaît pas la locale → defaultLocale.
    return NextResponse.json(
      { error: API_MESSAGES[defaultLocale].invalidPayload },
      { status: 400 },
    );
  }

  // Extrait la locale du body (sans confiance : type-guard + fallback).
  const bodyLocale =
    typeof rawBody === "object" && rawBody !== null && "locale" in rawBody
      ? (rawBody as { locale?: unknown }).locale
      : undefined;
  const locale: Locale =
    typeof bodyLocale === "string" && isLocale(bodyLocale) ? bodyLocale : defaultLocale;
  const M = API_MESSAGES[locale];

  // --- 2. Rate limit -------------------------------------------------------
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(ip, RATE_LIMIT);

  if (!limit.ok) {
    return NextResponse.json(
      { error: M.rateLimit },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  // --- 3. Validation Zod ---------------------------------------------------
  // Les messages d'erreur Zod viennent du dict — on les passe à la fabrique.
  // (On ne les renvoie pas au client ici — message générique suffit — mais
  // les logs serveur sont déjà localisés si on décide d'en exposer un jour.)
  const dict = await getDictionary(locale);
  const schema = createContactFormSchema(dict.contact.form.errors);
  const parsed = schema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json({ error: M.invalidForm }, { status: 400 });
  }

  const { name, email, message, honeypot } = parsed.data;

  // --- 4. Honeypot ---------------------------------------------------------
  // Un humain ne remplit JAMAIS ce champ (caché en CSS).
  // On renvoie un 200 bidon pour que le bot pense avoir réussi.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  // --- 5. Envoi Resend -----------------------------------------------------
  const to = process.env.CONTACT_EMAIL_TO;
  if (!to) {
    console.error("[/api/contact] CONTACT_EMAIL_TO manquant dans .env");
    return NextResponse.json({ error: M.misconfigured }, { status: 500 });
  }

  try {
    const result = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: M.emailSubject(name),
      text: `${M.emailIntro(name, email)}\n\n${message}`,
    });

    if (result.error) {
      console.error("[/api/contact] Resend error:", result.error);
      return NextResponse.json({ error: M.sendFailed }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Unexpected error:", err);
    return NextResponse.json({ error: M.unexpected }, { status: 500 });
  }
}
