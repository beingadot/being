import { useState } from "react";
import { cn } from "../utils/cn";

type Props = {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
};

/**
 * Renders the original asset (e.g. `portfolio1.jpg`). If it is missing, it silently
 * swaps to a curated fallback, and if that fails too it draws a typographic plate so
 * the composition never collapses.
 */
export default function SmartImage({ src, fallback, alt, className, imgClassName, loading = "lazy" }: Props) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const current = stage === 0 ? src : fallback;

  if (stage === 2 || !current) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#14141a_0%,#0a0a0f_55%,#1b1b22_100%)]",
          className,
        )}
      >
        <div className="hairline-grid absolute inset-0 opacity-60" />
        <span className="relative font-mono text-[10px] tracking-[0.35em] text-ash uppercase">{src}</span>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={current}
        alt={alt}
        loading={loading}
        onError={() => setStage((s) => (s === 0 ? 1 : 2))}
        className={cn("h-full w-full object-cover", imgClassName)}
        draggable={false}
      />
    </div>
  );
}
