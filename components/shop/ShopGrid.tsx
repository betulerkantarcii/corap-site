"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useDelight } from "@/components/delight/DelightProvider";
import { PawPrint } from "@/components/ui/PawPrint";
import { CATEGORIES, formatPrice, type Category, type Product } from "@/lib/catalog";
import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";

const PRICE_BANDS = ["any", "under25", "25to50", "over50"] as const;
type PriceBand = (typeof PRICE_BANDS)[number];
const SORTS = ["featured", "newest", "priceAsc", "priceDesc"] as const;
type Sort = (typeof SORTS)[number];

const inBand = (p: Product, band: PriceBand) =>
  band === "any" ||
  (band === "under25" && p.price < 25) ||
  (band === "25to50" && p.price >= 25 && p.price <= 50) ||
  (band === "over50" && p.price > 50);

const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  featured: (a, b) =>
    Number(b.featured) - Number(a.featured) || Number(a.soldOut) - Number(b.soldOut),
  newest: (a, b) => Number(b.isNew) - Number(a.isNew),
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
};

function pick<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/** Filterable, sortable product grid. Filters are mirrored in the URL so they can be shared. */
export function ShopGrid({ products }: { products: Product[] }) {
  const t = useTranslations("Shop");
  const locale = useLocale();
  const reduce = !useDelight().motionOK;
  const [category, setCategory] = useState<Category | "all">("all");
  const [band, setBand] = useState<PriceBand>("any");
  const [sort, setSort] = useState<Sort>("featured");

  // Restore from ?category=&price=&sort= once on load.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setCategory(pick<Category | "all">(q.get("category"), ["all", ...CATEGORIES], "all"));
    setBand(pick(q.get("price"), PRICE_BANDS, "any"));
    setSort(pick(q.get("sort"), SORTS, "featured"));
  }, []);

  useEffect(() => {
    const q = new URLSearchParams();
    if (category !== "all") q.set("category", category);
    if (band !== "any") q.set("price", band);
    if (sort !== "featured") q.set("sort", sort);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [category, band, sort]);

  const visible = useMemo(
    () =>
      products
        .filter((p) => (category === "all" || p.category === category) && inBand(p, band))
        .sort(sorters[sort]),
    [products, category, band, sort],
  );

  const presentCategories = CATEGORIES.filter((c) => products.some((p) => p.category === c));
  const currency = products[0]?.currency ?? "USD";
  const money = (n: number) =>
    formatPrice({ price: n, currency }, locale).replace(/[.,]00(?=\D*$)/, "");
  const bandLabel: Record<PriceBand, string> = {
    any: t("priceAny"),
    under25: t("priceUnder", { amount: money(25) }),
    "25to50": t("priceBetween", { from: money(25), to: money(50) }),
    over50: t("priceOver", { amount: money(50) }),
  };

  const clear = () => {
    setCategory("all");
    setBand("any");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <ChipGroup
            label={t("category")}
            options={["all", ...presentCategories] as const}
            value={category}
            onChange={setCategory}
            render={(c) => (c === "all" ? t("all") : t(`categories.${c}`))}
          />
          <ChipGroup
            label={t("price")}
            options={PRICE_BANDS}
            value={band}
            onChange={setBand}
            render={(b) => bandLabel[b]}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-tabby-brown" aria-live="polite">
            {t("results", { count: visible.length })}
          </p>
          <label className="flex items-center gap-2 text-sm font-semibold text-tabby-brown">
            {t("sort")}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-h-11 rounded-full border-2 border-tabby-brown/30 bg-sock-white px-4 font-display text-tabby-spot"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {t(`sortOptions.${s}`)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState onClear={clear} />
      ) : (
        <motion.ul layout={!reduce} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              >
                <ProductCard product={p} priority={i < 3} headingLevel={2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}

type ChipGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render: (v: T) => string;
};

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
}: ChipGroupProps<T>) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span
        aria-hidden="true"
        className="mr-1 w-full text-xs font-bold tracking-widest text-caramel-ink uppercase sm:w-auto"
      >
        {label}
      </span>
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={`bean-press inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 px-4 font-display text-sm font-semibold transition-colors ${
              active
                ? "border-tabby-spot bg-tabby-spot text-sock-white"
                : "border-tabby-brown/25 bg-sock-white text-tabby-brown hover:border-tabby-brown"
            }`}
          >
            {active && <PawPrint className="h-3.5 w-3.5 text-bean-pink" />}
            {render(o)}
          </button>
        );
      })}
    </fieldset>
  );
}
