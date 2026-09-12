import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setPct(Math.floor((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 260);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[180] flex flex-col justify-between bg-void px-6 py-8 md:px-10"
        >
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-ash uppercase">
            <span>Arisha · Beingadot</span>
            <span>Portfolio '26</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <h1 className="font-display text-[clamp(2.6rem,13vw,11rem)] leading-[0.82]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  BEINGADOT
                </motion.span>
              </span>
            </h1>
            <span className="font-display text-[clamp(2rem,7vw,5rem)] leading-none text-acid">{pct}</span>
          </div>

          <div className="h-[3px] w-full bg-white/10">
            <motion.div className="h-full bg-acid" style={{ width: `${pct}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
