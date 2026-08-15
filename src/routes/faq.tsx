import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { MandalaBackground } from "@/components/MandalaBackground";

const FAQS = [
  {
    question: "What is Mala Jaap Counter?",
    answer:
      "Mala Jaap Counter is a calm, offline mala bead counter for daily japa. Tap the central bead with each mantra repetition and the app tracks your round, completed malas, lifetime jaaps and daily streak.",
  },
  {
    question: "Does the app work offline?",
    answer:
      "Yes. Everything is stored locally on your device. Once installed as a PWA or native app, you can count jaaps without an internet connection.",
  },
  {
    question: "How is my data stored?",
    answer:
      "Your bead count, malas, lifetime jaaps, history, streaks and settings are saved only in your device's local cache. No account, server or cloud sync is used. Clearing site data or uninstalling the app erases the data permanently.",
  },
  {
    question: "Can I change the mala length?",
    answer:
      "Yes. Open Settings and choose a mala length that matches your practice - 108, 54, 27 or 111 beads.",
  },
  {
    question: "What happens when I complete one mala?",
    answer:
      "The app plays a gentle chime and haptic burst, then starts a fresh round automatically while adding one mala to your daily and lifetime totals.",
  },
  {
    question: "Can I set a daily reminder?",
    answer:
      "Yes. In Settings you can enable a daily reminder at a time you choose. The reminder is scheduled on your device only and no push server is involved.",
  },
  {
    question: "How do I reset my data?",
    answer:
      "Use the 'Reset all data' button in Settings. This permanently clears your counts, history and streaks from this device.",
  },
  {
    question: "Is there an iOS or Android app?",
    answer:
      "The web app can be installed as a PWA from your browser. A dedicated native iOS and Android app launch is coming soon.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - Mala Jaap Counter" },
      {
        name: "description",
        content:
          "Answers to common questions about Mala Jaap Counter: offline use, privacy, reminders, mala lengths and more.",
      },
      { property: "og:title", content: "FAQ - Mala Jaap Counter" },
      {
        property: "og:description",
        content: "Common questions about using the offline Mala Jaap Counter app.",
      },
      { property: "og:url", content: "https://mala-spirit-counter.lovable.app/faq" },
      { property: "og:image", content: "https://mala-spirit-counter.lovable.app/og/faq.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://mala-spirit-counter.lovable.app/og/faq.png" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://mala-spirit-counter.lovable.app/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_SCHEMA),
      },
    ],
  }),
  component: FaqScreen,
});

function FaqScreen() {
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
          <h1 className="font-display text-2xl text-foreground">FAQ</h1>
        </header>

        <div className="shrine-card space-y-6 rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground">
          {FAQS.map((f) => (
            <section key={f.question} className="space-y-1">
              <h2 className="font-display text-base text-foreground">{f.question}</h2>
              <p>{f.answer}</p>
            </section>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <Link to="/install" className="underline underline-offset-4 hover:text-foreground">
            Install on phone
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
      </div>
    </main>
  );
}
