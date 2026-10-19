import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { reviews as allReviews, type Review } from "@/content/reviews";
import { getProduct, title } from "@/lib/catalog";

/** Paw-shaped review cards. Renders nothing until real reviews exist. */
export function Reviews({ reviews = allReviews }: { reviews?: Review[] }) {
  const t = useTranslations("Home");
  const locale = useLocale() as "tr" | "en";
  if (reviews.length === 0) return null;

  return (
    <section className="section-sock paper-grain" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 id="reviews-title" className="text-3xl font-semibold text-tabby-spot sm:text-4xl">
          {t("reviewsTitle")}
        </h2>
        <p className="mt-2 max-w-xl text-tabby-brown">{t("reviewsBody")}</p>
        <ul className="mt-14 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => {
            const product = r.productSlug ? getProduct(r.productSlug) : undefined;
            const quote = (locale === "tr" ? r.quote_tr : r.quote_en) ?? r.quote;
            return (
              <li key={`${r.name}-${i}`}>
                <Reveal delay={(i % 3) * 120}>
                  <PawCard>
                    {r.rating && (
                      <p className="text-bean-pink-deep" aria-label={`${r.rating}/5`}>
                        {"★".repeat(r.rating)}
                      </p>
                    )}
                    <blockquote className="mt-2 text-lg leading-relaxed text-tabby-spot">
                      “{quote}”
                    </blockquote>
                    <p className="mt-4 font-display font-semibold text-caramel-ink">
                      {r.name}
                      {product && (
                        <span className="font-body font-normal text-tabby-brown">
                          {" "}
                          · {t("reviewOn", { product: title(product, locale) })}
                        </span>
                      )}
                    </p>
                  </PawCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Main pad + four toe beans peeking over the top edge. */
function PawCard({ children }: { children: React.ReactNode }) {
  const toes = [
    "left-[8%] top-3 -rotate-12",
    "left-[30%] -top-1",
    "right-[30%] -top-1",
    "right-[8%] top-3 rotate-12",
  ];
  return (
    <div className="relative pt-8">
      {toes.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute h-12 w-10 rounded-full bg-bean-pink-pale ring-2 ring-tabby-spot/15 ${pos}`}
        />
      ))}
      <div className="relative rounded-[2.5rem_2.5rem_3rem_3rem] bg-sock-white p-7 shadow-[0_18px_40px_-24px_rgb(46_31_21/0.5)] ring-2 ring-tabby-spot/10">
        {children}
      </div>
    </div>
  );
}
