import { site } from "./site";

/*
  Instagram strip on the home page. We don't scrape Instagram: pick posts by
  hand and list them here. For each post add the image (put the file in
  /public/instagram/ or reuse one from /public), the post link (Share → Copy
  link on Instagram) and a short description for screen readers.

  ⚠️ PLACEHOLDER: these use photos already on the site and all link to the
  profile. Swap in real posts. Later this can be replaced by Instagram's
  official embed/API without touching the strip's design.
*/

export type InstaPost = {
  image: string;
  url: string;
  alt_en: string;
  alt_tr: string;
  /** Short handwritten-style caption under the polaroid. */
  caption_en?: string;
  caption_tr?: string;
};

export const instagramIsPlaceholder = true;

export const instagramPosts: InstaPost[] = [
  {
    image: "/corap/photo-music-sheet-close.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap looking to the side in front of sheet music",
    alt_tr: "Nota kâğıtlarının önünde yana bakan Çorap",
    caption_en: "music critic",
    caption_tr: "müzik eleştirmeni",
  },
  {
    image: "/art/corap-sock-paws.png",
    url: site.instagramUrl,
    alt_en: "Watercolor of Çorap's white sock paws",
    alt_tr: "Çorap'ın beyaz çoraplı patilerinin suluboya çizimi",
    caption_en: "the socks",
    caption_tr: "çoraplar",
  },
  {
    image: "/corap/photo-portrait.jpg",
    url: site.instagramUrl,
    alt_en: "Close-up of Çorap's face",
    alt_tr: "Çorap'ın yüzünün yakın çekimi",
    caption_en: "unimpressed",
    caption_tr: "etkilenmedi",
  },
  {
    image: "/products/caffeinated-art.png",
    url: site.instagramUrl,
    alt_en: "Illustration of Çorap holding a latte",
    alt_tr: "Latte tutan Çorap çizimi",
    caption_en: "first coffee",
    caption_tr: "ilk kahve",
  },
  {
    image: "/products/house-cat-green-room.jpg",
    url: site.instagramUrl,
    alt_en: "Illustration of Çorap in a green reading room",
    alt_tr: "Yeşil okuma odasında Çorap çizimi",
    caption_en: "the office",
    caption_tr: "ofis",
  },
  {
    image: "/corap/photo-music-sheet.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap sitting in front of a green wall",
    alt_tr: "Yeşil duvarın önünde oturan Çorap",
    caption_en: "posing",
    caption_tr: "poz veriyor",
  },
];
