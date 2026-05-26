/**
 * Projects — list of shipped and coming-soon projects.
 *
 * i18n:
 *  - UI labels (status, links, aria) come from `dict.projects.*`
 *  - Title + description per project come from `dict.projects.items[slug]`
 *    → translations live in JSON, technical config (slug, stack, URLs, status)
 *    stays in `src/data/projects.ts`
 *  - Stack names (React Native, Express...) are not translated: proper nouns
 *
 * Card design: dark bg-primary-container outer shell + bg-surface inner body,
 * screenshot grayscale that reveals color on group hover.
 */

import Image from "next/image";
import { Bot, Sparkles, UserCheck } from "lucide-react";

import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import type { AiLevel, Project, ShippedProject } from "@/types";

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
      {/* Eyebrow + heading */}
      <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
        {dict.projects.eyebrow}
      </p>
      <h2
        id="projects-heading"
        className="font-display text-5xl text-text mb-8"
      >
        {dict.projects.heading}
      </h2>

      <div className={hasMultiple ? "grid gap-6 md:grid-cols-2" : "grid gap-6 md:max-w-2xl"}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} dict={dict} />
        ))}
      </div>
    </section>
  );
}

type CardProps = {
  project: Project;
  dict: Dictionary;
};

function ProjectCard({ project, dict }: CardProps) {
  const itemKey = project.slug as keyof typeof dict.projects.items;
  const itemCopy = dict.projects.items[itemKey];

  return (
    <article className="group bg-primary-container border-[4px] border-primary hover:-translate-y-2 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,219,208,0.2)] flex flex-col">

      {/* Screenshot — grayscale at rest, color on card hover */}
      {project.screenshots?.[0] && (
        <div className="h-48 overflow-hidden border-b-4 border-primary">
          <Image
            src={project.screenshots[0]}
            alt={itemCopy.title}
            width={400}
            height={200}
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        </div>
      )}

      {/* Inner body — floats on dark shell */}
      <div className="m-3 bg-surface border-2 border-primary/20 p-6 flex-grow flex flex-col">

        {/* Stack tags — first 2 only */}
        <ul className="flex flex-wrap gap-2 mb-4" aria-label="Stack">
          {project.stack.slice(0, 2).map((tech) => (
            <li key={tech} className="bg-accent text-surface px-2 py-1 text-[10px] font-mono uppercase">
              {tech}
            </li>
          ))}
        </ul>

        {/* Title + AI level badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-xl text-text">{itemCopy.title}</h3>
          <AiLevelBadge level={project.aiLevel} dict={dict} />
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm italic line-clamp-2 mb-4">
          {itemCopy.description}
        </p>

        {/* Push links to bottom */}
        <div className="flex-1" />

        {/* Links */}
        {project.status === "shipped" && (
          <ProjectLinks project={project} title={itemCopy.title} dict={dict} />
        )}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// AI level badge (tooltip on hover)
// ---------------------------------------------------------------------------

const AI_LEVEL_ICONS = {
  autonomous: UserCheck,
  assisted: Sparkles,
  supervised: Bot,
} as const;

type BadgeProps = {
  level: AiLevel;
  dict: Dictionary;
};

function AiLevelBadge({ level, dict }: BadgeProps) {
  const Icon = AI_LEVEL_ICONS[level];
  const copy = dict.projects.aiLevel[level];

  return (
    <div className="group/badge relative flex-shrink-0">
      <div
        className="text-accent/60 hover:text-accent cursor-default p-0.5 transition-colors"
        aria-label={copy.label}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="pointer-events-none absolute right-0 top-full z-10 mt-1.5 w-52 border border-border bg-surface p-2.5 opacity-0 shadow-md transition-opacity duration-150 group-hover/badge:opacity-100">
        <p className="text-accent mb-1 font-mono text-[0.65rem] uppercase tracking-wider">{copy.label}</p>
        <p className="text-text-muted text-xs leading-relaxed">{copy.tooltip}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Project links — pixel button style
// ---------------------------------------------------------------------------

type LinksProps = {
  project: ShippedProject;
  title: string;
  dict: Dictionary;
};

function ProjectLinks({ project, title, dict }: LinksProps) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {project.demoUrl && (
        <li>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaDemo} ${title}`}
          >
            {dict.projects.links.demo}
          </a>
        </li>
      )}
      {project.repoFrontendUrl && (
        <li>
          <a
            href={project.repoFrontendUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaRepoFrontend} ${title}`}
          >
            {dict.projects.links.frontend}
          </a>
        </li>
      )}
      {project.repoBackendUrl && (
        <li>
          <a
            href={project.repoBackendUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaRepoBackend} ${title}`}
          >
            {dict.projects.links.backend}
          </a>
        </li>
      )}
      {project.repoUrl && (
        <li>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaRepo} ${title}`}
          >
            {dict.projects.links.repo}
          </a>
        </li>
      )}
    </ul>
  );
}
