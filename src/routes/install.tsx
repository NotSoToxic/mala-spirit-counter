import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Share, PlusSquare, Home, Menu, Check, Smartphone } from "lucide-react";
import { MandalaBackground } from "@/components/MandalaBackground";
import { useState } from "react";
import { SITE_URL } from "@/lib/site";

const BASE_URL = SITE_URL;

const IOS_STEPS = [
  {
    title: "Open in Safari",
    body: "Visit this site in Safari on your iPhone or iPad.",
    icon: Smartphone,
  },
  {
    title: "Tap Share",
    body: "Tap the Share button at the bottom or top of the screen.",
    icon: Share,
  },
  {
    title: "Add to Home Screen",
    body: 'Scroll the share sheet and tap "Add to Home Screen".',
    icon: PlusSquare,
  },
  {
    title: "Tap Add",
    body: 'Confirm by tapping "Add" in the top-right corner.',
    icon: Check,
  },
  {
    title: "Open the app",
    body: "Find the Mala Jaap icon on your home screen and tap it.",
    icon: Home,
  },
];

const ANDROID_STEPS = [
  {
    title: "Open in Chrome",
    body: "Visit this site in Chrome on your Android phone or tablet.",
    icon: Smartphone,
  },
  {
    title: "Tap the menu",
    body: "Tap the three-dot menu in the top-right corner.",
    icon: Menu,
  },
  {
    title: "Add to Home Screen",
    body: 'Tap "Add to Home Screen" or "Install app" from the menu.',
    icon: PlusSquare,
  },
  {
    title: "Tap Add",
    body: 'Confirm by tapping "Add" or "Install" in the prompt.',
    icon: Check,
  },
  {
    title: "Open the app",
    body: "Find the Mala Jaap icon on your home screen and tap it.",
    icon: Home,
  },
];

const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Install Mala Jaap Counter on your phone",
  description:
    "Step-by-step guide to add the Mala Jaap Counter web app to your iPhone or Android home screen.",
  totalTime: "PT2M",
  step: [
    ...IOS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
      url: `${BASE_URL}/install#ios-step-${i + 1}`,
    })),
    ...ANDROID_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
      url: `${BASE_URL}/install#android-step-${i + 1}`,
    })),
  ],
};

export const Route = createFileRoute("/install")({
  head: () => ({
    meta: [
      { title: "Install - Mala Jaap Counter" },
      {
        name: "description",
        content:
          "Add Mala Jaap Counter to your iPhone or Android home screen. Works offline like a native app, no store required.",
      },
      { property: "og:title", content: "Install Mala Jaap Counter on your phone" },
      {
        property: "og:description",
        content:
          "Add Mala Jaap Counter to your home screen. A step-by-step guide for iPhone and Android.",
      },
      { property: "og:url", content: `${BASE_URL}/install` },
      { property: "og:image", content: `${BASE_URL}/og/install.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${BASE_URL}/og/install.png` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/install` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(HOWTO_SCHEMA),
      },
    ],
  }),
  component: InstallScreen,
});

function InstallScreen() {
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const steps = platform === "ios" ? IOS_STEPS : ANDROID_STEPS;

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
          <h1 className="font-display text-2xl text-foreground">Install on your phone</h1>
        </header>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Mala Jaap Counter works best when installed on your home screen. It opens full-screen,
          works offline, and feels like a native app - no app store needed.
        </p>

        <div className="flex rounded-2xl bg-secondary p-1">
          <PlatformTab active={platform === "ios"} onClick={() => setPlatform("ios")}>
            iPhone / iPad
          </PlatformTab>
          <PlatformTab active={platform === "android"} onClick={() => setPlatform("android")}>
            Android
          </PlatformTab>
        </div>

        <ol
          className="space-y-4"
          aria-label={`${platform === "ios" ? "iPhone" : "Android"} install steps`}
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              id={`${platform}-step-${index + 1}`}
              className="shrine-card flex items-start gap-4 rounded-2xl p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg">
                {index + 1}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <step.icon className="h-4 w-4 text-saffron" aria-hidden="true" />
                  <h2 className="font-display text-base text-foreground">{step.title}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="shrine-card rounded-2xl p-5 text-sm leading-relaxed text-muted-foreground">
          <h2 className="mb-2 font-display text-base text-foreground">Why install?</h2>
          <ul className="list-disc space-y-1 pl-4">
            <li>One-tap access from your home screen</li>
            <li>Works offline without internet</li>
            <li>No store account or download required</li>
            <li>Your data stays on your device</li>
          </ul>
        </div>

        <p className="text-center text-xs text-muted-foreground">
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
      </div>
    </main>
  );
}

function PlatformTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl py-2 text-sm font-medium transition-colors ${
        active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
