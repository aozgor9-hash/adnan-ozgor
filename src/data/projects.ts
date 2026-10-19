// Projeler: GÖRSELLER klasöründeki dört klasörden (ABANT, cgi, Kreatif içerik + creative video, uı ux).
// Dosyalar `public/projects/<slug>/` altında. Yeni bir görsel eklemek için dosyayı
// o klasöre koy ve aşağıdaki `media` listesine sırayla yaz.

export type Media = (
  | { kind: 'image'; src: string; w: number; h: number; alt: string }
  | { kind: 'video'; src: string; poster: string; w: number; h: number; alt: string }
) & {
  /** Galeride görselin köşesinde görünen küçük etiket, örn. 'Konsept çalışma' */
  badge?: string;
};

/** Proje kartındaki üç alan: [sol üst, sol alt, sağ büyük]. Video verilirse kartta sessiz oynar. */
export type CoverSlot = { src: string; video?: string };

export type Project = {
  no: string;
  /** Galeri sayfasının adresi: #proje-<slug> */
  slug: string;
  name: string;
  category: string;
  cover: [CoverSlot, CoverSlot, CoverSlot];
  /** Galeri sayfasında bu sırayla görünür */
  media: Media[];
  /** Görsel yokken kullanılan yer tutucu renkleri: [koyu, orta, açık] */
  palette: [string, string, string];
};

const img = (slug: string, file: string, w: number, h: number, alt: string): Media => ({
  kind: 'image',
  src: `projects/${slug}/${file}`,
  w,
  h,
  alt,
});

const vid = (slug: string, file: string, w: number, h: number, alt: string): Media => ({
  kind: 'video',
  src: `projects/${slug}/${file}.mp4`,
  poster: `projects/${slug}/${file}.webp`,
  w,
  h,
  alt,
});

export const projects: Project[] = [
  {
    no: '01',
    slug: 'abant-su',
    name: 'Abant Su',
    category: 'Kaya Holding · Marka ve Sosyal Medya',
    palette: ['#06263D', '#1D6FA3', '#9FD8F2'],
    cover: [
      { src: 'projects/abant-su/02.webp' },
      { src: 'projects/abant-su/06.webp' },
      { src: 'projects/abant-su/01.webp' },
    ],
    media: [
      img('abant-su', '01.webp', 1128, 1400, 'Abant cam şişe, su sıçraması'),
      img('abant-su', '02.webp', 1080, 1350, 'Abant kristaller arasında cam şişe'),
      img('abant-su', '03.webp', 1045, 1400, 'Abant pet şişe, su kanatları'),
      img('abant-su', '04.webp', 1080, 1350, 'Abant lacivert şişeler'),
      img('abant-su', '05.webp', 1080, 1350, 'Abant gazlı maden suyu, kristaller'),
      img('abant-su', '06.webp', 1120, 1400, 'Abant pet şişe, piknik'),
      img('abant-su', '07.webp', 986, 1400, 'Abant şişeler havuzda'),
      img('abant-su', '08.webp', 1080, 1350, 'Abant Premium şişeler, kristaller'),
      img('abant-su', '09.webp', 933, 1400, 'Abant pet şişe, dalga'),
      img('abant-su', '10.webp', 1080, 1350, 'Abant kreatif, uçurtma'),
      img('abant-su', '11.webp', 1080, 1350, 'Abant kreatif, plaj'),
      img('abant-su', '12.webp', 1400, 1400, 'Abant damacana, Doğanın en saf hali'),
    ],
  },
  {
    no: '02',
    slug: 'cgi',
    name: 'CGI Animasyon',
    category: 'Abant Su · Palazzo Golf Club',
    palette: ['#0B1A2A', '#2E6A8E', '#BFE3F5'],
    cover: [
      { src: 'projects/cgi/01-kare.webp' },
      { src: 'projects/cgi/02.webp', video: 'projects/cgi/02.mp4' },
      { src: 'projects/cgi/01.webp', video: 'projects/cgi/01.mp4' },
    ],
    media: [
      vid('cgi', '01', 1280, 720, 'Abant Su CGI reklam panosu'),
      vid('cgi', '02', 1280, 720, 'Palazzo Golf Club CGI reklam panosu'),
    ],
  },
  {
    no: '03',
    slug: 'kreatif-icerik',
    name: 'Kreatif İçerik',
    category: 'Kaya Hotels · Kaya Palazzo · Abant',
    palette: ['#0C211C', '#2F5E4E', '#CFAE6A'],
    cover: [
      { src: 'projects/kreatif-icerik/09.webp' },
      { src: 'projects/kreatif-icerik/06.webp' },
      { src: 'projects/kreatif-icerik/03.webp', video: 'projects/kreatif-icerik/03.mp4' },
    ],
    media: [
      vid('kreatif-icerik', '01', 720, 1280, 'Abant kreatif video, Her yolda her anda'),
      vid('kreatif-icerik', '02', 720, 1280, 'Kaya Hotels yılbaşı konserleri videosu'),
      vid('kreatif-icerik', '03', 360, 640, 'Kaya Hotels sahil videosu'),
      vid('kreatif-icerik', '04', 720, 1280, 'Kaya Palazzo tanıtım videosu'),
      img('kreatif-icerik', '05.webp', 1154, 1400, 'Kaya Palazzo, Kendini tatile bırak'),
      img('kreatif-icerik', '06.webp', 700, 1196, 'Kaya Hotels, Yaz mevsimi bitmeden mailing'),
      img('kreatif-icerik', '07.webp', 998, 1400, 'Palazzo Lounge kayak merkezi'),
      img('kreatif-icerik', '08.webp', 700, 1000, 'Kaya Great Northern Hotel mailing'),
      img('kreatif-icerik', '09.webp', 700, 704, 'Bavulla kayan kayakçı'),
      img('kreatif-icerik', '10.webp', 700, 1207, 'Kartalkaya kar tatili mailing'),
      img('kreatif-icerik', '11.webp', 700, 1000, 'Kayak keyfi için yeriniz hazır'),
      img('kreatif-icerik', '12.webp', 700, 1000, 'Bayram tatili kampanyası'),
    ],
  },
  {
    no: '04',
    slug: 'ui-ux',
    name: 'UI/UX Tasarım',
    category: 'ABANT APP · PILLPAY VE PLAY MUSIC (KONSEPT)',
    palette: ['#120318', '#5B1C86', '#C9B6F2'],
    cover: [
      { src: 'projects/ui-ux/03.webp' },
      { src: 'projects/ui-ux/02.webp' },
      { src: 'projects/ui-ux/01.webp', video: 'projects/ui-ux/01.mp4' },
    ],
    media: [
      { ...vid('ui-ux', '01', 1280, 676, 'PillPay konsept uygulama tanıtımı'), badge: 'Konsept çalışma' },
      vid('ui-ux', '02', 960, 540, 'Abant App uygulama tanıtımı'),
      { ...vid('ui-ux', '03', 960, 540, 'Play Music konsept uygulama tanıtımı'), badge: 'Konsept çalışma' },
      // Tanıtım videolarından sonra mockup tasarımları
      { ...img('ui-ux', '04.webp', 1600, 1200, 'PillPay konsept uygulama ekranları'), badge: 'Konsept çalışma' },
      img('ui-ux', '05-abant-v2.webp', 1600, 1200, 'Abant App uygulama ekranları'),
      { ...img('ui-ux', '06.webp', 1600, 1200, 'Play Music konsept uygulama ekranları'), badge: 'Konsept çalışma' },
    ],
  },
];
