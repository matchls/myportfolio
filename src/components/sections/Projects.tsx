/**
 * Projects — Rétro Gaming style avec cartes pixelisées
 */

import { Bot, ExternalLink, Play, Sparkles, UserCheck } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { GithubIcon } from "@/components/ui/Icons";
import { ScreenshotCarousel } from "@/components/sections/ScreenshotCarousel";
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
      className="scroll-mt-20 border-t-4 border-border py-16"
      style={{ borderTopStyle: "dashed" }}
    >
      {/* Section header */}
      <div className="flex items-center gap-4">
        <span className="pixel-tag">02</span>
        <h2
          id="projects-heading"
          className="font-[family-name:var(--font-pixel)] text-sm uppercase tracking-wider text-text sm:text-base"
        >
          {dict.projects.heading}
        </h2>
        <div className="h-1 flex-1 bg-border" style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }} />
      </div>

      <div
        className={hasMultiple ? "mt-10 grid gap-6 md:grid-cols-2" : "mt-10 grid gap-6 md:max-w-2xl"}
      >
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
    <Card as="article" className="flex h-full flex-col">
      <header className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {/* Status badge */}
          <div className="inline-block border-2 border-accent-2 bg-accent-2/10 px-2 py-1">
            <span className="font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase text-accent-2">
              {project.status === "shipped" ? dict.projects.statusShipped : dict.projects.statusComingSoon}
            </span>
          </div>
          {/* Title */}
          <h3 className="mt-3 font-[family-name:var(--font-pixel)] text-xs uppercase text-text sm:text-sm">
            {itemCopy.title}
          </h3>
          {"role" in itemCopy && itemCopy.role ? (
            <p className="mt-1 font-[family-name:var(--font-retro)] text-sm text-accent">
              {">"} {itemCopy.role}
            </p>
          ) : (
            <p className="mt-1 text-xs invisible" aria-hidden="true">&nbsp;</p>
          )}
        </div>
        <AiLevelBadge level={project.aiLevel} dict={dict} />
      </header>

      {project.screenshots && project.screenshots.length > 0 && (
        <ScreenshotCarousel screenshots={project.screenshots} title={itemCopy.title} />
      )}

      <p className="mt-4 font-[family-name:var(--font-retro)] text-base leading-relaxed text-text-muted whitespace-pre-line">
        {itemCopy.description}
      </p>

      {"roleDetail" in itemCopy && itemCopy.roleDetail ? (
        <p className="mt-4 flex-1 border-l-4 border-accent/40 pl-3 font-[family-name:var(--font-retro)] text-sm leading-relaxed text-text-muted italic">
          {itemCopy.roleDetail}
        </p>
      ) : (
        <div className="flex-1" />
      )}

      {/* Tech stack */}
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border-2 border-border bg-bg px-2 py-1 font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase text-text-muted"
            style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
          >
            {tech}
          </li>
        ))}
      </ul>

      {project.status === "shipped" && (
        <ProjectLinks project={project} title={itemCopy.title} dict={dict} />
      )}
    </Card>
  );
}

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
    <div className="group relative flex-shrink-0">
      <div
        className="flex h-8 w-8 cursor-default items-center justify-center border-2 border-accent-2/50 text-accent-2/70 transition-colors hover:border-accent-2 hover:text-accent-2"
        style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
        aria-label={copy.label}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div 
        className="pointer-events-none absolute right-0 top-full z-10 mt-2 w-52 border-4 border-border bg-bg p-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ boxShadow: "4px 4px 0 var(--color-pixel-shadow)" }}
      >
        <p className="font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase text-accent">
          {copy.label}
        </p>
        <p className="mt-2 font-[family-name:var(--font-retro)] text-sm leading-relaxed text-text-muted">
          {copy.tooltip}
        </p>
      </div>
    </div>
  );
}

type LinksProps = {
  project: ShippedProject;
  title: string;
  dict: Dictionary;
};

function ProjectLinks({ project, title, dict }: LinksProps) {
  return (
    <ul className="mt-6 flex flex-wrap items-center gap-4 border-t-2 border-dashed border-border pt-4">
      {project.demoUrl && (
        <li>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted transition-colors hover:text-accent"
            aria-label={`${dict.projects.ariaDemo} ${title}`}
          >
            <Play className="h-3 w-3" aria-hidden="true" />
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
            className="inline-flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted transition-colors hover:text-accent"
            aria-label={`${dict.projects.ariaRepoFrontend} ${title}`}
          >
            <GithubIcon className="h-3 w-3" aria-hidden="true" />
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
            className="inline-flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted transition-colors hover:text-accent"
            aria-label={`${dict.projects.ariaRepoBackend} ${title}`}
          >
            <GithubIcon className="h-3 w-3" aria-hidden="true" />
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
            className="inline-flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text-muted transition-colors hover:text-accent"
            aria-label={`${dict.projects.ariaRepo} ${title}`}
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            {dict.projects.links.repo}
          </a>
        </li>
      )}
    </ul>
  );
}
