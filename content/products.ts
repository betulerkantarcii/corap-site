import type { Product } from "@/lib/catalog";

/*
  The shop's products, matching the live Etsy listings
  (https://www.etsy.com/shop/THEHOUSECATcorap), checked on 28 Oct 2026.

  Prices are what Etsy shows in Turkish lira; buyers outside Türkiye see Etsy's
  own conversion at checkout. Photos come straight from each Etsy listing.

  To change a product, edit it here. To bring in many listings at once, run
  `npm run import:etsy -- <export.csv>` (see README): it writes
  content/products.imported.json, which then replaces this list.
*/

const ETSY = "https://www.etsy.com/listing";
const IMG = "https://i.etsystatic.com/41098197/r/il";

const img = (path: string, alt_en: string, alt_tr: string) => ({
  src: `${IMG}/${path}`,
  alt_en,
  alt_tr,
});

export const products: Product[] = [
  {
    slug: "corap-sock-paws-sweatshirt",
    title_en: "Çorap Sweatshirt — Sock Paws",
    title_tr: "Çorap Sweatshirt — Çoraplı Patiler",
    description_en:
      "A black crewneck sweatshirt with Çorap's two front paws in the middle: tabby fur on top, white socks below. The design that gave her her name.",
    description_tr:
      "Ortasında Çorap'ın iki ön patisi olan siyah, bisiklet yaka sweatshirt: üstte tekir tüyler, altta beyaz çoraplar. Ona adını veren tasarım.",
    price: 1302.51,
    currency: "TRY",
    category: "sweatshirt",
    tags: ["sweatshirt", "crewneck", "paws", "cat"],
    images: [
      img(
        "f14b75/8754865601/il_fullxfull.8754865601_t5g5.jpg",
        "Black crewneck sweatshirt with a small centred print of two tabby cat legs with white sock paws",
        "Ortasında beyaz çoraplı iki tekir kedi bacağı baskısı olan siyah bisiklet yaka sweatshirt",
      ),
      img(
        "7b3690/8754875523/il_fullxfull.8754875523_7iz7.jpg",
        "Photo of Çorap sitting on a radiator by the window, showing her white sock paws",
        "Pencere kenarında kaloriferin üstünde oturan Çorap'ın fotoğrafı; beyaz çoraplı patileri görünüyor",
      ),
    ],
    etsyUrl: `${ETSY}/4598970726/corap-sweatshirt-black-crewneck-with-cat`,
    variants: [{ name_en: "Size", name_tr: "Beden", options: ["XS", "S", "M", "L", "XL"] }],
    featured: true,
    isNew: true,
    soldOut: false,
  },
  {
    slug: "coffee-cat-hoodie",
    title_en: "Coffee Cat Hoodie",
    title_tr: "Kahveli Kedi Kapüşonlu",
    description_en:
      "Black hoodie with Çorap holding her latte. Two print options: a large print on the front or a small one on the chest — send a message on Etsy to say which you'd like.",
    description_tr:
      "Lattesini tutan Çorap baskılı siyah kapüşonlu. İki baskı seçeneği var: önde büyük baskı ya da göğüste küçük baskı — hangisini istediğini Etsy'de mesajla ilet.",
    price: 1302.51,
    currency: "TRY",
    category: "hoodie",
    tags: ["hoodie", "coffee", "cat"],
    images: [
      img(
        "25cb6e/8717186739/il_fullxfull.8717186739_2gvj.jpg",
        "Black hoodie with a large front print of a tabby and white cat holding a latte",
        "Önünde latte tutan tekir-beyaz kedi büyük baskısı olan siyah kapüşonlu",
      ),
      img(
        "7a57d7/8669320526/il_fullxfull.8669320526_75pk.jpg",
        "Black hoodie with a small chest print of the same cat holding a latte",
        "Göğsünde aynı latte tutan kedinin küçük baskısı olan siyah kapüşonlu",
      ),
    ],
    etsyUrl: `${ETSY}/4594345918/cat-sweatshirt-graphic-print-of-cat`,
    variants: [
      { name_en: "Size", name_tr: "Beden", options: ["S", "M", "L", "XL"] },
      {
        name_en: "Print",
        name_tr: "Baskı",
        options: ["Large front", "Small chest"],
      },
    ],
    featured: true,
    isNew: false,
    soldOut: false,
  },
  {
    slug: "coffee-cat-tee",
    title_en: "Coffee Cat T-Shirt",
    title_tr: "Kahveli Kedi Tişört",
    description_en:
      "A white 100% cotton tee with a small print of Çorap holding her latte on the chest. Relaxed unisex fit, pre-shrunk, printed to order and shipped within 3–5 business days.",
    description_tr:
      "Göğsünde lattesini tutan küçük bir Çorap baskısı olan, %100 pamuklu beyaz tişört. Rahat unisex kalıp, çekmezlik işlemli; siparişe özel basılır ve 3–5 iş gününde kargolanır.",
    price: 833.61,
    currency: "TRY",
    category: "tshirt",
    tags: ["t-shirt", "coffee", "cotton"],
    images: [
      img(
        "69428c/8660754492/il_fullxfull.8660754492_py7x.jpg",
        "White T-shirt with a small chest print of a tabby and white cat holding a latte",
        "Göğsünde latte tutan tekir-beyaz kedi küçük baskısı olan beyaz tişört",
      ),
    ],
    etsyUrl: `${ETSY}/4593294377/white-t-shirt-cat-holding-coffee-cup`,
    variants: [{ name_en: "Size", name_tr: "Beden", options: ["S", "M", "L", "XL"] }],
    featured: true,
    isNew: false,
    soldOut: false,
  },
  {
    slug: "caffeinated-canvas",
    title_en: "Caffeinated — Canvas Print",
    title_tr: "Caffeinated — Kanvas Tablo",
    description_en:
      "Çorap behind the counter of her café, latte in paws, on a gallery-wrapped canvas. Museum-quality print on a 3.8 cm pine frame, matte finish, ready to hang.",
    description_tr:
      "Kafesinin tezgâhında, patilerinde lattesiyle Çorap; kasnağa gerilmiş kanvas üzerinde. 3,8 cm çam kasnak üzerine müze kalitesinde mat baskı, asmaya hazır.",
    price: 2083.5,
    currency: "TRY",
    category: "print",
    tags: ["canvas", "wall art", "coffee"],
    images: [
      img(
        "f6b8da/8708277699/il_fullxfull.8708277699_2mas.jpg",
        "Canvas print of Çorap holding a latte with the word Caffeinated, hanging in a café",
        "Bir kafede asılı, Caffeinated yazılı ve latte tutan Çorap kanvas tablosu",
      ),
      img(
        "3a89de/8708277165/il_fullxfull.8708277165_f94t.jpg",
        "Close-up of the Caffeinated canvas print",
        "Caffeinated kanvas tablonun yakın çekimi",
      ),
    ],
    etsyUrl: `${ETSY}/4593258042/coffee-served-gallery-canvas-print`,
    featured: true,
    isNew: false,
    soldOut: false,
  },
  {
    slug: "the-house-cat-canvas",
    title_en: "The House Cat — Vintage Canvas",
    title_tr: "The House Cat — Vintage Kanvas",
    description_en:
      "Navy halftone portrait of Çorap under varsity letters reading The House Cat, Est. 2021. Printed on canvas and ready to hang.",
    description_tr:
      "Kolej harfleriyle The House Cat, Est. 2021 yazısının altında lacivert raster Çorap portresi. Kanvas üzerine basılı, asmaya hazır.",
    price: 2083.5,
    currency: "TRY",
    category: "print",
    tags: ["canvas", "wall art", "retro"],
    images: [
      img(
        "fd3d4b/8646727671/il_fullxfull.8646727671_8h2x.jpg",
        "Navy halftone print of Çorap's face under arched letters reading The House Cat",
        "Kavisli The House Cat yazısının altında Çorap'ın yüzünün lacivert raster baskısı",
      ),
      img(
        "137a83/8598886244/il_fullxfull.8598886244_9itd.jpg",
        "The House Cat canvas hanging above a wooden sideboard",
        "Ahşap bir konsolun üstünde asılı The House Cat kanvası",
      ),
      img(
        "23a525/8598886548/il_fullxfull.8598886548_m8ku.jpg",
        "The House Cat canvas hanging above a bed",
        "Bir yatağın üstünde asılı The House Cat kanvası",
      ),
    ],
    etsyUrl: `${ETSY}/4585313569/cat-canvas-wall-art-vintage-feline`,
    featured: false,
    isNew: false,
    soldOut: false,
  },
];
