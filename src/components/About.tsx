import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SmartImage from "./SmartImage";
import { FALLBACK } from "../lib/assets";

function Counter({ to, id }: { to: number; id: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 2000;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <div ref={ref} id={id} className="stat-number font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-none">
      <span className="bg-gradient-to-b from-bone to-ash/60 bg-clip-text text-transparent">{val}</span>
      <span className="text-acid">+</span>
    </div>
  );
}

const ROWS = [
  {
    k: "Creative Developer",
    v: "with a passion for building digital experiences that matter.",
  },
  { k: "Problem Solver", v: "who turns complex ideas into simple, beautiful solutions." },
  { k: "Tech Enthusiast", v: "always exploring new tools and pushing boundaries." },
];

const STATS = [
  { id: "projects-count", n: 447, label: "Projects Completed" },
  { id: "clients-count", n: 148, label: "Happy Clients" },
  { id: "experience-count", n: 46, label: "Months Experience" },
];

export default function About() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section
      id="about"
      ref={ref}
      className="about-section relative w-full overflow-hidden bg-void px-5 py-24 md:px-10 md:py-36"
    >
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(123,220,255,0.10),transparent_65%)] blur-2xl" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-10 gap-y-16">
        {/* header */}
        <div className="col-span-12 flex items-center gap-5 border-b border-white/10 pb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-acid">(01)</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">The Person</span>
          <span className="ml-auto hidden font-mono text-[10px] tracking-[0.3em] text-ash uppercase md:block">
            Arisha / Beingadot
          </span>
        </div>

        {/* image */}
        <div className="col-span-12 lg:col-span-5">
          <div className="image-container persp-sm relative mx-auto w-full max-w-[440px] lg:sticky lg:top-32">
            <motion.div
              style={{ rotate: rot }}
              className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-acid/25"
            />
            <div className="spin-slower pointer-events-none absolute -inset-12 rounded-full border border-white/5" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-coal">
              <motion.div style={{ y: imgY }} className="h-full w-full">
                <SmartImage
                  src="being.png"
                  fallback={FALLBACK.portraitAlt}
                  alt="Profile Image"
                  className="profile-image aspect-[4/5] w-full"
                  imgClassName="scale-110"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-ash uppercase">
              <span>Designer · Creator</span>
              <span className="text-acid">◆ 2026</span>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="content col-span-12 lg:col-span-7">
          <h2 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.85] tracking-[0.01em]">
            ABOUT
            <span className="ml-4 font-serif text-[0.72em] italic text-acid">me</span>
          </h2>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {ROWS.map((r, i) => (
              <motion.div
                key={r.k}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col gap-2 py-6 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="w-10 shrink-0 font-mono text-[10px] tracking-[0.25em] text-ash">
                  0{i + 1}
                </span>
                <p className="text-[clamp(1.05rem,2.2vw,1.45rem)] leading-snug">
                  <span className="highlight font-display tracking-wide text-acid">
                    {r.k.toUpperCase()}
                  </span>{" "}
                  <span className="text-bone/80">{r.v}</span>
                </p>
                <span className="ml-auto hidden translate-x-[-8px] text-acid opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                  ↗
                </span>
              </motion.div>
            ))}
          </div>

          <div className="stats mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="stat-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-acid/40"
              >
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-acid transition-all duration-700 group-hover:w-full" />
                <Counter to={s.n} id={s.id} />
                <p className="stat-label mt-3 font-mono text-[10px] tracking-[0.22em] text-ash uppercase">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
