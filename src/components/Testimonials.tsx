import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SmartImage from "./SmartImage";
import { TESTIMONIALS } from "../lib/assets";
import { cn } from "../utils/cn";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[i];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6500);
    return () => clearTimeout(id);
  }, [i, paused]);

  return (
    <section
      id="love"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="testimonials-section relative w-full overflow-hidden bg-coal px-4 py-20 sm:px-6 md:py-28 lg:px-10 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="testimonials-header mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:mb-14 sm:gap-6 sm:pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-5">
              <span className="font-mono text-[10px] tracking-[0.3em] text-acid">(05)</span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Testimonials</span>
            </div>
            <h2 className="font-display text-[clamp(2.8rem,9vw,8rem)] leading-[0.85]">
              CLIENT'S
              <span className="ml-4 font-serif text-[0.7em] italic text-acid">love</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ash md:text-right">
            What people say about working with me.
          </p>
        </div>

        <div className="testimonials-grid grid grid-cols-12 gap-6 sm:gap-8 lg:gap-14">
          {/* featured quote */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative min-h-[260px] rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:min-h-[320px] sm:rounded-3xl sm:p-7 md:min-h-[360px] md:p-12">
              <span className="quote-icon pointer-events-none absolute top-2 right-6 font-serif text-[10rem] leading-none text-acid/10 select-none">
                “
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="testimonial-text font-serif text-[clamp(1.35rem,3.2vw,2.35rem)] leading-[1.25] text-bone">
                    {t.quote}
                  </p>
                  <div className="client-info mt-7 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                    <SmartImage
                      src={t.photo}
                      fallback={t.fallback}
                      alt={t.name}
                      className="client-photo h-14 w-14 rounded-full ring-2 ring-acid"
                    />
                    <div className="client-details">
                      <h4 className="font-display text-lg tracking-wide">{t.name.toUpperCase()}</h4>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-ash uppercase">{t.role}</p>
                    </div>
                    <div className="rating ml-auto font-mono text-sm tracking-[0.2em] text-acid">
                      {"★".repeat(t.stars)}
                      <span className="text-ash/40">{"★".repeat(5 - t.stars)}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
                <motion.div
                  key={`bar-${i}-${paused}`}
                  initial={{ width: "0%" }}
                  animate={{ width: paused ? "0%" : "100%" }}
                  transition={{ duration: paused ? 0.2 : 6.5, ease: "linear" }}
                  className="h-full bg-acid"
                />
              </div>
            </div>
          </div>

          {/* selector list */}
          <div className="col-span-12 flex flex-col justify-center gap-3 lg:col-span-5">
            {TESTIMONIALS.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setI(idx)}
                className={cn(
                  "testimonial-card group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-500",
                  idx === i
                    ? "border-acid/50 bg-acid/[0.07] translate-x-0"
                    : "border-white/10 bg-white/[0.015] hover:-translate-y-1 hover:border-white/25",
                )}
              >
                <span className="font-mono text-[10px] tracking-[0.25em] text-ash">0{idx + 1}</span>
                <SmartImage
                  src={c.photo}
                  fallback={c.fallback}
                  alt={c.name}
                  className={cn(
                    "h-12 w-12 rounded-full grayscale transition-all duration-500",
                    idx === i ? "grayscale-0 ring-2 ring-acid" : "group-hover:grayscale-0",
                  )}
                />
                <span className="min-w-0">
                  <span className="block truncate font-display text-base tracking-wide">
                    {c.name.toUpperCase()}
                  </span>
                  <span className="block truncate font-mono text-[10px] tracking-[0.2em] text-ash uppercase">
                    {c.role}
                  </span>
                </span>
                <span
                  className={cn(
                    "ml-auto text-acid transition-transform duration-500",
                    idx === i ? "rotate-0" : "-rotate-45 opacity-40",
                  )}
                >
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
