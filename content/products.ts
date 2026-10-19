import type { Product } from "@/lib/catalog";
import { site } from "./site";

/*
  ⚠️ PLACEHOLDER PRODUCTS — built from the shop's real designs, but the titles,
  prices, variants and Etsy links are made up. Replace them by running
  `npm run import:etsy -- <your-etsy-export.csv>` (see README), which writes
  content/products.imported.json and takes over automatically.

  Until then each product links to the Etsy shop front.
*/

const S = (alt_en: string, alt_tr: string, src: string) => ({ src, alt_en, alt_tr });

const SIZES_APPAREL = { name_tr: "Beden", name_en: "Size", options: ["S", "M", "L", "XL"] };
const SIZES_PRINT = { name_tr: "Boyut", name_en: "Size", options: ["A4", "A3", "30×40 cm"] };

export const products: Product[] = [
  {
    slug: "caffeinated-tee",
    title_en: "Caffeinated Çorap Tee",
    title_tr: "Kafeinli Çorap Tişört",
    description_en:
      "A soft white tee with a tiny Çorap on the chest, guarding her latte. She did not share it.",
    description_tr:
      "Göğsünde lattesini koruyan minik bir Çorap olan yumuşak beyaz tişört. Paylaşmadı tabii.",
    price: 32,
    currency: "USD",
    category: "tshirt",
    tags: ["coffee", "minimal", "gift"],
    images: [
      S(
        "White T-shirt on a hanger with a small print of Çorap holding a latte on the chest",
        "Askıda, göğsünde latte tutan küçük bir Çorap baskısı olan beyaz tişört",
        "/products/caffeinated-tee.jpg",
      ),
      S(
        "Close-up of the illustration: Çorap holding a latte with heart foam art",
        "İllüstrasyonun yakını: kalpli köpüklü latte tutan Çorap",
        "/products/caffeinated-art.png",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    variants: [SIZES_APPAREL],
    featured: true,
    isNew: true,
    soldOut: false,
    placeholder: true,
  },
  {
    slug: "caffeinated-hoodie",
    title_en: "Caffeinated Çorap Hoodie",
    title_tr: "Kafeinli Çorap Kapüşonlu",
    description_en:
      "Black hoodie, big Çorap, bigger coffee. For mornings when you and the cat are equally unwilling.",
    description_tr:
      "Siyah kapüşonlu, kocaman Çorap, daha kocaman kahve. Sen de kedi de kalkmak istemediğinde.",
    price: 58,
    currency: "USD",
    category: "hoodie",
    tags: ["coffee", "cozy", "gift"],
    images: [
      S(
        "Black hoodie with a large center print of Çorap holding a latte",
        "Ortasında latte tutan büyük bir Çorap baskısı olan siyah kapüşonlu",
        "/products/caffeinated-hoodie.jpg",
      ),
      S(
        "The Caffeinated illustration on a café background",
        "Kafe arka planında Kafeinli illüstrasyonu",
        "/products/caffeinated-art-cafe.png",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    variants: [SIZES_APPAREL],
    featured: true,
    isNew: false,
    soldOut: false,
    placeholder: true,
  },
  {
    slug: "caffeinated-pocket-hoodie",
    title_en: "Pocket Çorap Hoodie",
    title_tr: "Cep Boy Çorap Kapüşonlu",
    description_en: "The same latte thief, pocket-sized, sitting on your heart. Subtle. Mostly.",
    description_tr: "Aynı latte hırsızı, cep boyutunda, tam kalbinin üstünde. Gayet sade. Sayılır.",
    price: 54,
    currency: "USD",
    category: "hoodie",
    tags: ["coffee", "minimal"],
    images: [
      S(
        "Black hoodie with a small left-chest print of Çorap holding a latte",
        "Sol göğsünde küçük bir latte tutan Çorap baskısı olan siyah kapüşonlu",
        "/products/caffeinated-hoodie-pocket.jpg",
      ),
      S(
        "Close-up of the illustration: Çorap holding a latte",
        "İllüstrasyonun yakını: latte tutan Çorap",
        "/products/caffeinated-art.png",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    variants: [SIZES_APPAREL],
    featured: false,
    isNew: true,
    soldOut: false,
    placeholder: true,
  },
  {
    slug: "caffeinated-print",
    title_en: "Caffeinated Art Print",
    title_tr: "Kafeinli Sanat Baskısı",
    description_en:
      "Çorap behind the counter of her café. Hang it in your kitchen; she'll supervise the coffee.",
    description_tr: "Kafesinin tezgâhında Çorap. Mutfağına as; kahveyi o denetleyecek.",
    price: 24,
    currency: "USD",
    category: "print",
    tags: ["coffee", "wall art", "kitchen"],
    images: [
      S(
        "Illustration of Çorap holding a latte in front of an espresso bar, with the word Caffeinated",
        "Espresso barının önünde latte tutan Çorap illüstrasyonu ve Caffeinated yazısı",
        "/products/caffeinated-art-cafe.png",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    variants: [SIZES_PRINT],
    featured: true,
    isNew: false,
    soldOut: false,
    placeholder: true,
  },
  {
    slug: "the-house-cat-badge-print",
    title_en: "The House Cat — Est. 2021 Print",
    title_tr: "The House Cat — Est. 2021 Baskı",
    description_en:
      "The official seal of the household. Çorap on her rug, in her armchair-filled kingdom, since 2021.",
    description_tr:
      "Evin resmî mührü. 2021'den beri halısında, koltuklarla dolu krallığında Çorap.",
    price: 22,
    currency: "USD",
    category: "print",
    tags: ["badge", "cozy", "wall art"],
    images: [
      S(
        "Round badge illustration reading The House Cat, Est. 2021, with Çorap sitting in a cozy living room",
        "The House Cat, Est. 2021 yazan yuvarlak rozet illüstrasyonu; sıcak bir salonda oturan Çorap",
        "/products/house-cat-badge.jpg",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    variants: [SIZES_PRINT],
    featured: true,
    isNew: false,
    soldOut: false,
    placeholder: true,
  },
  {
    slug: "the-house-cat-green-room-print",
    title_en: "The House Cat — Green Room Print",
    title_tr: "The House Cat — Yeşil Oda Baskısı",
    description_en:
      "Çorap in the green reading room: red velvet chair, lamp on, books stacked. Very serious. Very cat.",
    description_tr:
      "Yeşil okuma odasında Çorap: kırmızı kadife koltuk, lamba açık, kitaplar üst üste. Çok ciddi. Çok kedi.",
    price: 22,
    currency: "USD",
    category: "print",
    tags: ["vintage", "wall art"],
    images: [
      S(
        "Round illustration of Çorap sitting on a patterned rug in a green room with a red armchair and lamp",
        "Kırmızı koltuk ve lambalı yeşil bir odada desenli halıda oturan Çorap'ın yuvarlak illüstrasyonu",
        "/products/house-cat-green-room.jpg",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    variants: [SIZES_PRINT],
    featured: false,
    isNew: false,
    soldOut: false,
    placeholder: true,
  },
  {
    slug: "the-house-cat-halftone-print",
    title_en: "The House Cat — Varsity Halftone",
    title_tr: "The House Cat — Varsity Raster",
    description_en:
      "Navy halftone, varsity letters, one very close-up cat. Looks great on cream walls and on tote bags.",
    description_tr:
      "Lacivert raster, kolej harfleri, burnunu dayamış bir kedi. Krem duvarlarda da bez çantalarda da harika.",
    price: 26,
    currency: "USD",
    category: "print",
    tags: ["retro", "halftone", "wall art"],
    images: [
      S(
        "Navy halftone print of Çorap's face pressed close to the camera under arched letters reading The House Cat",
        "Kavisli The House Cat yazısının altında, kameraya yaklaşmış Çorap yüzünün lacivert raster baskısı",
        "/products/house-cat-halftone.jpg",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    variants: [SIZES_PRINT],
    featured: false,
    isNew: false,
    soldOut: true,
    placeholder: true,
  },
  {
    slug: "corap-sitting-sticker",
    title_en: "Sitting Çorap Sticker",
    title_tr: "Oturan Çorap Sticker",
    description_en:
      "Çorap, sitting politely, socks on. Waterproof vinyl for laptops, bottles and anything she hasn't knocked off a table yet.",
    description_tr:
      "Kibarca oturan, çorapları ayağında Çorap. Laptop, matara ve henüz masadan düşürmediği her şey için suya dayanıklı vinil.",
    price: 4.5,
    currency: "USD",
    category: "sticker",
    tags: ["sticker", "small gift"],
    images: [
      S(
        "Cartoon illustration of Çorap sitting and looking up, brown tabby with white chest and white paws",
        "Yukarı bakarak oturan Çorap'ın çizimi: beyaz göğüslü, beyaz patili kahverengi tekir",
        "/products/corap-cartoon-sit.jpg",
      ),
      S(
        "Painted portrait of Çorap sitting, showing her white socks",
        "Beyaz çoraplarını gösteren, oturan Çorap'ın boyalı portresi",
        "/products/corap-painted-sit.jpg",
      ),
    ],
    etsyUrl: site.etsyShopUrl,
    featured: false,
    isNew: true,
    soldOut: false,
    placeholder: true,
  },
];
