/**
 * Contact — Rétro Gaming style
 */

import { Mail } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Contact({ locale, dict }: Props) {
  const { pitch, pitchHighlight } = dict.contact;
  const highlightIndex = pitch.indexOf(pitchHighlight);
  const hasHighlight = highlightIndex !== -1;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t-4 border-border py-16"
      style={{ borderTopStyle: "dashed" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-4">
        <span className="pixel-tag">05</span>
        <h2
          id="contact-heading"
          className="font-[family-name:var(--font-pixel)] text-sm uppercase tracking-wider text-text sm:text-base"
        >
          {dict.contact.heading}
        </h2>
        <div className="h-1 flex-1 bg-border" style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }} />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
        {/* Colonne gauche : formulaire */}
        <div>
          <div className="pixel-border bg-bg/80 p-4">
            <p className="font-[family-name:var(--font-retro)] text-lg leading-relaxed text-text-muted">
              <span className="text-accent-2">[MESSAGE]</span>{" "}
              {hasHighlight ? (
                <>
                  {pitch.slice(0, highlightIndex)}
                  <span className="text-accent">{pitchHighlight}</span>
                  {pitch.slice(highlightIndex + pitchHighlight.length)}
                </>
              ) : (
                pitch
              )}
            </p>
          </div>

          <div className="mt-8">
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>

        {/* Colonne droite : moyens alternatifs */}
        <aside aria-label={dict.contact.altMoyens} className="flex flex-col gap-4">
          <div className="pixel-border bg-bg p-4">
            <p className="mb-4 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-accent">
              {">"} Quick Links
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 border-2 border-border p-3 font-[family-name:var(--font-retro)] text-base text-text transition-all hover:border-accent hover:text-accent"
                style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {profile.email}
              </a>

              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-2 border-border p-3 font-[family-name:var(--font-retro)] text-base text-text transition-all hover:border-accent-2 hover:text-accent-2"
                style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
              >
                <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>

              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-2 border-border p-3 font-[family-name:var(--font-retro)] text-base text-text transition-all hover:border-accent hover:text-accent"
                style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>

          {/* Pixel art decoration */}
          <div className="mt-4 text-center">
            <span className="font-[family-name:var(--font-pixel)] text-[0.4rem] uppercase text-text-muted">
              Insert Coin to Continue...
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
