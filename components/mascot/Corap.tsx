"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { POSES, type Pose } from "./poses";
import "./corap.css";

export type { Pose };
export type Mood = "neutral" | "happy" | "sleepy" | "mischief";
/** "cursor" follows the pointer; a point is in viewport (client) pixels. */
export type LookAt = "cursor" | { x: number; y: number } | null;

export type CorapProps = {
  pose?: Pose;
  mood?: Mood;
  lookAt?: LookAt;
  /** Idle loops (breathing, blinking, tail…). Always off for reduced-motion users. */
  animated?: boolean;
  /** Visual purr vibration + rosy cheeks. */
  purring?: boolean;
  /** Slow-blink "cat kiss" when hovered. */
  interactive?: boolean;
  /** Peek pose: paws knead the edge they rest on. */
  kneading?: boolean;
  /** Change this number to make her slow-blink (e.g. when petted). */
  blinkSignal?: number;
  /** Accessible name. Omit for decorative use (hidden from screen readers). */
  title?: string;
  className?: string;
};

// --lid: how far the eyelids are lowered (0 open → 20 shut)
const MOODS: Record<Mood, { lid: number; pupil: { rx: number; ry: number } }> = {
  neutral: { lid: 0, pupil: { rx: 4.2, ry: 7 } },
  happy: { lid: 15, pupil: { rx: 4.4, ry: 7 } },
  sleepy: { lid: 10, pupil: { rx: 4, ry: 6 } },
  mischief: { lid: 0, pupil: { rx: 7, ry: 8.4 } },
};

const MAX_PUPIL_X = 3.6;
const MAX_PUPIL_Y = 3.2;

/**
 * Cartoon Çorap.
 * <Corap pose="peek" mood="sleepy" lookAt="cursor" />
 */
export function Corap({
  pose = "sit",
  mood = "neutral",
  lookAt = null,
  animated = true,
  purring = false,
  interactive = true,
  kneading = false,
  blinkSignal = 0,
  title,
  className = "",
}: CorapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = `corap${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [kiss, setKiss] = useState(false);
  const [paused, setPaused] = useState(false);

  const asleep = pose === "sleep";
  const { lid, pupil } = MOODS[mood];
  const def = POSES[pose];

  useEffect(() => {
    if (blinkSignal) setKiss(true);
  }, [blinkSignal]);

  // Pause idle loops while off-screen.
  useEffect(() => {
    const el = svgRef.current;
    if (!el || !animated) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [animated]);

  // Pupils track a point or the pointer. Written straight to the DOM — no re-renders.
  const lookKey = lookAt && typeof lookAt === "object" ? `${lookAt.x},${lookAt.y}` : lookAt;
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const pupils = Array.from(svg.querySelectorAll<SVGGElement>("[data-pupil]"));
    const reset = () => pupils.forEach((p) => p.removeAttribute("transform"));
    if (!lookAt || asleep) return reset();

    const aim = (px: number, py: number) => {
      for (const p of pupils) {
        const iris = p.parentElement?.querySelector("[data-iris]");
        if (!iris) continue;
        const r = iris.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, dist / 160);
        p.setAttribute(
          "transform",
          `translate(${((dx / dist) * k * MAX_PUPIL_X).toFixed(2)} ${((dy / dist) * k * MAX_PUPIL_Y).toFixed(2)})`,
        );
      }
    };

    if (lookAt !== "cursor") {
      aim(lookAt.x, lookAt.y);
      return reset;
    }

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => aim(e.clientX, e.clientY));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- lookKey stands in for lookAt
  }, [lookKey, asleep]);

  return (
    <svg
      ref={svgRef}
      viewBox={def.viewBox}
      className={`corap ${className}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      data-pose={pose}
      data-animated={animated}
      data-kiss={kiss}
      data-purr={purring}
      data-knead={kneading}
      data-paused={paused}
      style={{ "--lid": `${asleep ? 20 : lid}px` } as CSSProperties}
      onPointerEnter={interactive && !asleep ? () => setKiss(true) : undefined}
      onAnimationEnd={(e) => e.animationName === "corap-kiss" && setKiss(false)}
    >
      <g className="corap-all">{def.render({ uid, pupil, cheeks: purring || mood === "happy" })}</g>
    </svg>
  );
}
