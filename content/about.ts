/*
  "Meet Çorap" page content. Edit freely — every text has a Turkish (tr) and
  English (en) version. Anything marked `placeholder: true` is sample text
  and shows a small "Sample" note on the site until you replace it and
  delete the flag.
*/

type L = { tr: string; en: string };

export type StoryBlock = L & { placeholder?: boolean };

export const story: StoryBlock[] = [
  {
    en: "Çorap is a brown tabby with a white blaze down her nose, green eyes and four perfect white socks. Her name means “sock” in Turkish — one look at her paws and you'll see why.",
    tr: "Çorap; burnundan aşağı inen beyaz bir şeridi, yeşil gözleri ve dört kusursuz beyaz çorabı olan kahverengi bir tekir. Adı bu yüzden Çorap — patilerine bir bakman yeterli.",
  },
  {
    placeholder: true,
    en: "Her story goes here: how she came home, her first day, the moment she decided she was in charge, and how the shop began.",
    tr: "Hikâyesi buraya gelecek: eve nasıl geldiği, ilk günü, patronun kendisi olduğuna karar verdiği an ve dükkânın nasıl başladığı.",
  },
];

/** Swipeable fun-fact cards. These are taken from her photos and the brand brief. */
export const funFacts: L[] = [
  { en: "“Çorap” is Turkish for “sock”.", tr: "“Çorap” İngilizcede “sock” demek." },
  {
    en: "She wears white socks on all four paws — front and back. Never once taken off.",
    tr: "Dört patisinde de beyaz çorap var — öndekilerde de arkadakilerde de. Hiç çıkarmadı.",
  },
  {
    en: "The line between tabby and sock is razor sharp. No fading, no compromise.",
    tr: "Tekir tüylerle çorap arasındaki çizgi jilet gibi keskin. Geçiş yok, taviz yok.",
  },
  {
    en: "Her toe beans are soft pink. Yes, all of them.",
    tr: "Pati yastıkları yumuşacık pembe. Evet, hepsi.",
  },
  {
    en: "She has the classic tabby “M” on her forehead and a white blaze right down the middle.",
    tr: "Alnında klasik tekir “M” işareti, tam ortasında da beyaz bir şerit var.",
  },
  { en: "Green eyes. Strong opinions.", tr: "Yeşil gözler. Net fikirler." },
  {
    en: "She runs The House Cat. The humans just work here.",
    tr: "The House Cat'i o yönetiyor. İnsanlar sadece burada çalışıyor.",
  },
];

export type GalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: L;
  kind: "photo" | "illustration";
};

export const gallery: GalleryItem[] = [
  {
    src: "/corap/photo-music-sheet-close.jpg",
    width: 1178,
    height: 976,
    kind: "photo",
    alt: {
      en: "Photo of Çorap looking to the side in front of sheet music, showing her tabby M, white blaze and green eyes",
      tr: "Nota kâğıtlarının önünde yana bakan Çorap'ın fotoğrafı; tekir M işareti, beyaz şeridi ve yeşil gözleri görünüyor",
    },
  },
  {
    src: "/corap/photo-portrait.jpg",
    width: 1400,
    height: 781,
    kind: "photo",
    alt: { en: "Close-up photo of Çorap's face", tr: "Çorap'ın yüzünün yakın çekim fotoğrafı" },
  },
  {
    src: "/corap/photo-music-sheet.jpg",
    width: 1400,
    height: 1156,
    kind: "photo",
    alt: {
      en: "Photo of Çorap sitting in front of a green wall and sheet music",
      tr: "Yeşil duvar ve nota kâğıtlarının önünde oturan Çorap'ın fotoğrafı",
    },
  },
  {
    src: "/art/corap-sock-paws.png",
    width: 1493,
    height: 2000,
    kind: "illustration",
    alt: {
      en: "Watercolor of Çorap's front legs: tabby fur ending in a sharp line above white paws with pink toe beans",
      tr: "Çorap'ın ön bacaklarının suluboya çizimi: tekir tüyler keskin bir çizgiyle bitiyor, altında pembe patili beyaz ayaklar",
    },
  },
  {
    src: "/corap/illustration-face.jpg",
    width: 638,
    height: 578,
    kind: "illustration",
    alt: {
      en: "Illustration of Çorap looking up with big green eyes",
      tr: "Kocaman yeşil gözlerle yukarı bakan Çorap çizimi",
    },
  },
  {
    src: "/products/corap-painted-sit.jpg",
    width: 896,
    height: 1200,
    kind: "illustration",
    alt: {
      en: "Painted portrait of Çorap sitting, showing her white socks",
      tr: "Beyaz çoraplarını gösteren, oturan Çorap'ın boyalı portresi",
    },
  },
];

export type TimelineItem = { time: string; title: L; text: L };

/** ⚠️ PLACEHOLDER schedule — a playful sample. Replace with her real routine. */
export const timelineIsPlaceholder = true;
export const dayInTheLife: TimelineItem[] = [
  {
    time: "06:00",
    title: { en: "Breakfast alarm", tr: "Kahvaltı alarmı" },
    text: { en: "She is the alarm.", tr: "Alarm kendisi." },
  },
  {
    time: "09:00",
    title: { en: "Quality control", tr: "Kalite kontrol" },
    text: {
      en: "Every new print gets sat on. Thoroughly.",
      tr: "Her yeni baskının üstüne oturulur. Özenle.",
    },
  },
  {
    time: "11:00",
    title: { en: "First nap", tr: "İlk şekerleme" },
    text: { en: "Sunny spot required.", tr: "Güneşli bir köşe şart." },
  },
  {
    time: "15:00",
    title: { en: "Window patrol", tr: "Pencere devriyesi" },
    text: { en: "Birds are reported, loudly.", tr: "Kuşlar yüksek sesle rapor edilir." },
  },
  {
    time: "18:00",
    title: { en: "Packing supervisor", tr: "Paketleme şefi" },
    text: { en: "Boxes are tested from the inside.", tr: "Kutular içeriden test edilir." },
  },
  {
    time: "22:00",
    title: { en: "Nap o'clock", tr: "Şekerleme saati" },
    text: { en: "Socks up. Do not disturb.", tr: "Çoraplar yukarı. Rahatsız etmeyin." },
  },
];
