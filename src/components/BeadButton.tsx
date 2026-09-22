import { motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { BEAD_THEMES, type BeadTheme } from "@/lib/mala";

type Props = {
  count: number;
  length: number;
  bead: BeadTheme;
  celebrating: boolean;
  onTap: () => void;
  onUndo?: () => void;
};

const RADIUS = 46;
const CIRC = 2 * Math.PI * RADIUS;
const SWIPE_THRESHOLD = 50;

/** Theme-aware particle SVG paths. */
const PARTICLE_SHAPES: Record<BeadTheme, { d: string; viewBox: string }> = {
  rudraksha: {
    // teardrop petal
    d: "M4 0C4 0 8 5 8 8a4 4 0 1 1-8 0C0 5 4 0 4 0Z",
    viewBox: "0 0 8 12",
  },
  tulsi: {
    // leaf shape
    d: "M5 0C2 2 0 6 0 9c0 2 1 3 2 3s3-1 5-4c2-3 2-6 1-7S6-1 5 0Z",
    viewBox: "0 0 8 12",
  },
  sandalwood: {
    // soft swirl / rounded diamond
    d: "M4 0Q8 4 4 10Q0 4 4 0Z",
    viewBox: "0 0 8 10",
  },
  gold: {
    // 4-pointed star
    d: "M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z",
    viewBox: "0 0 8 8",
  },
};

export function BeadButton({ count, length, bead, celebrating, onTap, onUndo }: Props) {
  const progress = Math.min(count / length, 1);
  const beadImage = BEAD_THEMES.find((t) => t.id === bead)?.image ?? BEAD_THEMES[0].image;

  // Swipe-to-undo tracking
  const dragY = useMotionValue(0);
  const hintOpacity = useTransform(dragY, [0, SWIPE_THRESHOLD], [0, 0.7]);

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > SWIPE_THRESHOLD && onUndo) {
      onUndo();
    }
    dragY.set(0);
  };

  const handlePan = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 0) dragY.set(info.offset.y);
  };

  const particle = PARTICLE_SHAPES[bead];

  return (
    <div data-bead={bead} className="relative flex items-center justify-center">
      {/* progress ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute h-[min(78vw,22rem)] w-[min(78vw,22rem)] -rotate-90"
      >
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="1.6"
          className="stroke-border"
        />
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

      {/* swipe-down hint arrow */}
      {onUndo && (
        <motion.span
          className="absolute bottom-0 translate-y-[calc(100%+0.75rem)] text-muted-foreground"
          style={{ opacity: hintOpacity }}
          aria-hidden
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M10 4v12M5 11l5 5 5-5" />
          </svg>
        </motion.span>
      )}

      {/* celebration burst — themed particles */}
      {celebrating &&
        Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute"
            initial={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 0.3,
              x: Math.cos((i / 14) * Math.PI * 2) * 180,
              y: Math.sin((i / 14) * Math.PI * 2) * 180,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <svg
              width="12"
              height="14"
              viewBox={particle.viewBox}
              className="fill-accent"
              style={{ filter: "drop-shadow(0 0 4px var(--saffron))" }}
            >
              <path d={particle.d} />
            </svg>
          </motion.span>
        ))}

      <motion.button
        type="button"
        onClick={onTap}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        aria-label="Count one jaap"
        className="bead-surface relative flex h-[min(58vw,16rem)] w-[min(58vw,16rem)] select-none items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-ring/60 overflow-hidden"
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
        {/* Bead photo layered with multiply blend — white bg becomes transparent */}
        <img
          src={beadImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full rounded-full object-cover"
          style={{ mixBlendMode: "multiply" }}
        />
        <span className="pointer-events-none relative flex flex-col items-center">
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
