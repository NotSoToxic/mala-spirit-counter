import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Check, Flame, RotateCcw, Settings, Timer, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BeadButton } from "@/components/BeadButton";
import { MandalaBackground } from "@/components/MandalaBackground";
import { useMala } from "@/hooks/useMala";
import { currentStreak, normalizeDay, todayKey } from "@/lib/mala";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mala Jaap Counter - Offline Japa Bead Counter" },
      {
        name: "description",
        content:
          "Tap the bead to count your japa. Tracks malas, lifetime jaaps and daily streaks offline on your device.",
      },
      { property: "og:title", content: "Mala Jaap Counter" },
      {
        property: "og:description",
        content: "A calm, offline mala bead counter for your daily spiritual practice.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og/home.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og/home.png` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Mala Jaap Counter",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Web, iOS, Android",
          description:
            "An offline mala bead counter for daily japa: tap the bead, track malas, lifetime jaaps and daily streaks.",
          url: "/",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: CounterScreen,
});

function CounterScreen() {
  const {
    data,
    ready,
    celebrating,
    sessionMinutes,
    increment,
    decrement,
    resetRound,
    setSankalpa,
  } = useMala();
  const today = normalizeDay(data.history[todayKey()]);
  const streak = currentStreak(data.history);
  const { mantra, dailyTarget } = data.settings;

  // Daily target reached celebration (one-shot per day)
  const [targetReached, setTargetReached] = useState(false);
  const prevMalas = useRef(today.malas);
  useEffect(() => {
    if (dailyTarget > 0 && today.malas >= dailyTarget && prevMalas.current < dailyTarget) {
      setTargetReached(true);
      const t = setTimeout(() => setTargetReached(false), 3000);
      return () => clearTimeout(t);
    }
    prevMalas.current = today.malas;
  }, [today.malas, dailyTarget]);

  // Sankalpa inline editing
  const [editingSankalpa, setEditingSankalpa] = useState(false);
  const [sankalpaText, setSankalpaText] = useState(today.sankalpa);
  const sankalpaRef = useRef<HTMLInputElement>(null);

  // Sync from data when day changes or on load
  useEffect(() => {
    setSankalpaText(today.sankalpa);
  }, [today.sankalpa]);

  useEffect(() => {
    if (editingSankalpa && sankalpaRef.current) sankalpaRef.current.focus();
  }, [editingSankalpa]);

  const commitSankalpa = () => {
    setEditingSankalpa(false);
    setSankalpa(sankalpaText.trim());
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden px-5 pb-6 pt-8">
      <MandalaBackground />

      <header className="relative flex w-full max-w-md items-center justify-between">
        <h1 className="font-display text-xl tracking-wide text-foreground">Mala Jaap Counter</h1>
        <div className="flex items-center gap-1">
          <Link
            to="/stats"
            aria-label="Stats and history"
            className="rounded-full p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <BarChart3 className="h-5 w-5" />
          </Link>
          <Link
            to="/settings"
            aria-label="Settings"
            className="rounded-full p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <div className="relative flex flex-col items-center gap-8">
        <AnimatePresence>
          {celebrating && (
            <motion.div
              key="glow"
              className="pointer-events-none fixed inset-0 bg-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.35, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <BeadButton
          count={data.count}
          length={data.settings.malaLength}
          bead={data.settings.bead}
          celebrating={celebrating}
          onTap={increment}
          onUndo={decrement}
        />

        <div className="h-8">
          <AnimatePresence mode="wait">
            {celebrating ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-display text-lg text-primary"
              >
                Mala Complete 🙏 - one more step on your journey
              </motion.p>
            ) : targetReached ? (
              <motion.p
                key="target"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-display text-lg text-primary"
              >
                Daily goal reached 🙏
              </motion.p>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-0.5"
              >
                <span className="text-sm text-muted-foreground">
                  {ready ? "Tap the bead with each mantra" : " "}
                </span>
                {mantra && (
                  <span className="font-display text-sm italic text-primary/80">{mantra}</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <section className="relative w-full max-w-md space-y-4">
        {/* Sankalpa / daily intention */}
        <div className="flex items-center justify-center min-h-8">
          {editingSankalpa ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                commitSankalpa();
              }}
              className="flex w-full max-w-xs items-center gap-2"
            >
              <input
                ref={sankalpaRef}
                type="text"
                value={sankalpaText}
                onChange={(e) => setSankalpaText(e.target.value)}
                onBlur={commitSankalpa}
                placeholder="Your intention for today…"
                maxLength={120}
                className={cn(
                  "w-full border-b bg-transparent px-1 py-1 text-center text-sm outline-none",
                  "border-transparent focus-visible:border-primary",
                  "text-foreground placeholder:text-muted-foreground/50",
                )}
              />
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setEditingSankalpa(true)}
              className="text-center text-sm transition-colors hover:text-foreground"
            >
              {today.sankalpa ? (
                <span className="italic text-foreground/80">&ldquo;{today.sankalpa}&rdquo;</span>
              ) : (
                <span className="text-muted-foreground/60">Set today&apos;s intention…</span>
              )}
            </button>
          )}
        </div>

        {/* Daily target progress */}
        {dailyTarget > 0 && (
          <div className="shrine-card flex items-center gap-3 rounded-2xl px-4 py-2.5">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Daily goal</span>
                <span className="font-display text-sm text-foreground">
                  {Math.min(today.malas, dailyTarget)} / {dailyTarget} malas
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((today.malas / dailyTarget) * 100, 100)}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 18 }}
                />
              </div>
            </div>
            {today.malas >= dailyTarget && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground"
              >
                <Check className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </div>
        )}

        <div className="shrine-card grid grid-cols-3 rounded-2xl px-2 py-3 text-center">
          <Stat
            label="Today"
            value={`${today.malas} malas`}
            sub={
              sessionMinutes > 0 || today.minutes > 0 ? (
                <span className="flex items-center justify-center gap-1 text-[0.6rem] text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  {today.minutes + sessionMinutes} min
                </span>
              ) : undefined
            }
          />
          <Stat label="Lifetime" value={`${data.totalMalas} malas`} />
          <Stat
            label="Streak"
            value={`${streak} ${streak === 1 ? "day" : "days"}`}
            icon={
              <motion.span
                animate={{ scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-accent"
                style={{ display: "inline-flex" }}
              >
                <Flame
                  className="h-4 w-4"
                  style={{ filter: streak > 0 ? "drop-shadow(0 0 6px var(--saffron))" : "none" }}
                />
              </motion.span>
            }
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <ActionButton onClick={decrement} label="Undo one">
            <Undo2 className="h-5 w-5" />
            Undo
          </ActionButton>
          <ActionButton onClick={resetRound} label="Reset current round">
            <RotateCcw className="h-5 w-5" />
            Reset round
          </ActionButton>
        </div>

        <p className="text-center text-[0.7rem] leading-relaxed text-muted-foreground">
          Saved only on this device&apos;s local cache.{" "}
          <Link to="/install" className="underline underline-offset-4 hover:text-foreground">
            Install
          </Link>
          <span className="px-1">·</span>
          <Link to="/faq" className="underline underline-offset-4 hover:text-foreground">
            FAQ
          </Link>
          <span className="px-1">·</span>
          <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
            Privacy
          </Link>
          <span className="px-1">·</span>
          <Link to="/terms" className="underline underline-offset-4 hover:text-foreground">
            Terms
          </Link>
        </p>
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
  icon,
  sub,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      <span className="flex items-center gap-1.5 font-display text-lg text-foreground">
        {icon}
        {value}
      </span>
      {sub}
    </div>
  );
}

function ActionButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.95 }}
      className="shrine-card flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-4 text-sm text-foreground transition-colors hover:bg-secondary"
    >
      {children}
    </motion.button>
  );
}
