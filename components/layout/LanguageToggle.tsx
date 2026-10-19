"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** TR | EN pill. Real links (not buttons) so each language version is crawlable. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("LanguageToggle");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("label")}
      className={`flex rounded-full border border-sock-white/25 p-1 ${className}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={active ? t(l) : t("switchTo", { language: t(l) })}
            className={`bean-press min-w-11 rounded-full px-3 py-1.5 text-center font-display text-sm font-semibold uppercase transition-colors ${
              active ? "bg-bean-pink text-night" : "text-sock-white hover:text-bean-pink"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
