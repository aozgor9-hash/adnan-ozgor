import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import AutoVideo from '../components/AutoVideo';
import { LiveProjectButton } from '../components/Buttons';
import FadeIn from '../components/FadeIn';
import { FLAGS } from '../components/Flags';
import { ProjectVisual } from '../components/Placeholders';
import { languages } from '../data/content';
import { projects, type Project } from '../data/projects';
import { openGallery } from '../router';

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

/** Önizleme alanı: sabit kutu, görsel kırpılarak doldurur (tamamı galeride görünür). */
function Visual({ project, slot, className = '' }: { project: Project; slot: number; className?: string }) {
  const item = project.cover[slot];
  const fill = 'absolute inset-0 h-full w-full object-cover';
  return (
    <div className={`relative overflow-hidden ${RADIUS} ${className}`}>
      {item?.video ? (
        <AutoVideo src={item.video} poster={item.src} className={fill} label={project.name} />
      ) : item?.src ? (
        <img src={item.src} alt="" loading="lazy" className={fill} />
      ) : (
        <ProjectVisual
          palette={project.palette}
          slot={slot}
          label={`${project.name} · görsel ${slot + 1}`}
          className={fill}
        />
      )}
    </div>
  );
}

/** Görsel satırının yüksekliği: kart her ekranda görünür alana sığar */
const ROW_HEIGHT = 'clamp(260px, min(38vw, calc(85vh - 340px)), 560px)';

function Card({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article
        style={{ scale, top: `${index * 28}px`, transformOrigin: 'top center' }}
        className={`relative flex w-full max-w-6xl flex-col gap-5 border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:gap-6 sm:p-6 md:gap-8 md:p-8 ${RADIUS}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="hero-heading shrink-0 font-black leading-[0.85] tabular-nums"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.no}
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-xs font-light uppercase tracking-[0.2em] text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.1rem, 2.6vw, 2.4rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton onClick={() => openGallery(project.slug)} />
        </div>

        <p
          className="-mt-1 max-w-3xl px-2 font-light leading-snug text-[#D7E2EA]/75 sm:-mt-2 sm:px-4"
          style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.15rem)' }}
        >
          {project.description}
        </p>

        <div className="flex gap-3 sm:gap-4" style={{ height: ROW_HEIGHT }}>
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <Visual project={project} slot={0} className="flex-[2]" />
            <Visual project={project} slot={1} className="flex-[3]" />
          </div>
          <Visual project={project} slot={2} className="w-[60%]" />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section
      id="projeler"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projeler
        </h2>
      </FadeIn>

      <div ref={containerRef}>
        {projects.map((p, i) => (
          <Card key={p.no} project={p} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>

      {/* Dil yetkinlikleri */}
      <FadeIn y={30} className="mx-auto mt-16 max-w-6xl sm:mt-24">
        <div
          className="relative overflow-hidden rounded-[32px] border-2 border-[#D7E2EA]/20 bg-gradient-to-br from-[#14161a] via-[#0C0C0C] to-[#0C0C0C] px-6 pb-3 pt-7 sm:rounded-[40px] sm:px-10 sm:pb-4 sm:pt-9 md:rounded-[60px] md:px-14 md:pt-11"
        >
          {/* hafif mavi parıltı: sitenin hologram rengiyle uyumlu */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(61,158,255,0.55), transparent 70%)' }}
          />
          <div className="relative flex items-end justify-between gap-4 border-b border-[#D7E2EA]/25 pb-5 sm:pb-7">
            <h3
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3.4vw, 3rem)' }}
            >
              DİL YETKİNLİKLERİ
            </h3>
          </div>
          <ul className="relative">
            {languages.map((l, i) => {
              const Flag = FLAGS[l.flag];
              return (
                <li
                  key={l.code}
                  className={`group flex items-center gap-4 py-5 transition-colors duration-300 sm:gap-6 sm:py-7 ${
                    i < languages.length - 1 ? 'border-b border-[#D7E2EA]/10' : ''
                  }`}
                >
                  <span className="relative h-7 w-10 shrink-0 overflow-hidden rounded-md ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-[54px] sm:rounded-lg">
                    <Flag />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/25"
                    />
                  </span>
                  <span className="w-[2.2ch] shrink-0 font-bold text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 1.7vw, 1.5rem)' }}>
                    {l.code}
                  </span>
                  {/* telefonda seviye ismin altına iner, geniş ekranda sağa yaslanır */}
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span
                      lang="en"
                      className="font-light leading-tight text-[#D7E2EA] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)' }}
                    >
                      {l.name}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-medium leading-tight sm:px-5 sm:py-2 sm:text-sm ${
                        l.primary
                          ? 'border border-[#3D9EFF]/50 bg-[#3D9EFF]/10 text-[#CFE6FF] shadow-[0_0_24px_-8px_rgba(61,158,255,0.7)]'
                          : 'border border-[#D7E2EA]/20 text-[#D7E2EA]/70'
                      }`}
                    >
                      {l.level}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}
