/**
 * Génère /robots.txt automatiquement (convention Next App Router).
 *
 * On autorise l'indexation de toute la page publique, on bloque `/api/*`
 * (aucun intérêt SEO et évite que des crawlers tapent le endpoint contact).
 * Le sitemap est référencé pour aider les moteurs à tout découvrir.
 */

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
