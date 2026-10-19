"use client";

import { useEffect, useRef } from "react";
import { useDelight } from "./DelightProvider";

const TRAIL = 14;
const STEP = 64; // px between prints

/**
 * Desktop-only paw cursor (a real CSS cursor, so it never lags) plus a trail
 * of fading paw prints. The cursor itself is drawn in globals.css
 * (html[data-paw-cursor]); the trail is skipped in calm / reduced motion.
 */
export function PawCursor() {
  const { cursor, motionOK } = useDelight();
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const root = document.documentElement;
    if (!cursor || !fine.matches) {
      root.removeAttribute("data-paw-cursor");
      return;
    }
    root.setAttribute("data-paw-cursor", "");
    const down = () => root.setAttribute("data-paw-down", "");
    const up = () => root.removeAttribute("data-paw-down");
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);

    let cleanupTrail = () => {};
    const prints = layer.current ? (Array.from(layer.current.children) as HTMLElement[]) : [];
    if (motionOK && prints.length) {
      let last: { x: number; y: number } | null = null;
      let i = 0;
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!last) {
          last = { x: e.clientX, y: e.clientY };
          return;
        }
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (Math.hypot(dx, dy) < STEP) return;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        const side = i % 2 ? 7 : -7; // left/right foot
        const nx = (-dy / Math.hypot(dx, dy)) * side;
        const ny = (dx / Math.hypot(dx, dy)) * side;
        const el = prints[i % TRAIL];
        el.style.transform = `translate(${e.clientX + nx - 8}px, ${e.clientY + ny - 8}px) rotate(${angle}deg)`;
        el.animate([{ opacity: 0.5 }, { opacity: 0 }], { duration: 1100, easing: "ease-out" });
        last = { x: e.clientX, y: e.clientY };
        i++;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanupTrail = () => window.removeEventListener("pointermove", onMove);
    }

    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      cleanupTrail();
      root.removeAttribute("data-paw-cursor");
      root.removeAttribute("data-paw-down");
    };
  }, [cursor, motionOK]);

  return (
    <div
      ref={layer}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
    >
      {Array.from({ length: TRAIL }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 32 32"
          className="absolute top-0 left-0 h-4 w-4 text-bean-pink-deep opacity-0"
          fill="currentColor"
        >
          <ellipse cx="7.5" cy="13" rx="3.2" ry="4" />
          <ellipse cx="13" cy="7.5" rx="3.2" ry="4.2" />
          <ellipse cx="19.5" cy="7.5" rx="3.2" ry="4.2" />
          <ellipse cx="25" cy="13" rx="3.2" ry="4" />
          <path d="M16.2 14.5c-4.6 0-9 5.1-9 9.1 0 3 2.4 4.4 5 4.4 1.7 0 2.7-.8 4-.8s2.3.8 4 .8c2.6 0 5-1.4 5-4.4 0-4-4.4-9.1-9-9.1Z" />
        </svg>
      ))}
    </div>
  );
}
