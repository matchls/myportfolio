/**
 * Header sticky avec nav par ancres + toggle de thème.
 *
 * Server Component : statique, zéro JS côté client (sauf le ThemeToggle inclus
 * qui est un Client Component à lui seul).
 *
 * Structure :
 *  - Desktop : logo à gauche, nav numérotée au centre/droite, toggle à droite
 *  - Mobile : logo + toggle visibles, nav passe en ligne compacte sous le header
 */

import Link from "next/link";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header
      className="border-border/70 bg-bg/80 sticky top-0 z-40 border-b backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / nom — scroll vers le haut */}
        <Link
          href="#top"
          className="text-accent hover:text-accent-2 font-mono text-sm transition-colors"
          aria-label={`${SITE_NAME} — retour en haut`}
        >
          MC<span className="text-accent-2">.</span>
        </Link>

        {/* Nav desktop + mobile en ligne compacte */}
        <nav aria-label="Navigation principale" className="hidden sm:block">
          <ul className="flex items-center gap-5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  className="group text-text-muted hover:text-accent inline-flex items-center gap-1.5 transition-colors"
                >
                  <span className="text-accent font-mono text-xs">{item.number}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>

      {/* Nav mobile — ligne compacte sous le header */}
      <nav
        aria-label="Navigation principale (mobile)"
        className="border-border/70 border-t sm:hidden"
      >
        <ul className="mx-auto flex max-w-5xl items-center justify-around px-4 py-2 text-xs">
          {NAV_ITEMS.map((item) => (
            <li key={item.anchor}>
              <a
                href={`#${item.anchor}`}
                className="text-text-muted hover:text-accent inline-flex flex-col items-center gap-0.5"
              >
                <span className="text-accent font-mono text-[0.65rem]">{item.number}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
