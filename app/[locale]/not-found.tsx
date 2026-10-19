import { useTranslations } from "next-intl";
import { Corap } from "@/components/mascot/Corap";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SockIcon } from "@/components/ui/icons";
import { PawPrint } from "@/components/ui/PawPrint";

/** 404: Çorap dashes across with the page (well, a sock) in her mouth. */
export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <section className="section-night paper-grain overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="relative h-40 sm:h-48" aria-hidden="true">
          {/* paw prints left behind */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-6 text-tabby-caramel/60">
            {[0, 1, 2, 3, 4].map((i) => (
              <PawPrint
                key={i}
                className={`h-5 w-5 rotate-[-90deg] ${i % 2 ? "translate-y-2" : ""}`}
              />
            ))}
          </div>
          <div className="thief absolute bottom-6 w-56 sm:w-64">
            <Corap
              pose="pounce"
              mood="mischief"
              interactive={false}
              className="w-full -scale-x-100"
            />
            <SockIcon className="absolute top-[40%] -right-3 h-12 w-12 rotate-[70deg]" />
          </div>
        </div>
        <p className="mt-6 font-display text-8xl leading-none font-semibold text-bean-pink sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-sock-white/80">{t("body")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">{t("home")}</ButtonLink>
          <ButtonLink href="/shop" variant="secondary">
            {t("shop")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
