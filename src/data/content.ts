// Sitedeki tüm metinler tek yerde. İsim, unvan veya iletişim bilgisini buradan değiştir.

export const site = {
  name: 'Adnan Özgör',
  firstName: 'Adnan',
  heroHeading: 'Merhaba',
  heroIntroTitle: 'Ben Adnan Özgör.',
  /** Giriş metni: her eleman ayrı paragraf */
  heroIntro: [
    'Üç yıllık profesyonel deneyimim boyunca Kaya Palazzo Hotels & Resorts, Kaya Hotels & Resorts ve Abant Su markaları için sosyal medya, video, dijital kreatif ve baskı tasarımları geliştirdim.',
    'Yaratıcı bakış açım ve teknik yetkinliklerimle markaların kimliğini güçlendiren, özgün ve etkili tasarım çözümleri üretiyorum.',
  ],
  /** Giriş metninin altındaki unvan satırı (İngilizce, yazıldığı gibi gösterilir) */
  heroTagline: ['Graphic Designer', 'Social Media, Digital, Print, Motion & UI/UX Design'],
  /** Hakkımda bölümü: her eleman ayrı paragraf */
  about: [
    'Merhaba, ben Adnan Özgör. Grafik tasarım mezunuyum ve Kaya Holding’de 3 yıl grafik tasarımcı olarak çalıştım.',
    'Grafik tasarım, UI/UX ve 3D tasarım alanlarında çalışmalar üretiyorum. Adobe Creative Suite ve Blender kullanıyorum. Dijital tasarımın yanı sıra baskı hazırlığı ve üretim süreçleri konusunda da deneyim sahibiyim.',
    'Tasarımda sadeliğe, işlevselliğe ve görsel bütünlüğe önem veriyorum.',
  ],
};

export const navLinks = [
  { label: 'Hakkımda', href: '#hakkimda' },
  { label: 'Hizmetler', href: '#hizmetler' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'İletişim', href: '#iletisim' },
];

export const services = [
  {
    no: '01',
    name: 'Grafik Tasarım',
    text: 'Kampanya, basılı materyal, ambalaj ve sosyal medya için markanın diline uygun, dikkat çeken görsel işler.',
  },
  {
    no: '02',
    name: 'UI/UX Tasarım',
    text: 'Kullanıcı akışından wireframe ve prototipe; sade, anlaşılır ve kullanıcıyı hedefe taşıyan arayüzler.',
  },
  {
    no: '03',
    name: '3D Tasarım',
    text: 'Ürün görselleştirme, obje ve sahne modelleme; ışık, doku ve malzemeyle gerçekçi renderlar.',
  },
  {
    no: '04',
    name: 'Marka Kimliği',
    text: 'Logodan bütün marka sistemine kadar tutarlı, akılda kalan ve markayı doğru anlatan kimlikler.',
  },
  {
    no: '05',
    name: 'MOTION & DİJİTAL',
    text: 'Hareketli grafikler ve kısa animasyonlarla markaya enerji katan dijital içerikler.',
  },
  {
    no: '06',
    name: 'Baskı Çalışması',
    text: 'Katalog, broşür, afiş, ambalaj ve açık hava işleri için baskıya hazır dosyalar; renk, kesim payı ve üretim sürecinin takibi.',
  },
];

/**
 * Portrenin etrafındaki yörüngede dönen programlar.
 * Resmî ikonlarını kullanmak istersen dosyayı `public/icons/` klasörüne koyup
 * `icon` alanına yolunu yaz, örn. icon: 'icons/figma.svg'. Boş olanlarda isim gösterilir.
 */
export const tools: { name: string; icon?: string }[] = [
  { name: 'After Effects' },
  { name: 'Premiere Pro' },
  { name: 'Blender' },
  { name: 'Figma' },
  { name: 'Illustrator' },
  { name: 'Photoshop' },
];

/**
 * Arka plan müziği: `public/music/MUSIC.mp3` (telifsiz parça).
 * Ziyaretçi sağdaki müzik butonuna basınca döngüde çalar.
 * Parçayı değiştirmek için dosyayı aynı adla değiştirmen yeterli.
 * `artist` doluysa butonun üstünde "Sanatçı — Parça" olarak görünür.
 */
export const music: { src: string; title: string; artist?: string } = {
  src: 'music/MUSIC.mp3',
  title: 'Arka plan müziği',
};

/** İletişim bilgileri */
export const contact = {
  email: 'aozgor9@gmail.com',
  phone: '0507 988 84 01',
  /** Uluslararası biçim: tel: bağlantısı için */
  phoneIntl: '+905079888401',
};
