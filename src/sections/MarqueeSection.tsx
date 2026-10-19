import { useEffect, useMemo, useRef, useState } from 'react';
import { MARQUEE_POOL } from '../data/marquee';

const TILE_W = 420;
const GAP = 12;
const COUNT = 21; // 11 üst sıra + 10 alt sıra

/** Havuzdan rastgele, tekrarsız seçim (Fisher–Yates) */
function pickRandom<T>(pool: T[], n: number) {
  const a = [...pool];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(n, a.length));
}

function Row({ items, transform }: { items: string[]; transform: string }) {
  return (
    // bir kopya genişliği kadar sola kaydırılarak başlar; iki yönde de boşluk görünmez
    <div
      className="flex w-max gap-3"
      style={{ transform, willChange: 'transform', marginLeft: -items.length * (TILE_W + GAP) }}
    >
      {[0, 1, 2].flatMap((copy) =>
        items.map((src) => (
          <div key={`${copy}-${src}`} className="h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl bg-[#16181c]">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" draggable={false} />
          </div>
        )),
      )}
    </div>
  );
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const picked = useMemo(() => pickRandom(MARQUEE_POOL, COUNT), []);
  const row1 = picked.slice(0, 11);
  const row2 = picked.slice(11);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={ref} className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40" aria-label="Portfolyodan seçmeler">
      <div className="flex flex-col gap-3 overflow-hidden">
        <Row items={row1} transform={`translateX(${offset - 200}px)`} />
        <Row items={row2} transform={`translateX(${-(offset - 200)}px)`} />
      </div>
    </section>
  );
}
