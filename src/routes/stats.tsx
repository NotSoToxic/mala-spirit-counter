import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { MandalaBackground } from "@/components/MandalaBackground";
import { useMala } from "@/hooks/useMala";
import { currentStreak, formatDay, lastNDays, longestStreak } from "@/lib/mala";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Your Japa Journey - Mala Jaap Counter" },
      {
        name: "description",
        content: "Day-wise mala and jaap history, lifetime totals, current streak and longest streak.",
      },
      { property: "og:title", content: "Your Japa Journey" },
      { property: "og:description", content: "Lifetime totals, daily history and streaks for your japa practice." },
      { property: "og:url", content: "https://mala-spirit-counter.lovable.app/stats" },
      { property: "og:image", content: "https://mala-spirit-counter.lovable.app/og/stats.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mala-spirit-counter.lovable.app/og/stats.png" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://mala-spirit-counter.lovable.app/stats" }],
  }),
  component: StatsScreen,
});

function StatsScreen() {
  const { data } = useMala();
  const days = lastNDays(data.history, 30);
  const max = Math.max(1, ...days.map((d) => d.entry.jaaps));
  const recent = [...days].reverse().filter((d) => d.entry.jaaps > 0);

  return (
    <main className="relative min-h-screen px-5 pb-12 pt-8">
      <MandalaBackground />
      <div className="relative mx-auto w-full max-w-md space-y-6">
        <header className="flex items-center gap-2">
          <Link
            to="/"
            aria-label="Back to counter"
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-2xl text-foreground">Your journey</h1>
        </header>

        <div className="grid grid-cols-2 gap-3">
          <Tile label="Total jaaps" value={data.totalJaaps} />
          <Tile label="Total malas" value={data.totalMalas} />
          <Tile label="Current streak" value={`${currentStreak(data.history)} d`} />
          <Tile label="Longest streak" value={`${longestStreak(data.history)} d`} />
        </div>

        <section className="shrine-card rounded-2xl p-4">
          <h2 className="font-display text-lg text-foreground">Last 30 days</h2>
          <div className="mt-4 flex h-24 items-end gap-1">
            {days.map((d) => (
              <motion.div
                key={d.key}
                title={`${formatDay(d.key)} - ${d.entry.jaaps} jaaps`}
                className="flex-1 rounded-t bg-accent/70"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(3, (d.entry.jaaps / max) * 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg text-foreground">Daily log</h2>
          {recent.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No jaaps logged yet. Your practice will appear here.
            </p>
          )}
          {recent.map((d) => (
            <div
              key={d.key}
              className="shrine-card flex items-center justify-between rounded-xl px-4 py-3"
            >
              <span className="text-sm text-foreground">{formatDay(d.key)}</span>
              <span className="text-sm text-muted-foreground">
                {d.entry.malas} malas · {d.entry.jaaps} jaaps
              </span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="shrine-card rounded-2xl px-4 py-5 text-center">
      <div className="font-display text-3xl text-primary">{value}</div>
      <div className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
