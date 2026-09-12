import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { REELS, type Reel } from "../lib/assets";

function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`phone-shell relative rounded-[1.5rem] p-[2px] sm:rounded-[2.4rem] sm:p-[3px] ${className}`}>
      {/* side buttons */}
      <span className="absolute top-[18%] -left-[2px] h-10 w-[2px] rounded-l bg-[#2a2a32] sm:-left-[3px] sm:h-14 sm:w-[3px]" />
      <span className="absolute top-[30%] -left-[2px] h-10 w-[2px] rounded-l bg-[#2a2a32] sm:-left-[3px] sm:h-14 sm:w-[3px]" />
      <span className="absolute top-[24%] -right-[2px] h-14 w-[2px] rounded-r bg-[#2a2a32] sm:-right-[3px] sm:h-20 sm:w-[3px]" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.35rem] bg-black sm:rounded-[2.2rem]">
        <span className="notch absolute top-1.5 left-1/2 z-20 h-3.5 w-[34%] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10 sm:top-2 sm:h-5" />
        {children}
      </div>
    </div>
  );
}

function useIsDesktop() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

function ReelCard({ reel, i, onOpen }: { reel: Reel; i: number; onOpen: (r: Reel) => void }) {
  const [failed, setFailed] = useState(false);
  const vid = useRef<HTMLVideoElement | null>(null);
  const desktop = useIsDesktop();
  const tilt = desktop ? [-7, 4, -4, 7][i % 4] : 0;
  const lift = desktop ? [0, -22, 12, -8][i % 4] : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateY: tilt * 2 }}
      whileInView={{ opacity: 1, y: lift, rotateY: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotateY: 0, y: lift - 18, scale: 1.04 }}
      style={{ transformStyle: "preserve-3d" }}
      className="iphone-container group relative mx-auto w-full max-w-[250px]"
    >
      <button
        data-cursor="Play"
        onClick={() => onOpen(reel)}
        onMouseEnter={() => vid.current?.play().catch(() => {})}
        onMouseLeave={() => vid.current?.pause()}
        className="block w-full text-left"
      >
        <PhoneFrame className="aspect-[9/19.5] w-full">
          {failed ? (
            <div className="relative h-full w-full">
              <img src={reel.poster} alt={reel.label} className="h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>
          ) : (
            <video
              ref={vid}
              src={reel.video}
              poster={reel.poster}
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
            />
          )}

          <span className="reel-badge absolute top-3 right-2 z-20 rounded-full bg-flame px-2 py-0.5 font-mono text-[7px] font-bold tracking-[0.18em] text-black uppercase sm:top-4 sm:right-3 sm:px-2.5 sm:py-1 sm:text-[8px] sm:tracking-[0.2em]">
            Reel
          </span>

          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/60 to-transparent p-3 pt-10 sm:p-4 sm:pt-12">
            <p className="font-display text-[13px] leading-tight tracking-wide sm:text-lg sm:leading-none">
              {reel.label.toUpperCase()}
            </p>
            <p className="mt-1 font-mono text-[7px] tracking-[0.2em] text-acid uppercase sm:text-[9px] sm:tracking-[0.25em]">
              {reel.tag}
            </p>
          </div>

          <div className="absolute inset-0 z-10 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 pl-1 text-lg backdrop-blur-md sm:h-16 sm:w-16 sm:text-2xl">
              ▶
            </span>
          </div>
        </PhoneFrame>
      </button>
      <span className="mt-3 block truncate text-center font-mono text-[7px] tracking-[0.22em] text-ash uppercase sm:mt-4 sm:text-[9px] sm:tracking-[0.28em]">
        {reel.video}
      </span>
    </motion.div>
  );
}

export default function Reels() {
  const [open, setOpen] = useState<Reel | null>(null);
  const [modalFail, setModalFail] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    setModalFail(false);
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <section
      id="reels"
      className="reels-section relative w-full overflow-hidden bg-void px-4 py-20 sm:px-6 md:py-28 lg:px-10 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/50 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(221,255,60,0.10),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="reels-header mb-10 flex flex-col gap-4 sm:mb-14 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-5">
              <span className="font-mono text-[10px] tracking-[0.3em] text-acid">(04)</span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Motion</span>
            </div>
            <h2 className="font-display text-[clamp(2.8rem,9vw,8rem)] leading-[0.85]">
              MY <span className="stroke-text">REELS</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ash md:text-right">
            Twelve cuts. Lights. Camera. Creation. Hover to preview, tap a device to watch the
            full reel.
          </p>
        </div>

        <div className="persp iphone-wrapper grid grid-cols-2 items-start gap-x-3 gap-y-8 pt-6 pb-10 sm:gap-x-6 sm:gap-y-14 sm:pt-10 sm:pb-16 md:grid-cols-3 md:gap-x-8 md:gap-y-20 xl:grid-cols-4 xl:gap-x-10">
          {REELS.map((r, i) => (
            <ReelCard key={r.id} reel={r} i={i} onOpen={setOpen} />
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
            className="overlay fixed inset-0 z-[150] grid place-items-center bg-black/90 p-5 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.85, rotateY: 25, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[80vw] max-w-[330px]"
            >
              <PhoneFrame className="aspect-[9/19.5] w-full">
                {modalFail ? (
                  <div className="relative grid h-full w-full place-items-center">
                    <img src={open.poster} alt={open.label} className="absolute inset-0 h-full w-full object-cover opacity-40" />
                    <p className="relative px-6 text-center font-mono text-[11px] tracking-[0.25em] text-ash uppercase">
                      {open.video}
                      <br />
                      not found
                    </p>
                  </div>
                ) : (
                  <video
                    src={open.video}
                    poster={open.poster}
                    controls
                    autoPlay
                    playsInline
                    onError={() => setModalFail(true)}
                    className="h-full w-full object-cover"
                  />
                )}
              </PhoneFrame>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-xl tracking-wide">{open.label.toUpperCase()}</p>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-acid uppercase">{open.tag}</p>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="grid h-11 w-11 place-items-center rounded-full bg-acid text-black"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
