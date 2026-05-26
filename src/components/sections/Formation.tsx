/**
 * Formation — two education cards side-by-side.
 *
 * No external Card wrapper: each article uses inline classes for full
 * per-card flexibility (hover border transition, custom shadow).
 *
 * i18n: all copy from `dict.formation.*`
 */

import { ExternalLink } from "lucide-react";

import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Formation({ dict }: Props) {
  return (
    <section
      id="formation"
      aria-labelledby="formation-heading"
      className="scroll-mt-20 py-24"
    >
      {/* Heading — number prefix in mono accent, title in display */}
      <h2
        id="formation-heading"
        className="font-display text-5xl text-text mb-10 flex items-baseline justify-center gap-3"
      >
        <span className="font-mono text-base text-accent" aria-hidden="true">04.</span>
        {dict.formation.heading}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* — La Capsule bootcamp — */}
        <article className="bg-surface border-2 border-accent/30 p-6 hover:border-accent transition-colors shadow-[4px_4px_0px_0px_rgba(86,100,43,0.15)] flex flex-col">
          <h3 className="font-display text-xl text-text">{dict.formation.bootcampName}</h3>
          <p className="text-accent font-mono text-sm uppercase mt-1">{dict.formation.etablissement}</p>
          <p className="text-text-muted font-mono text-xs mt-1">{dict.formation.duration}</p>
          <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">{dict.formation.description}</p>
          <p className="text-text-muted mt-3 font-mono text-xs">{dict.formation.stack}</p>
          <a
            href="https://www.lacapsule.academy/formation-developpeur-web/full-time"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:text-text transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.formation.learnMore}
          </a>
        </article>

        {/* — SUPii Mécavenir engineering degree — */}
        <article className="bg-surface border-2 border-accent/30 p-6 hover:border-accent transition-colors shadow-[4px_4px_0px_0px_rgba(86,100,43,0.15)] flex flex-col">
          <h3 className="font-display text-xl text-text">{dict.formation.engineeringName}</h3>
          <p className="text-accent font-mono text-sm uppercase mt-1">{dict.formation.engineeringEtablissement}</p>
          <p className="text-text-muted font-mono text-xs mt-1">{dict.formation.engineeringDuration}</p>
          <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">{dict.formation.engineeringDescription}</p>
          <a
            href="https://www.mecavenir.com/formation/ingenieur-mecanique-et-production/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:text-text transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.formation.engineeringLearnMore}
          </a>
        </article>
      </div>
    </section>
  );
}
