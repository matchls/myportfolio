import { ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/Card";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Formation({ dict }: Props) {
  return (
    <section
      id="formation"
      aria-labelledby="formation-heading"
      className="scroll-mt-20 border-t-4 border-border py-16"
      style={{ borderTopStyle: "dashed" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-4">
        <span className="pixel-tag">04</span>
        <h2
          id="formation-heading"
          className="font-[family-name:var(--font-pixel)] text-sm uppercase tracking-wider text-text sm:text-base"
        >
          {dict.formation.heading}
        </h2>
        <div className="h-1 flex-1 bg-border" style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card as="article">
          {/* Achievement badge */}
          <div className="mb-4 inline-block border-2 border-accent bg-accent/10 px-2 py-1">
            <span className="font-[family-name:var(--font-pixel)] text-[0.4rem] uppercase text-accent">
              Achievement Unlocked
            </span>
          </div>
          
          <h3 className="font-[family-name:var(--font-pixel)] text-xs uppercase text-text sm:text-sm">
            {dict.formation.bootcampName}
          </h3>
          <p className="mt-2 font-[family-name:var(--font-retro)] text-base text-accent-2">
            {dict.formation.etablissement}
          </p>
          <p className="mt-1 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-accent">
            {dict.formation.duration}
          </p>
          <p className="mt-4 font-[family-name:var(--font-retro)] text-base leading-relaxed text-text-muted">
            {dict.formation.description}
          </p>
          <p className="mt-3 font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase text-text-muted">
            Stack: {dict.formation.stack}
          </p>
          <a
            href="https://www.lacapsule.academy/formation-developpeur-web/full-time"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted transition-colors hover:text-accent"
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            {dict.formation.learnMore}
          </a>
        </Card>

        <Card as="article">
          {/* Achievement badge */}
          <div className="mb-4 inline-block border-2 border-accent-2 bg-accent-2/10 px-2 py-1">
            <span className="font-[family-name:var(--font-pixel)] text-[0.4rem] uppercase text-accent-2">
              Bonus Stage Complete
            </span>
          </div>

          <h3 className="font-[family-name:var(--font-pixel)] text-xs uppercase text-text sm:text-sm">
            {dict.formation.engineeringName}
          </h3>
          <p className="mt-2 font-[family-name:var(--font-retro)] text-base text-accent-2">
            {dict.formation.engineeringEtablissement}
          </p>
          <p className="mt-1 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-accent">
            {dict.formation.engineeringDuration}
          </p>
          <p className="mt-4 font-[family-name:var(--font-retro)] text-base leading-relaxed text-text-muted">
            {dict.formation.engineeringDescription}
          </p>
          <a
            href="https://www.mecavenir.com/formation/ingenieur-mecanique-et-production/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted transition-colors hover:text-accent-2"
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            {dict.formation.engineeringLearnMore}
          </a>
        </Card>
      </div>
    </section>
  );
}
