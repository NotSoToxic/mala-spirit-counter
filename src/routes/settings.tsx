import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Info, Smartphone, Volume2 } from "lucide-react";
import { MandalaBackground } from "@/components/MandalaBackground";
import { useMala } from "@/hooks/useMala";
import { BEAD_THEMES, MALA_LENGTHS } from "@/lib/mala";
import { Switch } from "@/components/ui/switch";
import { requestReminderPermission, syncNativeReminder } from "@/lib/reminder";
import { getAudioState, playChime, subscribeAudioState, unlockAudio, type AudioState } from "@/lib/feedback";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings - Mala Jaap Counter" },
      {
        name: "description",
        content: "Choose your bead, mala length, sound, vibration and diya-lit dark mode.",
      },
      { property: "og:title", content: "Mala Jaap Settings" },
      { property: "og:description", content: "Personalise your bead, mala length and feedback." },
      { property: "og:url", content: "https://mala-spirit-counter.lovable.app/settings" },
      { property: "og:image", content: "https://mala-spirit-counter.lovable.app/og/settings.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mala-spirit-counter.lovable.app/og/settings.png" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://mala-spirit-counter.lovable.app/settings" }],
  }),
  component: SettingsScreen,
});

function SettingsScreen() {
  const { data, updateSettings, resetAll } = useMala();
  const [confirming, setConfirming] = useState(false);
  const [reminderBlocked, setReminderBlocked] = useState(false);
  const [noVibrationSupport, setNoVibrationSupport] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>(() => getAudioState());
  const s = data.settings;

  useEffect(() => {
    const isNative = typeof window !== "undefined" && Boolean((window as any).Capacitor?.isNativePlatform?.());
    if (isNative) return;
    setNoVibrationSupport(typeof navigator !== "undefined" && !("vibrate" in navigator));
  }, []);

  useEffect(() => {
    const unsub = subscribeAudioState(setAudioState);
    return () => {
      unsub();
    };
  }, []);

  const toggleReminder = async (on: boolean) => {
    if (!on) {
      updateSettings({ reminder: false });
      void syncNativeReminder(false, s.reminderTime);
      return;
    }
    const granted = await requestReminderPermission();
    setReminderBlocked(!granted);
    if (!granted) return;
    updateSettings({ reminder: true });
    void syncNativeReminder(true, s.reminderTime);
  };

  const changeReminderTime = (time: string) => {
    updateSettings({ reminderTime: time });
    if (s.reminder) void syncNativeReminder(true, time);
  };

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
          <h1 className="font-display text-2xl text-foreground">Settings</h1>
        </header>

        <section className="shrine-card space-y-1 rounded-2xl p-2">
          <Row
            label={
              <span className="inline-flex items-center gap-2">
                Sound
                {s.sound && (
                  <span
                    className={
                      audioState === "ready"
                        ? "inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-600 dark:text-emerald-400"
                        : "inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-amber-600 dark:text-amber-400"
                    }
                  >
                    <Volume2 className="h-3 w-3" />
                    {audioState === "ready"
                      ? "Ready"
                      : audioState === "blocked"
                        ? "Blocked"
                        : audioState === "unsupported"
                          ? "Unsupported"
                          : "Tap to enable"}
                  </span>
                )}
              </span>
            }
            hint="Bead click and completion chime"
          >
            <Switch
              checked={s.sound}
              onCheckedChange={(v) => {
                if (v) unlockAudio();
                updateSettings({ sound: v });
              }}
            />
          </Row>
          {s.sound && (
            <div className="mx-3 mb-3 flex gap-2 rounded-xl bg-secondary/60 p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {audioState === "unsupported"
                    ? "This browser does not support web audio, so the bead click and chime stay silent."
                    : audioState === "blocked"
                      ? "Your browser is blocking playback. Check the silent switch and volume on iPhone, then tap Enable sound again."
                      : audioState === "ready"
                        ? "Sound is enabled on this device. Tap Test sound to hear the completion chime."
                        : "iPhone and iPad need one tap before sound can play. Tap the button below or your first bead to enable it."}
                </p>
                {audioState !== "unsupported" && (
                  <button
                    type="button"
                    onClick={() => {
                      unlockAudio();
                      playChime();
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    {audioState === "ready" ? "Test sound" : "Enable sound"}
                  </button>
                )}
              </div>
            </div>
          )}

          <Row
            label={
              <span className="inline-flex items-center gap-2">
                Vibration
                {noVibrationSupport && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.65rem] font-medium text-amber-600 dark:text-amber-400">
                    <Smartphone className="h-3 w-3" />
                    iOS unsupported
                  </span>
                )}
              </span>
            }
            hint="Gentle haptic on each jaap"
          >
            <Switch checked={s.vibration} onCheckedChange={(v) => updateSettings({ vibration: v })} />
          </Row>
          {noVibrationSupport && (
            <div className="mx-3 mb-3 flex gap-2 rounded-xl bg-secondary/60 p-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                iPhone and iPad browsers do not allow web apps to vibrate, so haptics stay silent here.
                Keep sound on for feedback - real device buzzing will arrive with the native app.
              </p>
            </div>
          )}
          <Row label="Diya-lit mode" hint="Dark theme for low light">
            <Switch checked={s.dark} onCheckedChange={(v) => updateSettings({ dark: v })} />
          </Row>
        </section>

        <section className="shrine-card space-y-1 rounded-2xl p-2">
          <Row label="Daily reminder" hint="A gentle nudge if you haven't sat with your mala">
            <Switch checked={s.reminder} onCheckedChange={(v) => void toggleReminder(v)} />
          </Row>
          {s.reminder && (
            <div className="flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-2">
              <div>
                <div className="text-sm text-foreground">Reminder time</div>
                <div className="text-xs text-muted-foreground">Scheduled on this device only</div>
              </div>
              <input
                type="time"
                value={s.reminderTime}
                onChange={(e) => changeReminderTime(e.target.value)}
                aria-label="Reminder time"
                className="rounded-xl bg-secondary px-3 py-2 text-sm text-secondary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          )}
          {reminderBlocked && (
            <p className="px-3 pb-2 text-xs text-destructive">
              Notifications are blocked. Allow them for this app in your browser or device settings,
              then try again.
            </p>
          )}
        </section>

        <section className="shrine-card space-y-3 rounded-2xl p-4">
          <h2 className="font-display text-lg text-foreground">Bead</h2>
          <div className="grid grid-cols-4 gap-3">
            {BEAD_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => updateSettings({ bead: t.id })}
                data-bead={t.id}
                className={`flex flex-col items-center gap-2 rounded-xl py-3 transition-colors ${
                  s.bead === t.id ? "bg-secondary" : "hover:bg-secondary/60"
                }`}
              >
                <span className="bead-surface h-10 w-10 rounded-full" />
                <span className="text-[0.65rem] text-muted-foreground">{t.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="shrine-card space-y-3 rounded-2xl p-4">
          <h2 className="font-display text-lg text-foreground">Mala length</h2>
          <div className="grid grid-cols-4 gap-2">
            {MALA_LENGTHS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => updateSettings({ malaLength: n })}
                className={`min-h-12 rounded-xl font-display text-lg transition-colors ${
                  s.malaLength === n
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="min-h-14 w-full rounded-2xl border border-destructive/40 text-sm text-destructive transition-colors hover:bg-destructive/10"
        >
          Reset all data
        </button>

        <section className="space-y-2 pt-2 text-center">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Your counts, malas, streaks and history are stored only in this device&apos;s local
            cache - never on a server. Clearing site data or uninstalling the app erases them
            permanently.
          </p>
          <p className="text-xs text-muted-foreground">
            <Link to="/install" className="underline underline-offset-4 hover:text-foreground">
              Install on phone
            </Link>
            <span className="px-2">·</span>
            <Link to="/faq" className="underline underline-offset-4 hover:text-foreground">
              FAQ
            </Link>
            <span className="px-2">·</span>
            <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
              Privacy Policy
            </Link>
            <span className="px-2">·</span>
            <Link to="/terms" className="underline underline-offset-4 hover:text-foreground">
              Terms of Use
            </Link>
          </p>
        </section>
      </div>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Clear your whole journey?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently erases your lifetime jaaps, malas, streaks and daily history on this
              device. Your preferences are kept.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my data</AlertDialogCancel>
            <AlertDialogAction onClick={resetAll}>Reset everything</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: React.ReactNode;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-2">
      <div>
        <div className="text-sm text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
      {children}
    </div>
  );
}
