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
    'Grafik tasarım alanındaki eğitimimi üç yıllık profesyonel deneyimimle birleştirerek farklı mecralara yönelik yaratıcı tasarım projeleri geliştirdim.',
    'Adobe Creative Cloud ve Blender kullanarak grafik tasarım, UI/UX, 3D modelleme ve dijital içerik üretimi alanlarında çalışıyorum. Baskı tasarımı, baskı öncesi hazırlık ve üretim süreçlerinde de deneyim sahibiyim.',
    'Marka kimliğine uygun, tutarlı ve amaca yönelik tasarımlar üretmeye odaklanıyorum. Güncel tasarım trendlerini ve yapay zekâ araçlarını iş akışıma entegre ederek üretim süreçlerini daha verimli hâle getiriyor, yaratıcı çözümlerimi sürekli geliştiriyorum.',
  ],
};

export const navLinks = [
  { label: 'Hakkımda', href: '#hakkimda' },
  { label: 'Yetkinlikler', href: '#yetkinlikler' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'İletişim', href: '#iletisim' },
];

/** Yetkinlikler bölümü. Başlıklar büyük harfle yazılır (Türkçe büyük harf kuralı İngilizce kelimeleri bozmasın). */
export const services = [
  {
    no: '01',
    name: 'GRAFİK TASARIM & DİJİTAL KREATİF',
    text: 'Dijital kampanyalar, reklam görselleri, web banner’ları ve kurumsal iletişim materyallerinin tasarımı.',
  },
  {
    no: '02',
    name: 'SOSYAL MEDYA & VİDEO TASARIMI',
    text: 'Sosyal medya gönderileri, hikâyeler, kampanya kreatifleri, kısa tanıtım videoları ve hareketli görsel içerik üretimi.',
  },
  {
    no: '03',
    name: 'BASKI TASARIMI & ÜRETİM HAZIRLIĞI',
    text: 'Broşür, katalog, menü, afiş ve diğer basılı materyallerin tasarımı; baskı öncesi dosya hazırlığı ve teknik kontroller.',
  },
  {
    no: '04',
    name: 'UI/UX TASARIMI',
    text: 'Web ve mobil arayüzler, wireframe, kullanıcı akışları ve prototipler üzerinden işlevsel dijital deneyimler tasarlama.',
  },
  {
    no: '05',
    name: '3D TASARIM & GÖRSELLEŞTİRME',
    text: 'Blender ile 3D modelleme, malzeme ve ışık düzenlemeleri, sahne oluşturma ve ürün görselleştirme.',
  },
  {
    no: '06',
    name: 'MARKA KİMLİĞİ & GÖRSEL TUTARLILIK',
    text: 'Tipografi, renk sistemleri ve görsel uygulamalar aracılığıyla marka bütünlüğünü farklı iletişim mecralarında sürdürme.',
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

/** Projelerin altında görünen dil yetkinlikleri (İngilizce yazılır, olduğu gibi gösterilir) */
export const languages: { code: string; flag: 'GB' | 'RU' | 'JP'; name: string; level: string; primary?: boolean }[] = [
  { code: 'EN', flag: 'GB', name: 'English', level: 'Professional Working Proficiency', primary: true },
  { code: 'RU', flag: 'RU', name: 'Russian', level: 'Basic' },
  { code: 'JP', flag: 'JP', name: 'Japanese', level: 'Basic' },
];

/** İletişim bilgileri */
export const contact = {
  email: 'aozgor9@gmail.com',
  phone: '0507 988 84 01',
  /** Uluslararası biçim: tel: bağlantısı için */
  phoneIntl: '+905079888401',
};
