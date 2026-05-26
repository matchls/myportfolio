/**
 * About — Rétro Gaming style avec photo pixelisée
 */

import Image from "next/image";

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
          <strong key={i} className="font-bold text-accent-2">
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
      className="scroll-mt-20 border-t-4 border-border py-16"
      style={{ borderTopStyle: "dashed" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-4">
        <span className="pixel-tag">01</span>
        <h2
          id="about-heading"
          className="font-[family-name:var(--font-pixel)] text-sm uppercase tracking-wider text-text sm:text-base"
        >
          {dict.about.heading}
        </h2>
        <div className="h-1 flex-1 bg-border" style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }} />
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-[2fr_1fr] md:items-start md:gap-12">
        {/* Bio text */}
        <div className="pixel-border space-y-4 bg-bg/80 p-6">
          <div className="mb-4 border-b-2 border-dashed border-border pb-2">
            <span className="font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-accent">
              {">"} Character Info
            </span>
          </div>
          <div className="space-y-4 font-[family-name:var(--font-retro)] text-lg leading-relaxed text-text-muted">
            {dict.profile.bioParagraphs.map((paragraph, index) => (
              <BoldParagraph key={index} text={paragraph} />
            ))}
          </div>
        </div>

        {/* Photo avec style pixel */}
        <div className="relative mx-auto w-full max-w-[240px] md:max-w-none">
          <div 
            className="absolute -right-3 -bottom-3 h-full w-full bg-accent/40"
            aria-hidden="true"
            style={{ boxShadow: "4px 4px 0 var(--color-pixel-shadow)" }}
          />
          <div 
            className="relative aspect-square overflow-hidden border-4 border-border"
            style={{ boxShadow: "4px 4px 0 var(--color-pixel-shadow)" }}
          >
            <Image
              src="/photo.jpg"
              alt={`${dict.about.photoAlt} ${profile.name}`}
              fill
              sizes="(max-width: 768px) 240px, 240px"
              className="object-cover"
              priority={false}
            />
            {/* Overlay scanlines */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"
            />
          </div>
          {/* Label sous la photo */}
          <div className="mt-3 text-center">
            <span className="font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted">
              [PLAYER 1]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
