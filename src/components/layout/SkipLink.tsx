/**
 * Lien "passer au contenu principal" — accessibilité clavier.
 *
 * Caché visuellement mais accessible aux lecteurs d'écran et à la navigation
 * clavier. Quand un utilisateur appuie sur Tab depuis le haut de la page,
 * ce lien est le premier focus-able — ça lui permet de sauter la nav et
 * d'atterrir directement dans <main>.
 *
 * Pattern `sr-only + focus:not-sr-only` : le lien n'apparaît qu'au focus clavier.
 * Une souris ne le verra jamais. C'est la convention WAI-ARIA.
 *
 * La cible #main correspond à l'attribut id="main" sur <main> dans page.tsx.
 */

export function SkipLink() {
  return (
    <a
      href="#main"
      className={[
        "sr-only",
        "focus:not-sr-only",
        "focus:bg-accent-2 focus:text-white",
        "focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "focus:rounded-md focus:px-4 focus:py-2 focus:font-medium",
        "focus:outline-none",
      ].join(" ")}
    >
      Aller au contenu principal
    </a>
  );
}
