/**
 * Loader des dictionnaires (fichiers messages/*.json).
 *
 * Pattern recommandé par la doc Next.js (i18n native, sans lib externe) :
 *  - `server-only` garantit que ce module ne partira JAMAIS dans le bundle client
 *    (si un Client Component l'importe par erreur, build error explicite)
 *  - Les imports dynamiques `() => import(...)` permettent à Next de faire du
 *    code-splitting : seul le JSON de la locale demandée est chargé côté serveur
 *  - Le type `Dictionary` est dérivé automatiquement du JSON français — si on
 *    ajoute une clé en fr.json, TypeScript crie jusqu'à ce qu'on la mette dans
 *    en.json aussi (source unique de vérité pour la shape)
 */

import "server-only";

import type { Locale } from "@/i18n/config";

import fr from "@/messages/fr.json";

export type Dictionary = typeof fr;

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("@/messages/fr.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
