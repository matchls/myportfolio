"use client";

/**
 * Formulaire de contact — Client Component.
 *
 * Pile :
 *  - React Hook Form pour l'état et la soumission
 *  - zodResolver pour la validation synchrone côté client (même schéma que l'API)
 *  - `fetch` vers /api/contact pour l'envoi
 *
 * États UX :
 *  - idle    : formulaire vide, prêt à remplir
 *  - loading : soumission en cours, bouton désactivé + aria-busy
 *  - success : message de succès, form reset
 *  - error   : message d'erreur, form reste rempli pour que l'utilisateur corrige/renvoie
 *
 * Pourquoi un Client Component ?
 *  - React Hook Form utilise `useState`, `useRef`, events → impossible en SC
 *  - La soumission est interactive (feedback en temps réel)
 *  - Le reste de la page reste Server : on isole l'interactivité au strict nécessaire
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CONTACT_API_ROUTE } from "@/lib/constants";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas/contact";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "", honeypot: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");
    setServerError(null);

    try {
      const res = await fetch(CONTACT_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        // Essaie de parser le JSON d'erreur, sinon message générique
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setServerError(data?.error ?? "Envoi impossible. Réessaie plus tard.");
        setStatus("error");
        return;
      }

      reset();
      setStatus("success");
    } catch {
      // Typiquement : réseau coupé, CORS, DNS
      setServerError("Problème réseau. Vérifie ta connexion et réessaie.");
      setStatus("error");
    }
  });

  // Succès : on remplace le formulaire par un message, avec possibilité d'en envoyer un autre
  if (status === "success") {
    return (
      <div className="border-accent/40 bg-accent/5 text-text rounded-md border p-6">
        <p className="font-semibold">Message envoyé ✓</p>
        <p className="text-text-muted mt-2 text-sm">
          Merci ! Je reviens vers toi dans les prochains jours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-accent-2 hover:text-accent-2/80 mt-4 text-sm underline underline-offset-2"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <Input
        id="contact-name"
        label="Nom"
        required
        autoComplete="name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        id="contact-email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Textarea
        id="contact-message"
        label="Message"
        required
        {...register("message")}
        error={errors.message?.message}
      />

      {/* Honeypot : caché en CSS, invisible pour humain, piégeant pour bot.
          tabindex=-1 et autocomplete=off pour être certain qu'aucun humain
          n'y tombe par accident via Tab ou autofill. */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px]">
        <label>
          Ne remplissez pas ce champ
          <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </label>
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-500">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={status === "loading"}
        className="self-start"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Envoi…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Envoyer
          </>
        )}
      </Button>
    </form>
  );
}
