import { useScroll } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ContactButton } from '../components/Buttons';
import AmbientGlow from '../components/AmbientGlow';
import Face3D from '../components/Face3D';
import { FACE_ASPECT } from '../components/FaceScene';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import SkillOrbit from '../components/SkillOrbit';
import { navLinks, site } from '../data/content';
import faceUrl from '../assets/face.webp';
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

export default function HeroSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const headingRef = useFitText<HTMLSpanElement>();
  const [faceLive, setFaceLive] = useState(false);

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

        {/* Başlığın altındaki tanıtım */}
        <FadeIn
          delay={0.3}
          y={20}
          className="relative z-20 mt-4 flex max-w-[360px] flex-col gap-2 px-6 sm:mt-5 md:max-w-[400px] md:gap-3 md:px-10 lg:max-w-[440px]"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/60 md:text-xs lg:text-sm">
            {site.heroRole}
          </span>
          <p className="font-bold leading-tight text-[#D7E2EA]" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.85rem)' }}>
            {site.heroIntroTitle}
          </p>
          <p
            className="font-medium leading-relaxed text-[#D7E2EA]/80"
            style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.05rem)' }}
          >
            {site.heroIntro}
          </p>
        </FadeIn>

        <div className="relative z-20 mt-auto flex items-end justify-end gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>

        {/* Portre çapası: Magnet ile hareket eder, 3D yüz bu kutunun üstüne çizilir */}
        {/* Genişlik ekran yüksekliğine göre sınırlanır: portre başlık ve metnin altına oturur */}
        <div className="absolute bottom-0 left-1/2 z-10 w-[min(460px,115vw,calc((100svh_-_340px)/0.858))] -translate-x-1/2 sm:w-[min(480px,calc((100svh_-_300px)/0.858))] md:w-[min(560px,calc((100svh_-_290px)/0.858))] lg:w-[min(660px,calc((100svh_-_280px)/0.858))]">
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

        <Face3D
          faceUrl={faceUrl}
          depthUrl={depthUrl}
          anchorRef={anchorRef}
          progress={scrollYProgress}
          onReady={setFaceLive}
        />
      </div>
    </section>
  );
}
