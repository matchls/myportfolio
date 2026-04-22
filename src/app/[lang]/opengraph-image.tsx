/**
 * OG image dynamique par locale — utilisée par Twitter, LinkedIn, iMessage,
 * Slack, Discord quand quelqu'un colle l'URL du site.
 *
 * Colocation sous `[lang]/` : Next génère une image par locale avec les bons
 * textes (FR ou EN), et la référence automatiquement dans
 * `metadata.openGraph.images` de la page correspondante.
 *
 * Sous le capot : next/og utilise Satori (rendu SVG depuis JSX) + resvg (SVG→PNG).
 * Limitations strictes : flex/block uniquement, pas de grid, pas de margin
 * collapsing, pas de texte riche. Assez pour une carte marketing.
 */

import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { profile } from "@/data/profile";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Portfolio`;

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function Image({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  // Tagline condensée par locale — extrait court pour rentrer proprement sur la carte.
  const shortTagline =
    lang === "fr"
      ? "Hier le bois, aujourd'hui le code. · Paris · hybride"
      : "Yesterday wood, today code. · Paris · hybrid";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#fafaf5",
        fontFamily: "sans-serif",
      }}
    >
      {/* En-tête : logo MC */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#6fa56b",
            fontFamily: "monospace",
          }}
        >
          MC
        </span>
        <span
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#e87a3f",
            fontFamily: "monospace",
          }}
        >
          .
        </span>
      </div>

      {/* Bloc central : greeting + nom + rôle */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: "32px",
            color: "#6fa56b",
            fontFamily: "monospace",
            marginBottom: "16px",
          }}
        >
          {dict.hero.greeting}
        </span>
        <span
          style={{
            fontSize: "96px",
            fontWeight: 700,
            color: "#1c2b1e",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          {profile.name}.
        </span>
        <span
          style={{
            fontSize: "44px",
            fontWeight: 600,
            color: "#5a6b5c",
            letterSpacing: "-0.01em",
          }}
        >
          {dict.profile.role}
        </span>
      </div>

      {/* Bas de carte : tagline condensée + liseré orange */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ height: "4px", width: "80px", backgroundColor: "#e87a3f" }} />
        <span style={{ fontSize: "24px", color: "#5a6b5c" }}>{shortTagline}</span>
      </div>
    </div>,
    size,
  );
}
