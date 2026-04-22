/**
 * Schéma de validation du formulaire de contact.
 *
 * Source unique de vérité : le même schéma valide côté client (React Hook Form
 * via @hookform/resolvers/zod) ET côté serveur (route API /api/contact).
 *
 * Règle : ne JAMAIS faire confiance au client. Même si React Hook Form affiche
 * les erreurs de validation, un attaquant peut contourner le form et POST
 * directement sur l'API. D'où la re-validation côté serveur.
 *
 * i18n : le schéma est produit par une FABRIQUE (`createContactFormSchema`) qui
 * accepte les messages d'erreur en paramètre. Cela permet :
 *  - côté client : injecter les messages de la locale courante (depuis le dict)
 *  - côté serveur : injecter les messages selon la locale envoyée dans le body
 * On ne stocke pas les strings dans le schéma : elles viennent des JSON de messages.
 *
 * Le type `ContactFormValues` est dérivé du schéma (z.infer) — la shape est
 * indépendante des messages, donc on peut le tirer de n'importe quelle instance.
 */

import { z } from "zod";

/**
 * Messages d'erreur attendus par le schéma. Correspond 1:1 aux clés
 * `contact.form.errors.*` dans les dictionnaires i18n — si on ajoute une règle
 * ici, il faut ajouter la clé dans fr.json + en.json (TypeScript le rappellera).
 */
export type ContactErrorMessages = {
  nameMin: string;
  nameMax: string;
  emailInvalid: string;
  emailMax: string;
  messageMin: string;
  messageMax: string;
};

export function createContactFormSchema(m: ContactErrorMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, m.nameMin)
      .max(80, m.nameMax),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email(m.emailInvalid)
      .max(254, m.emailMax), // RFC 5321 : max 254 caractères

    message: z
      .string()
      .trim()
      .min(10, m.messageMin)
      .max(2000, m.messageMax),

    /**
     * Honeypot anti-bot : champ caché en CSS, invisible pour un humain.
     * Un bot qui parse le HTML va le remplir → on rejette silencieusement.
     * Optionnel côté schéma (un vrai humain ne l'envoie pas). Le message
     * n'est jamais affiché, on peut rester neutre.
     */
    honeypot: z.string().max(0).optional(),
  });
}

/**
 * Instance "shape-only" pour dériver le type TS. Les messages sont vides —
 * ils ne servent qu'à produire le type, jamais à valider en runtime.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- schema utilisé comme source de type uniquement (via z.infer ci-dessous)
const shapeSchema = createContactFormSchema({
  nameMin: "",
  nameMax: "",
  emailInvalid: "",
  emailMax: "",
  messageMin: "",
  messageMax: "",
});

export type ContactFormValues = z.infer<typeof shapeSchema>;
