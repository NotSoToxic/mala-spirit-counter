import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { MandalaBackground } from "@/components/MandalaBackground";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Mala Jaap Counter" },
      {
        name: "description",
        content:
          "Mala Jaap Counter stores your counts, streaks and settings only on your own device. No accounts, no servers, no tracking.",
      },
      { property: "og:title", content: "Privacy Policy - Mala Jaap Counter" },
      {
        property: "og:description",
        content: "Your japa data never leaves your device. No accounts, no analytics, no ads.",
      },
      { property: "og:url", content: "https://mala-spirit-counter.lovable.app/privacy" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://mala-spirit-counter.lovable.app/privacy" }],
  }),
  component: PrivacyScreen,
});

function PrivacyScreen() {
  return (
    <main className="relative min-h-screen px-5 pb-16 pt-8">
      <MandalaBackground />
      <div className="relative mx-auto w-full max-w-md space-y-6">
        <header className="flex items-center gap-2">
          <Link
            to="/settings"
            aria-label="Back to settings"
            className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-2xl text-foreground">Privacy Policy</h1>
        </header>

        <div className="shrine-card space-y-5 rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground">
          <p className="text-foreground">
            Mala Jaap Counter keeps everything on your device. There are no accounts and no server
            that receives your practice data.
          </p>

          <Section title="What is stored">
            Your current bead count, completed malas, lifetime jaaps, daily history, streaks and
            preferences (bead style, mala length, sound, vibration, reminder time) are saved in your
            browser&apos;s local storage - a private cache on this device only.
          </Section>

          <Section title="What we collect">
            Nothing. We do not run analytics, advertising or tracking, and we do not ask for your
            name, email or location.
          </Section>

          <Section title="Notifications">
            If you turn on the daily reminder, the reminder time is stored locally and the
            notification is created by your own device. No push service is involved.
          </Section>

          <Section title="Clearing your data">
            You are always in control. Use “Reset all data” in Settings, or clear your browser site
            data / uninstall the app, and everything is gone permanently. Because the data lives only
            in this device&apos;s cache, it cannot be recovered afterwards and it does not sync
            between devices.
          </Section>

          <Section title="Contact">
            Questions about this policy can be sent to the app owner through the store listing where
            you installed the app.
          </Section>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <Link to="/terms" className="underline underline-offset-4 hover:text-foreground">
            Terms of Use
          </Link>
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1">
      <h2 className="font-display text-base text-foreground">{title}</h2>
      <p>{children}</p>
    </section>
  );
}
