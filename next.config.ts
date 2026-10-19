import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Product photos imported from Etsy are served from its CDN.
    remotePatterns: [{ protocol: "https", hostname: "i.etsystatic.com" }],
  },
};

export default withNextIntl(nextConfig);
