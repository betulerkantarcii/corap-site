"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Corap, type Pose } from "@/components/mascot/Corap";

/**
 * Çorap naps on the footer. Scroll all the way down and she wakes up,
 * stretches, then sits and watches you. Leave and she dozes off again.
 */
export function FooterCat() {
  const t = useTranslations("Footer");
  const box = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<Pose>("sleep");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(timer);
        if (e.isIntersecting) {
          setPose("stretch");
          timer = window.setTimeout(() => setPose("sit"), 1800);
        } else {
          setPose("sleep");
        }
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={box} className="flex h-28 w-48 items-end text-sock-white/70">
      <Corap
        pose={pose}
        mood={pose === "stretch" ? "happy" : "neutral"}
        lookAt={pose === "sit" ? "cursor" : null}
        title={pose === "sleep" ? t("sleepyCat") : undefined}
        className="h-full w-auto max-w-full"
      />
    </div>
  );
}
