/**
 * Hero — Rétro Gaming / Pixel Art style
 */

import Link from "next/link";

import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Hero({ dict }: Props) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="pixel-grid scanlines hero-enter relative flex min-h-[75vh] flex-col justify-center py-16"
    >
      {/* Décorations pixel */}
      <div className="absolute top-8 right-8 hidden md:block">
        <PixelDecoration />
      </div>

      {/* Greeting badge */}
      <div className="pixel-tag inline-block w-fit">
        {dict.hero.greeting}
      </div>

      {/* Nom principal */}
      <h1
        id="hero-heading"
        className="pixel-title glitch mt-6 text-2xl text-accent sm:text-3xl lg:text-4xl"
      >
        {profile.name}
      </h1>

      {/* Rôle avec caret */}
      <p className="mt-4 font-[family-name:var(--font-retro)] text-xl text-text-muted sm:text-2xl lg:text-3xl">
        {">"} {dict.profile.role}
        <span className="hero-caret" aria-hidden="true">_</span>
      </p>

      {/* Bio */}
      <div className="pixel-border mt-8 max-w-xl bg-bg/80 p-4">
        <p className="font-[family-name:var(--font-retro)] text-base leading-relaxed text-text-muted">
          <span className="text-accent-2">[INFO]</span>{" "}
          <span className="text-text">{dict.profile.bioIntro}</span>{" "}
          {dict.profile.bioTagline}
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a href="#contact" className="pixel-btn">
          {dict.hero.ctaContact}
        </a>
        <Link href="#projects" className="pixel-btn-outline">
          {dict.hero.ctaProjects}
        </Link>
      </div>

      {/* Stats style arcade */}
      <div className="mt-12 flex flex-wrap gap-6">
        <StatBadge label="LVL" value="DEV" />
        <StatBadge label="XP" value="5+" />
        <StatBadge label="HP" value="MAX" />
      </div>
    </section>
  );
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted">
        {label}
      </span>
      <span className="font-[family-name:var(--font-pixel)] text-xs text-accent-2">
        {value}
      </span>
    </div>
  );
}

function PixelDecoration() {
  return (
    <div className="float-animation opacity-60">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-accent">
        {/* Simple pixel star */}
        <rect x="28" y="0" width="8" height="8" fill="currentColor" />
        <rect x="20" y="8" width="24" height="8" fill="currentColor" />
        <rect x="12" y="16" width="40" height="8" fill="currentColor" />
        <rect x="0" y="24" width="64" height="16" fill="currentColor" />
        <rect x="12" y="40" width="40" height="8" fill="currentColor" />
        <rect x="20" y="48" width="24" height="8" fill="currentColor" />
        <rect x="28" y="56" width="8" height="8" fill="currentColor" />
      </svg>
    </div>
  );
}
