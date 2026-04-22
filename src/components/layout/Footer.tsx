/**
 * Footer du portfolio.
 *
 * Server Component, 100% statique.
 * Contient : copyright dynamique + liens sociaux + lien repo du portfolio
 * (bonus transparence : "ce site est open-source").
 *
 * i18n : copyright et aria-labels viennent du dict. Les noms "GitHub" et
 * "LinkedIn" sont des noms propres, non traduits.
 */

import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ dict }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/70 mt-24 border-t" role="contentinfo">
      <div className="text-text-muted mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-8">
        <p>© {year} {profile.name}. {dict.footer.copyright}</p>

        <div className="flex items-center gap-4">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.footer.ariaGithub} ${profile.name}`}
            className="hover:text-accent transition-colors"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.footer.ariaLinkedin} ${profile.name}`}
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
            {dict.footer.viewCode}
          </a>
        </div>
      </div>
    </footer>
  );
}
