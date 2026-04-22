/**
 * Types partagés de l'application.
 *
 * Rôle : centraliser les contrats de données (profil, projets, compétences,
 * formulaire de contact, nav). Importés depuis les composants et les fichiers
 * `src/data/*`.
 */

// ---------------------------------------------------------------------------
// Profil
// ---------------------------------------------------------------------------

/**
 * Informations identitaires + de contact affichées dans le portfolio.
 * Consommé par le Hero, l'About, le footer, et les liens sociaux.
 */
export type Profile = {
  name: string;
  role: string; // ex: "Développeur Fullstack Junior"
  location: string; // ex: "Paris · hybride"
  tagline: string;
  bio: string; // markdown/texte multi-ligne
  email: string;
  phone?: string;
  cvPath: string; // chemin dans /public, ex: "/cv.pdf"
  socials: SocialLinks;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  // extensible plus tard (twitter, bluesky, etc.) sans casser l'existant
};

// ---------------------------------------------------------------------------
// Compétences
// ---------------------------------------------------------------------------

/**
 * Catégories de compétences utilisées pour regrouper l'affichage.
 * `as const` garantit que les valeurs sont des types littéraux, pas juste `string`.
 */
export const SKILL_CATEGORIES = ["frontend", "backend", "mobile", "tools"] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export type Skill = {
  name: string; // "React", "Node.js"
  /**
   * Nom d'une icône lucide-react (ex: "Code2") OU chemin vers un SVG dans /public.
   * Optionnel — si absent, on affichera juste le nom.
   */
  icon?: string;
};

/**
 * Un groupe de compétences affiché ensemble (une "colonne" dans la section Skills).
 * Le `label` est le texte visible (localisable), `category` sert à l'identifier.
 */
export type SkillGroup = {
  category: SkillCategory;
  label: string; // "Frontend", "Backend", etc.
  skills: readonly Skill[];
};

// ---------------------------------------------------------------------------
// Projets
// ---------------------------------------------------------------------------

/**
 * Champs communs à tous les projets (shipped ou coming-soon).
 */
type ProjectBase = {
  slug: string; // identifiant unique pour la key React, ex: "alterago"
  title: string;
  description: string;
  stack: readonly string[]; // ["React Native", "Expo", "Redux"]
  /**
   * Image illustrative. Chemin dans /public (ex: "/images/alterago.png").
   * Optionnel pour les projets coming-soon.
   */
  image?: string;
  /**
   * Si vrai, la card peut être mise en avant (layout alterné "featured"
   * à la Brittany Chiang). Sinon traitement normal.
   */
  featured?: boolean;
};

/**
 * Projet livré — tous les liens sont disponibles.
 */
export type ShippedProject = ProjectBase & {
  status: "shipped";
  role?: string; // "Lead technique", "Contributeur"
  repoFrontendUrl?: string;
  repoBackendUrl?: string;
  repoUrl?: string; // si monorepo ou projet solo
  demoUrl?: string;
};

/**
 * Projet en cours / à venir — pas encore de liens, juste un pitch.
 */
export type ComingSoonProject = ProjectBase & {
  status: "coming-soon";
};

/**
 * Union discriminée : TypeScript narrower automatiquement selon `project.status`.
 * Exemple dans un composant :
 *   if (project.status === "shipped") { project.demoUrl // OK }
 *   else { project.demoUrl // erreur de compilation }
 */
export type Project = ShippedProject | ComingSoonProject;

// ---------------------------------------------------------------------------
// Formulaire de contact
// ---------------------------------------------------------------------------

/**
 * Shape des données POST envoyées à /api/contact.
 * Dérivé automatiquement du schéma Zod (source unique de vérité) :
 *   → src/lib/schemas/contact.ts
 * Si le schéma change (ajout d'un champ, règle modifiée), ce type suit sans duplication.
 */
export type { ContactFormValues } from "@/lib/schemas/contact";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

/**
 * Les ancres sont un sous-ensemble fixe (sections de la page d'accueil).
 * Littéral typé pour que le Header puisse lookup `dict.nav[anchor]` sans `any`.
 */
export type NavAnchor = "about" | "skills" | "projects" | "contact";

export type NavItem = {
  /** Numéro affiché en mono à la Brittany Chiang ("01.", "02."...) */
  number: string;
  /** Ancre CSS (id de la section cible), sans le `#`. Sert aussi de clé dans dict.nav. */
  anchor: NavAnchor;
};
