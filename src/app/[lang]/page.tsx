/**
 * Page d'accueil — single-page avec sections ancrées, déclinée par locale.
 *
 * 100% Server Component : aucun `"use client"` ici ni dans les sections pures.
 * Seuls le ThemeToggle et le LanguageToggle (dans le Header) + le ContactForm
 * sont des Client Components. C'est ce qui permet d'obtenir un score Lighthouse
 * perf élevé : la page est du HTML statique pré-rendu (au build grâce à
 * `generateStaticParams` dans layout.tsx), livré en quelques KB, hydraté juste
 * pour les 2 toggles et le formulaire.
 *
 * Les sections reçoivent leur `dict` en props (pas de context / pas de client).
 * Si une section n'avait besoin que de 2 clés, on pourrait passer les strings
 * directement — mais passer tout le slice garde la signature stable si on
 * ajoute une clé plus tard, sans refactor du call-site.
 *
 * Les `id` de section correspondent aux `anchor` de `NAV_ITEMS`.
 */

import { notFound } from "next/navigation";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Formation } from "@/components/sections/Formation";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8">
      <Hero dict={dict} />
      <About dict={dict} />
      <Skills dict={dict} />
      <Formation dict={dict} />
      <Projects dict={dict} />
      <Contact locale={lang} dict={dict} />
    </main>
  );
}
