/**
 * Génère /sitemap.xml automatiquement.
 *
 * Portfolio single-page : une seule URL canonique, `/`.
 * Les ancres (#about, #projects...) ne sont PAS des URLs séparées pour Google
 * — on ne les liste pas ici.
 *
 * `lastModified` : date du jour à chaque build. Ça suffit pour un site à
 * contenu faiblement changeant (Google vérifie de toute façon par ETag/HEAD).
 */

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
