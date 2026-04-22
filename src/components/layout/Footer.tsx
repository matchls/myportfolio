/**
 * Footer du portfolio.
 *
 * Server Component, 100% statique.
 * Contient : copyright dynamique + liens sociaux + lien repo du portfolio
 * (bonus transparence : "ce site est open-source").
 */

import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/70 mt-24 border-t" role="contentinfo">
      <div className="text-text-muted mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-8">
        <p>© {year} Mathieu Chalès. Codé à la main, déployé sur Vercel.</p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/MrPoussif"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Mathieu Chalès"
            className="hover:text-accent transition-colors"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/chalesmathieu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Mathieu Chalès"
            className="hover:text-accent transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/MrPoussif/myportfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-2 font-mono text-xs transition-colors"
          >
            voir le code
          </a>
        </div>
      </div>
    </footer>
  );
}
