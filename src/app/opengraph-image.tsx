/**
 * OG image dynamique — utilisée par Twitter, LinkedIn, iMessage, Slack, Discord
 * quand quelqu'un colle l'URL du site.
 *
 * Next détecte `app/opengraph-image.tsx` par convention et :
 *  1. Appelle cette fonction au build pour générer un PNG 1200×630
 *  2. L'ajoute automatiquement à `metadata.openGraph.images`
 *  3. Gère le caching + les URLs
 *
 * Sous le capot : next/og utilise Satori (rendu SVG depuis JSX) + resvg (SVG→PNG).
 * Les limitations sont strictes : seulement flex/block, pas de grid, pas de margin
 * collapsing, pas de texte riche. Mais largement assez pour une carte marketing.
 *
 * Si un jour on veut plusieurs variantes (une par langue, par projet...) :
 *  - Renommer en /opengraph-image/route.tsx avec export runtime
 *  - Ou créer des fichiers séparés par section
 */

import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

// Requis par next/og : indique la taille du canvas.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — Portfolio`;

export default async function Image() {
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
      {/* En-tête : logo MC + indicatif */}
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

      {/* Bloc central : nom + rôle */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: "32px",
            color: "#6fa56b",
            fontFamily: "monospace",
            marginBottom: "16px",
          }}
        >
          Bonjour, je suis
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
          {profile.role}
        </span>
      </div>

      {/* Bas de carte : tagline condensée + liseré orange */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            height: "4px",
            width: "80px",
            backgroundColor: "#e87a3f",
          }}
        />
        <span style={{ fontSize: "24px", color: "#5a6b5c" }}>
          Hier le bois, aujourd&apos;hui le code. · Paris · hybride
        </span>
      </div>
    </div>,
    size,
  );
}
