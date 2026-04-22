/**
 * Liste des projets affichés dans la section Projects.
 *
 * Structure : union discriminée `ShippedProject | ComingSoonProject` (voir src/types).
 * Quand Mathieu aura fini un nouveau projet, il suffit d'ajouter une entrée ici.
 *
 * L'ordre du tableau = l'ordre d'affichage (du plus important au moins important).
 */

import type { Project } from "@/types";

export const projects: readonly Project[] = [
  {
    slug: "alterago",
    status: "shipped",
    featured: true,
    title: "AlterAgo",
    description:
      "Application mobile de gamification du quotidien pour aider les séniors à rester motivés, en leur proposant des activités sous forme d'objectifs qui rapportent des points.",
    stack: [
      "React Native",
      "Expo",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Clerk",
      "Cloudinary",
    ],
    repoFrontendUrl: "https://github.com/MrPoussif/alterago-frontend",
    repoBackendUrl: "https://github.com/MrPoussif/alterago-backend",
    demoUrl: "https://youtube.com/shorts/PpKHmGU_0ew",
  },
] as const;
