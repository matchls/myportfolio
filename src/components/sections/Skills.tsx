/**
 * Skills — Rétro Gaming style avec badges pixelisés
 */

import { Card } from "@/components/ui/Card";
import { skillGroups } from "@/data/skills";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Skills({ dict }: Props) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 border-t-4 border-border py-16"
      style={{ borderTopStyle: "dashed" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-4">
        <span className="pixel-tag">03</span>
        <h2
          id="skills-heading"
          className="font-[family-name:var(--font-pixel)] text-sm uppercase tracking-wider text-text sm:text-base"
        >
          {dict.skills.heading}
        </h2>
        <div className="h-1 flex-1 bg-border" style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }} />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Card key={group.category} as="article">
            {/* Category header */}
            <div className="flex items-center gap-2 border-b-2 border-dashed border-border pb-3">
              <span className="flex h-6 w-6 items-center justify-center border-2 border-accent-2 font-[family-name:var(--font-pixel)] text-[0.4rem] text-accent-2">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase tracking-wider text-accent">
                {dict.skills.groups[group.category]}
              </h3>
            </div>
            
            {/* Skills list */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="border-2 border-border bg-bg px-2 py-1 font-[family-name:var(--font-retro)] text-sm text-text-muted transition-all hover:border-accent hover:text-accent"
                  style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Progress bars decoratifs */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <SkillBar label="Frontend" value={90} color="accent" />
        <SkillBar label="Backend" value={85} color="accent-2" />
        <SkillBar label="DevOps" value={70} color="accent" />
      </div>
    </section>
  );
}

function SkillBar({ label, value, color }: { label: string; value: number; color: "accent" | "accent-2" }) {
  return (
    <div className="pixel-border bg-bg p-3">
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase text-text-muted">
          {label}
        </span>
        <span className="font-[family-name:var(--font-pixel)] text-[0.45rem] text-accent-2">
          {value}%
        </span>
      </div>
      <div className="mt-2 h-3 border-2 border-border bg-bg">
        <div
          className={`h-full ${color === "accent" ? "bg-accent" : "bg-accent-2"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
