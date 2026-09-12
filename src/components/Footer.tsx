import { motion } from "framer-motion";
import SmartImage from "./SmartImage";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Creative Canvas", href: "#canvas" },
  { label: "Reels", href: "#reels" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-void pt-24 md:pt-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(221,255,60,0.12),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-6 flex items-center gap-5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-acid">(06)</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Let's Connect</span>
        </div>

        <a href="https://wa.me/7564024877" target="_blank" rel="noopener noreferrer" className="group block">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3.2rem,15vw,14rem)] leading-[0.82] tracking-[0.005em]"
          >
            <span className="block transition-colors duration-500 group-hover:text-acid">LET'S BUILD</span>
            <span className="stroke-text block">SOMETHING</span>
            <span className="block">
              <span className="font-serif italic text-acid">bold</span>
              <span className="ml-4 inline-block transition-transform duration-500 group-hover:translate-x-6 group-hover:rotate-12">
                ↗
              </span>
            </span>
          </motion.h2>
        </a>

        <div className="mt-20 grid grid-cols-12 gap-y-12 border-t border-white/10 pt-12">
          {/* brand */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <SmartImage src="logo.png" alt="Being a Dot Logo" className="h-10 w-10 rounded-full ring-1 ring-white/20" />
              <h3 className="font-display text-xl tracking-[0.1em]">BEING A DOT</h3>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
              Designing stories, not just visuals.
            </p>
            <div className="mt-6 flex gap-2">
              {["IG", "YT", "IN", "BE"].map((s) => (
                <span
                  key={s}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 font-mono text-[10px] tracking-[0.1em] text-ash transition-colors hover:border-acid hover:text-acid"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="col-span-6 md:col-span-4">
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Quick Links</h3>
            <ul className="mt-5 space-y-2">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-3 py-1 font-display text-xl tracking-wide text-bone/80 transition-colors hover:text-acid md:text-2xl"
                  >
                    <span className="h-[1px] w-0 bg-acid transition-all duration-500 group-hover:w-8" />
                    {l.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="col-span-6 md:col-span-4">
            <h3 className="font-mono text-[10px] tracking-[0.3em] text-ash uppercase">Let's Connect</h3>
            <div className="mt-5 space-y-4 text-sm">
              <p className="text-ash">
                Vadodara, Gujarat
                <br />
                India
              </p>
              <p>
                <a
                  href="https://wa.me/7564024877"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-b border-acid/40 pb-1 text-bone transition-colors hover:text-acid"
                >
                  📞 WhatsApp Me
                </a>
              </p>
              <p>
                <a
                  href="mailto:beingadot@gmail.com"
                  className="inline-flex items-center gap-2 border-b border-white/20 pb-1 text-bone transition-colors hover:text-acid"
                >
                  📧 beingadot@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 font-mono text-[10px] tracking-[0.22em] text-ash uppercase md:flex-row">
          <span>© 2026 Being a Dot. All rights reserved.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 transition-colors hover:text-acid"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 transition-transform duration-500 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
