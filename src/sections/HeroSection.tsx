import { useScroll } from 'framer-motion';
import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { ContactButton } from '../components/Buttons';
import AmbientGlow from '../components/AmbientGlow';
import ErrorBoundary from '../components/ErrorBoundary';
import { FACE_ASPECT } from '../components/faceAspect';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ScrollCue from '../components/ScrollCue';
import SkillOrbit from '../components/SkillOrbit';
import { navLinks, site } from '../data/content';
import faceUrl from '../assets/face.webp';

// 3D sahne (three.js) ayrı dosyada yüklenir: sayfa önce açılır, yüz hazır olunca fotoğrafın yerini alır
const Face3D = lazy(() => import('../components/Face3D'));
import depthUrl from '../assets/face-depth.png';

/** Başlığı satıra tam sığacak boyuta ölçekler (isim uzunluğu değişse de taşmaz). */
function useFitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el?.parentElement) return;
    const parent = el.parentElement;
    const fit = () => {
      const cs = getComputedStyle(parent);
      const avail = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      let size = 100;
      el.style.fontSize = `${size}px`;
      // iki tur: harf aralığı ve kerning ölçekle tam doğrusal değil
      for (let i = 0; i < 2; i++) {
        const w = el.getBoundingClientRect().width;
        if (w <= 0) return;
        size *= avail / w;
        el.style.fontSize = `${size}px`;
      }
    };
    fit();
    // Font yüklenince ölçüler değişir; yükleme bittiğinde yeniden sığdır
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener('loadingdone', fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener('loadingdone', fit);
    };
  }, []);
  return ref;
}

/**
 * Portreyi tanıtım metninin altında kalan alana sığdırır: metin uzasa da ekran kısalsa da
 * yüz yazının üstüne binmez. Çok kısa ekranlarda en küçük boyutta kalır.
 */
function usePortraitFit(
  introRef: RefObject<HTMLDivElement>,
  portraitRef: RefObject<HTMLDivElement>,
) {
  useLayoutEffect(() => {
    const intro = introRef.current;
    const portrait = portraitRef.current;
    const stage = portrait?.parentElement;
    if (!intro || !portrait || !stage) return;
    const fit = () => {
      const vw = window.innerWidth;
      const max = vw >= 1024 ? 660 : vw >= 768 ? 560 : vw >= 640 ? 480 : Math.min(460, vw * 1.15);
      const min = Math.min(max, vw < 640 ? 250 : 320);
      // metnin alt kenarı (FadeIn'in kaydırma animasyonundan etkilenmeyen ölçü)
      let bottom = intro.offsetHeight;
      for (let el: HTMLElement | null = intro; el && el !== stage; el = el.offsetParent as HTMLElement | null)
        bottom += el.offsetTop;
      const free = stage.clientHeight - bottom - (vw < 640 ? 8 : 16);
      const w = Math.max(min, Math.min(max, free / FACE_ASPECT));
      portrait.style.width = `${Math.round(w)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener('loadingdone', fit);
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    ro.observe(intro);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener('loadingdone', fit);
    };
  }, [introRef, portraitRef]);
}

export default function HeroSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const headingRef = useFitText<HTMLSpanElement>();
  const [faceLive, setFaceLive] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  usePortraitFit(introRef, portraitRef);

  // Hero sabitlenmişken yapılan scroll → yüzün dijitalleşme ilerlemesi
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[260vh]" aria-label="Giriş">
      <div className="sticky top-0 flex h-screen flex-col" style={{ overflowX: 'clip' }}>
        <FadeIn as="nav" delay={0} y={-20} className="relative z-20 flex justify-between px-6 pt-6 md:px-10 md:pt-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 focus-visible:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {l.label}
            </a>
          ))}
        </FadeIn>

        {/* FadeIn dışarıda: kırpılan kutunun içinde kalırsa görünür alana hiç giremiyor */}
        <FadeIn delay={0.15} y={40} className="mt-6 sm:mt-4 md:-mt-2">
          <div className="w-full overflow-hidden px-6 md:px-10">
            <h1
              className="w-full whitespace-nowrap uppercase leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Archivo Black', 'Kanit', ui-sans-serif, sans-serif", fontWeight: 400 }}
            >
              <span ref={headingRef} className="hero-heading inline-block">
                {site.heroHeading}
              </span>
            </h1>
          </div>
        </FadeIn>

        {/* Başlığın altındaki tanıtım: ortalı */}
        <FadeIn delay={0.3} y={20} className="relative z-20">
          <div
            ref={introRef}
            data-hero-intro
            className="mx-auto mt-3 flex max-w-[560px] flex-col items-center gap-2 px-6 text-center sm:mt-4 md:max-w-[640px] md:gap-3 lg:max-w-[720px]"
          >
            <p className="font-bold leading-tight text-[#D7E2EA]" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.85rem)' }}>
              {site.heroIntroTitle}
            </p>
            {site.heroIntro.map((t) => (
              <p
                key={t}
                className="font-medium leading-snug text-[#D7E2EA]/75"
                style={{ fontSize: 'clamp(0.8rem, 1.05vw, 1.02rem)' }}
              >
                {t}
              </p>
            ))}
            <p
              lang="en"
              className="mt-1 flex flex-col items-center font-semibold leading-snug tracking-wide text-[#D7E2EA] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2.5"
              style={{ fontSize: 'clamp(0.82rem, 1.1vw, 1.08rem)' }}
            >
              <span>{site.heroTagline[0]}</span>
              <span aria-hidden="true" className="hidden text-[#D7E2EA]/40 sm:inline">
                |
              </span>
              <span className="font-medium text-[#D7E2EA]/85" style={{ textWrap: 'balance' }}>
                {site.heroTagline[1]}
              </span>
            </p>
          </div>
        </FadeIn>

        <div className="relative z-20 mt-auto flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
          <FadeIn delay={0.7} y={20}>
            <ScrollCue progress={scrollYProgress} />
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>

        {/* Portre çapası: Magnet ile hareket eder, 3D yüz bu kutunun üstüne çizilir */}
        {/* Genişlik, tanıtım metninin altında kalan yüksekliğe göre hesaplanır (usePortraitFit) */}
        <div
          ref={portraitRef}
          data-face-anchor
          className="absolute bottom-0 left-1/2 z-10 w-[min(400px,100vw,calc((100svh_-_460px)/0.858))] -translate-x-1/2 sm:w-[min(440px,calc((100svh_-_420px)/0.858))] lg:w-[min(560px,calc((100svh_-_420px)/0.858))]"
        >
          <FadeIn delay={0.6} y={30}>
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="block w-full"
            >
              <AmbientGlow progress={scrollYProgress} />
              <div ref={anchorRef} className="w-full" style={{ aspectRatio: `1 / ${FACE_ASPECT}` }}>
                <img
                  src={faceUrl}
                  alt={`${site.name} portresi`}
                  className="h-full w-full object-contain"
                  style={{ visibility: faceLive ? 'hidden' : 'visible' }}
                  draggable={false}
                />
              </div>
            </Magnet>
          </FadeIn>
        </div>

        <SkillOrbit anchorRef={anchorRef} progress={scrollYProgress} />

        {/* 3D yüklenemezse ya da hata verirse normal fotoğraf görünmeye devam eder */}
        <ErrorBoundary onError={() => setFaceLive(false)}>
          <Suspense fallback={null}>
            <Face3D
              faceUrl={faceUrl}
              depthUrl={depthUrl}
              anchorRef={anchorRef}
              progress={scrollYProgress}
              onReady={setFaceLive}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
