/**
 * Header — Rétro Gaming style avec navigation pixelisée
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
      className="sticky top-0 z-40 border-b-4 border-border bg-bg/95 backdrop-blur-sm"
      style={{ boxShadow: "0 4px 0 var(--color-pixel-shadow)" }}
      role="banner"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo pixel style */}
        <Link
          href="#top"
          className="group flex items-center gap-2 transition-transform hover:translate-x-1"
          aria-label={`${dict.site.name} — ${dict.nav.backToTop}`}
        >
          <span className="flex h-8 w-8 items-center justify-center border-2 border-accent bg-accent text-xs text-white"
                style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}>
            <span className="font-[family-name:var(--font-pixel)] text-[0.5rem]">MC</span>
          </span>
          <span className="hidden font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted group-hover:text-accent sm:inline">
            .DEV
          </span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label={dict.a11y.mainNav} className="hidden sm:block">
          <NavLinks dict={dict} />
        </nav>

        {/* Toggles */}
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

      {/* Nav mobile */}
      <nav
        aria-label={dict.a11y.mainNavMobile}
        className="border-t-2 border-border sm:hidden"
      >
        <NavLinks dict={dict} mobile />
      </nav>
    </header>
  );
}
