"use client";

/**
 * Formulaire de contact — Client Component.
 *
 * Pile :
 *  - React Hook Form pour l'état et la soumission
 *  - zodResolver pour la validation synchrone côté client (même fabrique que l'API)
 *  - `fetch` vers /api/contact pour l'envoi
 *
 * États UX :
 *  - idle    : formulaire vide, prêt à remplir
 *  - loading : soumission en cours, bouton désactivé + aria-busy
 *  - success : message de succès, form reset
 *  - error   : message d'erreur, form reste rempli pour que l'utilisateur corrige/renvoie
 *
 * i18n :
 *  - Les libellés et messages d'erreur viennent de `dict.contact.form.*`
 *  - La locale courante est envoyée dans le body POST pour que l'API puisse
 *    localiser le sujet de l'email + ses propres erreurs de validation
 *  - Le schéma Zod est RE-créé à chaque render avec les messages du dict courant —
 *    OK car useMemo le stabilise et les messages changent rarement (toggle langue)
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { CONTACT_API_ROUTE } from "@/lib/constants";
import { createContactFormSchema, type ContactFormValues } from "@/lib/schemas/contact";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function ContactForm({ locale, dict }: Props) {
  const t = dict.contact.form;

  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  // Stabilise le schéma tant que les messages ne changent pas (changement de
  // locale ou de dict). Évite de reconstruire Zod à chaque render.
  const schema = useMemo(() => createContactFormSchema(t.errors), [t.errors]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", honeypot: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    setServerError(null);

    try {
      const res = await fetch(CONTACT_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `locale` voyage avec le payload → l'API peut localiser son message d'erreur
        // et le sujet de l'email reçu par Mathieu.
        body: JSON.stringify({ ...values, locale }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setServerError(data?.error ?? t.errorGeneric);
        setStatus("error");
        return;
      }

      reset();
      setStatus("success");
    } catch {
      // Typiquement : réseau coupé, CORS, DNS
      setServerError(t.errorNetwork);
      setStatus("error");
    }
  });

  // Succès : on remplace le formulaire par un message, avec possibilité d'en envoyer un autre
  if (status === "success") {
    return (
      <div className="border-accent/40 bg-accent/10 text-surface border p-6">
        <p className="font-mono text-sm font-semibold">{t.successTitle} ✓</p>
        <p className="text-surface/70 mt-2 text-sm">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-accent-2 hover:text-accent-2/80 mt-4 font-mono text-xs underline underline-offset-2"
        >
          {t.successAgain}
        </button>
      </div>
    );
  }

  // Shared class presets for dark-on-primary-container inputs
  const LABEL_CLS = "font-mono text-xs uppercase tracking-widest text-surface/70";
  const INPUT_CLS =
    "w-full bg-primary border-0 border-b-2 border-accent/30 focus:border-accent-2 focus:ring-0 text-surface py-3 px-0 placeholder:opacity-30 rounded-none";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Input
        id="contact-name"
        label={t.name}
        required
        autoComplete="name"
        {...register("name")}
        error={errors.name?.message}
        labelClassName={LABEL_CLS}
        className={INPUT_CLS}
      />

      <Input
        id="contact-email"
        label={t.email}
        type="email"
        required
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
        labelClassName={LABEL_CLS}
        className={INPUT_CLS}
      />

      <Textarea
        id="contact-message"
        label={t.message}
        required
        {...register("message")}
        error={errors.message?.message}
        labelClassName={LABEL_CLS}
        className={INPUT_CLS + " resize-none"}
      />

      {/* Honeypot : caché en CSS, invisible pour humain, piégeant pour bot.
          tabindex=-1 et autocomplete=off pour être certain qu'aucun humain
          n'y tombe par accident via Tab ou autofill. */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px]">
        <label>
          {t.honeypotLabel}
          <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </label>
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-500">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading" || undefined}
        className="w-full bg-accent-2 text-primary font-bold py-4 animate-pulse-glow font-mono text-xs uppercase inline-flex items-center justify-center gap-2 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t.sending}
          </>
        ) : (
          t.send
        )}
      </button>
    </form>
  );
}
