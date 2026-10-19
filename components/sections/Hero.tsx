import { useTranslations } from "next-intl";
import { HeroCat } from "@/components/delight/HeroCat";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PawPrint } from "@/components/ui/PawPrint";

/**
 * Night hero: Çorap peeks over the headline and kneads it with her sock paws.
 * Pet her (HeroCat) to make her purr; at night she naps here instead.
 */
export function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="section-night paper-grain relative overflow-hidden">
      {/* warm glow behind the cat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-tabby-caramel/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-16 text-center sm:px-6 sm:pt-12 md:pb-24">
        <p className="flex items-center justify-center gap-2 font-display text-sm font-semibold tracking-[0.2em] text-tabby-caramel uppercase">
          <PawPrint className="h-4 w-4" />
          {t("eyebrow")}
        </p>

        <div className="relative z-10 mx-auto mb-1 w-[min(70vw,360px)] sm:-mb-3 md:-mb-5 md:w-[400px]">
          <HeroCat />
        </div>
        <h1 className="relative text-[clamp(2.6rem,9vw,6.25rem)] leading-[0.98] font-semibold tracking-tight">
          {t("headline")}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-sock-white/80 sm:text-xl">{t("intro")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop">{t("ctaShop")}</ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            {t("ctaMeet")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
