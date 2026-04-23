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
        <span className="text-accent font-mono text-base">03.</span>
        {dict.formation.heading}
      </h2>

      <div className="mt-8 md:max-w-2xl">
        <Card as="article">
          <h3 className="text-text text-lg font-semibold">{dict.formation.bootcampName}</h3>
          <p className="text-accent mt-1 font-mono text-xs">{dict.formation.duration}</p>
          <p className="text-text-muted mt-3 text-sm leading-relaxed">{dict.formation.description}</p>
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
      </div>
    </section>
  );
}
