// Brand links in one place. Edit here, not inside components.
export const site = {
  /** Public address of the site; set NEXT_PUBLIC_SITE_URL on Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagramUrl: "https://www.instagram.com/corapsucinar/",
  etsyShopUrl: "https://www.etsy.com/shop/THEHOUSECATcorap",
  /**
   * "Catch the Sock" reward. ⚠️ PLACEHOLDER: set `code` to a real Etsy coupon
   * code to show it to players who reach `minScore`. While it's null, players
   * get a shareable score card instead.
   */
  /** Shop price filter split points, in the products' currency (TL): "under 1,000", "1,000–2,000", "over 2,000". */
  priceBands: [1000, 2000] as const,
  gameReward: { code: null as string | null, minScore: 15 },
} as const;
