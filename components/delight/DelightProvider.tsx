"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { unlockAudio } from "@/lib/sound";

/**
 * Visitor preferences for the playful layer, remembered in localStorage:
 * - sound: OFF by default
 * - calm:  turns off decorative motion (also forced by prefers-reduced-motion)
 * - cursor: paw cursor on desktop
 * Calm is applied before paint by CALM_SCRIPT (see app/[locale]/layout.tsx).
 */
type Prefs = { sound: boolean; calm: boolean; cursor: boolean };
type Ctx = Prefs & {
  /** True when decorative motion may run (not calm, no reduced-motion preference). */
  motionOK: boolean;
  toggle: (key: keyof Prefs) => void;
};

const KEYS: Record<keyof Prefs, string> = {
  sound: "corap-sound",
  calm: "corap-calm",
  cursor: "corap-cursor",
};
const DEFAULTS: Prefs = { sound: false, calm: false, cursor: true };

export const CALM_SCRIPT = `try{if(localStorage.getItem("${KEYS.calm}")==="1")document.documentElement.setAttribute("data-calm","")}catch(e){}`;

const DelightContext = createContext<Ctx>({ ...DEFAULTS, motionOK: false, toggle: () => {} });

function read(key: keyof Prefs): boolean {
  try {
    const v = localStorage.getItem(KEYS[key]);
    return v === null ? DEFAULTS[key] : v === "1";
  } catch {
    return DEFAULTS[key];
  }
}

export function DelightProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [reduced, setReduced] = useState(true); // assume reduced until we know (SSR-safe)

  useEffect(() => {
    setPrefs({ sound: read("sound"), calm: read("calm"), cursor: read("cursor") });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute("data-calm", prefs.calm);
  }, [prefs.calm]);

  // Returning visitors with sound on: unlock audio on their first gesture,
  // so purrs from stroking and game sounds (not gestures) can play later.
  useEffect(() => {
    if (!prefs.sound) return;
    const events = ["pointerdown", "keydown", "touchend"] as const;
    const unlock = () => {
      unlockAudio();
      events.forEach((e) => window.removeEventListener(e, unlock, true));
    };
    events.forEach((e) => window.addEventListener(e, unlock, { capture: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, unlock, true));
  }, [prefs.sound]);

  const toggle = useCallback((key: keyof Prefs) => {
    setPrefs((p) => {
      const next = { ...p, [key]: !p[key] };
      try {
        localStorage.setItem(KEYS[key], next[key] ? "1" : "0");
      } catch {
        /* private mode: keep it for this visit only */
      }
      return next;
    });
  }, []);

  return (
    <DelightContext.Provider value={{ ...prefs, motionOK: !prefs.calm && !reduced, toggle }}>
      {children}
    </DelightContext.Provider>
  );
}

export const useDelight = () => useContext(DelightContext);

/** Returns a player that only makes noise when the visitor turned sound on. */
export function useSfx() {
  const { sound } = useDelight();
  return useCallback(
    (play: () => void) => {
      if (sound) play();
    },
    [sound],
  );
}
