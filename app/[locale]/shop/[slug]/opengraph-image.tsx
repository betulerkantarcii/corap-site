import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";
import { BRAND, MARK_DATA_URI, brandFonts, publicImageDataUri } from "@/lib/brand-art";
import { getProduct, products, title, type Product } from "@/lib/catalog";

export const alt = "Product from The House Cat · Çorap";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

/** Product share card: the product photo beside its name and price, on night. */
export default async function ProductOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: "tr" | "en"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  const photo = product?.images[0] ? await publicImageDataUri(product.images[0].src) : null;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BRAND.night,
        fontFamily: "Fredoka",
        padding: 50,
        gap: 56,
      }}
    >
      <div
        style={{
          width: 430,
          height: 530,
          display: "flex",
          borderRadius: 36,
          overflow: "hidden",
          background: BRAND.sock,
        }}
      >
        {photo && (
          <img src={photo} width={430} height={530} style={{ objectFit: "cover" }} alt="" />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
        <img src={MARK_DATA_URI} width={90} height={100} alt="" />
        <div style={{ color: BRAND.caramel, fontSize: 26, letterSpacing: 5, marginTop: 24 }}>
          THE HOUSE CAT · ÇORAP
        </div>
        <div style={{ color: BRAND.sock, fontSize: 60, lineHeight: 1.08, marginTop: 14 }}>
          {product ? title(product, locale) : "Çorap"}
        </div>
        {product && (
          <div style={{ color: BRAND.pink, fontSize: 44, marginTop: 22 }}>
            {ogPrice(product, locale)}
          </div>
        )}
      </div>
    </div>,
    { ...size, fonts: await brandFonts() },
  );
}

/** "1.302,51 TL" — the share-card font has no ₺ glyph, so lira is written as TL. */
function ogPrice(p: Product, locale: "tr" | "en") {
  const n = new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(p.price);
  return `${n} ${p.currency === "TRY" ? "TL" : p.currency}`;
}
