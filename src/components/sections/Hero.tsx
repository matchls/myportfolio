/**
 * Hero — first impression, first block of the page.
 *
 * Server Component. Contains name, role, tagline, 2 CTAs, and a scroll arrow.
 * Section is min-h-[100vh] to fill the viewport — scroll arrow anchors to bottom.
 *
 * Accessibility:
 *  - <h1> is unique per page (one per HTML document)
 *  - CTAs are <a> styled as buttons (semantically links, not actions)
 *
 * i18n: receives the full dictionary as prop. Name comes from `profile`
 * (identity, non-translatable); everything else comes from dict.
 */

import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Hero({ dict }: Props) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-dots hero-enter relative flex min-h-[100vh] flex-col justify-center py-16"
    >
      {/* Badge — editorial label above the name */}
      <div className="inline-block px-4 py-2 bg-accent text-surface font-mono text-xs mb-6 pixel-border tracking-widest uppercase">
        {dict.hero.badge}
      </div>

      <p className="text-accent font-mono text-sm mb-2">{dict.hero.greeting}</p>

      <h1
        id="hero-heading"
        className="font-display text-6xl md:text-8xl text-text mb-4 tracking-tighter"
      >
        {profile.name}.
      </h1>

      <p className="font-display text-2xl md:text-3xl text-accent italic mb-6">
        {dict.profile.role}
        <span className="hero-caret font-mono" aria-hidden="true">|</span>
      </p>

      <p className="text-text-muted max-w-xl leading-relaxed mb-8">
        <span className="text-text">{dict.profile.bioIntro}</span>{" "}
        {dict.profile.bioTagline}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="bg-primary-container text-surface px-8 py-4 font-mono text-xs pixel-border-heavy hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 inline-flex items-center gap-2"
        >
          {dict.hero.ctaProjects}
        </a>
        <a
          href="#contact"
          className="bg-surface border-2 border-accent text-accent px-8 py-4 font-mono text-xs hover:bg-accent hover:text-surface transition-all inline-flex items-center gap-2"
        >
          {dict.hero.ctaContact}
        </a>
      </div>

      {/* Scroll-down arrow */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg className="text-accent w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
