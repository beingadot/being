import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SmartImage from "./SmartImage";
import { WORKS, type Work } from "../lib/assets";
import { cn } from "../utils/cn";

const SPANS = [
  "lg:col-span-5 aspect-[5/6]",
  "lg:col-span-4 aspect-square",
  "lg:col-span-3 aspect-[3/4]",
  "lg:col-span-4 aspect-[4/3]",
  "lg:col-span-3 aspect-square",
  "lg:col-span-5 aspect-[16/11]",
];

function TiltCard({ work, i, onOpen }: { work: Work; i: number; onOpen: (w: Work) => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 220, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 220, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("persp col-span-1 lg:col-span-4", SPANS[i])}
    >
      <motion.button
        onClick={() => onOpen(work)}
        data-cursor="Open"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="work-card group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-coal text-left"
      >
        <SmartImage
          src={work.src}
          fallback={work.fallback}
          alt={work.alt}
          className="work-image h-full w-full"
          imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/95 via-void/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        <div
          style={{ transform: "translateZ(45px)" }}
          className="work-overlay pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-6"
        >
          <p className="work-title font-display text-xl tracking-wide text-bone md:text-2xl">
            {work.title.toUpperCase()}
          </p>
          <div className="work-tags mt-2 flex flex-wrap gap-2">
            {work.tags.map((t) => (
              <span
                key={t}
                className="work-tag rounded-full border border-acid/30 bg-acid/10 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-acid uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <span className="pointer-events-none absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] text-bone/70">
          0{i + 1}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 grid h-9 w-9 -rotate-45 place-items-center rounded-full bg-acid text-black opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100">
          ↗
        </span>
      </motion.button>
    </motion.div>
  );
}

export default function CreativeCanvas() {
  const [open, setOpen] = useState<Work | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <section id="canvas" className="past-works relative w-full overflow-hidden bg-coal px-5 py-24 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40" />
      <div className="pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,74,28,0.14),transparent_65%)] blur-2xl" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="works-header mb-14 flex flex-col gap-6 border-b border-white/10 pb-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-5">
              <span className="font-mono text-[10px] tracking-[0.3em] text-acid">(03)</span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Selected Work</span>
            </div>
            <h2 className="font-display text-[clamp(2.8rem,9vw,8rem)] leading-[0.85]">
              CREATIVE
              <span className="ml-4 font-serif text-[0.7em] italic text-flame">canvas</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ash md:text-right">
            A splash of creativity, a dash of skill — here's what I've been crafting. Click any
            frame to open it full scale.
          </p>
        </div>

        <div className="works-grid grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-12">
          {WORKS.map((w, i) => (
            <TiltCard key={w.src} work={w} i={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[150] grid place-items-center bg-black/85 p-5 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-coal"
            >
              <SmartImage
                src={open.src}
                fallback={open.fallback}
                alt={open.alt}
                loading="eager"
                className="max-h-[72vh] w-full"
                imgClassName="object-contain"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
                <div>
                  <p className="font-display text-2xl tracking-wide">{open.title.toUpperCase()}</p>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-ash uppercase">{open.src}</p>
                </div>
                <div className="flex gap-2">
                  {open.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-acid/30 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-acid uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-acid text-lg text-black"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
