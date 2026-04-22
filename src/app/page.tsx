/**
 * Page d'accueil — single-page avec sections ancrées.
 *
 * Étape 3 : squelette avec placeholders. Les vraies sections (Hero, About,
 * Skills, Projects, Contact) arrivent à l'étape 5. Les `id` HTML ici doivent
 * matcher les `anchor` de NAV_ITEMS (src/lib/constants.ts) pour la nav.
 */

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8">
      {/* Hero — premier bloc, pas d'id nav (scroll vers le haut via #top sur <html>) */}
      <section
        aria-labelledby="hero-heading"
        className="flex min-h-[60vh] flex-col justify-center py-16"
      >
        <h1 id="hero-heading" className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Mathieu Chalès
        </h1>
        <p className="text-accent mt-3 font-mono text-sm">Développeur Fullstack Junior</p>
        <p className="text-text-muted mt-6 max-w-xl">
          <span className="text-text">Hier je travaillais le bois. Aujourd&apos;hui je code.</span>{" "}
          Toujours pour construire des choses qui servent.
        </p>
      </section>

      <SectionPlaceholder id="about" number="01." title="À propos" />
      <SectionPlaceholder id="skills" number="02." title="Compétences" />
      <SectionPlaceholder id="projects" number="03." title="Projets" />
      <SectionPlaceholder id="contact" number="04." title="Contact" />
    </main>
  );
}

function SectionPlaceholder({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-border/70 scroll-mt-20 border-t py-16"
    >
      <h2 id={`${id}-heading`} className="flex items-baseline gap-3 text-2xl font-semibold">
        <span className="text-accent font-mono text-base">{number}</span>
        {title}
      </h2>
      <p className="text-text-muted mt-4">Section à venir à l&apos;étape 5.</p>
    </section>
  );
}
