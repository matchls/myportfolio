"use client";

/**
 * Bouton de bascule FR ↔ EN.
 *
 * Client Component car on a besoin de :
 *  - `usePathname()` pour connaître l'URL courante et construire la cible
 *  - `useRouter()` pour naviguer vers la version traduite
 *  - écrire le cookie `NEXT_LOCALE` pour que le visiteur retombe directement
 *    dans la bonne langue à sa prochaine visite (sans que le proxy re-détecte
 *    via Accept-Language)
 *
 * Design :
 *  - Même dimensions que ThemeToggle (h-9 w-9) pour un alignement propre
 *  - Affiche la locale VERS LAQUELLE on va aller (convention toggle : on montre
 *    l'action, pas l'état courant)
 *  - aria-label en 2 langues pour aider les lecteurs d'écran quelle que soit
 *    la langue du document au moment du focus
 */

import { usePathname, useRouter } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Durée de vie du cookie de préférence linguistique (1 an).
 * Nom `NEXT_LOCALE` : convention Next officielle, reconnue par le proxy.
 */
const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

type Props = {
  className?: string;
  currentLocale: Locale;
  labels: {
    toFr: string;
    toEn: string;
  };
};

export function LanguageToggle({ className, currentLocale, labels }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // La "prochaine" locale = celle qui n'est PAS la courante.
  // Pour 2 locales c'est trivial ; si on passe à 3+ il faudra un menu.
  const nextLocale: Locale = locales.find((l) => l !== currentLocale) ?? currentLocale;
  const nextLabel = nextLocale === "fr" ? labels.toFr : labels.toEn;

  /**
   * ═══════════════════════════════════════════════════════════════════════
   *   POINT DE CONTRIBUTION — refine au besoin
   * ═══════════════════════════════════════════════════════════════════════
   *
   * Implémentation par défaut : remplace le 1er segment de l'URL par la locale
   * cible, pose un cookie de persistance, pousse avec router.push (historique
   * normal). Le site marche tel quel — mais il y a 3 décisions à ta main :
   *
   *  1. ROUTER.PUSH vs ROUTER.REPLACE
   *     - `push` (actuel) : ajoute une entrée dans l'historique. Back =
   *       revenir à la version précédente. Attendu pour un changement de langue.
   *     - `replace` : remplace l'entrée courante. Historique moins pollué si
   *       quelqu'un clique plusieurs fois, mais "précédent" ne ramène pas à
   *       l'ancienne langue. À envisager si tu trouves l'historique trop bruyant.
   *
   *  2. PERSISTANCE DU COOKIE (actuellement 1 an)
   *     Sans cookie, un visiteur FR qui bascule EN puis revient le lendemain
   *     sur `/` serait renvoyé vers `/fr` par le proxy. Le cookie respecte son
   *     choix explicite. Tu pourrais raccourcir (session only) ou allonger.
   *
   *  3. PRÉSERVATION DE L'ANCRE
   *     `pathname` ne contient PAS le hash (#projects). Les navigateurs le
   *     préservent généralement mais `router.push()` ne le reprend pas. Si tu
   *     veux que le visiteur reste pile sur la section courante après switch,
   *     il faut lire `window.location.hash` ici et l'ajouter à `newPath`.
   *     Décision : voulu ou perturbant ?
   */
  function switchLocale() {
    // Remplace le premier segment de locale (ex. "/fr/..." → "/en/...").
    // Les locales font 2 lettres ASCII minuscules — regex volontairement stricte.
    const newPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${nextLocale}`);

    // Cookie reconnu par le proxy → prochaine visite sans redirect intempestif.
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;

    router.push(newPath);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={nextLabel}
      title={nextLabel}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2",
        "border-border text-text border font-mono text-xs font-semibold uppercase",
        "hover:border-accent-2 hover:text-accent-2",
        "transition-colors duration-200",
        className,
      )}
    >
      {nextLocale}
    </button>
  );
}
