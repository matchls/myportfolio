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
    aiLevel: "autonomous",
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
    screenshots: [
      "/images/alterago/screen-1.png",
      "/images/alterago/screen-2.png",
      "/images/alterago/screen-3.png",
      "/images/alterago/screen-4.png",
      "/images/alterago/screen-5.png",
      "/images/alterago/screen-6.png",
      "/images/alterago/screen-7.png",
    ],
    repoFrontendUrl: "https://github.com/MrPoussif/alterago-frontend",
    repoBackendUrl: "https://github.com/MrPoussif/alterago-backend",
    demoUrl: "https://youtube.com/shorts/PpKHmGU_0ew",
  },
  {
    slug: "picswipe",
    status: "shipped",
    featured: false,
    aiLevel: "assisted",
    title: "PicSwipe",
    description:
      "Application mobile Android de tri rapide de galerie photos par swipe — glisser à droite pour garder, à gauche pour supprimer. Organisation par mois, écran de revue avant suppression définitive, statistiques de nettoyage persistées.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Reanimated 4",
      "Gesture Handler",
      "Zustand",
      "AsyncStorage",
      "expo-media-library",
      "expo-haptics",
      "expo-linear-gradient",
    ],
    screenshots: [
      "/images/picswipe/screen-1.jpg",
      "/images/picswipe/screen-2.jpg",
      "/images/picswipe/screen-3.jpg",
      "/images/picswipe/screen-4.jpg",
    ],
  },
  {
    slug: "drglytics",
    status: "coming-soon",
    aiLevel: "assisted",
    title: "Drglytics",
    description:
      "Projet d'apprentissage fullstack centré sur le reverse engineering : parser les fichiers de sauvegarde binaires (format GVAS / Unreal Engine 4) du jeu Deep Rock Galactic pour en extraire des statistiques de joueur et les afficher dans un dashboard web. Le cœur est un parseur Python développé from scratch, qui décode structure par structure un format binaire non documenté.",
    stack: [
      "Python",
      "GVAS / Unreal Engine 4",
      "JSON",
      "Flask / FastAPI",
      "React",
      "Recharts",
    ],
    screenshots: [
      "/images/drglytics/screen-1.png",
      "/images/drglytics/screen-2.png",
      "/images/drglytics/screen-3.png",
      "/images/drglytics/screen-4.png",
      "/images/drglytics/screen-5.png",
      "/images/drglytics/screen-6.png",
    ],
  },
] as const;
