/**
 * Textarea accessible — même contrat que Input mais pour les zones de texte.
 *
 * Utilisée dans le formulaire de contact pour le champ "message".
 *
 * Choix :
 *  - `rows={5}` par défaut (hauteur confortable pour un message, surchargeable)
 *  - `resize-y` : l'utilisateur peut agrandir verticalement seulement
 *    (resize horizontal casse souvent la mise en page)
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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-text text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent-2 ml-0.5">
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
          "bg-bg text-text border-border w-full resize-y rounded-md border px-3 py-2 text-sm",
          "placeholder:text-text-muted/70",
          "transition-colors duration-200",
          "focus:border-accent focus:outline-none",
          error && "border-red-500 focus:border-red-500",
          className,
        )}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});
