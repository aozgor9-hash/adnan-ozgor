import { motion, useTransform, type MotionValue } from 'framer-motion';

/**
 * "Aşağı kaydır" işareti: içinde aşağı akan bir nokta olan fare simgesi.
 * Ziyaretçi kaydırmaya başlayınca kaybolur; tıklanınca bir ekran aşağı iner.
 */
export default function ScrollCue({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  const pointerEvents = useTransform(progress, (v) => (v > 0.04 ? 'none' : 'auto'));

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      aria-label="Aşağı kaydır"
      style={{ opacity, pointerEvents }}
      className="group flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-80 focus-visible:opacity-80"
    >
      <span className="relative flex h-10 w-6 justify-center rounded-full border-2 border-[#D7E2EA]/70 md:h-11 md:w-[26px]">
        <span className="scroll-cue-dot mt-2 h-2 w-[3px] rounded-full bg-[#D7E2EA]" />
      </span>
      <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/70 sm:inline md:text-xs">
        Aşağı kaydır
      </span>
    </motion.button>
  );
}
