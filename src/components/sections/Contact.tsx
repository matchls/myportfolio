/**
 * Contact — section finale.
 *
 * Server Component qui héberge le `<ContactForm>` (Client Component).
 * Structure : pitch + vrai formulaire + liens de secours (mailto, LinkedIn, GitHub).
 *
 * Pourquoi garder mailto même avec un formulaire ?
 *  - Accessibilité : certains utilisateurs (ex. lecteurs d'écran peu confortables
 *    avec les forms HTML) préfèrent copier-coller l'email
 *  - Robustesse : si l'API /api/contact tombe en rade (clé Resend expirée, quota
 *    atteint), le mailto marche toujours
 */

import { Mail } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
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

      <div className="mt-8 grid gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
        {/* Colonne gauche : formulaire */}
        <div>
          <p className="text-text-muted leading-relaxed">
            Je cherche un <span className="text-text">CDI, une alternance ou un CDD</span> en région
            parisienne (hybride). Si tu as un poste junior, une mission, ou juste envie
            d&apos;échanger sur un projet — écris-moi.
          </p>

          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        {/* Colonne droite : moyens alternatifs */}
        <aside aria-label="Autres moyens de contact" className="flex flex-col gap-4">
          <p className="text-accent-2 font-mono text-xs tracking-wider uppercase">Ou plus direct</p>

          <a
            href={`mailto:${profile.email}`}
            className="border-border text-text hover:border-accent-2 hover:text-accent-2 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {profile.email}
          </a>

          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-text hover:border-accent-2 hover:text-accent-2 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>

          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-text hover:border-accent-2 hover:text-accent-2 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </aside>
      </div>
    </section>
  );
}
