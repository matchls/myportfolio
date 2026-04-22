/**
 * Configuration centrale de l'internationalisation.
 *
 * Source unique de vérité pour :
 *  - la liste des locales supportées (`locales`)
 *  - la locale par défaut (`defaultLocale`) — utilisée quand Accept-Language
 *    ne matche aucune locale supportée, et pour les redirections depuis `/`
 *
 * Le type `Locale` est dérivé du tableau `as const` — ajouter "es" ici propagera
 * automatiquement à tous les call-sites typés (TypeScript compile error si
 * un dict, une route ou un composant oublie de gérer la nouvelle locale).
 */

export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/**
 * Type-guard utile dans le proxy et les pages pour valider un segment d'URL
 * arbitraire avant de l'utiliser comme `Locale`.
 */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
