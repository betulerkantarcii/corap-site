"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Leg } from "@/components/mascot/parts";
import { Link } from "@/i18n/navigation";
import { formatPrice, imageAlt, title, type Product } from "@/lib/catalog";
import { EtsyButton } from "./EtsyButton";
import { ProductBadges } from "./ProductBadges";

/**
 * Card: tilts on hover, a sock paw swats in from the side, and the second
 * photo fades in. Hover effects only run on devices that can hover.
 */
export function ProductCard({
  product,
  priority = false,
  headingLevel = 3,
}: {
  product: Product;
  priority?: boolean;
  /** 2 when the card sits directly under the page's h1 (shop grid). */
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const locale = useLocale() as "tr" | "en";
  const name = title(product, locale);
  const [first, second] = product.images;
  // Apparel photos fill the frame; artwork is shown whole so nothing gets cropped.
  const fit =
    product.category === "print" || product.category === "sticker"
      ? "object-contain p-3"
      : "object-cover";

  return (
    <article className="product-card group relative flex h-full flex-col rounded-blob bg-sock-cream p-3 transition-transform duration-300 ease-squish hover:-translate-y-1 hover:-rotate-1">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-sock-white">
        {first && (
          <Image
            src={first.src}
            alt={imageAlt(first, locale)}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
            className={`${fit} transition-transform duration-500 group-hover:scale-[1.03]`}
          />
        )}
        {second && (
          <Image
            src={second.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
            className={`${fit} bg-sock-white opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
          />
        )}
        <ProductBadges product={product} className="absolute top-3 left-3" />
        <SwatPaw />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2 pt-4 pb-2">
        <Heading className="text-lg leading-snug font-semibold text-tabby-spot">
          {/* Stretched link: the whole card opens the product; the Etsy button stays separate. */}
          <Link
            href={`/shop/${product.slug}`}
            className="rounded-md after:absolute after:inset-0 after:rounded-blob after:content-['']"
          >
            {name}
          </Link>
        </Heading>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-lg font-semibold text-caramel-ink">
            {formatPrice(product, locale)}
          </p>
          <EtsyButton product={product} className="relative z-10" />
        </div>
      </div>
    </article>
  );
}

/** Çorap's sock paw, reaching in from the right edge to bat at the card. */
function SwatPaw() {
  return (
    <svg
      viewBox="0 0 84 40"
      aria-hidden="true"
      className="swat-paw pointer-events-none absolute top-1/2 right-0 w-40 drop-shadow-lg"
    >
      <Leg x={84} y={20} length={70} rotate={90} hw={9} />
    </svg>
  );
}
