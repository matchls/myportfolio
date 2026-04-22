# Portfolio — Mathieu Chalès

Personal portfolio for Mathieu Chalès, a junior fullstack developer based in Paris. Built as a single-page site with French and English versions, sharp SEO, a working contact form, and a dark mode that actually respects your system preference.

Live: [mathieuchales-portfolio.vercel.app](https://mathieuchales-portfolio.vercel.app)

---

## Tech stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** (strict mode, `noUnusedLocals`)
- **Tailwind CSS v4**
- **next-themes** for light / dark toggle
- **React Hook Form + Zod** for the contact form (shared schema between client and server)
- **Resend** for transactional email
- **Vercel** for hosting

---

## Architecture highlights

- **100% Server Components except where interactivity is strictly needed.** Only the theme toggle, language toggle, and contact form are Client Components. Everything else is static HTML pre-rendered at build time — which keeps the Lighthouse score high and the JS bundle minimal.
- **Native i18n without a library.** Routing by locale via `src/app/[lang]/` and `src/proxy.ts` (Next 16's rename of `middleware.ts`), server-only dictionary loading via `src/i18n/dictionaries.ts`. Locales: `fr` (default) and `en`. The `Dictionary` TypeScript type is **derived from `src/messages/fr.json`**, so if `en.json` drifts in shape, the build fails — the French file is the canonical schema.
- **Contact form with defense in depth.** Same Zod schema validates on the client and on the API route, plus rate limiting (3 req/min per IP), a CSS-hidden honeypot field for bots, and localized error messages + email subject based on the visitor's language.
- **SEO done right.** Per-locale metadata with `hreflang` alternates, a locale-aware `sitemap.xml` listing both `/fr` and `/en`, `robots.txt`, JSON-LD `Person` schema, and a dynamic Open Graph image generated per locale via `next/og` (Satori).
- **Accessibility.** Skip-to-content link, semantic landmarks, labeled nav, focus-visible toggles, and all icons marked `aria-hidden` since they're decorative.

---

## Project layout

```
src/
├── app/
│   ├── [lang]/               # Locale-scoped routes (/fr, /en)
│   │   ├── layout.tsx        # Async layout, generateMetadata per locale
│   │   ├── page.tsx          # Home page (single-page with anchored sections)
│   │   └── opengraph-image.tsx  # Dynamic OG image per locale
│   ├── api/contact/route.ts  # POST /api/contact — Resend + rate limit
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/               # Header, Footer, SkipLink, toggles, JSON-LD
│   ├── sections/             # Hero, About, Skills, Projects, Contact, ContactForm
│   └── ui/                   # Primitive Button, Card, Input, Textarea, Icons
├── data/                     # Non-translatable data (profile, skills, projects)
├── i18n/
│   ├── config.ts             # Locales, defaultLocale, isLocale type-guard
│   └── dictionaries.ts       # server-only dict loader
├── lib/                      # Constants, utils, rate-limiter, Zod schemas
├── messages/                 # fr.json, en.json — full translations
├── types/                    # Shared TS types
└── proxy.ts                  # Next 16 proxy (formerly middleware) — locale routing
```

---

## Getting started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn / bun — scripts use npm in examples)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/fr` or `/en` based on your `Accept-Language` header.

### Environment variables

Create `.env.local` at the project root:

```bash
# Destination inbox for contact form submissions
CONTACT_EMAIL_TO=you@example.com

# Resend API key (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
```

Without these, the contact form still validates and rate-limits but returns a 500 on send (logs the misconfiguration, keeps user content private).

---

## Scripts

| Command         | What it does                               |
|-----------------|--------------------------------------------|
| `npm run dev`   | Start the dev server (Turbopack)           |
| `npm run build` | Production build (also generates TS types) |
| `npm run start` | Serve the production build                 |
| `npm run lint`  | Run ESLint                                 |

---

## Adding a locale

1. Add the new code (e.g. `"es"`) to `locales` in `src/i18n/config.ts`. TypeScript will immediately flag every file that needs updating.
2. Create `src/messages/es.json` — copy `fr.json` and translate. The `Dictionary` type will enforce the exact same shape.
3. Add `es: "es-ES"` (or appropriate BCP 47) to `BCP47_BY_LOCALE` in `src/lib/constants.ts`.
4. Update the `hreflang` entries in `src/app/[lang]/layout.tsx` (`alternates.languages`) and the `sitemap.ts` (handled automatically via `locales`).
5. Consider whether 2 locales → 3+ needs a dropdown rather than a toggle in `src/components/layout/LanguageToggle.tsx`.

---

## Deployment

Hosted on [Vercel](https://vercel.com). The `main` branch auto-deploys. Set `CONTACT_EMAIL_TO` and `RESEND_API_KEY` in the Vercel project settings.

---

## License

MIT — code is open source. See the footer link on the site.
