/**
 * About — bio + photo.
 *
 * Layout :
 *  - Mobile : photo au-dessus du texte
 *  - Desktop : 2 colonnes (texte 2/3, photo 1/3) avec la photo à droite
 *
 * Pourquoi next/image plutôt que <img> ?
 *  - Optimisation automatique (WebP/AVIF, redimensionnement responsive)
 *  - Lazy loading par défaut, CLS évité via width/height obligatoires
 *  - Cache Vercel en CDN
 *
 * Accessibilité :
 *  - La photo a un alt descriptif (pas "photo" qui est redondant avec role="img")
 *  - La bio est découpée en paragraphes via split sur double-newline
 */

import Image from "next/image";

import { profile } from "@/data/profile";

export function About() {
  // Double-newline = séparateur de paragraphes. Permet d'éditer la bio
  // comme un vrai texte dans profile.ts sans penser au HTML.
  const paragraphs = profile.bio.split(/\n\s*\n/);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-border/70 scroll-mt-20 border-t py-16"
    >
      <h2 id="about-heading" className="text-text flex items-baseline gap-3 text-2xl font-semibold">
        <span className="text-accent font-mono text-base">01.</span>À propos
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr] md:items-start md:gap-12">
        <div className="text-text-muted space-y-4 leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-lg md:max-w-none">
          <Image
            src="/photo.jpg"
            alt={`Portrait de ${profile.name}`}
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
