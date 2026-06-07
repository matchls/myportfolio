# Plan de migration — Nouveau design Stitch

> Ce document est à injecter dans Claude Code.
> Chaque issue est indépendante et dans l'ordre recommandé d'implémentation.
> Toutes les modifications sont dans `src/` — la structure Next.js, le routing i18n, et les fichiers de données (`profile.ts`, `projects.ts`, `skills.ts`) ne changent PAS.

---

## Contexte du projet

- **Framework** : Next.js 16 + TypeScript + Tailwind CSS v4
- **i18n** : routing `[lang]` avec dictionnaires `src/messages/fr.json` et `en.json`
- **Thème** : dark mode via `next-themes` (class-based), toggle existant à conserver
- **Norme** : camelCase, commentaires en anglais
- **Design source** : Stitch (HTML/CSS exporté) — palette forêt sombre, typo éditoriale, style "pixel-border" rétro

### Palette du nouveau design

| Token          | Valeur hex  | Rôle                                      |
|----------------|-------------|-------------------------------------------|
| `primary`      | `#061b0e`   | Fond sombre (header, footer, contact)     |
| `primary-container` | `#1b3022` | Fond cartes sombres                    |
| `accent`       | `#56642b`   | Vert olive — accent principal             |
| `surface`      | `#fbf9f5`   | Blanc cassé — fond clair                  |
| `accent-2`     | `#ffdbd0`   | Pêche crème — CTA, highlights             |

### Typographie

| Usage          | Police          |
|----------------|-----------------|
| Titres display | Newsreader      |
| Corps de texte | Be Vietnam Pro  |
| Labels/mono    | JetBrains Mono  |

---

## Issue #1 — Fondations CSS : palette, polices, animations globales

**Fichiers** : `src/app/globals.css` + `src/app/[lang]/layout.tsx`

### globals.css

Remplacer les tokens existants. Garder `@custom-variant dark` et `@theme inline`.

**`:root` (light mode) :**
```css
:root {
  --color-bg: #fbf9f5;
  --color-text: #1b1c1a;
  --color-text-muted: #434843;
  --color-accent: #56642b;
  --color-accent-2: #ffdbd0;
  --color-border: #c3c8c1;
  --color-primary: #061b0e;
  --color-primary-container: #1b3022;
  --color-surface: #fbf9f5;
  --color-surface-container: #efeeea;
  --color-glow: rgba(255, 219, 208, 0.35);
}
```

**`.dark` :**
```css
.dark {
  --color-bg: #0f1a11;
  --color-text: #e4e2de;
  --color-text-muted: #a8b0a8;
  --color-accent: #8aab87;
  --color-accent-2: #ffdbd0;
  --color-border: #2a352c;
  --color-primary: #d0e9d4;
  --color-primary-container: #1b3022;
  --color-surface: #1a211b;
  --color-surface-container: #1f2820;
  --color-glow: rgba(255, 219, 208, 0.2);
}
```

**`@theme inline` :**
```css
@theme inline {
  --color-bg: var(--color-bg);
  --color-text: var(--color-text);
  --color-text-muted: var(--color-text-muted);
  --color-accent: var(--color-accent);
  --color-accent-2: var(--color-accent-2);
  --color-border: var(--color-border);
  --color-primary: var(--color-primary);
  --color-primary-container: var(--color-primary-container);
  --color-surface: var(--color-surface);
  --color-surface-container: var(--color-surface-container);

  --font-display: "Newsreader", Georgia, serif;
  --font-sans: "Be Vietnam Pro", ui-sans-serif, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

**Nouvelles classes utilitaires (ajouter après les tokens) :**
```css
.pixel-border {
  box-shadow: 0 -4px 0 0 #56642b, 0 4px 0 0 #56642b, -4px 0 0 0 #56642b, 4px 0 0 0 #56642b;
}

.pixel-border-heavy {
  box-shadow: 0 -6px 0 0 #1b3022, 0 6px 0 0 #1b3022, -6px 0 0 0 #1b3022, 6px 0 0 0 #1b3022, 6px 6px 0 0 rgba(6,27,14,0.4);
}

.mossy-divider {
  height: 8px;
  background-image: linear-gradient(90deg, #56642b 25%, transparent 25%, transparent 50%, #56642b 50%, #56642b 75%, transparent 75%, transparent 100%);
  background-size: 16px 8px;
  width: 100%;
}

@keyframes floatEmber {
  0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
  20%  { opacity: 0.8; }
  80%  { opacity: 0.8; }
  100% { transform: translateY(-100px) translateX(20px) scale(0); opacity: 0; }
}

.ember {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffdbd0;
  box-shadow: 0 0 8px #ffdbd0;
  pointer-events: none;
  border-radius: 50%;
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0px 0px rgba(255,219,208,0); }
  50%       { box-shadow: 0 0 15px 4px rgba(255,219,208,0.4); }
}
.animate-pulse-glow { animation: pulseGlow 3s infinite; }

@keyframes sway {
  0%, 100% { transform: rotate(-1deg); }
  50%       { transform: rotate(1deg); }
}
.animate-sway { animation: sway 6s ease-in-out infinite; transform-origin: bottom center; }
```

**Garder** : `.hero-dots`, `.hero-enter`, `.hero-caret`, `.animate-in-wrapper`, `@media (prefers-reduced-motion)` (ajouter `.animate-sway` et `.animate-pulse-glow` dans la règle reduced-motion).

### layout.tsx — remplacer Geist par les 3 nouvelles polices

```tsx
import { Newsreader, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";

const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const beVietnamPro = Be_Vietnam_Pro({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-mono", display: "swap" });
```

Sur `<html>` : `className={`${newsreader.variable} ${beVietnamPro.variable} ${jetbrainsMono.variable}`}`
Sur `<body>` : `className="font-sans"`

---

## Issue #2 — Header : fond sombre, nav pixel, bouton FR/EN

**Fichiers** : `src/components/layout/Header.tsx` + `src/components/layout/NavLinks.tsx`

**Header wrapper** : `bg-primary border-b-2 border-accent shadow-[4px_4px_0px_0px_rgba(6,27,14,0.4)] sticky top-0 z-40`
(Supprimer `backdrop-blur-md`)

**Logo** : `font-display text-xl text-surface tracking-tight`

**Liens nav** :
- Inactifs : `font-mono text-xs text-surface/70 hover:text-surface hover:translate-x-0.5 hover:translate-y-0.5 transition-all`
- Actif (Hero) : ajouter `text-accent-2 font-bold border-b-2 border-dotted border-accent-2 pb-1`

**Bouton langue** : `font-mono text-xs text-surface border border-surface/40 px-3 py-1 hover:bg-primary-container transition-colors`

**ThemeToggle** : icône `text-surface`, hover `text-accent-2`

---

## Issue #3 — Hero : badge, typo display, boutons pixel-border

**Fichier** : `src/components/sections/Hero.tsx`

**Badge** (nouveau, au-dessus du h1) :
```tsx
<div className="inline-block px-4 py-2 bg-accent text-surface font-mono text-xs mb-6 pixel-border tracking-widest uppercase">
  {dict.hero.badge}
</div>
```

**h1** : `font-display text-6xl md:text-8xl text-text mb-4 tracking-tighter`
(Supprimer le dégradé `bg-gradient-to-r bg-clip-text text-transparent`)

**Sous-titre** : `font-display text-2xl md:text-3xl text-accent italic mb-6`

**CTA primaire** :
```tsx
<a href="#projects" className="bg-primary-container text-surface px-8 py-4 font-mono text-xs pixel-border-heavy hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 inline-flex items-center gap-2">
  {dict.hero.ctaProjects}
</a>
```

**CTA secondaire** :
```tsx
<a href="#contact" className="bg-surface border-2 border-accent text-accent px-8 py-4 font-mono text-xs hover:bg-accent hover:text-surface transition-all inline-flex items-center gap-2">
  {dict.hero.ctaContact}
</a>
```

**Flèche scroll-down** (nouveau, en bas de section — la section doit être `relative min-h-[100vh]`) :
```tsx
<div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
  <svg className="text-accent w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</div>
```

**Dicts** : ajouter `"badge": "L'ORÉE DU BOIS"` (fr) et `"badge": "FOREST'S EDGE"` (en) dans la clé `hero`.

---

## Issue #4 — Diviseur "mossy" entre sections

**Fichier** : `src/app/[lang]/page.tsx`

```tsx
<About dict={dict} />
<div className="mossy-divider" aria-hidden="true" />
<Projects dict={dict} />
```

---

## Issue #5 — About : layout 2 colonnes avec info-card et citation

**Fichier** : `src/components/sections/About.tsx`

Supprimer la photo. Passer en `grid [7fr_5fr]`.

**Colonne gauche — texte bio** :
```tsx
<div className="bg-surface p-8 md:p-12 border-2 border-accent relative overflow-hidden">
  <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl select-none" aria-hidden="true">📖</div>
  <h2 className="font-display text-2xl text-text mb-8 border-b-4 border-accent/20 pb-4">{dict.about.heading}</h2>
  <div className="space-y-6 text-text-muted leading-relaxed">
    {dict.profile.bioParagraphs.map((p, i) => <BoldParagraph key={i} text={p} />)}
  </div>
</div>
```

**Colonne droite — info-card + citation** :
```tsx
<div className="space-y-6">
  <div className="bg-accent text-surface p-8 pixel-border">
    <h3 className="font-mono text-xs uppercase tracking-widest mb-6 border-b border-surface/30 pb-2">
      {dict.about.infoTitle}
    </h3>
    <dl className="space-y-4 font-mono text-xs">
      <div className="flex justify-between"><dt className="opacity-70">{dict.about.roleLabel}</dt><dd className="font-bold">{dict.profile.role}</dd></div>
      <div className="flex justify-between"><dt className="opacity-70">{dict.about.locationLabel}</dt><dd className="font-bold">{profile.location}</dd></div>
      <div className="flex justify-between"><dt className="opacity-70">{dict.about.availabilityLabel}</dt><dd className="bg-primary-container px-2 py-0.5 text-[10px] uppercase">{dict.about.availabilityStatus}</dd></div>
      <div className="flex justify-between"><dt className="opacity-70">{dict.about.interestsLabel}</dt><dd className="font-bold">{profile.interests}</dd></div>
    </dl>
  </div>
  <blockquote className="bg-[#5d4037] text-surface p-6 border-2 border-accent shadow-[8px_8px_0px_0px_#1b1c1a]">
    <p className="text-sm italic">{dict.about.quote}</p>
  </blockquote>
</div>
```

**`profile.ts`** : ajouter `location: "Bordeaux, France"` et `interests: "IA, WebGL, UX"`.

**Dicts** (ajouter dans la clé `about`) :
- fr : `infoTitle`, `roleLabel`, `locationLabel`, `availabilityLabel`, `availabilityStatus`, `interestsLabel`, `quote`
- en : idem en anglais
- Voir valeurs dans le screenshot Stitch pour les libellés exacts.

---

## Issue #6 — Projects : cartes sombres avec image + tags colorés

**Fichier** : `src/components/sections/Projects.tsx`

**Wrapper carte** :
```
group bg-primary-container border-[4px] border-primary hover:-translate-y-2 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,219,208,0.2)] flex flex-col
```

**Zone image** (si `project.screenshots[0]` existe) :
```tsx
<div className="h-48 overflow-hidden border-b-4 border-primary">
  <Image src={project.screenshots[0]} alt={itemCopy.title} width={400} height={200}
    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
</div>
```

**Corps** (`m-3 bg-surface border-2 border-primary/20 p-6 flex-grow flex flex-col`) :
- Tags : `bg-accent text-surface px-2 py-1 text-[10px] font-mono uppercase` (2 premiers de `project.stack`)
- Titre : `font-display text-xl text-text`
- Description : `text-text-muted text-sm italic line-clamp-2`
- Boutons liens : `bg-accent text-surface px-3 py-2 font-mono text-[10px] font-bold hover:bg-primary border-b-2 border-primary`

**Heading section** : ajouter eyebrow `font-mono text-xs text-accent uppercase tracking-widest` au-dessus du `<h2>`.
Ajouter dans les dicts : `"eyebrow": "Réalisations"` / `"eyebrow": "Projects"`.

---

## Issue #7 — Skills : cartes bordure basse colorée

**Fichier** : `src/components/sections/Skills.tsx`

**Heading** : centré, `font-display text-5xl` + sous-titre (`text-text-muted`).
Ajouter dans les dicts : `"subheading": "Collection des outils..."`.

**Grille** : `lg:grid-cols-3`.

**Carte** : `bg-surface p-6 border-b-4 [couleur selon catégorie]`
- frontend → `border-accent`
- backend → `border-[#5d4037]`
- tools → `border-accent-2`

**Tags skills** : `px-3 py-1 bg-surface-container border border-accent/20 text-xs font-mono hover:bg-accent/10`

Ajouter des helpers locaux `borderColorByCategory` et `iconByCategory` (emoji ou SVG simple).

---

## Issue #8 — Formation : cartes style cohérent

**Fichier** : `src/components/sections/Formation.tsx`

Cartes : `bg-surface border-2 border-accent/30 p-6 hover:border-accent transition-colors shadow-[4px_4px_0px_0px_rgba(86,100,43,0.15)]`
Titre carte : `font-display text-xl text-text`
Heading section : `font-display text-5xl` avec numéro `font-mono text-accent`

---

## Issue #9 — Contact : section fond sombre + formulaire dark

**Fichiers** : `src/components/sections/Contact.tsx` + `src/components/sections/ContactForm.tsx`

**Section** : `py-24 bg-primary text-surface relative overflow-hidden scroll-mt-20`

Ajouter un `<div id="contact-particles" className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />` (rempli en Issue #11).

**Heading** : centré, `font-display text-5xl text-surface`, précédé d'une flamme 🔥 (`text-accent-2 text-6xl`).

**Wrapper formulaire** : `bg-primary-container p-8 md:p-12 border-2 border-accent shadow-[12px_12px_0px_0px_rgba(6,27,14,0.6)]`

**Inputs/textarea** : `w-full bg-primary border-0 border-b-2 border-accent/30 focus:border-accent-2 focus:ring-0 text-surface py-3 px-0 placeholder:opacity-30`

**Labels** : `font-mono text-xs uppercase tracking-widest text-surface/70`

**Bouton submit** : `w-full bg-accent-2 text-primary font-bold py-4 animate-pulse-glow font-mono text-xs uppercase`

**Liens sociaux** : bandeau en bas de section, `text-surface hover:text-accent-2`.
Supprimer la colonne `<aside>` existante.

---

## Issue #10 — Footer : fond sombre

**Fichier** : `src/components/layout/Footer.tsx`

```
bg-primary border-t-4 border-accent py-12
```
Nom : `font-display text-2xl text-surface`
Copyright : `font-sans text-sm text-surface/60`
Liens : `text-surface/60 hover:text-accent-2 font-mono text-xs`

---

## Issue #11 — ParticleEmitter : Client Component

**Nouveau fichier** : `src/components/ui/ParticleEmitter.tsx`

```tsx
"use client";
import { useEffect, useRef } from "react";

type Props = { containerId: string; count?: number };

export function ParticleEmitter({ containerId, count = 12 }: Props) {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const ember = document.createElement("div");
      ember.className = "ember";
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.bottom = `${Math.random() * 20}%`;
      ember.style.animationName = "floatEmber";
      ember.style.animationDuration = `${3 + Math.random() * 4}s`;
      ember.style.animationDelay = `${Math.random() * 5}s`;
      ember.style.animationTimingFunction = "linear";
      ember.style.animationIterationCount = "infinite";
      container.appendChild(ember);
    }
    return () => { container.innerHTML = ""; };
  }, [containerId, count]);
  return null;
}
```

**Intégration dans Contact.tsx** : créer un petit `ContactParticles.tsx` (`"use client"`) qui importe et rend `<ParticleEmitter containerId="contact-particles" count={15} />`. L'importer dans le Server Component `Contact.tsx`. Cela évite de passer tout Contact en client.

---

## Ordre d'implémentation recommandé

```
#1  CSS global + polices     ← fondation obligatoire
#2  Header
#3  Hero
#4  Diviseur mossy           ← 2 min, gros effet
#5  About
#6  Projects                 ← le plus long
#7  Skills
#8  Formation
#9  Contact
#10 Footer
#11 Particules JS            ← finitions en dernier
```

---

## Points d'attention pour Claude Code

1. **Ne pas modifier** `src/data/*.ts`, `src/i18n/config.ts`, ni le routing Next.js — sauf `layout.tsx` pour les polices.
2. **Mettre à jour `fr.json` et `en.json`** en même temps que les composants qui utilisent les nouvelles clés i18n.
3. **Pas de `any`** — typer toutes les nouvelles props.
4. **Un commit par issue** : `feat: issue#N description courte`.
5. **`npm run dev`** après chaque issue pour valider visuellement.
6. Vérifier que `bg-surface-container` est bien généré par Tailwind après l'Issue #1 (dépend de l'exposition dans `@theme inline`).
