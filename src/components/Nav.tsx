import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import SmartImage from "./SmartImage";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Home", href: "#home", external: false },
  { label: "About", href: "#about", external: false },
  { label: "Learn", href: "https://beingadotcourses.vercel.app/", external: true },
  { label: "Store", href: "https://beingaseller.vercel.app/", external: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 z-[120] h-[3px] w-full origin-left bg-acid"
      />

      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-[110] transition-all duration-500",
          scrolled ? "py-3" : "py-6",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <a
            href="#home"
            className={cn(
              "group flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2 transition-all duration-500 sm:gap-3 sm:pr-5",
              scrolled ? "glass" : "",
            )}
          >
            <SmartImage
              src="logo.png"
              alt="Logo"
              className="h-9 w-9 shrink-0 rounded-full ring-1 ring-white/20 sm:h-10 sm:w-10"
            />
            <span className="hidden xs:block">
              <span className="block font-display text-[13px] leading-none tracking-[0.14em] text-bone sm:text-[15px]">
                BEINGADOT
              </span>
              <span className="block font-mono text-[9px] tracking-[0.3em] text-ash uppercase">
                Arisha · Est. 2022
              </span>
            </span>
          </a>

          <nav
            className={cn(
              "hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 md:flex",
              scrolled ? "glass" : "glass",
            )}
          >
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="group relative overflow-hidden rounded-full px-5 py-2.5"
              >
                <span className="relative z-10 block font-mono text-[11px] font-medium tracking-[0.22em] text-bone uppercase transition-colors duration-300 group-hover:text-black">
                  {l.label}
                  {l.external && <sup className="ml-1 text-[8px]">↗</sup>}
                </span>
                <span className="absolute inset-0 translate-y-full rounded-full bg-acid transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-bone py-3 pr-3 pl-5 text-black transition-colors hover:bg-acid lg:flex"
            >
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">Let's talk</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-acid transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full glass md:hidden"
            >
              <span className="space-y-1.5">
                <span className="block h-[2px] w-5 bg-bone" />
                <span className="block h-[2px] w-3.5 bg-acid" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[130] bg-coal px-6 pt-8 pb-10 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="mt-14 flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
                  className="flex items-baseline gap-4 border-b border-white/10 py-5"
                >
                  <span className="font-mono text-[10px] text-acid">0{i + 1}</span>
                  <span className="font-display text-5xl tracking-wide">{l.label.toUpperCase()}</span>
                </motion.a>
              ))}
            </div>
            <div className="mt-12 font-mono text-[11px] leading-relaxed tracking-[0.15em] text-ash uppercase">
              Vadodara, Gujarat — India
              <br />
              beingadot@gmail.com
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
