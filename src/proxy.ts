/**
 * Proxy — routing par locale.
 *
 * ⚠️  Next 16 a renommé `middleware.ts` en `proxy.ts`. L'API est identique
 * mais le nom du fichier et de la fonction exportée changent. Si tu vois un
 * tuto qui parle de middleware, c'est l'ancien nom.
 *
 * Rôle :
 *  - Si l'URL contient déjà une locale supportée (`/fr/...`, `/en/...`) : on laisse passer
 *  - Sinon : on détecte la préférence du visiteur dans cet ordre de priorité :
 *      1. cookie `NEXT_LOCALE` (choix explicite via le LanguageToggle)
 *      2. header Accept-Language
 *      3. fallback sur `defaultLocale`
 *    puis on redirige vers /{locale}/...
 *
 * Les routes `/api/*`, `/_next/*`, assets statiques, robots.txt, sitemap.xml
 * et opengraph-image sont exclues du matcher pour éviter qu'elles soient
 * préfixées par une locale (elles sont "globales" au site).
 */

import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Parse le header `Accept-Language` et retourne la meilleure locale supportée.
 * Implémentation minimale (pas de lib externe) :
 *  - on splitte sur `,`, on ignore les paramètres qualité `;q=...`
 *  - on matche d'abord sur la locale complète (fr, en), puis sur le préfixe (fr-FR → fr)
 */
function detectFromHeader(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((entry) => entry.split(";")[0].trim().toLowerCase());

  for (const pref of preferred) {
    const base = pref.split("-")[0]; // "fr-FR" → "fr"
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si l'URL a déjà une locale en premier segment, on ne fait rien.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return;

  // 1. Cookie d'abord (choix explicite de l'utilisateur via LanguageToggle)
  const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;
  const fromCookie =
    cookieValue && isLocale(cookieValue) ? cookieValue : undefined;

  // 2. Sinon Accept-Language, 3. sinon defaultLocale (géré dans detectFromHeader)
  const locale: Locale = fromCookie ?? detectFromHeader(request);

  const target = request.nextUrl.clone();
  target.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(target);
}

export const config = {
  /**
   * Matcher : chemins où `proxy()` est appelé.
   * On exclut tout ce qui n'est pas une page (API, assets, fichiers SEO).
   * Syntaxe regex inversée : `(?!...)` = "everything except".
   */
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|robots.txt|sitemap.xml|opengraph-image).*)",
  ],
};
