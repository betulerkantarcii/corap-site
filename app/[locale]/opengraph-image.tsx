import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { BRAND, MARK_DATA_URI, brandFonts } from "@/lib/brand-art";

export const alt = "The House Cat · Çorap — two white sock paws on a dark background";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Site-wide share card: Çorap's sock paws on night, with the localized headline. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: `radial-gradient(circle at 25% 40%, #2a1d14 0%, ${BRAND.night} 60%)`,
        fontFamily: "Fredoka",
        padding: "0 80px",
        gap: 70,
      }}
    >
      <img src={MARK_DATA_URI} width={340} height={380} alt="" />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ color: BRAND.caramel, fontSize: 30, letterSpacing: 6 }}>THE HOUSE CAT</div>
        <div style={{ color: BRAND.pink, fontSize: 40, marginTop: 4 }}>Çorap</div>
        <div style={{ color: BRAND.sock, fontSize: 68, lineHeight: 1.05, marginTop: 28 }}>
          {t("headline")}
        </div>
      </div>
    </div>,
    { ...size, fonts: await brandFonts() },
  );
}
