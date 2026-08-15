import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Flame, RotateCcw, Settings, Undo2 } from "lucide-react";
import { BeadButton } from "@/components/BeadButton";
import { MandalaBackground } from "@/components/MandalaBackground";
import { useMala } from "@/hooks/useMala";
import { currentStreak, todayKey } from "@/lib/mala";

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
      { property: "og:url", content: "https://mala-spirit-counter.lovable.app/" },
      { property: "og:image", content: "https://mala-spirit-counter.lovable.app/og/home.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mala-spirit-counter.lovable.app/og/home.png" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://mala-spirit-counter.lovable.app/" }],
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
  const { data, ready, celebrating, increment, decrement, resetRound } = useMala();
  const today = data.history[todayKey()] ?? { jaaps: 0, malas: 0 };
  const streak = currentStreak(data.history);

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
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground"
              >
                {ready ? "Tap the bead with each mantra" : " "}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <section className="relative w-full max-w-md space-y-4">
        <div className="shrine-card grid grid-cols-3 rounded-2xl px-2 py-3 text-center">
          <Stat label="Today" value={`${today.malas} malas`} />
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

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 font-display text-lg text-foreground">
        {icon}
        {value}
      </span>
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
