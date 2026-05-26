/**
 * Input — Rétro Gaming style avec bordures pixelisées
 */

import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { id, label, error, className, required, ...rest },
  ref,
) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={id} 
        className="font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase tracking-wider text-text"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-accent">
            *
          </span>
        )}
      </label>
      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        className={cn(
          "h-10 w-full border-2 border-border bg-bg px-3 font-[family-name:var(--font-retro)] text-base text-text",
          "placeholder:text-text-muted/60",
          "transition-all duration-150",
          "focus:border-accent focus:outline-none",
          error && "border-red-500 focus:border-red-500",
          className,
        )}
        style={{ boxShadow: "3px 3px 0 var(--color-pixel-shadow)" }}
        {...rest}
      />
      {error && (
        <p 
          id={errorId} 
          role="alert" 
          className="font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase text-red-500"
        >
          {">"} {error}
        </p>
      )}
    </div>
  );
});
