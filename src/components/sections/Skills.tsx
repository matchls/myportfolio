/**
 * Skills — skill groups displayed as cards with a category-coloured bottom border.
 *
 * Card border colour and category icon are driven by lookup maps so adding a
 * new category only requires a single entry in each map.
 *
 * i18n : group labels from `dict.skills.groups[category]`.
 *         Skill names (React, Node.js…) are proper nouns — not translated.
 */

import { skillGroups } from "@/data/skills";
import type { Dictionary } from "@/i18n/dictionaries";
import type { SkillGroup } from "@/types";

type Props = {
  dict: Dictionary;
};

// ---------------------------------------------------------------------------
// Category metadata maps
// ---------------------------------------------------------------------------

const BORDER_BY_CATEGORY: Record<SkillGroup["category"], string> = {
  frontend: "border-accent",
  backend: "border-[#5d4037]",
  mobile: "border-primary-container",
  tools: "border-accent-2",
};

const ICON_BY_CATEGORY: Record<SkillGroup["category"], string> = {
  frontend: "🎨",
  backend: "⚙️",
  mobile: "📱",
  tools: "🔧",
};

export function Skills({ dict }: Props) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 py-24"
    >
      {/* Heading — centred editorial style */}
      <div className="text-center mb-12">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          {dict.skills.eyebrow}
        </p>
        <h2
          id="skills-heading"
          className="font-display text-5xl text-text mb-3"
        >
          {dict.skills.heading}
        </h2>
        <p className="text-text-muted text-sm max-w-xl mx-auto">
          {dict.skills.subheading}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <SkillCard key={group.category} group={group} dict={dict} />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// SkillCard
// ---------------------------------------------------------------------------

type CardProps = {
  group: SkillGroup;
  dict: Dictionary;
};

function SkillCard({ group, dict }: CardProps) {
  const borderClass = BORDER_BY_CATEGORY[group.category] ?? "border-border";
  const icon = ICON_BY_CATEGORY[group.category] ?? "◆";

  return (
    <article
      className={`bg-surface p-6 border-b-4 ${borderClass} shadow-[4px_4px_0px_0px_rgba(86,100,43,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(86,100,43,0.25)] transition-shadow`}
    >
      {/* Category header */}
      <div className="flex items-center gap-2 mb-4">
        <span aria-hidden="true" className="text-lg leading-none">{icon}</span>
        <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
          {dict.skills.groups[group.category]}
        </h3>
      </div>

      {/* Skill tags */}
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill.name}
            className="px-3 py-1 bg-surface-container border border-accent/20 text-xs font-mono hover:bg-accent/10 transition-colors"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </article>
  );
}
