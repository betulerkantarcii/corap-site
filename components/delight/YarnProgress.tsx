"use client";

import { useEffect, useRef } from "react";
import { YarnBall } from "@/components/ui/icons";

/**
 * Scroll progress as a yarn thread: a ball of yarn rolls right as you scroll,
 * laying thread behind it and shrinking as it unrolls. Decorative only.
 */
export function YarnProgress() {
  const thread = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (thread.current) thread.current.style.transform = `scaleX(${p})`;
      if (ball.current) {
        ball.current.style.left = `${p * 100}%`;
        ball.current.style.transform = `translate(-50%, -50%) rotate(${p * 1440}deg) scale(${1 - p * 0.5})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={thread}
        className="h-full origin-left bg-bean-pink"
        style={{
          transform: "scaleX(0)",
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 6px, rgb(224 143 138 / .9) 6px 9px)",
        }}
      />
      <div
        ref={ball}
        className="absolute top-1/2 left-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <YarnBall className="h-4 w-4" />
      </div>
    </div>
  );
}
