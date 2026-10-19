import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { SectionTransition } from "@/components/delight/SectionTransition";
import { Hero } from "@/components/sections/Hero";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { Loader } from "@/components/sections/Loader";
import { Newsletter } from "@/components/sections/Newsletter";
import { PlaySection } from "@/components/sections/PlaySection";
import { Reviews } from "@/components/sections/Reviews";
import { ShopAll } from "@/components/sections/ShopAll";
import { SockDrawer } from "@/components/sections/SockDrawer";
import { WhyCorap } from "@/components/sections/WhyCorap";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/catalog";
import { alternates } from "@/lib/seo";
import "./home.css";

// Featured first, then new arrivals, up to 6 drawers.
const drawerProducts = [
  ...products.filter((p) => p.featured),
  ...products.filter((p) => !p.featured && p.isNew),
].slice(0, 6);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: { absolute: t("defaultTitle") },
    alternates: alternates(locale, ""),
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      url: `/${locale}`,
    },
  };
}

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <Loader />
      <Hero />
      <div className="sock-line" aria-hidden="true" />
      <WhyCorap />
      <SectionTransition kind="trail" />
      <section className="section-sock paper-grain">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <Reveal>
            <SockDrawer products={drawerProducts} />
          </Reveal>
        </div>
      </section>
      <SectionTransition kind="sock" />
      <ShopAll />
      <InstagramStrip />
      <PlaySection />
      <Reviews />
      <Newsletter />
    </>
  );
}
