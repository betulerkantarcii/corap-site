"use client";

import { useEffect } from "react";
import { useDelight } from "@/components/delight/DelightProvider";
import "lenis/dist/lenis.css";

/**
 * Lenis smooth scrolling, loaded after hydration. Off whenever decorative
 * motion is off (calm mode or prefers-reduced-motion) and switches live when
 * either changes. Touch devices keep native scrolling (Lenis default).
 */
export function SmoothScroll() {
  const { motionOK } = useDelight();

  useEffect(() => {
    if (!motionOK) return;
    let lenis: import("lenis").default | undefined;
    let frame = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ anchors: true, lerp: 0.12 });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [motionOK]);

  return null;
}
