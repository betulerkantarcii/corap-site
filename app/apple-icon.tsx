import { ImageResponse } from "next/og";
import { BRAND, MARK_DATA_URI } from "@/lib/brand-art";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the sock-paws mark on night (no transparency, as iOS expects). */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND.night,
      }}
    >
      <img src={MARK_DATA_URI} width={128} height={143} alt="" />
    </div>,
    size,
  );
}
