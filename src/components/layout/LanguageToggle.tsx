"use client";

/**
 * LanguageToggle — Rétro Gaming style
 */

import { usePathname, useRouter } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

type Props = {
  className?: string;
  currentLocale: Locale;
  labels: {
    toFr: string;
    toEn: string;
  };
};

export function LanguageToggle({ className, currentLocale, labels }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale: Locale = locales.find((l) => l !== currentLocale) ?? currentLocale;
  const nextLabel = nextLocale === "fr" ? labels.toFr : labels.toEn;

  function switchLocale() {
    const newPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, `/${nextLocale}`);
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
    router.push(newPath);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={nextLabel}
      title={nextLabel}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center px-2",
        "border-2 border-border font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-text",
        "hover:border-accent hover:text-accent",
        "transition-all duration-150",
        "hover:translate-x-[-1px] hover:translate-y-[-1px]",
        className,
      )}
      style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
    >
      {nextLocale}
    </button>
  );
}
