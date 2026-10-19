import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { MascotPlayground } from "./MascotPlayground";

export const metadata: Metadata = { title: "Mascot preview", robots: { index: false } };

/** Internal preview of every mascot pose, mood, logo and icon. Not linked from the site. */
export default function MascotPreviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <MascotPlayground />;
}
