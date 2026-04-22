/**
 * Contact — placeholder structurel pour le formulaire.
 *
 * Le formulaire fonctionnel (React Hook Form + Zod + Resend) arrive à l'étape 6.
 * Pour l'instant on affiche :
 *  - Un pitch court
 *  - Un lien mailto de secours (toujours utile, même avec un formulaire)
 *  - Les liens sociaux principaux
 *
 * Le <form> réel remplacera ce placeholder à l'étape 6, ce qui permettra à Mat
 * de voir la structure finale avant d'attaquer la logique.
 */

import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-border/70 scroll-mt-20 border-t py-16"
    >
      <h2
        id="contact-heading"
        className="text-text flex items-baseline gap-3 text-2xl font-semibold"
      >
        <span className="text-accent font-mono text-base">04.</span>Contact
      </h2>

      <div className="mt-8 max-w-xl">
        <p className="text-text-muted leading-relaxed">
          Je cherche un <span className="text-text">CDI, une alternance ou un CDD</span> en région
          parisienne (hybride). Si tu as un poste junior, une mission, ou juste envie
          d&apos;échanger sur un projet — écris-moi.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="bg-accent-2 hover:bg-accent-2/90 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-transparent px-4 text-sm font-medium text-white transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {profile.email}
          </a>

          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Mathieu Chalès"
            className="border-border text-text hover:border-accent-2 hover:text-accent-2 inline-flex h-10 w-10 items-center justify-center rounded-md border bg-transparent transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Mathieu Chalès"
            className="border-border text-text hover:border-accent-2 hover:text-accent-2 inline-flex h-10 w-10 items-center justify-center rounded-md border bg-transparent transition-colors"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <p className="text-text-muted/70 mt-6 font-mono text-xs">
          {/* Indice pédagogique : ce placeholder sera remplacé par le vrai formulaire à l'étape 6 */}
          Formulaire de contact détaillé à venir prochainement.
        </p>
      </div>
    </section>
  );
}
