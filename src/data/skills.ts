/**
 * Compétences techniques groupées par catégorie.
 *
 * L'ordre des groupes dans le tableau = l'ordre d'affichage dans la section Skills.
 * L'ordre des skills dans chaque groupe = logique (du plus maîtrisé au plus périphérique,
 * ou par ordre naturel : HTML → CSS → JS → TS).
 *
 * `as const` sur les tableaux pour que TypeScript garde les types littéraux
 * (utile si jamais on veut faire du narrowing côté UI).
 */

import type { SkillGroup } from "@/types";

export const skillGroups: readonly SkillGroup[] = [
  {
    category: "frontend",
    label: "Frontend",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "backend",
    label: "Backend",
    skills: [{ name: "Node.js" }, { name: "Express" }, { name: "MongoDB" }, { name: "PostgreSQL" }],
  },
  {
    category: "mobile",
    label: "Mobile",
    skills: [{ name: "React Native" }, { name: "Expo" }],
  },
  {
    category: "tools",
    label: "Outils",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Figma" },
      { name: "Vercel" },
    ],
  },
] as const;
