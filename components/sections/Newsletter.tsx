"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";
import { useSfx } from "@/components/delight/DelightProvider";
import { BeanPaw } from "@/components/ui/icons";
import { pop } from "@/lib/sound";

type State = "idle" | "sending" | "success" | "error";
type ErrorKey = "errorEmail" | "errorConsent" | "errorGeneric";

/** "Join the sock club" sign-up. On success a big toe-bean stamp lands on the card. */
export function Newsletter() {
  const t = useTranslations("Newsletter");
  const locale = useLocale();
  const sfx = useSfx();
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<ErrorKey | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const consent = form.get("consent") === "on";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("errorEmail");
    if (!consent) return fail("errorConsent");

    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent, locale, website: form.get("website") }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        return fail(
          data.error === "email"
            ? "errorEmail"
            : data.error === "consent"
              ? "errorConsent"
              : "errorGeneric",
        );
      }
      setState("success");
      sfx(() => pop(520));
    } catch {
      fail("errorGeneric");
    }
  };

  const fail = (key: ErrorKey) => {
    setState("error");
    setError(key);
  };

  return (
    <section className="section-night paper-grain" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-blob bg-sock-white p-7 text-tabby-spot shadow-xl sm:p-10">
          <BeanPaw className="absolute -top-6 -right-6 h-28 w-28 rotate-12 opacity-30" />
          <h2 id={`${id}-title`} className="text-3xl font-semibold sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-lg text-tabby-brown">{t("body")}</p>

          {state === "success" ? (
            <div className="relative mt-8 flex items-center gap-5" role="status">
              <BeanPaw className="paw-stamp h-20 w-20 shrink-0" />
              <div>
                <p className="font-display text-2xl font-semibold">{t("success")}</p>
                <p className="text-tabby-brown">{t("successBody")}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-8 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor={`${id}-email`} className="sr-only">
                  {t("email")}
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder={t("placeholder")}
                  aria-invalid={error === "errorEmail" || undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className="min-h-12 flex-1 rounded-full border-2 border-tabby-brown/30 bg-sock-white px-5 text-tabby-spot placeholder:text-tabby-brown/60 focus:border-tabby-spot"
                />
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="paw-press bean-press relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-bean-pink px-7 font-display font-semibold text-night hover:bg-bean-pink-deep disabled:opacity-70"
                >
                  <span className="paw-press-stamp" aria-hidden="true">
                    <BeanPaw className="h-full w-full" />
                  </span>
                  <BeanPaw className="h-5 w-5" />
                  {state === "sending" ? t("sending") : t("submit")}
                </button>
              </div>
              {/* honeypot for bots: hidden from people and screen readers */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />
              <label className="flex items-start gap-3 text-sm text-tabby-brown">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  aria-invalid={error === "errorConsent" || undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-tabby-spot"
                />
                {t("consent")}
              </label>
              <p
                id={`${id}-error`}
                role="alert"
                className="min-h-5 text-sm font-semibold text-alert"
              >
                {error ? t(error) : ""}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
