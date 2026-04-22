"use client";

/**
 * Bouton de bascule clair/sombre.
 *
 * - Icône soleil en mode clair, lune en mode sombre.
 * - Rendu bloqué tant que le composant n'est pas "mounted" pour éviter
 *   un mismatch d'hydratation (le serveur ne sait pas si l'utilisateur
 *   avait choisi "dark" dans une session précédente).
 * - Accessible : aria-label dynamique décrivant l'action à venir.
 *
 * i18n : les labels "Passer en mode clair/sombre" viennent du dict et sont
 * injectés depuis le Header (Server Component → Client Component via props).
 */

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  labels: {
    toLight: string;
    toDark: string;
  };
};

export function ThemeToggle({ className, labels }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- pattern documenté next-themes : le double render (placeholder → vrai bouton) est précisément ce qui évite le mismatch d'hydratation
    setMounted(true);
  }, []);

  // Placeholder pendant le server render pour réserver la place du bouton
  // (évite le décalage visuel à l'hydratation).
  if (!mounted) {
    return <div aria-hidden="true" className={cn("h-9 w-9 rounded-md", className)} />;
  }

  const isDark = resolvedTheme === "dark";
  const nextLabel = isDark ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={nextLabel}
      title={nextLabel}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md",
        "border-border text-text border",
        "hover:border-accent-2 hover:text-accent-2",
        "transition-colors duration-200",
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
