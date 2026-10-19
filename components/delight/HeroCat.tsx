"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Corap } from "@/components/mascot/Corap";
import { meow, purr } from "@/lib/sound";
import { useSfx } from "./DelightProvider";

const STROKE_PX = 220; // pointer travel within STROKE_MS that counts as a pet
const STROKE_MS = 1200;

const isNight = () => {
  // ?night=1 / ?night=0 forces it, handy for previewing
  const forced = new URLSearchParams(window.location.search).get("night");
  if (forced === "1" || forced === "0") return forced === "1";
  const h = new Date().getHours();
  return h >= 22 || h < 6;
};

/**
 * The hero cat. Stroke her (mouse or finger, sideways) or press the button to
 * pet her: she purrs and slow-blinks. Between 22:00 and 06:00 (visitor's local
 * time) she's asleep; petting wakes her up.
 */
export function HeroCat() {
  const t = useTranslations("Home");
  const sfx = useSfx();
  const [asleep, setAsleep] = useState(false);
  const [purring, setPurring] = useState(false);
  const [blink, setBlink] = useState(0);
  const [status, setStatus] = useState("");
  const travel = useRef<{ d: number; since: number; last?: { x: number; y: number } }>({
    d: 0,
    since: 0,
  });
  const purrTimer = useRef<number>(undefined);

  // Decided on the client only: the server can't know the visitor's clock.
  useEffect(() => setAsleep(isNight()), []);
  useEffect(() => () => window.clearTimeout(purrTimer.current), []);

  const pet = () => {
    if (asleep) {
      setAsleep(false);
      setStatus(t("wakeStatus"));
      sfx(meow);
      return;
    }
    setPurring(true);
    setBlink((n) => n + 1);
    setStatus(t("purringStatus"));
    sfx(() => purr(2.4));
    window.clearTimeout(purrTimer.current);
    purrTimer.current = window.setTimeout(() => setPurring(false), 2600);
  };

  const onMove = (e: PointerEvent) => {
    const now = performance.now();
    const tr = travel.current;
    if (now - tr.since > STROKE_MS) {
      tr.d = 0;
      tr.since = now;
    }
    if (tr.last) tr.d += Math.hypot(e.clientX - tr.last.x, e.clientY - tr.last.y);
    tr.last = { x: e.clientX, y: e.clientY };
    if (tr.d > STROKE_PX && !purring) {
      tr.d = 0;
      pet();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={pet}
        onPointerMove={onMove}
        onPointerLeave={() => (travel.current.last = undefined)}
        aria-label={asleep ? t("petLabelSleeping") : t("petLabel")}
        className="block w-full touch-pan-y rounded-[2rem]"
      >
        <Corap
          pose={asleep ? "sleep" : "peek"}
          kneading={!asleep}
          purring={purring}
          blinkSignal={blink}
          lookAt="cursor"
          className="w-full text-sock-white/80"
        />
      </button>

      {purring && (
        <span
          aria-hidden="true"
          className="purr-bubble pointer-events-none absolute -top-2 right-0 rounded-full bg-sock-white px-3 py-1 font-display text-sm font-semibold text-tabby-spot shadow-md"
        >
          {t("purring")}
        </span>
      )}
      {asleep && (
        <span className="pointer-events-none absolute top-1 right-0 rotate-6 rounded-full border border-sock-white/25 px-3 py-1 text-xs font-semibold text-sock-white/80">
          {t("nightNote")}
        </span>
      )}
      <span className="sr-only" role="status">
        {status}
      </span>
    </div>
  );
}
