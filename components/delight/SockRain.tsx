"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, type CSSProperties } from "react";
import { SockIcon } from "@/components/ui/icons";
import { meow } from "@/lib/sound";
import { useDelight, useSfx } from "./DelightProvider";

const SECRET = ["corap", "çorap"];
const SOCKS = 28;

/**
 * Easter egg: type "corap" (or "çorap") anywhere outside a text field and it
 * rains socks. Calm / reduced motion get a quiet toast instead.
 */
export function SockRain() {
  const t = useTranslations("Easter");
  const { motionOK } = useDelight();
  const sfx = useSfx();
  const [run, setRun] = useState(0);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const el = e.target;
      const typingInField =
        el instanceof Element && el.closest("input, textarea, select, [contenteditable='true']");
      if (typingInField || e.key.length !== 1) return;
      typed = (typed + e.key.toLocaleLowerCase("tr")).slice(-6);
      if (SECRET.some((w) => typed.endsWith(w))) {
        typed = "";
        sfx(meow);
        setToast(true);
        if (motionOK) setRun((n) => n + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [motionOK, sfx]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(false), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (!run) return;
    const id = window.setTimeout(() => setRun(0), 4200);
    return () => window.clearTimeout(id);
  }, [run]);

  return (
    <>
      {run > 0 && (
        <div
          key={run}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
        >
          {Array.from({ length: SOCKS }, (_, i) => (
            <SockIcon
              key={i}
              className="sock-drop absolute -top-16 h-12 w-12"
              style={
                {
                  left: `${(i / SOCKS) * 100 + Math.random() * 3}%`,
                  "--delay": `${Math.random() * 1.2}s`,
                  "--dur": `${1.8 + Math.random() * 1.4}s`,
                  "--spin": `${(Math.random() - 0.5) * 720}deg`,
                  "--drift": `${(Math.random() - 0.5) * 120}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
      <div
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4"
      >
        {toast && (
          <p className="rounded-full bg-night px-5 py-2.5 font-display font-semibold text-sock-white shadow-lg">
            🧦 {t("sockRain")}
          </p>
        )}
      </div>
    </>
  );
}
