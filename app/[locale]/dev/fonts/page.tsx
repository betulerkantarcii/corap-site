import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export const metadata: Metadata = { robots: { index: false } };

const SAMPLE = "Çorap · Ç ç Ş ş Ğ ğ İ ı Ö ö Ü ü · Kedi çorabını çıkarmıyor!";

const FONTS = [
  { name: "Fredoka (display)", className: "font-display", weights: [300, 400, 500, 600, 700] },
  { name: "Nunito (body)", className: "font-body", weights: [400, 600, 700, 800] },
];

/** Internal QA page: every font weight in use, rendering Turkish characters. */
export default function FontCheckPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("DevFonts");

  return (
    <section className="section-sock mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-tabby-brown">{t("note")}</p>
      {FONTS.map((font) => (
        <div key={font.name} className="mt-10">
          <h2 className="text-sm font-semibold tracking-widest text-caramel-ink uppercase">
            {font.name}
          </h2>
          <ul className="mt-3 divide-y divide-black/10">
            {font.weights.map((w) => (
              <li
                key={w}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="w-12 shrink-0 font-mono text-sm text-tabby-brown">{w}</span>
                <span lang="tr" className={`${font.className} text-2xl`} style={{ fontWeight: w }}>
                  {SAMPLE}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
