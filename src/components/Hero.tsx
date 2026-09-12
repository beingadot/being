import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import SmartImage from "./SmartImage";
import { FALLBACK } from "../lib/assets";

const NAME = "ARISHA";
const TAGLINE = "I design. I create. I elevate.";

function Typewriter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setTimeout(
      () => setN((v) => (v < TAGLINE.length ? v + 1 : v)),
      n === 0 ? 900 : 55,
    );
    return () => clearTimeout(t);
  }, [n]);
  return (
    <p className="typewriter font-mono text-sm tracking-[0.14em] text-bone sm:text-base md:text-lg">
      {TAGLINE.slice(0, n)}
      <span className="caret ml-0.5 inline-block w-[2px] translate-y-[2px] self-stretch bg-acid text-transparent">
        |
      </span>
    </p>
  );
}

function OrbitBadge() {
  return (
    <div className="pointer-events-none absolute -bottom-10 -left-10 z-20 hidden h-32 w-32 sm:block md:-bottom-12 md:-left-14 md:h-40 md:w-40">
      <div className="absolute inset-0 rounded-full bg-black/70 backdrop-blur-md ring-1 ring-white/10" />
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="circlePath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="fill-acid font-mono text-[15px] tracking-[0.32em] uppercase">
          <textPath href="#circlePath">BEING A DOT · CREATIVE STUDIO · SINCE 2022 · </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="h-3 w-3 rounded-full bg-acid" />
      </div>
    </div>
  );
}

export default function Hero() {
  const wrap = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 140, damping: 18 });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 90, damping: 20 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 20 });

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="home"
      ref={wrap}
      className="persp relative min-h-[100svh] w-full overflow-hidden bg-void pt-28 pb-16 md:pt-36"
    >
      {/* ambient light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hairline-grid absolute inset-0 opacity-70" />
        <motion.div
          style={{ x: px, y: py }}
          className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(221,255,60,0.16),transparent_62%)] blur-2xl"
        />
        <motion.div
          style={{ x: py, y: px }}
          className="absolute right-[-10rem] bottom-[-14rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,74,28,0.16),transparent_62%)] blur-2xl"
        />
        <div className="vignette absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-12 items-center gap-y-10 px-5 md:px-10">
        {/* ---------- left : type ---------- */}
        <motion.div style={{ y: yBig, opacity: fade }} className="col-span-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex flex-wrap items-center gap-3"
          >
            <span className="flex items-center gap-2 rounded-full border border-acid/40 bg-acid/10 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-acid uppercase">
                Open for projects
              </span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-ash uppercase">
              Vadodara · Gujarat · India
            </span>
          </motion.div>

          <h1 className="akshat select-none font-display leading-[0.82]">
            <span className="flex flex-wrap">
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "115%", rotateX: -70, opacity: 0 }}
                  animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block bg-gradient-to-b from-bone via-bone to-bone/50 bg-clip-text text-[19vw] tracking-[0.01em] text-transparent lg:text-[12.5vw]"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="beingadot -mt-[1vw] block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="stroke-text block font-display text-[11.5vw] leading-[0.9] tracking-[0.02em] lg:text-[7.6vw]"
              >
                BEINGADOT
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-md">
              <Typewriter />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
                Designing stories, not just visuals — brand systems, content direction and
                scroll-stopping reels for people who refuse to blend in.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#canvas"
                data-cursor="Explore"
                className="group relative overflow-hidden rounded-full bg-acid px-7 py-4 text-black"
              >
                <span className="relative z-10 font-mono text-[11px] font-bold tracking-[0.22em] uppercase">
                  View the work
                </span>
                <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              </a>
              <a
                href="#reels"
                data-cursor="Play"
                className="group flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 transition-colors hover:border-acid"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-flame text-[9px] text-black">
                  ▶
                </span>
                <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase">Reels</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- right : 3d portrait ---------- */}
        <motion.div
          style={{ y: yCard }}
          className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative w-[74vw] max-w-[400px] sm:w-[56vw] lg:w-full"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-acid/40 via-transparent to-flame/40 blur-xl" />
            <div
              style={{ transform: "translateZ(45px)" }}
              className="circle-wrapper relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-coal"
            >
              <SmartImage
                src="being.png"
                fallback={FALLBACK.portrait}
                alt="Overlay"
                loading="eager"
                className="circle-overlay aspect-[4/5] w-full"
                imgClassName="scale-105 saturate-[1.05] contrast-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="font-display text-2xl leading-none tracking-wide">ARISHA</p>
                  <p className="font-mono text-[10px] tracking-[0.28em] text-acid uppercase">
                    Creative Director
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-ash">'26</span>
              </div>
              <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-bone uppercase backdrop-blur">
                being.png
              </span>
            </div>
            <OrbitBadge />
            <div
              style={{ transform: "translateZ(80px)" }}
              className="floaty absolute -top-6 -right-4 hidden rounded-2xl bg-bone px-4 py-3 text-black shadow-2xl sm:block"
            >
              <p className="font-display text-2xl leading-none">447+</p>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase">Projects done</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto mt-12 flex max-w-[1600px] items-center justify-between px-5 md:mt-16 md:px-10"
      >
        <div className="flex items-center gap-3">
          <span className="h-10 w-[1px] bg-gradient-to-b from-acid to-transparent" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Scroll</span>
        </div>
        <div className="hidden gap-8 font-mono text-[10px] tracking-[0.25em] text-ash uppercase md:flex">
          <span>Branding</span>
          <span>Content</span>
          <span>Reels</span>
          <span>Strategy</span>
        </div>
      </motion.div>
    </section>
  );
}
