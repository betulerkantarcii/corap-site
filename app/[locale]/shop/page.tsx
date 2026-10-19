import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { alternates } from "@/lib/seo";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { PawTrail } from "@/components/ui/icons";
import { products } from "@/lib/catalog";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("shopTitle"),
    description: t("shopDescription"),
    alternates: alternates(locale, "/shop"),
    openGraph: { title: t("shopTitle"), description: t("shopDescription"), url: `/${locale}/shop` },
  };
}

export default function ShopPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Shop");

  return (
    <>
      <section className="section-night paper-grain">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6">
          <PawTrail className="h-6 w-28 text-tabby-caramel" />
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{t("title")}</h1>
          <p className="mt-3 max-w-xl text-lg text-sock-white/80">{t("intro")}</p>
        </div>
      </section>
      <div className="sock-line" aria-hidden="true" />
      <section className="section-sock paper-grain">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <ShopGrid products={products} />
        </div>
      </section>
    </>
  );
}
