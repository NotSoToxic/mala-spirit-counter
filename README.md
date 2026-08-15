# Sacred Bead Counter

Lovable Prompt: Mala Jaap Counter App

Copy everything below into Lovable.

Build a beautiful, spiritual Mala Jaap Counter web app (installable as a PWA on Android and iOS via "Add to Home Screen"). No login, no accounts, no backend - everything is stored locally on the device using localStorage. Simple install-and-use experience.

Core Functionality

Primary interaction: A large, central circular "bead" button in the middle of the screen. Tapping it increments the current count by 1.

Undo: A smaller secondary button (or swipe-down gesture on the main bead) decrements the count by 1, in case of a misclick. Never let count go below 0.

Mala completion logic: A traditional mala = 108 beads.

When the count reaches 108, trigger a celebratory completion animation (glow burst, gentle chime sound, subtle haptic vibration via the Vibration API if supported).

Automatically start a new round: increment "Total Malas Completed" by 1, reset the current bead count to 0, and continue.

Volume button support (best effort): If technically feasible within a PWA/Capacitor wrapper, also let hardware volume-up increment and volume-down decrement the count. If this isn't reliably achievable in a browser/PWA context, skip it gracefully and rely on tap - don't break the core experience trying to force it.

Persistence: Store and restore across sessions (localStorage):

Current bead count (within active mala)

Total malas completed (lifetime)

Total individual jaap count (lifetime)

Daily streak (days with at least 1 jaap logged)

History log: date-wise count of malas/jaaps completed

Reset options:

"Reset current round" (just the 0–108 counter)

"Reset all data" (with a confirmation dialog, since this clears lifetime stats)

Screens

1. Main Counter Screen (home)

Large circular bead/mala graphic in the center - tapping it is the primary counter action.

A thin circular progress ring around the bead fills up as count approaches 108.

Current count displayed prominently (e.g., "42 / 108") in elegant typography.

Total malas completed today and lifetime shown subtly below or in a stats strip.

Undo button, reset button, and a settings/menu icon, placed unobtrusively (corners or bottom bar) so they don't distract from the counting flow.

Optional toggle for sound (temple bell / mantra chime on tap and on completion) and vibration feedback.

2. Stats / History Screen

Calendar-style or list-style view of daily jaap/mala counts.

Lifetime totals: total jaaps, total malas, current streak, longest streak.

Clean charts or progress bars (simple, not overly technical-looking - keep the spiritual tone).

3. Settings Screen

Toggle sound on/off, toggle vibration on/off.

Choose bead theme/color (e.g., Rudraksha brown, Tulsi green, Sandalwood cream, Gold).

Choose mala length if user wants alternatives to 108 (e.g., 27, 54, 108, 1008).

Reset all data option.

Visual & Aesthetic Direction

Theme: Warm, devotional, minimal - not cluttered. Think temple aesthetics meets modern app design.

Color palette: Deep maroon, saffron/orange, warm gold accents, cream/off-white backgrounds; optional dark mode with deep brown/black and gold accents (like diya-lit ambience).

Typography: Elegant serif or soft rounded sans-serif for numbers and headings; avoid anything harsh or overly "techy."

Motifs: Subtle mandala patterns, lotus motifs, or rudraksha bead textures as background accents - kept subtle so they don't overwhelm the counter.

Central bead button: Should look tactile - a 3D-ish rudraksha/gemstone bead with soft shadows and a gentle glow, not a flat generic button.

Animation & Interaction Requirements (use Framer Motion or similar)

On tap: Bead does a satisfying press/scale animation (scale down slightly then bounce back), with a soft ripple or glow pulse emanating outward.

Progress ring: Smoothly animates fill as count increases; smoothly retracts on undo.

On mala completion (108): A distinct, delightful animation - e.g., a burst of light/petals/sparkles around the bead, a brief full-screen glow, celebratory chime, and a short congratulatory message ("Mala Complete 🙏 - 1 more step on your journey").

Micro-interactions: Smooth transitions between screens (fade/slide), subtle idle animation on the bead (gentle breathing/glow pulse) when the app is at rest, so it feels alive rather than static.

Streak indicator: Small animated flame or diya icon that grows/glows more as streak increases.

Technical Notes

Build as a responsive PWA (works well on both Android and iOS browsers, and looks native when added to home screen - proper manifest.json, icons, splash screen, theme-color meta tag).

Use React with Tailwind CSS for styling and Framer Motion for animations.

No backend, no auth, no external database - pure client-side app with localStorage persistence.

Ensure it works fully offline once loaded.

Prioritize performance: animations should stay smooth (60fps) even on mid-range phones.

Ensure touch targets are large and comfortable for one-handed use (people often use this app with eyes closed or in low light during meditation).

Tone

The overall feel should be calm, sacred, and encouraging - like a digital companion for a spiritual practice, not a gamified productivity app. Avoid anything that feels like a generic "counter" or "clicker" app.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c0f9f652-c0dc-4f16-97fe-2c65c46e60c3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
