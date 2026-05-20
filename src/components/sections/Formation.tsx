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
      className="border-border/70 scroll-mt-20 border-t py-16"
    >
      <h2
        id="formation-heading"
        className="text-text flex items-baseline gap-3 text-2xl font-semibold"
      >
        <span className="text-accent font-mono text-base">04.</span>
        {dict.formation.heading}
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card as="article">
          <h3 className="text-text text-lg font-semibold">{dict.formation.bootcampName}</h3>
          <p className="text-accent mt-1 font-mono text-xs">{dict.formation.duration}</p>
          <p className="text-text-muted mt-1 font-mono text-xs">{dict.formation.etablissement}</p>
          <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">{dict.formation.description}</p>
          <p className="text-text-muted mt-3 font-mono text-xs">{dict.formation.stack}</p>
          <a
            href="https://www.lacapsule.academy/formation-developpeur-web/full-time"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent mt-4 inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.formation.learnMore}
          </a>
        </Card>

        <Card as="article">
          <h3 className="text-text text-lg font-semibold">{dict.formation.engineeringName}</h3>
          <p className="text-accent mt-1 font-mono text-xs">{dict.formation.engineeringDuration}</p>
          <p className="text-text-muted mt-1 font-mono text-xs">{dict.formation.engineeringEtablissement}</p>
          <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">{dict.formation.engineeringDescription}</p>
          <a
            href="https://www.mecavenir.com/formation/ingenieur-mecanique-et-production/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent mt-4 inline-flex items-center gap-1.5 text-sm transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.formation.engineeringLearnMore}
          </a>
        </Card>
      </div>
    </section>
  );
}
