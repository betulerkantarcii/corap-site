"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState, type KeyboardEvent } from "react";
import { useDelight } from "@/components/delight/DelightProvider";
import { BeanPaw } from "@/components/ui/icons";
import { funFacts } from "@/content/about";

const TINTS = ["bg-sock-white", "bg-bean-pink-pale", "bg-sock-cream"];
const TILTS = [-3, 4, -6];

/**
 * A stack of fun-fact cards. Drag/swipe the top card sideways to flick it to
 * the back, or use the buttons / ← → keys. The current fact is announced to
 * screen readers.
 */
export function FactStack() {
  const t = useTranslations("About");
  const locale = useLocale() as "tr" | "en";
  const { motionOK } = useDelight();
  const n = funFacts.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = (d: 1 | -1) => {
    setDir(d);
    setI((v) => (v + d + n) % n);
  };
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500)
      go(info.offset.x < 0 ? 1 : -1);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
  };

  // Back-to-front: the two cards peeking behind, then the active card on top.
  const behind = [2, 1].map((k) => (i + k) % n);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-72 w-full max-w-sm sm:h-80"
        role="group"
        aria-roledescription="carousel"
        aria-label={t("factsTitle")}
        tabIndex={0}
        onKeyDown={onKey}
      >
        {behind.map((idx, depth) => (
          <div
            key={`b-${idx}`}
            aria-hidden="true"
            className={`absolute inset-0 rounded-blob shadow-md ring-1 ring-tabby-spot/10 ${TINTS[idx % 3]}`}
            style={{ rotate: `${TILTS[(idx + depth) % 3]}deg`, scale: 0.94 + depth * 0.03 }}
          />
        ))}
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.article
            key={i}
            custom={dir}
            drag={motionOK ? "x" : false}
            dragSnapToOrigin
            onDragEnd={onDragEnd}
            whileDrag={{ rotate: 0, scale: 1.02 }}
            initial={motionOK ? { opacity: 0, scale: 0.9, rotate: 0 } : false}
            animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
            exit={
              motionOK
                ? { x: dir * -420, rotate: dir * -18, opacity: 0, transition: { duration: 0.35 } }
                : { opacity: 0, transition: { duration: 0 } }
            }
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className={`absolute inset-0 flex cursor-grab touch-pan-y flex-col justify-between rounded-blob p-7 shadow-xl ring-1 ring-tabby-spot/10 select-none active:cursor-grabbing ${TINTS[i % 3]}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-5xl font-semibold text-caramel-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <BeanPaw className="h-12 w-12 -rotate-12" />
            </div>
            <p
              className="font-display text-2xl leading-snug font-medium text-tabby-spot"
              aria-live="polite"
            >
              {funFacts[i][locale]}
            </p>
            <p className="text-sm text-tabby-brown">{t("factOf", { n: i + 1, total: n })}</p>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-3">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={d < 0 ? t("prevFact") : t("nextFact")}
            className="bean-press grid h-12 w-12 place-items-center rounded-full border-2 border-tabby-brown text-tabby-brown hover:bg-tabby-brown hover:text-sock-white"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path
                d={d < 0 ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-tabby-brown">{t("factsHint")}</p>
    </div>
  );
}
