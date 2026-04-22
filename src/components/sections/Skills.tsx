/**
 * Skills — compétences en 4 colonnes groupées par catégorie.
 *
 * Layout :
 *  - Mobile : 1 colonne (accordéon visuel simple)
 *  - Tablet : 2 colonnes
 *  - Desktop : 4 colonnes alignées
 *
 * Chaque groupe est une <Card> simple, sans interactivité.
 * Les skills sont des badges inline — plus compacts que des listes à puces,
 * et ça se lit d'un coup d'œil.
 */

import { Card } from "@/components/ui/Card";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-border/70 scroll-mt-20 border-t py-16"
    >
      <h2
        id="skills-heading"
        className="text-text flex items-baseline gap-3 text-2xl font-semibold"
      >
        <span className="text-accent font-mono text-base">02.</span>Compétences
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <Card key={group.category} as="article">
            <h3 className="text-accent-2 font-mono text-xs tracking-wider uppercase">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="border-border/70 text-text-muted rounded-md border px-2 py-1 text-xs"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
