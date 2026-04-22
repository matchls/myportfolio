/**
 * About — bio + photo.
 *
 * Layout :
 *  - Mobile : photo au-dessus du texte
 *  - Desktop : 2 colonnes (texte 2/3, photo 1/3) avec la photo à droite
 *
 * i18n :
 *  - Heading, alt photo, paragraphes de bio : tout vient du dict
 *  - `profile.name` : identitaire, reste en dehors des dicts
 *  - Les paragraphes sont stockés comme un array en JSON (simple et traduisible),
 *    plus propre que splitter sur `\n\s*\n` comme avant.
 */

import Image from "next/image";

import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function About({ dict }: Props) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-border/70 scroll-mt-20 border-t py-16"
    >
      <h2 id="about-heading" className="text-text flex items-baseline gap-3 text-2xl font-semibold">
        <span className="text-accent font-mono text-base">01.</span>
        {dict.about.heading}
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr] md:items-start md:gap-12">
        <div className="text-text-muted space-y-4 leading-relaxed">
          {dict.profile.bioParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-lg md:max-w-none">
          <Image
            src="/photo.jpg"
            alt={`${dict.about.photoAlt} ${profile.name}`}
            fill
            sizes="(max-width: 768px) 240px, 240px"
            className="object-cover"
            priority={false}
          />
          {/* Liseré accent en hover : petit détail qui relie la photo à la palette */}
          <div
            aria-hidden="true"
            className="ring-accent/0 hover:ring-accent-2/60 absolute inset-0 rounded-lg ring-2 ring-offset-2 ring-offset-transparent transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
}
