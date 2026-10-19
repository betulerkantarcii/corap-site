"use client";

import { useTranslations } from "next-intl";
import { BeanPaw } from "@/components/ui/icons";
import type { Product } from "@/lib/catalog";
import { checkout } from "@/lib/checkout";

type EtsyButtonProps = {
  product: Product;
  size?: "md" | "lg";
  /** Background the button sits on — picks a sold-out style that keeps AA contrast. */
  surface?: "light" | "dark";
  className?: string;
};

/** Buy button. A toe-bean stamp presses in on click (CSS only, see .paw-press). */
export function EtsyButton({
  product,
  size = "md",
  surface = "light",
  className = "",
}: EtsyButtonProps) {
  const t = useTranslations("Product");
  const label = product.soldOut ? t("seeOnEtsy") : t("buyOnEtsy");
  const look = !product.soldOut
    ? "bg-bean-pink text-night hover:bg-bean-pink-deep"
    : surface === "dark"
      ? "border-2 border-sock-white text-sock-white hover:bg-sock-white hover:text-night"
      : "border-2 border-tabby-brown text-tabby-brown hover:bg-tabby-brown hover:text-sock-white";
  const dims = size === "lg" ? "min-h-14 px-7 text-lg" : "min-h-11 px-5 text-sm";

  return (
    <a
      href={checkout.href(product)}
      target={checkout.external ? "_blank" : undefined}
      rel={checkout.external ? "noopener noreferrer" : undefined}
      data-checkout={checkout.id}
      className={`paw-press bean-press relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold whitespace-nowrap transition-colors ${look} ${dims} ${className}`}
    >
      <span className="paw-press-stamp" aria-hidden="true">
        <BeanPaw className="h-full w-full" />
      </span>
      <BeanPaw className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
      <span>{label}</span>
      {checkout.external && <span className="sr-only">{t("opensInNewTab")}</span>}
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M6 3h7v7M13 3 4 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
