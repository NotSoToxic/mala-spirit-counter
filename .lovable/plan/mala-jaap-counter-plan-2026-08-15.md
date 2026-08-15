# Mala Jaap Counter — Plan

A calm, devotional bead-counting companion. Fully offline, no accounts, all data stored on the device.

## Screens

**1. Counter (home, `/`)**
- Large tactile rudraksha-style bead in the center; tapping counts +1.
- Circular progress ring animates toward the chosen mala length (default 108).
- Big count display "42 / 108" in an elegant serif.
- Subtle stats strip: malas today, lifetime malas, streak diya.
- Bottom bar: Undo (−1, never below 0), Reset round, Sound toggle, Vibration toggle, links to Stats and Settings.
- Idle "breathing" glow on the bead; press animation with ripple.
- On completing a mala: light/petal burst, full-screen glow flash, chime, vibration, "Mala Complete 🙏" message, then auto-reset to 0 and +1 mala.

**2. Stats (`/stats`)**
- Lifetime totals: jaaps, malas, current streak, longest streak.
- Day-wise history as a soft list plus simple bar strip for the last 30 days.

**3. Settings (`/settings`)**
- Sound and vibration toggles.
- Bead theme: Rudraksha brown, Tulsi green, Sandalwood cream, Gold.
- Mala length: 27 / 54 / 108 / 1008.
- Light/dark (diya-lit) mode.
- Reset all data with a confirmation dialog.

## Design

Warm devotional palette — deep maroon, saffron, warm gold, cream; dark mode in deep brown/black with gold. Elegant serif for numbers/headings, soft sans for body. Subtle mandala/lotus background motifs at low opacity. All colors added as semantic tokens in `src/styles.css`; no hardcoded color utilities.

## Technical

- Routes: `src/routes/index.tsx` (counter), `stats.tsx`, `settings.tsx`, each with its own head metadata.
- State: one `useMala` hook over localStorage — current count, lifetime jaaps, lifetime malas, per-date history map, streak dates, settings. Written on every change, read once on mount (hydration-safe).
- Animation: Motion for React (press/bounce, ring fill, completion burst, route transitions).
- Sound: small Web Audio chime generated in-code (no asset download), gated by the sound toggle. Vibration via `navigator.vibrate` when supported.
- Hardware volume keys are not accessible to web apps on Android/iOS; skipping that gracefully, tap and undo remain the interaction.
- PWA with offline support: `vite-plugin-pwa` (generateSW, autoUpdate), guarded registration wrapper that never registers in the Lovable preview/dev, manifest + icons + theme-color + apple-touch-icon. Offline works in the published app, not the editor preview.
- Everything client-side; no backend, no Cloud.
