import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
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
 * Polices Rétro Gaming :
 * - Press Start 2P : police 8-bit pixelisée pour les titres
 * - VT323 : police terminal rétro pour le texte lisible
 */
const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-retro",
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
    authors: [{ name: "Mathieu Châles" }],
    creator: "Mathieu Châles",
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
    { media: "(prefers-color-scheme: light)", color: "#f5f0e1" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
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
      className={`${pressStart2P.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg">
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
