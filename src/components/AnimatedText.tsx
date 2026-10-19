import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useLayoutEffect, useRef, type CSSProperties } from 'react';

type Props = {
  /** Her eleman ayrı paragraf; hepsi tek bir akış olarak sırayla belirir */
  paragraphs: string[];
  className?: string;
  /** Her paragrafa verilen sınıf ve stil */
  pClassName?: string;
  pStyle?: CSSProperties;
};

const DIM = 0.2;
const reduceMotion = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
/** Bir kelimenin sönükten parlağa geçtiği aralık (toplam ilerlemenin oranı) */
const RAMP = 0.12;

/**
 * Scroll ilerledikçe kelime kelime beliren metin.
 * Tüm paragraflar tek bir ilerlemeyi paylaşır ve metin ekranın ortasına gelmeden
 * tamamen okunur hâle gelir. Opaklık doğrudan DOM'a yazılır: yüzlerce animasyon
 * nesnesi yerine tek dinleyici, telefonda da akıcı.
 */
export default function AnimatedText({ paragraphs, className, pClassName, pStyle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  // metnin üstü ekranın %90'ına girince başlar, altı %80'e gelince biter
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.8'] });

  const paint = (v: number) => {
    const list = words.current;
    const n = list.length;
    if (!n) return;
    if (reduceMotion()) v = 1;
    for (let i = 0; i < n; i++) {
      const start = (i / n) * (1 - RAMP);
      const t = Math.min(Math.max((v - start) / RAMP, 0), 1);
      list[i].style.opacity = (DIM + (1 - DIM) * t).toFixed(3);
    }
  };

  useMotionValueEvent(scrollYProgress, 'change', paint);
  useLayoutEffect(() => {
    paint(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paragraphs]);

  words.current = [];
  return (
    <div ref={ref} className={className}>
      {paragraphs.map((para, p) => (
        <p key={p} className={pClassName} style={pStyle}>
          {para.split(' ').map((word, w, arr) => (
            <span key={w}>
              <span
                ref={(el) => {
                  if (el) words.current.push(el);
                }}
                style={{ opacity: DIM, transition: 'opacity 120ms linear' }}
              >
                {word}
              </span>
              {w < arr.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
