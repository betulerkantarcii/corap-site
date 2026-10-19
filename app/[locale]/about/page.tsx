import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { alternates } from "@/lib/seo";
import { FactStack } from "@/components/about/FactStack";
import { Gallery } from "@/components/about/Gallery";
import { Timeline } from "@/components/about/Timeline";
import { Corap } from "@/components/mascot/Corap";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PawTrail } from "@/components/ui/icons";
import { Polaroid } from "@/components/ui/Polaroid";
import { Reveal } from "@/components/ui/Reveal";
import { SampleNote } from "@/components/ui/SampleNote";
import { story, timelineIsPlaceholder } from "@/content/about";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    alternates: alternates(locale, "/about"),
    openGraph: {
      title: t("aboutTitle"),
      description: t("aboutDescription"),
      url: `/${locale}/about`,
    },
  };
}

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("About");
  const l = useLocale() as "tr" | "en";

  return (
    <>
      {/* Hero */}
      <section className="section-night paper-grain overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <PawTrail className="h-6 w-28 text-tabby-caramel" />
            <h1 className="mt-4 text-5xl font-semibold sm:text-6xl">{t("title")}</h1>
            <p className="mt-4 max-w-md text-lg text-sock-white/80 sm:text-xl">{t("intro")}</p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Corap
              pose="sit"
              lookAt="cursor"
              title={t("heroAlt")}
              className="relative z-10 w-3/4"
            />
            <Polaroid
              src="/corap/photo-window-socks.jpg"
              alt=""
              caption={t("photoCaption")}
              tilt={6}
              sizes="12rem"
              className="absolute right-0 bottom-0 w-44 sm:w-52"
            />
          </div>
        </div>
      </section>
      <div className="sock-line" aria-hidden="true" />

      {/* Story */}
      <section className="section-sock paper-grain">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("storyTitle")}</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-tabby-brown">
            {story.map((p, i) => (
              <Reveal key={i}>
                <p>{p[l]}</p>
                {p.placeholder && <SampleNote className="mt-2" />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fun facts */}
      <section className="bg-sock-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-semibold text-tabby-spot sm:text-4xl">
            {t("factsTitle")}
          </h2>
          <div className="mt-10">
            <FactStack />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-sock paper-grain">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">{t("galleryTitle")}</h2>
          <Gallery />
        </div>
      </section>

      {/* Day in the life */}
      <section className="bg-sock-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-tabby-spot sm:text-4xl">{t("dayTitle")}</h2>
            {timelineIsPlaceholder && <SampleNote className="mt-3" />}
          </div>
          <Timeline />
        </div>
      </section>

      {/* CTA */}
      <section className="section-night paper-grain">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <div className="w-48">
            <Corap pose="stretch" mood="happy" className="w-full" />
          </div>
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("ctaTitle")}</h2>
          <ButtonLink href="/shop">{t("ctaButton")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
