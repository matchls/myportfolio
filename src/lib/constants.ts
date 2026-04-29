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

export const SITE_NAME = "Mathieu Châles — Portfolio";

export const SITE_DESCRIPTION =
  "Portfolio de Mathieu Châles, développeur fullstack junior basé à Paris. " +
  "Reconversion depuis la menuiserie, diplômé La Capsule. Recherche CDI / alternance / CDD.";

/**
 * URL de production. Sera mise à jour à l'étape 8 (déploiement Vercel).
 * Utilisée par generateMetadata pour les URLs canoniques, Open Graph, sitemap.
 */
export const SITE_URL = "https://mathieuchales-portfolio.vercel.app";

/**
 * Locale BCP 47 par défaut pour les balises `lang` HTML et Open Graph.
 * La locale courte (`fr` / `en`) vient de `src/i18n/config.ts` et pilote le routing.
 * Cette version longue (`fr-FR` / `en-US`) est utilisée par :
 *  - l'attribut `<html lang>` (Next convertit auto, mais on est explicite)
 *  - `openGraph.locale` (qui attend le format BCP 47 long)
 */
export const BCP47_BY_LOCALE = {
  fr: "fr-FR",
  en: "en-US",
} as const;

// ---------------------------------------------------------------------------
// Navigation (single-page, ancres)
// ---------------------------------------------------------------------------

/**
 * Sections de la navigation principale.
 * Les `anchor` correspondent aux `id` HTML des sections dans `page.tsx`.
 * Les numéros sont affichés en mono, inspiration Brittany Chiang v4.
 *
 * Pas de `label` ici : les libellés viennent des dictionnaires i18n
 * (`dict.nav.{about,skills,projects,contact}`) pour rester traduisibles.
 * Le composant Header fait le lookup via `dict.nav[item.anchor]`.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { number: "01.", anchor: "about" },
  { number: "02.", anchor: "skills" },
  { number: "03.", anchor: "formation" },
  { number: "04.", anchor: "projects" },
  { number: "05.", anchor: "contact" },
] as const;

// ---------------------------------------------------------------------------
// Routes API
// ---------------------------------------------------------------------------

export const CONTACT_API_ROUTE = "/api/contact";
