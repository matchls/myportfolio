"use client";

/**
 * ProjectCard + ProjectModal — Client Components.
 *
 * Extracted from Projects.tsx so that Projects.tsx stays a Server Component.
 * Only the card interactivity (modal open/close, carousel navigation) lives
 * on the client.
 *
 * Modal behaviour:
 *  - Click card → open (only when screenshots exist)
 *  - Click backdrop → close
 *  - Escape / ArrowLeft / ArrowRight keyboard shortcuts
 *  - Body scroll locked while open
 *  - Links inside the card stop propagation so they still work independently
 */

import Image from "next/image";
import { Bot, ChevronLeft, ChevronRight, Sparkles, UserCheck, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries";
import type { AiLevel, Project, ShippedProject } from "@/types";

// ============================================================================
// ProjectCard
// ============================================================================

type CardProps = {
  project: Project;
  dict: Dictionary;
};

export function ProjectCard({ project, dict }: CardProps) {
  const itemKey = project.slug as keyof typeof dict.projects.items;
  const itemCopy = dict.projects.items[itemKey];
  const [modalOpen, setModalOpen] = useState(false);

  const hasScreenshots = (project.screenshots?.length ?? 0) > 0;
  const screenshotCount = project.screenshots?.length ?? 0;

  return (
    <>
      <article
        className={`group bg-primary-container border-[4px] border-primary hover:-translate-y-2 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,219,208,0.2)] flex flex-col ${hasScreenshots ? "cursor-pointer" : ""}`}
        onClick={() => hasScreenshots && setModalOpen(true)}
        role={hasScreenshots ? "button" : undefined}
        tabIndex={hasScreenshots ? 0 : undefined}
        onKeyDown={hasScreenshots ? (e) => e.key === "Enter" && setModalOpen(true) : undefined}
        aria-haspopup={hasScreenshots ? "dialog" : undefined}
      >
        {/* Screenshot — grayscale at rest, colour on hover */}
        {project.screenshots?.[0] && (
          <div className="relative h-48 overflow-hidden border-b-4 border-primary">
            <Image
              src={project.screenshots[0]}
              alt={itemCopy.title}
              width={400}
              height={200}
              className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
            {/* Screenshot count badge */}
            {screenshotCount > 1 && (
              <span className="absolute bottom-2 right-2 bg-primary/80 text-surface font-mono text-[10px] px-2 py-0.5 flex items-center gap-1">
                📷 {screenshotCount}
              </span>
            )}
          </div>
        )}

        {/* Inner body */}
        <div className="m-3 bg-surface border-2 border-primary/20 p-6 flex-grow flex flex-col">

          {/* Stack tags — first 2 */}
          <ul className="flex flex-wrap gap-2 mb-4" aria-label="Stack">
            {project.stack.slice(0, 2).map((tech) => (
              <li key={tech} className="bg-accent text-surface px-2 py-1 text-[10px] font-mono uppercase">
                {tech}
              </li>
            ))}
          </ul>

          {/* Title + AI badge — stop propagation on badge */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-xl text-text">{itemCopy.title}</h3>
            <span onClick={(e) => e.stopPropagation()}>
              <AiLevelBadge level={project.aiLevel} dict={dict} />
            </span>
          </div>

          {/* Description */}
          <p className="text-text-muted text-sm italic line-clamp-2 mb-4">
            {itemCopy.description}
          </p>

          <div className="flex-1" />

          {/* Links — stop propagation so they still navigate independently */}
          {project.status === "shipped" && (
            <span onClick={(e) => e.stopPropagation()}>
              <ProjectLinks project={project} title={itemCopy.title} dict={dict} />
            </span>
          )}

          {/* Click hint — only when card has screenshots */}
          {hasScreenshots && (
            <p className="mt-3 font-mono text-[10px] text-accent/50 group-hover:text-accent transition-colors">
              ↑ {dict.projects.modal.openHint}
            </p>
          )}
        </div>
      </article>

      {/* Modal — rendered outside the article flow */}
      {modalOpen && project.screenshots && (
        <ProjectModal
          screenshots={project.screenshots}
          title={itemCopy.title}
          description={itemCopy.modalDescription}
          dict={dict}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

// ============================================================================
// ProjectModal — carousel
// ============================================================================

type ModalProps = {
  screenshots: readonly string[];
  title: string;
  description?: string;
  dict: Dictionary;
  onClose: () => void;
};

function ProjectModal({ screenshots, title, description, dict, onClose }: ModalProps) {
  const [index, setIndex] = useState(0);
  const count = screenshots.length;
  const closeRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/80 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Modal panel */}
      <div
        className="relative bg-surface border-4 border-primary w-full max-w-3xl shadow-[12px_12px_0px_0px_rgba(6,27,14,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-primary text-surface w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
          aria-label={dict.projects.modal.close}
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Image */}
        <div className="relative aspect-video bg-primary-container overflow-hidden">
          <Image
            src={screenshots[index]}
            alt={`${title} — ${index + 1}/${count}`}
            fill
            className="object-contain"
          />
        </div>

        {/* Footer — counter + nav arrows */}
        <div className="flex items-center justify-between px-4 py-3 border-t-2 border-primary/20 bg-surface">
          {/* Prev */}
          <button
            onClick={prev}
            disabled={count <= 1}
            className="bg-primary-container text-surface px-3 py-1.5 font-mono text-xs hover:bg-accent transition-colors inline-flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={dict.projects.modal.prev}
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {dict.projects.modal.prev}
          </button>

          {/* Counter */}
          <span className="font-mono text-xs text-text-muted">
            {index + 1} / {count}
          </span>

          {/* Next */}
          <button
            onClick={next}
            disabled={count <= 1}
            className="bg-primary-container text-surface px-3 py-1.5 font-mono text-xs hover:bg-accent transition-colors inline-flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label={dict.projects.modal.next}
          >
            {dict.projects.modal.next}
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Project title + description */}
        <div className="px-6 py-4 border-t border-primary/10 space-y-2 max-h-40 overflow-y-auto">
          <p className="font-display text-lg text-text">{title}</p>
          {description && (
            <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// AiLevelBadge
// ============================================================================

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

// ============================================================================
// ProjectLinks
// ============================================================================

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
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaDemo} ${title}`}>
            {dict.projects.links.demo}
          </a>
        </li>
      )}
      {project.repoFrontendUrl && (
        <li>
          <a href={project.repoFrontendUrl} target="_blank" rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaRepoFrontend} ${title}`}>
            {dict.projects.links.frontend}
          </a>
        </li>
      )}
      {project.repoBackendUrl && (
        <li>
          <a href={project.repoBackendUrl} target="_blank" rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaRepoBackend} ${title}`}>
            {dict.projects.links.backend}
          </a>
        </li>
      )}
      {project.repoUrl && (
        <li>
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary transition-colors inline-block"
            aria-label={`${dict.projects.ariaRepo} ${title}`}>
            {dict.projects.links.repo}
          </a>
        </li>
      )}
    </ul>
  );
}
