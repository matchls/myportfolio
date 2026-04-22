/**
 * Page d'accueil — single-page avec sections ancrées.
 *
 * 100% Server Component : aucun `"use client"` ici ni dans les sections.
 * Le seul JS côté client est le ThemeToggle (dans le Header). C'est ce qui permet
 * d'obtenir un score Lighthouse perf élevé : la page est du HTML statique pré-rendu
 * au build, livré en quelques KB, hydraté juste pour le toggle de thème.
 *
 * Les `id` de section correspondent aux `anchor` de `NAV_ITEMS` (src/lib/constants.ts),
 * ce qui permet au Header de générer une nav correcte sans coupler la logique.
 */

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
