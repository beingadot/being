import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursor || null);
      } else {
        const link = (e.target as HTMLElement)?.closest?.("a,button");
        setActive(!!link);
        setLabel(null);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block"
    >
      <motion.div
        animate={{
          width: label ? 88 : active ? 46 : 14,
          height: label ? 88 : active ? 46 : 14,
          backgroundColor: label ? "#ddff3c" : active ? "rgba(221,255,60,0.15)" : "#ddff3c",
          borderColor: "#ddff3c",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center"
      >
        {label && (
          <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-black uppercase">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
