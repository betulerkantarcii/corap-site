import { products as seedProducts } from "@/content/products";
import imported from "@/content/products.imported.json";

/* ------------------------------------------------------------------
   Product data model. The shape is checkout-agnostic: `etsyUrl` is just
   one provider's field (see lib/checkout.ts), so a cart can be added later
   without touching the UI.
   ------------------------------------------------------------------ */

export const CATEGORIES = ["sweatshirt", "hoodie", "tshirt", "print", "sticker"] as const;
export type Category = (typeof CATEGORIES)[number];

export type ProductImage = {
  /** Path under /public (e.g. "/products/tee.jpg") or an https URL (Etsy CDN). */
  src: string;
  alt_tr: string;
  alt_en: string;
};

export type ProductVariant = {
  name_tr: string;
  name_en: string;
  options: string[];
};

export type Product = {
  slug: string;
  title_tr: string;
  title_en: string;
  description_tr: string;
  description_en: string;
  /** Major units, e.g. 32.5 */
  price: number;
  /** ISO 4217, e.g. "USD", "TRY", "EUR" */
  currency: string;
  category: Category;
  tags: string[];
  images: ProductImage[];
  etsyUrl: string;
  variants?: ProductVariant[];
  featured: boolean;
  isNew: boolean;
  soldOut: boolean;
  /** True for sample data that still needs replacing with real listings. */
  placeholder?: boolean;
};

type Locale = "tr" | "en";

/** Imported Etsy data wins once it exists; until then the hand-written seed is used. */
export const products: Product[] =
  (imported as Product[]).length > 0 ? (imported as Product[]) : seedProducts;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 4) {
  const others = products.filter((p) => p.slug !== product.slug);
  const same = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...same, ...rest].slice(0, count);
}

export const title = (p: Product, l: Locale) => (l === "tr" ? p.title_tr : p.title_en);
export const description = (p: Product, l: Locale) =>
  l === "tr" ? p.description_tr : p.description_en;
export const imageAlt = (img: ProductImage, l: Locale) => (l === "tr" ? img.alt_tr : img.alt_en);
export const variantName = (v: ProductVariant, l: Locale) => (l === "tr" ? v.name_tr : v.name_en);

export function formatPrice(p: Pick<Product, "price" | "currency">, locale: string) {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: p.currency,
    currencyDisplay: "narrowSymbol", // ₺1,302.51 rather than TRY 1,302.51
  }).format(p.price);
}
