"use client";

/**
 * ThemeToggle — Rétro Gaming style
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
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        aria-hidden="true" 
        className={cn("h-9 w-9 border-2 border-border", className)} 
        style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
      />
    );
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
        "inline-flex h-9 w-9 items-center justify-center",
        "border-2 border-border text-text",
        "hover:border-accent-2 hover:text-accent-2",
        "transition-all duration-150",
        "hover:translate-x-[-1px] hover:translate-y-[-1px]",
        className,
      )}
      style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
