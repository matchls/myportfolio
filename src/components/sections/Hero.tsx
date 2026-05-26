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
    <div className="float-animation opacity-70">
      <svg width="64" height="80" viewBox="0 0 64 80" fill="none">
        {/* Arbre pixelisé */}
        {/* Feuillage - niveau 1 (haut) */}
        <rect x="24" y="0" width="16" height="8" fill="currentColor" className="text-accent" />
        {/* Feuillage - niveau 2 */}
        <rect x="16" y="8" width="32" height="8" fill="currentColor" className="text-accent" />
        {/* Feuillage - niveau 3 */}
        <rect x="8" y="16" width="48" height="8" fill="currentColor" className="text-accent" />
        {/* Feuillage - niveau 4 */}
        <rect x="16" y="24" width="32" height="8" fill="currentColor" className="text-accent" />
        {/* Feuillage - niveau 5 */}
        <rect x="4" y="32" width="56" height="8" fill="currentColor" className="text-accent" />
        {/* Feuillage - niveau 6 (bas) */}
        <rect x="12" y="40" width="40" height="8" fill="currentColor" className="text-accent" />
        {/* Tronc */}
        <rect x="24" y="48" width="16" height="24" fill="#8B5A2B" />
        {/* Détail tronc */}
        <rect x="28" y="52" width="8" height="4" fill="#6B4423" />
        <rect x="28" y="60" width="8" height="4" fill="#6B4423" />
      </svg>
    </div>
  );
}
