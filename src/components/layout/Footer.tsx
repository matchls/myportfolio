/**
 * Footer — Rétro Gaming style
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
    <footer 
      className="mt-24 border-t-4 border-border bg-bg" 
      style={{ boxShadow: "inset 0 4px 0 var(--color-pixel-shadow)" }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top section avec icône et texte */}
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Pixel art decoration */}
          <div className="flex items-center gap-3">
            <div className="h-1 w-8 bg-accent" />
            <span className="font-[family-name:var(--font-pixel)] text-[0.6rem] uppercase text-accent">
              Game Over?
            </span>
            <div className="h-1 w-8 bg-accent" />
          </div>

          {/* Copyright */}
          <p className="font-[family-name:var(--font-retro)] text-lg text-text-muted">
            © {year} {profile.name}. {dict.footer.copyright}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${dict.footer.ariaGithub} ${profile.name}`}
              className="flex h-10 w-10 items-center justify-center border-2 border-border text-text-muted transition-all hover:border-accent hover:text-accent"
              style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${dict.footer.ariaLinkedin} ${profile.name}`}
              className="flex h-10 w-10 items-center justify-center border-2 border-border text-text-muted transition-all hover:border-accent-2 hover:text-accent-2"
              style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
            >
              <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* View code link */}
          <a
            href="https://github.com/MrPoussif/myportfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn-outline text-[0.5rem]"
          >
            {dict.footer.viewCode}
          </a>

          {/* Retro message */}
          <p className="font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase text-text-muted">
            {">"} Press START to continue...
          </p>
        </div>
      </div>
    </footer>
  );
}
