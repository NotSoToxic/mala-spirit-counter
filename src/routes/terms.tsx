import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { MandalaBackground } from "@/components/MandalaBackground";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Mala Jaap Counter" },
      {
        name: "description",
        content:
          "The simple terms for using Mala Jaap Counter: a free, offline japa counter provided as-is with your data kept on your device.",
      },
      { property: "og:title", content: "Terms of Use — Mala Jaap Counter" },
      {
        property: "og:description",
        content: "Simple, plain-language terms for this free offline mala counter.",
      },
    ],
  }),
  component: TermsScreen,
});

function TermsScreen() {
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
          <h1 className="font-display text-2xl text-foreground">Terms of Use</h1>
        </header>

        <div className="shrine-card space-y-5 rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground">
          <Section title="Using the app">
            Mala Jaap Counter is offered free of charge for personal spiritual practice. You may use
            it on any device you own.
          </Section>

          <Section title="Your data is yours">
            All counts, history and settings stay in your device&apos;s local storage. You are
            responsible for keeping your device — if you clear the app&apos;s cache, reinstall, or
            use a different device or browser, your history will not be there.
          </Section>

          <Section title="No warranty">
            The app is provided “as is”, without warranties of any kind. Counts, streaks and
            reminders may be affected by device settings, storage limits or browser behaviour, and we
            cannot guarantee uninterrupted or error-free operation.
          </Section>

          <Section title="Limitation of liability">
            To the extent permitted by law, the app owner is not liable for any loss of data or any
            indirect damages arising from use of the app.
          </Section>

          <Section title="Changes">
            These terms may be updated as the app evolves. Continued use after an update means you
            accept the revised terms.
          </Section>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
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
