"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, type CSSProperties } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/catalog";

/**
 * Featured products as a row of dresser drawers. Each drawer front slides away
 * as it scrolls into view (or on hover/focus/tap), so products are never stuck
 * behind it. Reduced motion / calm mode: fronts are simply not drawn.
 */
export function SockDrawer({ products }: { products: Product[] }) {
  const t = useTranslations("Home");
  const shop = useTranslations("Shop");
  const scroller = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const cells = scroller.current?.querySelectorAll<HTMLElement>(".drawer-cell");
    if (!cells?.length) return;
    let batch = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (!e.isIntersecting || el.dataset.open === "true") return;
          // stagger drawers that open together
          el.style.setProperty("--drawer-delay", `${batch++ * 140}ms`);
          el.dataset.open = "true";
          io.unobserve(el);
        });
        batch = 0;
      },
      { threshold: 0.6 },
    );
    cells.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    const cell = el?.querySelector<HTMLElement>(".drawer-cell");
    if (el && cell) el.scrollBy({ left: dir * (cell.offsetWidth + 20), behavior: "smooth" });
  };

  const open = (e: React.MouseEvent<HTMLElement>) => {
    const cell = (e.currentTarget as HTMLElement).closest<HTMLElement>(".drawer-cell");
    if (cell) cell.dataset.open = "true";
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] text-caramel-ink uppercase">
            {t("drawerEyebrow")}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-tabby-spot sm:text-4xl">
            {t("drawerTitle")}
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              aria-label={dir < 0 ? t("drawerPrev") : t("drawerNext")}
              className="bean-press grid h-12 w-12 place-items-center rounded-full border-2 border-tabby-brown text-tabby-brown hover:bg-tabby-brown hover:text-sock-white"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path
                  d={dir < 0 ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={scroller}
        aria-label={t("drawerLabel")}
        className="drawer-scroller -mx-4 mt-8 flex gap-5 overflow-x-auto px-4 pt-2 pb-6"
      >
        {products.map((p, i) => (
          <li
            key={p.slug}
            className="drawer-cell w-[78vw] max-w-[20rem] shrink-0 sm:w-[19rem]"
            style={{ "--drawer-delay": `${i * 140}ms` } as CSSProperties}
          >
            <div className="drawer-window">
              <ProductCard product={p} />
              <div className="drawer-front" aria-hidden="true" onClick={open} onMouseEnter={open}>
                <div className="flex flex-col items-center gap-4">
                  <span className="drawer-label">{shop(`categories.${p.category}`)}</span>
                  <span className="drawer-knob" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
