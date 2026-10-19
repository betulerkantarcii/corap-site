/*
  Customer reviews shown on the home page (paw-shaped cards).
  Only add REAL reviews — copy them from Etsy (Shop Manager → Reviews).
  The section stays hidden while this list is empty.

  Example:
  {
    quote: "Arrived so fast and the print quality is gorgeous!",
    quote_tr: "Çok hızlı geldi, baskı kalitesi harika!", // optional translation
    name: "Ayşe K.",
    productSlug: "caffeinated-tee", // optional, links the review to a product
    rating: 5,
  },
*/

export type Review = {
  /** The review exactly as the customer wrote it. */
  quote: string;
  /** Optional Turkish translation shown on /tr (falls back to `quote`). */
  quote_tr?: string;
  /** Optional English translation shown on /en (falls back to `quote`). */
  quote_en?: string;
  /** As shown on Etsy, e.g. "Ayşe K." */
  name: string;
  productSlug?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
};

export const reviews: Review[] = [];
