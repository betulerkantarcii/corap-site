import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/**
 * Canonical URL + hreflang links for a page that exists in every language.
 * `path` is the part after the locale, e.g. "" (home), "/shop", "/shop/tee".
 * URLs are relative; the layout's metadataBase turns them absolute.
 */
export function alternates(locale: string, path: string): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${routing.defaultLocale}${path}`,
    },
  };
}
