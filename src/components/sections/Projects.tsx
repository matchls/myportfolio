/**
 * Projects — liste des projets réalisés.
 *
 * i18n :
 *  - Les libellés UI (status, liens, aria) viennent de `dict.projects.*`
 *  - Titre + description de chaque projet viennent de `dict.projects.items[slug]`
 *    → les traductions sont dans les JSON, la config technique (slug, stack,
 *    URLs, status, featured) reste dans `src/data/projects.ts`
 *  - Les noms de stack (React Native, Express...) ne sont pas traduits : noms propres
 *
 * Union discriminée sur `status` inchangée : le narrowing TS fonctionne pareil.
 */

import { ExternalLink, Play } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project, ShippedProject } from "@/types";

type Props = {
  dict: Dictionary;
};

export function Projects({ dict }: Props) {
  const hasMultiple = projects.length > 1;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-border/70 scroll-mt-20 border-t py-16"
    >
      <h2
        id="projects-heading"
        className="text-text flex items-baseline gap-3 text-2xl font-semibold"
      >
        <span className="text-accent font-mono text-base">03.</span>
        {dict.projects.heading}
      </h2>

      <div
        className={hasMultiple ? "mt-8 grid gap-6 md:grid-cols-2" : "mt-8 grid gap-6 md:max-w-2xl"}
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
  // Lookup typé : si un projet dans `data/projects.ts` n'a pas son pendant dans
  // le dict, TypeScript crie (les clés `items` sont dérivées du JSON).
  // `as keyof typeof dict.projects.items` évite un `any` ici sans sacrifier
  // la sécurité en pratique (on contrôle les deux côtés).
  const itemKey = project.slug as keyof typeof dict.projects.items;
  const itemCopy = dict.projects.items[itemKey];

  return (
    <Card as="article" className="flex h-full flex-col">
      <header>
        <p className="text-accent font-mono text-xs tracking-wider uppercase">
          {project.status === "shipped" ? dict.projects.statusShipped : dict.projects.statusComingSoon}
        </p>
        <h3 className="text-text mt-2 text-xl font-semibold">{itemCopy.title}</h3>
      </header>

      <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">{itemCopy.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border-border/70 text-text-muted rounded-md border px-2 py-0.5 font-mono text-[0.7rem]"
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

type LinksProps = {
  project: ShippedProject;
  title: string;
  dict: Dictionary;
};

function ProjectLinks({ project, title, dict }: LinksProps) {
  return (
    <ul className="border-border/70 mt-5 flex flex-wrap items-center gap-4 border-t pt-4 text-sm">
      {project.demoUrl && (
        <li>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-2 inline-flex items-center gap-1.5 transition-colors"
            aria-label={`${dict.projects.ariaDemo} ${title}`}
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
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
            className="text-text-muted hover:text-accent-2 inline-flex items-center gap-1.5 transition-colors"
            aria-label={`${dict.projects.ariaRepoFrontend} ${title}`}
          >
            <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
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
            className="text-text-muted hover:text-accent-2 inline-flex items-center gap-1.5 transition-colors"
            aria-label={`${dict.projects.ariaRepoBackend} ${title}`}
          >
            <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
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
            className="text-text-muted hover:text-accent-2 inline-flex items-center gap-1.5 transition-colors"
            aria-label={`${dict.projects.ariaRepo} ${title}`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.projects.links.repo}
          </a>
        </li>
      )}
    </ul>
  );
}
