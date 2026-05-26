/**
 * Textarea — Rétro Gaming style avec bordures pixelisées
 */

import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea(
  { id, label, error, className, required, rows = 5, ...rest },
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
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-full resize-y border-2 border-border bg-bg px-3 py-2 font-[family-name:var(--font-retro)] text-base text-text",
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
