/**
 * Input accessible pour formulaires.
 *
 * Contrat TS volontairement contraignant :
 *  - `label` est OBLIGATOIRE (pas moyen d'oublier l'accessibilité)
 *  - `id` est OBLIGATOIRE pour lier <label htmlFor> et <input id>
 *    (sinon on pourrait générer un useId, mais React Hook Form fournit déjà un name unique)
 *
 * Gestion d'erreur :
 *  - Si `error` est fourni, on affiche le message en rouge sous le champ
 *  - `aria-invalid` et `aria-describedby` sont branchés automatiquement
 *  - Les screen readers lisent alors l'erreur après le label
 *
 * forwardRef : indispensable pour React Hook Form qui passe une ref via { ...register(...) }
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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-text text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent-2 ml-0.5">
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
          "bg-bg text-text border-border h-10 w-full rounded-md border px-3 text-sm",
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
