import type { Product } from "./catalog";

/**
 * Checkout abstraction. Today every purchase happens on Etsy; to move to a
 * real cart (Shopify Buy Button, Stripe…) add another provider here and switch
 * `checkout` — the UI only ever calls `checkout.href(...)` / `checkout.id`.
 */
export type CheckoutProvider = {
  id: "etsy";
  /** Where the buy button sends the visitor. */
  href: (product: Product) => string;
  /** External checkout opens in a new tab. */
  external: boolean;
};

const UTM = { utm_source: "corap_site", utm_medium: "referral" } as const;

export const etsyCheckout: CheckoutProvider = {
  id: "etsy",
  external: true,
  href(product) {
    const url = new URL(product.etsyUrl);
    url.searchParams.set("utm_source", UTM.utm_source);
    url.searchParams.set("utm_medium", UTM.utm_medium);
    url.searchParams.set("utm_campaign", product.slug);
    return url.toString();
  },
};

export const checkout: CheckoutProvider = etsyCheckout;
