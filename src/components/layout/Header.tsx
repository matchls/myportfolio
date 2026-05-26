/**
 * Header sticky avec nav par ancres + toggle de thème + toggle de langue.
 *
 * Server Component : statique, zéro JS côté client direct — les 2 toggles sont
 * des Client Components isolés.
 *
 * Structure :
 *  - Desktop : logo à gauche, nav numérotée au centre/droite, toggles à droite
 *  - Mobile : logo + toggles visibles, nav passe en ligne compacte sous le header
 *
 * i18n :
 *  - Les labels de nav viennent de `dict.nav[anchor]` (lookup typé)
 *  - Les aria-labels des toggles viennent de `dict.a11y.toggle*`
 *  - Les href restent en ancres (#about, etc.) : la locale est déjà dans l'URL
 *    de la page (ex. /fr#about, /en#about) donc pas besoin de la re-préfixer
 */

import Link from "next/link";

import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { NavLinks } from "@/components/layout/NavLinks";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  return (
    <header
      className="bg-primary border-b-2 border-accent shadow-[4px_4px_0px_0px_rgba(6,27,14,0.4)] sticky top-0 z-40"
      role="banner"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / nom — scroll vers le haut */}
        <Link
          href="#top"
          className="font-display text-xl text-surface tracking-tight hover:text-accent-2 transition-colors"
          aria-label={`${dict.site.name} — ${dict.nav.backToTop}`}
        >
          MC<span className="text-accent-2">.</span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label={dict.a11y.mainNav} className="hidden sm:block">
          <NavLinks dict={dict} />
        </nav>

        {/* Toggles — langue puis thème, ordre de lecture logique (macro → détail) */}
        <div className="flex items-center gap-2">
          <LanguageToggle
            currentLocale={locale}
            labels={{
              toFr: dict.a11y.toggleLanguage.toFr,
              toEn: dict.a11y.toggleLanguage.toEn,
            }}
          />
          <ThemeToggle
            labels={{
              toLight: dict.a11y.toggleTheme.toLight,
              toDark: dict.a11y.toggleTheme.toDark,
            }}
          />
        </div>
      </div>

      {/* Nav mobile — ligne compacte sous le header */}
      <nav
        aria-label={dict.a11y.mainNavMobile}
        className="border-accent/30 border-t sm:hidden"
      >
        <NavLinks dict={dict} mobile />
      </nav>
    </header>
  );
}
