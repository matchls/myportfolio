"use client";

/**
 * ContactForm — Rétro Gaming style
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
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
      setServerError(t.errorNetwork);
      setStatus("error");
    }
  });

  // Success state
  if (status === "success") {
    return (
      <div 
        className="border-4 border-accent-2 bg-accent-2/10 p-6"
        style={{ boxShadow: "4px 4px 0 var(--color-pixel-shadow)" }}
      >
        <p className="font-[family-name:var(--font-pixel)] text-xs uppercase text-accent-2">
          {">"} {t.successTitle}
        </p>
        <p className="mt-3 font-[family-name:var(--font-retro)] text-base text-text-muted">
          {t.successBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-accent underline underline-offset-4 transition-colors hover:text-accent-2"
        >
          {t.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Input
        id="contact-name"
        label={t.name}
        required
        autoComplete="name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        id="contact-email"
        label={t.email}
        type="email"
        required
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Textarea
        id="contact-message"
        label={t.message}
        required
        {...register("message")}
        error={errors.message?.message}
      />

      {/* Honeypot */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px]">
        <label>
          {t.honeypotLabel}
          <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </label>
      </div>

      {serverError && (
        <div 
          className="border-2 border-red-500 bg-red-500/10 p-3"
          style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
        >
          <p role="alert" className="font-[family-name:var(--font-pixel)] text-[0.5rem] uppercase text-red-500">
            {">"} Error: {serverError}
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="secondary"
        size="md"
        loading={status === "loading"}
        className="self-start"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {t.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            {t.send}
          </>
        )}
      </Button>
    </form>
  );
}
