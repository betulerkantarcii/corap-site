"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { SockIcon } from "@/components/ui/icons";
import { PawPrint } from "@/components/ui/PawPrint";

/**
 * Decorative seams between sections, played once when they scroll into view:
 * - "trail": a line of paw prints walks across
 * - "sock":  a sock flies across the seam
 * Static (fully drawn) in calm / reduced motion — see .seam in globals.css.
 */
export function SectionTransition({
  kind,
  tone = "light",
}: {
  kind: "trail" | "sock";
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.play = "true";
          io.disconnect();
        }
      },
      { threshold: 0.8 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bg = tone === "dark" ? "bg-night text-tabby-caramel" : "bg-sock-white text-bean-pink-deep";

  return (
    <div ref={ref} aria-hidden="true" className={`seam relative h-14 overflow-hidden ${bg}`}>
      {kind === "trail" ? (
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
          {Array.from({ length: 9 }, (_, i) => (
            <PawPrint
              key={i}
              className="seam-print h-5 w-5 rotate-90"
              style={{ "--i": i, translate: `0 ${i % 2 ? 7 : -7}px` } as CSSProperties}
            />
          ))}
        </div>
      ) : (
        <SockIcon className="seam-sock absolute top-1/2 h-10 w-10" />
      )}
    </div>
  );
}
