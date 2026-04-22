/**
 * Constantes globales du site.
 *
 * Distinction importante :
 *  - `src/lib/constants.ts` (ici) : valeurs techniques du site (SEO, nav, routes API)
 *  - `src/data/profile.ts` (étape 5) : contenu éditorial de Mathieu (bio, tagline, email)
 *
 * Garder les deux séparés permet de dupliquer le portfolio pour quelqu'un d'autre
 * sans toucher à la config technique, et vice versa.
 */

import type { NavItem } from "@/types";

// ---------------------------------------------------------------------------
// Métadonnées du site
// ---------------------------------------------------------------------------

export const SITE_NAME = "Mathieu Chalès — Portfolio";

export const SITE_DESCRIPTION =
  "Portfolio de Mathieu Chalès, développeur fullstack junior basé à Paris. " +
  "Reconversion depuis la menuiserie, diplômé La Capsule. Recherche CDI / alternance / CDD.";

/**
 * URL de production. Sera mise à jour à l'étape 8 (déploiement Vercel).
 * Utilisée par generateMetadata pour les URLs canoniques, Open Graph, sitemap.
 */
export const SITE_URL = "https://mathieuchales.vercel.app";

export const DEFAULT_LOCALE = "fr-FR";

// ---------------------------------------------------------------------------
// Navigation (single-page, ancres)
// ---------------------------------------------------------------------------

/**
 * Sections de la navigation principale.
 * Les `anchor` correspondent aux `id` HTML des sections dans `page.tsx`.
 * Les numéros sont affichés en mono, inspiration Brittany Chiang v4.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { number: "01.", label: "À propos", anchor: "about" },
  { number: "02.", label: "Compétences", anchor: "skills" },
  { number: "03.", label: "Projets", anchor: "projects" },
  { number: "04.", label: "Contact", anchor: "contact" },
] as const;

// ---------------------------------------------------------------------------
// Routes API
// ---------------------------------------------------------------------------

export const CONTACT_API_ROUTE = "/api/contact";
