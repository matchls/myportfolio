/**
 * About — bio + info card + quote. No photo (removed in Stitch migration).
 *
 * Layout:
 *  - Mobile: single column
 *  - Desktop: 2-column grid [7fr_5fr] — bio left, info card + quote right
 *
 * i18n:
 *  - Heading, bio paragraphs, info labels, quote: all from dict
 *  - `profile.name` stays outside dicts (identity, non-translatable)
 *  - `profile.location` / `profile.interests`: from profile data
 */

import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

function BoldParagraph({ text }: { text: string }) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return (
    <p>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-text font-semibold">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  );
}

export function About({ dict }: Props) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 py-24"
    >
      {/* Heading — outside the card, consistent with other sections */}
      <h2
        id="about-heading"
        className="font-display text-5xl text-text mb-8 flex items-baseline justify-center gap-3"
      >
        <span className="font-mono text-base text-accent" aria-hidden="true">01.</span>
        {dict.about.heading}
      </h2>

      <div className="grid gap-8 md:grid-cols-[7fr_5fr]">

        {/* Left column — bio text */}
        <div className="bg-surface p-8 md:p-12 border-2 border-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl select-none" aria-hidden="true">
            📖
          </div>
          <div className="space-y-6 text-text-muted leading-relaxed">
            {dict.profile.bioParagraphs.map((p, i) => (
              <BoldParagraph key={i} text={p} />
            ))}
          </div>
        </div>

        {/* Right column — info card + quote */}
        <div className="space-y-6">
          <div className="bg-accent text-surface p-8 pixel-border">
            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 border-b border-surface/30 pb-2">
              {dict.about.infoTitle}
            </h3>
            <dl className="space-y-4 font-mono text-xs">
              <div className="flex justify-between">
                <dt className="opacity-70">{dict.about.roleLabel}</dt>
                <dd className="font-bold">{dict.profile.role}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-70">{dict.about.locationLabel}</dt>
                <dd className="font-bold">{profile.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-70">{dict.about.availabilityLabel}</dt>
                <dd className="bg-primary-container px-2 py-0.5 text-[10px] uppercase">
                  {dict.about.availabilityStatus}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="opacity-70">{dict.about.interestsLabel}</dt>
                <dd className="font-bold">{profile.interests}</dd>
              </div>
            </dl>
          </div>

          <blockquote className="bg-[#5d4037] text-surface p-6 border-2 border-accent shadow-[8px_8px_0px_0px_#1b1c1a]">
            <p className="text-sm italic">{dict.about.quote}</p>
          </blockquote>
        </div>

      </div>
    </section>
  );
}
