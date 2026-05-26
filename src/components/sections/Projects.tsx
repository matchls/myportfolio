/**
 * Projects — Server Component.
 *
 * Renders the section heading and the grid. Each card is handled by
 * ProjectCard (Client Component) which owns the modal + carousel logic.
 * Keeping this file as a Server Component means the grid itself has zero
 * client-side JS cost.
 */

import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/ProjectCard";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

export function Projects({ dict }: Props) {
  const hasMultiple = projects.length > 1;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 py-16"
    >
      {/* Eyebrow + heading — centred */}
      <div className="text-center mb-8">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          {dict.projects.eyebrow}
        </p>
        <h2
          id="projects-heading"
          className="font-display text-5xl text-text inline-flex items-baseline gap-3"
        >
          <span className="font-mono text-base text-accent" aria-hidden="true">02.</span>
          {dict.projects.heading}
        </h2>
      </div>

      <div className={hasMultiple ? "grid gap-6 md:grid-cols-2" : "grid gap-6 md:max-w-2xl"}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} dict={dict} />
        ))}
      </div>
    </section>
  );
}
