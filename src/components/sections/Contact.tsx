/**
 * Contact — dark full-width section.
 *
 * Layout (Stitch):
 *  - bg-primary full-width dark background with particle container (Issue #11)
 *  - Centred heading preceded by fire emoji
 *  - Pitch text above the form card
 *  - Form in a dark bg-primary-container card
 *  - Social links band at the bottom (no aside column)
 *
 * Pitch split: the `pitchHighlight` substring gets wrapped in a <span>
 * for emphasis. Falls back to plain text if not found.
 */

import { Mail } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { ContactParticles } from "@/components/sections/ContactParticles";
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
      className="scroll-mt-20 py-24 bg-primary text-surface relative overflow-hidden"
    >
      {/* Particle container — populated by ContactParticles */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        id="contact-particles"
        aria-hidden="true"
      />
      <ContactParticles />

      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-0">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-accent-2 text-5xl mb-4" aria-hidden="true">🔥</p>
          <h2
            id="contact-heading"
            className="font-display text-5xl text-surface"
          >
            {dict.contact.heading}
          </h2>
        </div>

        {/* Pitch */}
        <p className="text-surface/70 leading-relaxed text-center mb-8">
          {hasHighlight ? (
            <>
              {pitch.slice(0, highlightIndex)}
              <span className="text-accent-2 font-semibold">{pitchHighlight}</span>
              {pitch.slice(highlightIndex + pitchHighlight.length)}
            </>
          ) : (
            pitch
          )}
        </p>

        {/* Form card */}
        <div className="bg-primary-container p-8 md:p-12 border-2 border-accent shadow-[12px_12px_0px_0px_rgba(6,27,14,0.6)]">
          <ContactForm locale={locale} dict={dict} />
        </div>

        {/* Social links band */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-surface/60 hover:text-accent-2 transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {profile.email}
          </a>

          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-surface/60 hover:text-accent-2 transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>

          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-surface/60 hover:text-accent-2 transition-colors"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
