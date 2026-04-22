import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StructuredData } from "@/components/layout/StructuredData";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { DEFAULT_LOCALE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

import "./globals.css";

/**
 * Polices chargées via next/font — subset latin, self-hosted en prod.
 * Avantages : zéro layout shift (polices pré-chargées), pas de requête vers
 * fonts.google.com côté client, tree-shakable.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Mathieu Chalès" }],
  creator: "Mathieu Chalès",
  keywords: [
    "Mathieu Chalès",
    "développeur fullstack",
    "junior",
    "Paris",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "La Capsule",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: DEFAULT_LOCALE,
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    // L'image OG est générée automatiquement par app/opengraph-image.tsx.
    // Next la détecte via la convention de fichier et l'ajoute à openGraph.images.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

/**
 * Viewport séparé de metadata depuis Next 15+.
 * `themeColor` colore la barre d'URL mobile (Safari iOS, Chrome Android) :
 *  - en light : off-white crème (match --color-bg)
 *  - en dark  : gris-vert sombre
 * Les deux valeurs matchent exactement la palette globals.css.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a211b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `suppressHydrationWarning` : next-themes ajoute la classe .dark sur <html>
    // avant l'hydratation React (script inline). Pattern officiel next-themes.
    <html
      lang="fr"
      id="top"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SkipLink />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <StructuredData />
      </body>
    </html>
  );
}
