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
    src: "/corap/photo-window-socks.jpg",
    width: 1200,
    height: 1600,
    kind: "photo",
    alt: {
      en: "Çorap sitting by the window between white curtains, her white sock paws lined up on the radiator",
      tr: "Beyaz perdelerin arasında pencerenin önünde oturan Çorap; beyaz çoraplı patileri kaloriferin üstünde yan yana",
    },
  },
  {
    src: "/corap/photo-sofa.jpg",
    width: 1200,
    height: 1600,
    kind: "photo",
    alt: {
      en: "Çorap lying on the sofa looking into the camera, white chest and paws tucked in",
      tr: "Kanepede uzanmış, kameraya bakan Çorap; beyaz göğsü ve patileri altına toplanmış",
    },
  },
  {
    src: "/corap/photo-sleeping.jpg",
    width: 899,
    height: 1599,
    kind: "photo",
    alt: {
      en: "Close-up of Çorap asleep on the sofa, one white paw with pink toe beans in front of her face",
      tr: "Kanepede uyuyan Çorap'ın yakın çekimi; yüzünün önünde pembe pati yastıklı beyaz bir patisi",
    },
  },
  {
    src: "/corap/photo-yawn.jpg",
    width: 899,
    height: 1599,
    kind: "photo",
    alt: {
      en: "Çorap lying on her back on the sofa mid-yawn, mouth wide open",
      tr: "Kanepede sırt üstü uzanmış, ağzı kocaman açık esneyen Çorap",
    },
  },
  {
    src: "/corap/photo-sunbeam.jpg",
    width: 1600,
    height: 1200,
    kind: "photo",
    alt: {
      en: "Çorap curled up in a patch of sunlight against a pale green wall",
      tr: "Açık yeşil duvarın önünde, güneş ışığında kıvrılmış Çorap",
    },
  },
  {
    src: "/corap/photo-kitten-with-friend.jpg",
    width: 960,
    height: 1280,
    kind: "photo",
    alt: {
      en: "Çorap as a kitten sitting on the arm of a sofa, with an orange tabby cat sitting on the floor beside it",
      tr: "Yavruyken koltuğun kolunda oturan Çorap; yanında yerde oturan turuncu tekir bir kedi",
    },
  },
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
    src: "/corap/illustration-sitting-socks.jpg",
    width: 1086,
    height: 1448,
    kind: "illustration",
    alt: {
      en: "Detailed illustration of Çorap sitting and looking up, her white socks and striped tail on show",
      tr: "Oturup yukarı bakan Çorap'ın detaylı çizimi; beyaz çorapları ve çizgili kuyruğu görünüyor",
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
