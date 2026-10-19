import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";
import { products } from "@/lib/catalog";

/** /sitemap.xml — every public page in both languages, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/shop", "/about", ...products.map((p) => `/shop/${p.slug}`)];
  const url = (locale: string, path: string) => `${site.url}/${locale}${path}`;

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: url(locale, path),
      changeFrequency: path.startsWith("/shop/") ? "weekly" : "monthly",
      priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, url(l, path)])),
      },
    })),
  );
}
