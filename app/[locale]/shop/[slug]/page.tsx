import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EtsyButton } from "@/components/shop/EtsyButton";
import { ProductBadges } from "@/components/shop/ProductBadges";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { BeanPaw } from "@/components/ui/icons";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  description,
  formatPrice,
  getProduct,
  getRelated,
  products,
  title,
  variantName,
} from "@/lib/catalog";
import { checkout } from "@/lib/checkout";
import { alternates } from "@/lib/seo";

type Locale = "tr" | "en";
type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const desc = description(product, locale).slice(0, 155);
  return {
    title: title(product, locale),
    description: desc,
    alternates: alternates(locale, `/shop/${slug}`),
    openGraph: {
      title: title(product, locale),
      description: desc,
      url: `/${locale}/shop/${slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations("Product");
  const name = title(product, locale);
  const price = formatPrice(product, locale);
  const related = getRelated(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description(product, locale),
    image: product.images.map((i) => new URL(i.src, site.url).toString()),
    brand: { "@type": "Brand", name: "The House Cat · Çorap" },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: product.currency,
      availability: product.soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: checkout.href(product),
    },
  };

  return (
    <>
      <script /* JSON-LD must be raw; content is our own data, "<" escaped */
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="section-sock paper-grain pb-28 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full py-2 font-display font-semibold text-tabby-brown hover:text-tabby-spot"
          >
            <span aria-hidden="true">←</span> {t("backToShop")}
          </Link>

          <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative">
              <ProductGallery images={product.images} />
              <ApprovedStamp label={t("approves")} />
            </div>

            <div className="md:pt-4">
              <ProductBadges product={product} />
              <h1 className="mt-3 text-4xl leading-tight font-semibold text-tabby-spot sm:text-5xl">
                {name}
              </h1>
              <p className="mt-3 font-display text-3xl font-semibold text-caramel-ink">{price}</p>

              <p className="mt-6 text-lg leading-relaxed whitespace-pre-line text-tabby-brown">
                {description(product, locale)}
              </p>

              {product.variants?.map((v) => (
                <div key={v.name_en} className="mt-6">
                  <h2 className="text-sm font-bold tracking-widest text-caramel-ink uppercase">
                    {t("options", { name: variantName(v, locale) })}
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {v.options.map((o) => (
                      <li
                        key={o}
                        className="rounded-full border-2 border-tabby-brown/25 bg-sock-white px-3.5 py-1 font-display text-sm font-semibold text-tabby-spot"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-tabby-brown">{t("pickOnEtsy")}</p>
                </div>
              ))}

              <div className="mt-8 hidden md:block">
                <EtsyButton product={product} size="lg" />
              </div>
              <p className="mt-3 text-sm text-tabby-brown">
                {product.soldOut ? t("soldOutNote") : t("secureCheckout")}
              </p>
              {product.placeholder && (
                <p className="mt-6 rounded-2xl border-2 border-dashed border-caramel-ink px-4 py-3 text-sm font-semibold text-caramel-ink">
                  {t("sampleNote")}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-sock-cream">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h2 className="text-3xl font-semibold text-tabby-spot">{t("related")}</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Mobile: price + buy button always one tap away */}
      <div className="section-night fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 md:hidden">
        <div className="min-w-0">
          <p className="truncate text-sm text-sock-white/80">{name}</p>
          <p className="font-display text-lg font-semibold text-bean-pink">{price}</p>
        </div>
        <EtsyButton product={product} surface="dark" />
      </div>
    </>
  );
}

function ApprovedStamp({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute -top-3 -right-2 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border-[3px] border-dashed border-bean-pink-deep bg-sock-white/95 text-center shadow-md sm:-right-4 sm:h-28 sm:w-28">
      <BeanPaw className="h-7 w-7 sm:h-10 sm:w-10" />
      <span className="mt-1 px-2 font-display text-[0.7rem] leading-tight font-bold tracking-wide text-tabby-spot uppercase sm:text-xs">
        {label}
      </span>
    </div>
  );
}
