"use client";

import { useTranslations } from "next-intl";
import type { Product } from "@/lib/catalog";

export function ProductBadges({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const t = useTranslations("Product");
  const badges = [
    product.soldOut && { key: "soldOut", text: t("soldOut"), cls: "bg-night text-sock-white" },
    product.isNew && { key: "new", text: t("new"), cls: "bg-bean-pink text-night" },
    product.placeholder && {
      key: "sample",
      text: t("sample"),
      cls: "border-2 border-dashed border-caramel-ink bg-sock-white text-caramel-ink",
    },
  ].filter(Boolean) as { key: string; text: string; cls: string }[];

  if (!badges.length) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {badges.map((b) => (
        <li
          key={b.key}
          className={`rounded-full px-2.5 py-0.5 font-display text-xs font-semibold tracking-wide uppercase ${b.cls}`}
        >
          {b.text}
        </li>
      ))}
    </ul>
  );
}
