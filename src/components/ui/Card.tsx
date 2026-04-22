/**
 * Carte générique — conteneur avec bordure, padding et hover subtil.
 *
 * Utilisée pour :
 *  - les cartes de projets (avec hover qui fait ressortir la bordure en orange)
 *  - les items de compétences (groupés par catégorie)
 *
 * Polymorphisme léger : accepte une prop `as` pour rendre <article>, <li>, etc.
 * Par défaut : <div>. C'est volontairement minimaliste (pas de Card.Header /
 * Card.Body à la shadcn) — sur un portfolio avec 2-3 usages, la composition via
 * `children` + Tailwind suffit largement. YAGNI.
 *
 * La prop `interactive` ajoute le hover orange + cursor-pointer : à utiliser
 * uniquement quand la carte est elle-même cliquable (wrapper <a>).
 */

import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  interactive?: boolean;
  children: ReactNode;
};

export function Card({
  as: Component = "div",
  interactive = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Component
      className={cn(
        "border-border bg-bg rounded-lg border p-5",
        "transition-colors duration-200",
        interactive && "hover:border-accent-2 cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
