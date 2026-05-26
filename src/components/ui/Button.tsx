/**
 * Button — Rétro Gaming style avec effet 8-bit
 */

import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-white border-2 border-accent hover:translate-x-[-2px] hover:translate-y-[-2px]",
  secondary: "bg-accent-2 text-white border-2 border-accent-2 hover:translate-x-[-2px] hover:translate-y-[-2px]",
  ghost: "bg-transparent text-text border-2 border-border hover:border-accent hover:text-accent",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-8 px-3 text-[0.5rem] gap-1.5",
  md: "h-10 px-4 text-[0.55rem] gap-2",
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
        "inline-flex items-center justify-center font-[family-name:var(--font-pixel)] uppercase tracking-wider",
        "transition-all duration-150",
        "disabled:cursor-not-allowed disabled:opacity-60",
        // variant + size
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      style={{ boxShadow: "3px 3px 0 var(--color-pixel-shadow)" }}
      {...rest}
    >
      {children}
    </button>
  );
});
