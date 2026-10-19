import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Reviews } from "@/components/sections/Reviews";

export const metadata: Metadata = { title: "Review cards preview", robots: { index: false } };

// Layout check only. These are NOT reviews — the live site reads content/reviews.ts.
const LAYOUT_SAMPLES = [
  {
    quote: "Layout sample text — not a real review. Short line.",
    name: "Sample A",
    rating: 5 as const,
  },
  {
    quote:
      "Layout sample text — not a real review. A longer paragraph to check how the paw card wraps two or three lines of text.",
    name: "Sample B",
    productSlug: "caffeinated-tee",
  },
  {
    quote: "Layout sample — örnek metin, gerçek yorum değil. Ç ş ğ ı İ ö ü.",
    name: "Örnek C",
    rating: 4 as const,
  },
];

export default function ReviewsPreviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <Reviews reviews={LAYOUT_SAMPLES} />;
}
