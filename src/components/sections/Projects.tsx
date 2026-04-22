/**
 * Projects — liste des projets réalisés.
 *
 * Chaque projet est rendu via une <ProjectCard>. Pour un seul projet, on centre.
 * Pour 2+, on passe en grid 2 colonnes sur desktop.
 *
 * Union discriminée sur `status` :
 *  - "shipped"     : liens démo/repo affichés
 *  - "coming-soon" : badge "bientôt" à la place des liens (non utilisé pour l'instant)
 *
 * Pattern `narrowing` : TypeScript sait automatiquement que dans la branche
 * `status === "shipped"` les champs `demoUrl`, `repoUrl`, etc. existent.
 */

import { ExternalLink, Play } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import type { Project, ShippedProject } from "@/types";

export function Projects() {
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
        <span className="text-accent font-mono text-base">03.</span>Projets
      </h2>

      <div
        className={hasMultiple ? "mt-8 grid gap-6 md:grid-cols-2" : "mt-8 grid gap-6 md:max-w-2xl"}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article" className="flex h-full flex-col">
      <header>
        <p className="text-accent font-mono text-xs tracking-wider uppercase">
          {project.status === "shipped" ? "Projet livré" : "Bientôt"}
        </p>
        <h3 className="text-text mt-2 text-xl font-semibold">{project.title}</h3>
      </header>

      <p className="text-text-muted mt-3 flex-1 text-sm leading-relaxed">{project.description}</p>

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

      {project.status === "shipped" && <ProjectLinks project={project} />}
    </Card>
  );
}

function ProjectLinks({ project }: { project: ShippedProject }) {
  return (
    <ul className="border-border/70 mt-5 flex flex-wrap items-center gap-4 border-t pt-4 text-sm">
      {project.demoUrl && (
        <li>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-2 inline-flex items-center gap-1.5 transition-colors"
            aria-label={`Voir la démo vidéo de ${project.title}`}
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            Démo
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
            aria-label={`Code frontend de ${project.title} sur GitHub`}
          >
            <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Frontend
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
            aria-label={`Code backend de ${project.title} sur GitHub`}
          >
            <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Backend
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
            aria-label={`Code source de ${project.title} sur GitHub`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Repo
          </a>
        </li>
      )}
    </ul>
  );
}
