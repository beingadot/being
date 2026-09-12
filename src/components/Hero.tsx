import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FALLBACK } from "../lib/assets";

const NAME = "ARISHA";
const TAGLINE = "I design. I create. I elevate.";

/* ---------------------------------------------------------------- typewriter */
function Typewriter() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setN((v) => (v < TAGLINE.length ? v + 1 : v)), n === 0 ? 900 : 55);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <p className="typewriter font-mono text-[13px] leading-relaxed tracking-[0.12em] text-bone sm:text-base md:text-lg">
      {TAGLINE.slice(0, n)}
      <span className="caret ml-0.5 inline-block w-[2px] translate-y-[2px] bg-acid text-transparent">|</span>
    </p>
  );
}

/* ------------------------------------------------- being.png — natural ratio */
function Portrait() {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const src = stage === 0 ? "being.png" : FALLBACK.portrait;

  return (
    <div className="circle-wrapper relative w-full overflow-hidden rounded-[1.25rem] border border-white/12 bg-[linear-gradient(160deg,#15151d_0%,#0a0a10_60%,#17171f_100%)] p-2 sm:rounded-[1.6rem] sm:p-2.5">
      {/* soft inner stage so any image ratio sits nicely */}
      <div className="circle-overlay relative w-full overflow-hidden rounded-[0.9rem] sm:rounded-[1.2rem]">
        {stage === 2 ? (
          <div className="flex aspect-[4/5] w-full items-center justify-center">
            <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">being.png</span>
          </div>
        ) : (
          <img
            src={src}
            alt="Overlay"
            draggable={false}
            onError={() => setStage((s) => (s === 0 ? 1 : 2))}
            /* h-auto + no object-cover  ->  original aspect ratio, never cropped */
            className="block h-auto w-full object-contain"
          />
        )}
        <div className="pointer-events-none absolute inset-0 rounded-[0.9rem] ring-1 ring-white/10 ring-inset sm:rounded-[1.2rem]" />
      </div>

      {/* corner ticks */}
      <span className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t border-l border-acid/70" />
      <span className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 border-r border-b border-acid/70" />
    </div>
  );
}

/* ------------------------------------------------------------- orbit sticker */
function OrbitBadge() {
  return (
    <div className="pointer-events-none absolute -bottom-6 -left-4 z-20 h-20 w-20 sm:-bottom-8 sm:-left-8 sm:h-28 sm:w-28 lg:-bottom-10 lg:-left-10 lg:h-36 lg:w-36">
      <div className="absolute inset-0 rounded-full bg-black/80 ring-1 ring-white/10 backdrop-blur-md" />
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="circlePath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <text className="fill-acid font-mono text-[15px] tracking-[0.3em] uppercase">
          <textPath href="#circlePath">BEING A DOT · CREATIVE STUDIO · SINCE 2022 · </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="h-2 w-2 rounded-full bg-acid sm:h-3 sm:w-3" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- hero */
export default function Hero() {
  const wrap = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-13, 13]), { stiffness: 140, damping: 18 });
  const gx = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), { stiffness: 80, damping: 20 });
  const gy = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 20 });

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end start"] });
  const yType = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
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
      className="persp relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-void px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-10 lg:pt-32 lg:pb-14"
    >
      {/* ------------- ambient background ------------- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hairline-grid absolute inset-0 opacity-60" />
        <motion.div
          style={{ x: gx, y: gy }}
          className="absolute -top-32 -left-24 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(221,255,60,0.18),transparent_62%)] blur-2xl sm:h-[34rem] sm:w-[34rem]"
        />
        <motion.div
          style={{ x: gy, y: gx }}
          className="absolute right-[-8rem] bottom-[-10rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,74,28,0.18),transparent_62%)] blur-2xl sm:h-[40rem] sm:w-[40rem]"
        />
        <div className="absolute top-1/3 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,220,255,0.10),transparent_65%)] blur-3xl sm:h-[30rem] sm:w-[30rem]" />
        <div className="vignette absolute inset-0" />
      </div>

      {/* ------------- content ------------- */}
      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-x-6 gap-y-7 sm:gap-y-9 lg:gap-x-12">
        {/* ---- headline ---- */}
        <motion.div style={{ y: yType, opacity: fade }} className="order-1 col-span-12 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3"
          >
            <span className="flex items-center gap-2 rounded-full border border-acid/40 bg-acid/10 px-2.5 py-1 sm:px-3 sm:py-1.5">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
                <span className="relative inline-flex h-full w-full rounded-full bg-acid" />
              </span>
              <span className="font-mono text-[8px] tracking-[0.22em] text-acid uppercase sm:text-[10px] sm:tracking-[0.25em]">
                Open for projects
              </span>
            </span>
            <span className="font-mono text-[8px] tracking-[0.22em] text-ash uppercase sm:text-[10px] sm:tracking-[0.25em]">
              Gujarat · India
            </span>
          </motion.div>

          <h1 className="akshat font-display leading-[0.82] select-none">
            <span className="flex flex-wrap">
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "115%", rotateX: -70, opacity: 0 }}
                  animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block bg-gradient-to-b from-bone via-bone to-bone/45 bg-clip-text text-[clamp(3.6rem,17vw,7rem)] tracking-[0.01em] text-transparent lg:text-[clamp(6rem,11.5vw,13rem)]"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="beingadot -mt-[0.5vw] block overflow-hidden pb-[0.12em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="stroke-text block font-display text-[clamp(2rem,10vw,4.2rem)] leading-[0.92] tracking-[0.02em] lg:text-[clamp(3.4rem,7vw,8rem)]"
              >
                BEINGADOT
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* ---- portrait (original ratio) ---- */}
        <motion.div
  style={{ y: yCard }}
  className="relative order-2 col-span-12 mx-auto w-[76%] max-w-[360px] sm:w-[58%] lg:order-none lg:col-span-5 lg:row-span-2 lg:mx-0 lg:ml-auto lg:w-full lg:max-w-[440px] lg:self-center"
>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 18 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.45, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* glow frame */}
            <div className="absolute -inset-2 rounded-[1.6rem] bg-gradient-to-br from-acid/45 via-transparent to-flame/45 opacity-70 blur-lg sm:-inset-3 sm:rounded-[2rem]" />
            <div className="spin-slower pointer-events-none absolute -inset-6 rounded-full border border-dashed border-white/10 sm:-inset-10" />

            <div style={{ transform: "translateZ(40px)" }} className="relative">
              <Portrait />

              {/* name plate */}
              <div className="pointer-events-none absolute inset-x-2 bottom-2 flex items-end justify-between rounded-b-[0.9rem] bg-gradient-to-t from-void via-void/70 to-transparent p-3 sm:inset-x-2.5 sm:bottom-2.5 sm:rounded-b-[1.2rem] sm:p-5">
                <div>
                  <p className="font-display text-lg leading-none tracking-wide sm:text-2xl">ARISHA</p>
                  <p className="font-mono text-[8px] tracking-[0.24em] text-acid uppercase sm:text-[10px] sm:tracking-[0.28em]">
                    Creative Director
                  </p>
                </div>
                <span className="font-mono text-[8px] tracking-[0.2em] text-ash sm:text-[10px]">'26</span>
              </div>

              <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[7px] tracking-[0.22em] text-bone uppercase backdrop-blur sm:px-3 sm:py-1 sm:text-[9px] sm:tracking-[0.25em]">
                being.png
              </span>
            </div>

            <OrbitBadge />
          </motion.div>

          <div className="floaty absolute top-4 right-4 z-30 rounded-xl bg-bone px-2.5 py-2 text-black shadow-2xl sm:top-6 sm:right-6 sm:rounded-2xl sm:px-4 sm:py-3">
            <p className="font-display text-lg leading-none sm:text-2xl">447+</p>
            <p className="font-mono text-[7px] tracking-[0.18em] uppercase sm:text-[9px] sm:tracking-[0.2em]">
              Projects done
            </p>
          </div>
        </motion.div>
          </motion.div>
        </motion.div>

        {/* ---- tagline + CTAs ---- */}
        <motion.div
          style={{ opacity: fade }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="order-3 col-span-12 lg:col-span-7"
        >
          <div className="flex flex-col gap-6 sm:gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md">
              <Typewriter />
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ash sm:mt-4 sm:text-sm">
                Designing stories, not just visuals — brand systems, content direction and
                scroll-stopping reels for people who refuse to blend in.
              </p>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto sm:gap-3">
              <a
                href="#canvas"
                data-cursor="Explore"
                className="group relative flex-1 overflow-hidden rounded-full bg-acid px-5 py-3.5 text-center text-black sm:flex-none sm:px-7 sm:py-4"
              >
                <span className="relative z-10 font-mono text-[10px] font-bold tracking-[0.18em] uppercase sm:text-[11px] sm:tracking-[0.22em]">
                  View the work
                </span>
                <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              </a>
              <a
                href="#reels"
                data-cursor="Play"
                className="group flex flex-1 items-center justify-center gap-2.5 rounded-full border border-white/20 px-5 py-3.5 transition-colors hover:border-acid sm:flex-none sm:px-6 sm:py-4"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-flame text-[8px] text-black sm:h-6 sm:w-6 sm:text-[9px]">
                  ▶
                </span>
                <span className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase sm:text-[11px] sm:tracking-[0.22em]">
                  Reels
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ------------- bottom rail ------------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto mt-9 flex w-full max-w-[1600px] items-center justify-between gap-4 sm:mt-12"
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="h-7 w-[1px] bg-gradient-to-b from-acid to-transparent sm:h-10" />
          <span className="font-mono text-[8px] tracking-[0.28em] text-ash uppercase sm:text-[10px] sm:tracking-[0.3em]">
            Scroll
          </span>
        </div>
        <div className="flex gap-3 overflow-hidden font-mono text-[8px] tracking-[0.2em] text-ash uppercase sm:gap-8 sm:text-[10px] sm:tracking-[0.25em]">
          <span>Branding</span>
          <span>Content</span>
          <span>Reels</span>
          <span className="hidden xs:inline sm:inline">Strategy</span>
        </div>
      </motion.div>
    </section>
  );
}
