"use client";

import { useTranslations } from "next-intl";
import { useDelight } from "./DelightProvider";

type Key = "sound" | "calm" | "cursor";

/** Sound / calm / cursor toggles. `compact` = icon buttons (header), else labelled rows (mobile menu). */
export function PrefsControls({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("Prefs");
  const prefs = useDelight();
  const keys: Key[] = compact ? ["sound", "calm", "cursor"] : ["sound", "calm"];

  return (
    <div
      role="group"
      aria-label={t("group")}
      className={compact ? "flex items-center gap-1" : "grid gap-1"}
    >
      {keys.map((k) => {
        const on = prefs[k];
        return (
          <button
            key={k}
            type="button"
            aria-pressed={on}
            onClick={() => prefs.toggle(k)}
            title={`${t(k)} — ${t(`${k}Hint`)}`}
            className={
              compact
                ? `bean-press grid h-10 w-10 place-items-center rounded-full transition-colors ${
                    on
                      ? "bg-sock-white/15 text-bean-pink"
                      : "text-sock-white/75 hover:text-sock-white"
                  } ${k === "cursor" ? "hidden lg:grid" : ""}`
                : "flex items-center justify-between gap-4 rounded-xl px-2 py-3 text-left"
            }
          >
            {compact ? (
              <span className="sr-only">{t(k)}</span>
            ) : (
              <span>
                <span className="block font-display text-lg font-medium">{t(k)}</span>
                <span className="block text-sm text-sock-white/70">{t(`${k}Hint`)}</span>
              </span>
            )}
            <PrefIcon k={k} on={on} />
          </button>
        );
      })}
    </div>
  );
}

function PrefIcon({ k, on }: { k: Key; on: boolean }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      {k === "sound" && (
        <>
          {/* paw speaker */}
          <g fill="currentColor">
            <ellipse cx="4.5" cy="9" rx="1.6" ry="2" />
            <ellipse cx="7.5" cy="6.2" rx="1.6" ry="2.1" />
            <ellipse cx="11" cy="6.2" rx="1.6" ry="2.1" />
            <path d="M8.6 10.2c-2.4 0-4.6 2.6-4.6 4.7 0 1.6 1.2 2.3 2.6 2.3.9 0 1.4-.4 2-.4s1.1.4 2 .4c1.4 0 2.6-.7 2.6-2.3 0-2.1-2.2-4.7-4.6-4.7Z" />
          </g>
          {on ? (
            <path {...stroke} d="M16 9.5c1 1 1 4 0 5M18.5 7.5c2 2 2 7 0 9" />
          ) : (
            <path {...stroke} d="M16 10l4 4M20 10l-4 4" />
          )}
        </>
      )}
      {k === "calm" && (
        // crescent moon; filled when calm is on
        <path
          d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z"
          fill={on ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      )}
      {k === "cursor" && (
        <>
          <path {...stroke} d="M5 4l5.5 14 2-5.5L18 10.5Z" strokeLinejoin="round" />
          {on && <circle cx="18" cy="18" r="2.2" fill="currentColor" />}
        </>
      )}
    </svg>
  );
}
