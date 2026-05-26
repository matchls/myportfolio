/**
 * Hero — first impression, first block of the page.
 *
 * Server Component. Forest background image (pixel-art, full-screen),
 * with sway animation + gradient overlay + particle container (Issue #11).
 * Content is centered, matching the Stitch reference design.
 *
 * Accessibility:
 *  - Background image is aria-hidden (decorative)
 *  - <h1> is unique per page
 *  - CTAs are <a> styled as buttons
 */

import Image from "next/image";

import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Hero({ dict }: Props) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-enter relative min-h-[100vh] flex flex-col items-center justify-center pt-24 overflow-hidden"
    >
      {/* Forest background — decorative, aria-hidden */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/forest-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-60 grayscale-[10%] animate-sway"
          priority
        />
        {/* Gradient overlay: transparent top → page bg bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg" />
        {/* Particle container — populated by ParticleEmitter (Issue #11) */}
        <div className="absolute inset-0 pointer-events-none z-10" id="hero-particles" />
      </div>

      {/* Content — centered, above background */}
      <div className="relative z-10 text-center px-4 md:px-16 max-w-4xl">

        {/* Editorial badge */}
        <div className="inline-block px-4 py-2 bg-accent text-surface font-mono text-xs mb-6 pixel-border tracking-widest uppercase">
          {dict.hero.badge}
        </div>

        <h1
          id="hero-heading"
          className="font-display text-6xl md:text-8xl text-primary mb-4 tracking-tighter drop-shadow-sm"
        >
          {profile.name}.
        </h1>

        <p className="font-display text-2xl md:text-3xl text-on-secondary-container italic mb-12">
          {dict.profile.role}
          <span className="hero-caret font-mono" aria-hidden="true">|</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="#projects"
            className="bg-primary-container text-surface px-8 py-4 font-mono text-xs pixel-border-heavy hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_15px_#ffdbd0] transition-all active:scale-95 inline-flex items-center gap-2"
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
      </div>

      {/* Scroll-down arrow */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
        <svg className="text-accent w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
