"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Corap } from "@/components/mascot/Corap";
import { SockIcon } from "@/components/ui/icons";
import { GAME_SECONDS } from "@/lib/game";

function Poster({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-night paper-grain relative grid aspect-[3/4] w-full place-items-center overflow-hidden rounded-blob sm:aspect-[4/3]">
      {children}
    </div>
  );
}

const CatchTheSock = dynamic(() => import("@/components/game/CatchTheSock"), {
  ssr: false,
  loading: () => <LoadingPoster />,
});

function LoadingPoster() {
  const t = useTranslations("Game");
  return (
    <Poster>
      <p className="font-display text-lg" role="status">
        {t("loading")}
      </p>
    </Poster>
  );
}

/** "Play with Çorap": the game's code is only downloaded when someone presses Play. */
export function PlaySection() {
  const t = useTranslations("Game");
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-sock paper-grain" aria-labelledby="play-title">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-caramel-ink uppercase">
            {t("eyebrow")}
          </p>
          <h2 id="play-title" className="mt-2 text-4xl font-semibold text-tabby-spot sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-tabby-brown">{t("intro")}</p>
          <p className="mt-3 text-sm font-semibold text-caramel-ink">
            {t("how", { seconds: GAME_SECONDS })}
          </p>
        </div>

        {playing ? (
          <CatchTheSock />
        ) : (
          <Poster>
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative w-56">
                <Corap pose="pounce" mood="mischief" lookAt="cursor" className="w-full" />
                <SockIcon className="absolute -top-6 right-2 h-12 w-12 rotate-12" />
              </div>
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="bean-press min-h-14 rounded-full bg-bean-pink px-10 font-display text-xl font-semibold text-night hover:bg-bean-pink-deep"
              >
                {t("start")}
              </button>
            </div>
          </Poster>
        )}
      </div>
    </section>
  );
}
