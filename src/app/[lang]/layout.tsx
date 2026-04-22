import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StructuredData } from "@/components/layout/StructuredData";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { BCP47_BY_LOCALE, SITE_URL } from "@/lib/constants";

import "../globals.css";

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

/**
 * `generateStaticParams` : Next pré-rend `/fr` et `/en` au build plutôt qu'à
 * la demande. Couplé à un Server Component pur, ça produit du HTML statique
 * servi par le CDN — le meilleur Lighthouse possible.
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Props = LayoutProps<"/[lang]">;

/**
 * Métadonnées par locale.
 *
 * - `alternates.canonical` pointe vers la version canonique (la locale courante)
 * - `alternates.languages` liste les hreflang pour que Google propose la bonne
 *   version selon la langue du visiteur (évite les duplicate content)
 * - `openGraph.locale` utilise BCP 47 long (fr-FR, en-US) et `alternateLocale`
 *   liste les autres versions disponibles
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.site.name,
      template: `%s · ${dict.site.name}`,
    },
    description: dict.site.description,
    authors: [{ name: "Mathieu Chalès" }],
    creator: "Mathieu Chalès",
    keywords: dict.site.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        fr: "/fr",
        en: "/en",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: BCP47_BY_LOCALE[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => BCP47_BY_LOCALE[l]),
      url: `${SITE_URL}/${lang}`,
      title: dict.site.name,
      description: dict.site.description,
      siteName: dict.site.name,
      // L'image OG est générée par app/[lang]/opengraph-image.tsx (par locale).
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.name,
      description: dict.site.description,
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
}

/**
 * Viewport séparé de metadata depuis Next 15+.
 * `themeColor` colore la barre d'URL mobile (Safari iOS, Chrome Android) :
 *  - en light : off-white crème (match --color-bg)
 *  - en dark  : gris-vert sombre
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

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const locale: Locale = lang;

  return (
    // `suppressHydrationWarning` : next-themes ajoute la classe .dark sur <html>
    // avant l'hydratation React (script inline). Pattern officiel next-themes.
    <html
      lang={locale}
      id="top"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SkipLink label={dict.a11y.skipToContent} />
          <Header locale={locale} dict={dict} />
          {children}
          <Footer locale={locale} dict={dict} />
        </ThemeProvider>
        <StructuredData locale={locale} dict={dict} />
      </body>
    </html>
  );
}
