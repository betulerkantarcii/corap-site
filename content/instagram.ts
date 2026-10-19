import { site } from "./site";

/*
  Instagram strip on the home page. We don't scrape Instagram: pick posts by
  hand and list them here. For each post add the image (put the file in
  /public/instagram/ or reuse one from /public), the post link (Share → Copy
  link on Instagram) and a short description for screen readers.

  These are real photos of Çorap. ⚠️ The links still point to the profile:
  paste each post's own link into `url` once it's on Instagram. Later this
  can be replaced by Instagram's official embed/API without touching the
  strip's design.
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

export const instagramPosts: InstaPost[] = [
  {
    image: "/corap/photo-window-socks.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap by the window, white sock paws on the radiator",
    alt_tr: "Pencerenin önünde Çorap, beyaz çoraplı patileri kaloriferin üstünde",
    caption_en: "sock check",
    caption_tr: "çorap kontrolü",
  },
  {
    image: "/corap/photo-sleeping.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap asleep with one pink-beaned paw in front of her face",
    alt_tr: "Pembe patisi yüzünün önünde, uyuyan Çorap",
    caption_en: "nap o'clock",
    caption_tr: "şekerleme saati",
  },
  {
    image: "/corap/photo-yawn.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap mid-yawn on the sofa",
    alt_tr: "Kanepede esneyen Çorap",
    caption_en: "big yawn",
    caption_tr: "kocaman esneme",
  },
  {
    image: "/corap/photo-sunbeam.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap curled up in the sun",
    alt_tr: "Güneşte kıvrılmış Çorap",
    caption_en: "sunbathing",
    caption_tr: "güneşleniyor",
  },
  {
    image: "/corap/photo-sofa.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap lying on the sofa, looking straight at the camera",
    alt_tr: "Kanepede uzanmış, doğrudan kameraya bakan Çorap",
    caption_en: "the look",
    caption_tr: "o bakış",
  },
  {
    image: "/corap/photo-kitten-with-friend.jpg",
    url: site.instagramUrl,
    alt_en: "Çorap as a kitten on the sofa arm, an orange tabby cat beside her",
    alt_tr: "Yavruyken koltuğun kolunda Çorap, yanında turuncu tekir bir kedi",
    caption_en: "tiny Çorap",
    caption_tr: "minik Çorap",
  },
];
