import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PawPrint } from "@/components/ui/PawPrint";
import { Link } from "@/i18n/navigation";
import { CATEGORIES, products } from "@/lib/catalog";

/** Night band linking into the full shop, one chip per category. */
export function ShopAll() {
  const t = useTranslations("Home");
  const shop = useTranslations("Shop");
  const counts = CATEGORIES.map((c) => ({
    c,
    n: products.filter((p) => p.category === c).length,
  })).filter(({ n }) => n > 0);

  return (
    <section className="section-night paper-grain">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("shopAllTitle")}</h2>
          <p className="mt-3 text-sock-white/80">{t("shopAllBody")}</p>
          <ButtonLink href="/shop" className="mt-6">
            {t("shopAllCta")}
          </ButtonLink>
        </div>
        <ul className="grid w-full grid-cols-2 gap-3 md:w-auto">
          {counts.map(({ c, n }) => (
            <li key={c}>
              <Link
                href={{ pathname: "/shop", query: { category: c } }}
                className="group flex min-h-20 flex-col justify-center rounded-3xl border-2 border-sock-white/15 px-5 py-3 transition-colors hover:border-bean-pink md:min-w-44"
              >
                <span className="flex items-center gap-2 font-display text-lg font-semibold">
                  <PawPrint className="h-4 w-4 text-tabby-caramel group-hover:text-bean-pink" />
                  {shop(`categories.${c}`)}
                </span>
                <span className="text-sm text-sock-white/70">
                  {t("categoryCount", { count: n })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
