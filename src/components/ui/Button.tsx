/**
 * Bouton réutilisable — 3 variants, 2 tailles.
 *
 * Variants :
 *  - `primary`   : orange chaleureux (accent-2) — pour les CTA forts (ex. "Me contacter")
 *  - `secondary` : vert feuille (accent) — action secondaire
 *  - `ghost`     : transparent, bordure au hover — liens discrets (ex. "voir le repo")
 *
 * Tailles :
 *  - `sm` : 32px de haut, texte xs — dans les cartes projets
 *  - `md` : 40px de haut, texte sm — CTA principal
 *
 * Utilisation :
 *  <Button variant="primary" size="md">Me contacter</Button>
 *  <Button asChild><a href="...">lien stylé en bouton</a></Button> ← non implémenté ici, YAGNI
 *
 * Accessibilité :
 *  - `type="button"` par défaut (sinon dans un <form>, un <button> submit par accident)
 *  - Le focus est géré globalement par `:focus-visible` dans globals.css
 *  - `aria-busy` si `loading`, et le bouton est désactivé
 */

import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent-2 text-white hover:bg-accent-2/90 border border-transparent",
  secondary: "bg-accent text-white hover:bg-accent/90 border border-transparent",
  ghost: "bg-transparent text-text border border-border hover:border-accent-2 hover:text-accent-2",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    className,
    children,
    disabled,
    type,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled ?? loading;

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        // base
        "inline-flex items-center justify-center rounded-md font-medium",
        "transition-colors duration-200",
        "disabled:cursor-not-allowed disabled:opacity-60",
        // variant + size
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
