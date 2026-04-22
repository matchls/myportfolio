/**
 * Contenu éditorial de Mathieu — source unique pour Hero, About, Footer, Contact.
 *
 * Séparé de `src/lib/constants.ts` (config technique) pour que le contenu reste
 * éditable sans toucher aux rouages du site.
 *
 * Règle d'or : si une phrase est affichée quelque part sur le site, elle vient d'ici
 * (ou de `skills.ts` / `projects.ts`). Aucun texte éditorial hardcodé dans les composants.
 */

import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Mathieu Chalès",
  role: "Développeur Fullstack Junior",
  location: "Paris · hybride",
  tagline:
    "Hier je travaillais le bois. Aujourd'hui je code. Toujours pour construire des choses qui servent.",

  // Paragraphes séparés par une ligne vide (rendu via split dans About.tsx).
  bio: `Pendant plusieurs années, j'ai travaillé le bois. Chaque pièce avait un usage, une contrainte, une raison d'être. Aujourd'hui j'ai transposé cette approche dans le code : construire des choses qui servent, qui tiennent, qu'on peut réparer.

Diplômé du bootcamp fullstack de La Capsule en mars 2026, je code principalement en TypeScript — côté web avec React / Next.js, côté mobile avec React Native, côté serveur avec Node.js. Je cherche un CDI, une alternance ou un CDD en région parisienne (hybride), dans une équipe qui prend le temps de bien faire.`,

  email: "mathieu.chales@gmail.com",
  cvPath: "/cv.pdf", // à déposer dans public/ à l'étape 8

  socials: {
    github: "https://github.com/MrPoussif",
    linkedin: "https://www.linkedin.com/in/chalesmathieu/",
  },
};
