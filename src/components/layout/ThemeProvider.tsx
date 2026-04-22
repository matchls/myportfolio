"use client";

/**
 * Wrapper autour de next-themes/ThemeProvider.
 *
 * Ce fichier est un Client Component (il consomme du React state via next-themes).
 * Il est monté une fois dans layout.tsx et englobe toute l'app pour que
 * n'importe quel descendant puisse utiliser `useTheme()`.
 *
 * Option `attribute="class"` : next-themes pose/retire la classe `.dark` sur <html>.
 * Couplé au @custom-variant dark de globals.css, ça pilote toutes nos couleurs.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
