/**
 * Footer du portfolio — dark background matching Header and Contact.
 *
 * Server Component, 100% statique.
 * Contient : nom en display, copyright + liens sociaux + lien repo.
 *
 * i18n : copyright et aria-labels viennent du dict. "GitHub" et "LinkedIn"
 * sont des noms propres, non traduits.
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
    <footer className="bg-primary border-t-4 border-accent py-12" role="contentinfo">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">

        {/* Name + copyright */}
        <div className="text-center sm:text-left">
          <p className="font-display text-2xl text-surface">{profile.name}</p>
          <p className="font-sans text-sm text-surface/60 mt-1">
            © {year}. {dict.footer.copyright}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.footer.ariaGithub} ${profile.name}`}
            className="text-surface/60 hover:text-accent-2 transition-colors"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.footer.ariaLinkedin} ${profile.name}`}
            className="text-surface/60 hover:text-accent-2 transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/MrPoussif/myportfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-surface/60 hover:text-accent-2 transition-colors"
          >
            {dict.footer.viewCode}
          </a>
        </div>

      </div>
    </footer>
  );
}
