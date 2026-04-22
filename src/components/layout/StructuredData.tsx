/**
 * JSON-LD — données structurées pour les moteurs de recherche.
 *
 * Google lit ce JSON dans un <script type="application/ld+json"> et peut
 * enrichir les résultats de recherche avec la photo, le job title, les liens
 * sociaux (panneau de connaissances).
 *
 * i18n :
 *  - `jobTitle` est traduit (FR vs EN) — influence la langue des résultats riches
 *  - `url` pointe vers la locale courante (pas la racine) pour que le crawler
 *    associe ce graph à la bonne page canonique
 *
 * Schéma utilisé : Person (https://schema.org/Person).
 */

import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function StructuredData({ locale, dict }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/photo.jpg`,
    jobTitle: dict.profile.role,
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
      // (pas d'input utilisateur).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
