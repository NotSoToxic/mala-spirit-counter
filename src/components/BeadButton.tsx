import { motion } from "motion/react";
import type { BeadTheme } from "@/lib/mala";

type Props = {
  count: number;
  length: number;
  bead: BeadTheme;
  celebrating: boolean;
  onTap: () => void;
};

const RADIUS = 46;
const CIRC = 2 * Math.PI * RADIUS;

export function BeadButton({ count, length, bead, celebrating, onTap }: Props) {
  const progress = Math.min(count / length, 1);

  return (
    <div data-bead={bead} className="relative flex items-center justify-center">
      {/* progress ring */}
      <svg viewBox="0 0 100 100" className="absolute h-[min(78vw,22rem)] w-[min(78vw,22rem)] -rotate-90">
        <circle cx="50" cy="50" r={RADIUS} fill="none" strokeWidth="1.6" className="stroke-border" />
        <motion.circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="2.4"
          strokeLinecap="round"
          className="stroke-accent"
          style={{ strokeDasharray: CIRC }}
          animate={{ strokeDashoffset: CIRC * (1 - progress) }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </svg>

      {/* celebration burst */}
      {celebrating &&
        Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-accent"
            initial={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 0.3,
              x: Math.cos((i / 14) * Math.PI * 2) * 180,
              y: Math.sin((i / 14) * Math.PI * 2) * 180,
            }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        ))}

      <motion.button
        type="button"
        onClick={onTap}
        aria-label="Count one jaap"
        className="bead-surface relative flex h-[min(58vw,16rem)] w-[min(58vw,16rem)] select-none items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
        whileTap={{ scale: 0.93 }}
        animate={{
          scale: celebrating ? [1, 1.06, 1] : [1, 1.015, 1],
          filter: celebrating
            ? "drop-shadow(0 0 60px var(--saffron))"
            : "drop-shadow(0 0 22px color-mix(in oklab, var(--saffron) 30%, transparent))",
        }}
        transition={{
          scale: celebrating
            ? { duration: 1.2, ease: "easeInOut" }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className="pointer-events-none flex flex-col items-center">
          <span className="font-display text-6xl font-semibold leading-none text-primary-foreground drop-shadow-md sm:text-7xl">
            {count}
          </span>
          <span className="mt-1 text-xs uppercase tracking-[0.35em] text-primary-foreground/70">
            of {length}
          </span>
        </span>
      </motion.button>
    </div>
  );
}
