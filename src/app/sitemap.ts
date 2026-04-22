/**
 * Génère /sitemap.xml automatiquement.
 *
 * Portfolio single-page × 2 locales → on liste `/fr` et `/en`, chacune avec
 * ses hreflang alternates (dont `x-default` qui pointe vers le FR).
 * Les ancres (#about, #projects...) ne sont PAS des URLs séparées pour Google.
 *
 * `lastModified` : date du jour à chaque build. Ça suffit pour un site à
 * contenu faiblement changeant (Google vérifie de toute façon par ETag/HEAD).
 */

import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // `alternates.languages` aide Google à faire le lien entre les deux versions
  // et à servir la bonne selon la langue du chercheur.
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}`]),
  );
  languages["x-default"] = `${SITE_URL}/fr`;

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
