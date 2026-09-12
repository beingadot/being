import { cn } from "../utils/cn";

type Props = {
  items: string[];
  className?: string;
  speed?: string;
  reverse?: boolean;
  variant?: "acid" | "outline" | "bone";
};

export default function Ticker({ items, className, speed = "34s", reverse, variant = "acid" }: Props) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "marquee-pause relative w-full overflow-hidden border-y",
        variant === "acid" && "border-black/20 bg-acid text-black",
        variant === "bone" && "border-black/10 bg-bone text-black",
        variant === "outline" && "border-white/10 bg-void text-bone",
        className,
      )}
    >
      <div className={cn("marquee-track py-3 md:py-4", reverse && "reverse")} style={{ ["--speed" as string]: speed }}>
        {row.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span
              className={cn(
                "px-6 font-display text-[clamp(1.4rem,3.4vw,2.9rem)] leading-none tracking-[0.04em] whitespace-nowrap",
                variant === "outline" && "stroke-text-thin",
              )}
            >
              {t}
            </span>
            <span
              className={cn(
                "inline-block h-2.5 w-2.5 shrink-0 rounded-full",
                variant === "outline" ? "bg-acid" : "bg-black",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
