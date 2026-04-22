/**
 * JSON-LD — données structurées pour les moteurs de recherche.
 *
 * Google lit ce JSON dans un <script type="application/ld+json"> et peut
 * enrichir les résultats de recherche avec la photo, le job title, les liens
 * sociaux (panneau de connaissances).
 *
 * Pourquoi Server Component + dangerouslySetInnerHTML ?
 *  - Le JSON doit sortir tel quel dans le HTML initial (crawlers, pas d'hydratation)
 *  - dangerouslySetInnerHTML est ici sans risque XSS car on contrôle 100% l'objet
 *    qui y est sérialisé (pas d'input utilisateur)
 *
 * Schéma utilisé : Person (https://schema.org/Person).
 */

import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/constants";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}/photo.jpg`,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    sameAs: [profile.socials.github, profile.socials.linkedin],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "React Native",
      "MongoDB",
      "PostgreSQL",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "La Capsule",
      url: "https://www.lacapsule.academy/",
    },
  };

  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML ici sans risque XSS : le payload est 100% contrôlé
      // (pas d'input utilisateur). La règle react/no-danger n'est pas active dans
      // notre config ESLint — on documente l'intention en commentaire.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
