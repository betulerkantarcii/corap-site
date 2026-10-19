import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CALM_SCRIPT, DelightProvider } from "@/components/delight/DelightProvider";
import { PawCursor } from "@/components/delight/PawCursor";
import { PeekingCorap } from "@/components/delight/PeekingCorap";
import { SockRain } from "@/components/delight/SockRain";
import { YarnProgress } from "@/components/delight/YarnProgress";
import "../globals.css";

// latin-ext carries Ş ş Ğ ğ İ ı — without it Turkish falls back to a system font.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Body font isn't preloaded: text paints at once in a size-matched fallback and
// swaps to Nunito when it arrives, keeping it off the critical path for LCP.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("defaultTitle"), template: `%s · ${t("siteName")}` },
    description: t("defaultDescription"),
    applicationName: t("siteName"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Common" });

  return (
    <html
      lang={locale}
      className={`${fredoka.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* Applies saved calm mode before first paint (no motion flash). */}
        <script dangerouslySetInnerHTML={{ __html: CALM_SCRIPT }} />
        <NextIntlClientProvider>
          <DelightProvider>
            <a
              href="#main"
              className="sr-only z-50 rounded-full bg-bean-pink px-4 py-2 font-bold text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              {t("skipToContent")}
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <SmoothScroll />
            <YarnProgress />
            <PawCursor />
            <PeekingCorap />
            <SockRain />
          </DelightProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
