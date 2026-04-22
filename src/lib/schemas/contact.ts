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
 * Le type `ContactFormValues` est dérivé du schéma (z.infer) — si on change
 * le schéma, le type suit automatiquement. Pas de duplication.
 */

import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit faire au moins 2 caractères")
    .max(80, "Le nom est trop long (max 80 caractères)"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Adresse email invalide")
    .max(254, "Adresse email trop longue"), // RFC 5321 : max 254 caractères

  message: z
    .string()
    .trim()
    .min(10, "Le message doit faire au moins 10 caractères")
    .max(2000, "Le message est trop long (max 2000 caractères)"),

  /**
   * Honeypot anti-bot : champ caché en CSS, invisible pour un humain.
   * Un bot qui parse le HTML va le remplir → on rejette silencieusement.
   * Optionnel côté schéma (un vrai humain ne l'envoie pas).
   */
  honeypot: z.string().max(0, "spam détecté").optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
