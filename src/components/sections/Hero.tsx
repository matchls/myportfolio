/**
 * Hero — première impression, premier bloc de la page.
 *
 * Server Component. Contient nom, rôle, tagline, et 2 CTA (mail + projets).
 * Pas d'image ici : on garde la photo pour la section About (parcours).
 *
 * Accessibilité :
 *  - <h1> unique de la page (un seul par document HTML)
 *  - Les CTA sont des <a> stylés en bouton (sémantiquement des liens, pas des actions)
 */

import Link from "next/link";

import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[70vh] flex-col justify-center py-16"
    >
      <p className="text-accent font-mono text-sm">Bonjour, je suis</p>

      <h1
        id="hero-heading"
        className="text-text mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
      >
        {profile.name}.
      </h1>

      <p className="text-text-muted mt-3 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
        {profile.role}
      </p>

      <p className="text-text-muted mt-6 max-w-xl leading-relaxed">
        <span className="text-text">Hier je travaillais le bois. Aujourd&apos;hui je code.</span>{" "}
        Toujours pour construire des choses qui servent.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="bg-accent-2 hover:bg-accent-2/90 inline-flex h-10 items-center justify-center rounded-md border border-transparent px-4 text-sm font-medium text-white transition-colors"
        >
          Me contacter
        </a>
        <Link
          href="#projects"
          className="border-border text-text hover:border-accent-2 hover:text-accent-2 inline-flex h-10 items-center justify-center rounded-md border bg-transparent px-4 text-sm font-medium transition-colors"
        >
          Voir mes projets
        </Link>
      </div>
    </section>
  );
}
