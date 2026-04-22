/**
 * Hero — première impression, premier bloc de la page.
 *
 * Server Component. Contient nom, rôle, tagline, et 2 CTA (mail + projets).
 * Pas d'image ici : on garde la photo pour la section About (parcours).
 *
 * Accessibilité :
 *  - <h1> unique de la page (un seul par document HTML)
 *  - Les CTA sont des <a> stylés en bouton (sémantiquement des liens, pas des actions)
 *
 * i18n : reçoit le dictionnaire complet en prop. Le nom vient de `profile`
 * (identitaire, non traduisible) ; tout le reste vient du dict.
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
      className="flex min-h-[70vh] flex-col justify-center py-16"
    >
      <p className="text-accent font-mono text-sm">{dict.hero.greeting}</p>

      <h1
        id="hero-heading"
        className="text-text mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
      >
        {profile.name}.
      </h1>

      <p className="text-text-muted mt-3 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
        {dict.profile.role}
      </p>

      <p className="text-text-muted mt-6 max-w-xl leading-relaxed">
        <span className="text-text">{dict.profile.bioIntro}</span>{" "}
        {dict.profile.bioTagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#contact"
          className="bg-accent-2 hover:bg-accent-2/90 inline-flex h-10 items-center justify-center rounded-md border border-transparent px-4 text-sm font-medium text-white transition-colors"
        >
          {dict.hero.ctaContact}
        </a>
        <Link
          href="#projects"
          className="border-border text-text hover:border-accent-2 hover:text-accent-2 inline-flex h-10 items-center justify-center rounded-md border bg-transparent px-4 text-sm font-medium transition-colors"
        >
          {dict.hero.ctaProjects}
        </Link>
      </div>
    </section>
  );
}
