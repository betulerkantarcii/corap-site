"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useDelight } from "@/components/delight/DelightProvider";
import { Corap } from "@/components/mascot/Corap";
import sockPaws from "@/public/art/corap-sock-paws.png";

/**
 * Scroll story: the whole cat → zoom to her paws → the watercolor socks →
 * a tiny Turkish lesson. GSAP + ScrollTrigger are loaded only when this
 * section mounts. Without motion (reduced-motion, calm mode, no JS) the
 * section renders as a static, readable layout instead.
 */
export function WhyCorap() {
  const t = useTranslations("Home");
  const ref = useRef<HTMLElement>(null);
  const { motionOK } = useDelight();

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK) return;

    el.dataset.motion = "on";
    let killed = false;
    let revert: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (killed) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 },
          });
          tl.to(".story-cat", { scale: 3.6, duration: 1 }, 0)
            .to(".story-step-0", { autoAlpha: 0, y: -24, duration: 0.25 }, 0.15)
            .fromTo(
              ".story-step-1",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.25 },
              0.4,
            )
            .to(".story-step-1", { autoAlpha: 0, y: -24, duration: 0.25 }, 0.95)
            .to(".story-cat", { autoAlpha: 0, duration: 0.3 }, 1.0)
            .fromTo(
              ".story-art",
              { autoAlpha: 0, scale: 1.3 },
              { autoAlpha: 1, scale: 1, duration: 0.5 },
              1.0,
            )
            .fromTo(
              ".story-step-2",
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.25 },
              1.35,
            )
            .to(".story-step-2", { autoAlpha: 0, y: -24, duration: 0.25 }, 1.9)
            .to(".story-art", { opacity: 0.45, duration: 0.3 }, 2.0)
            .fromTo(
              ".story-lesson",
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.3 },
              2.05,
            )
            .fromTo(
              ".story-letter",
              { autoAlpha: 0, yPercent: 80, rotate: -12 },
              { autoAlpha: 1, yPercent: 0, rotate: 0, stagger: 0.06, duration: 0.2 },
              2.15,
            )
            .fromTo(
              ".story-meaning",
              { autoAlpha: 0, scale: 0.6 },
              { autoAlpha: 1, scale: 1, duration: 0.2 },
              2.55,
            )
            .to({}, { duration: 0.3 }); // hold the final frame a moment
        }, el);
        revert = () => ctx.revert();
      },
    );

    return () => {
      killed = true;
      revert?.();
      delete el.dataset.motion;
    };
  }, [motionOK]);

  const word = t("lessonWord");

  return (
    <section ref={ref} className="story section-night paper-grain" aria-labelledby="story-title">
      <div className="story-stage">
        <h2 id="story-title" className="story-eyebrow">
          {t("storyEyebrow")}
        </h2>

        <div className="story-visual">
          <div className="story-cat">
            <Corap pose="sit" lookAt="cursor" interactive={false} className="h-full w-full" />
          </div>
          <Image
            src={sockPaws}
            alt={t("artAlt")}
            sizes="(min-width: 768px) 32rem, 80vw"
            className="story-art"
          />
        </div>

        <div className="story-steps">
          <p className="story-step story-step-0">{t("story1")}</p>
          <p className="story-step story-step-1">{t("story2")}</p>
          <p className="story-step story-step-2">{t("story3")}</p>
        </div>

        <div className="story-lesson">
          <p className="text-xs font-bold tracking-[0.25em] text-caramel-ink uppercase">
            {t("lessonTitle")}
          </p>
          <p className="mt-2 font-display text-5xl font-semibold text-tabby-spot sm:text-6xl">
            <span lang="tr" aria-label={word}>
              {[...word].map((ch, i) => (
                <span key={i} className="story-letter inline-block" aria-hidden="true">
                  {ch}
                </span>
              ))}
            </span>{" "}
            <span className="story-meaning inline-block text-bean-pink-deep">
              <span aria-hidden="true">=</span>
              <span className="sr-only"> = </span> <span lang="en">{t("lessonMeaning")}</span>
            </span>
          </p>
          <p className="mt-1 text-sm font-semibold text-caramel-ink italic">
            {t("lessonPronounce")}
          </p>
          <p className="mt-3 text-tabby-brown">{t("lessonBody")}</p>
        </div>
      </div>
    </section>
  );
}
