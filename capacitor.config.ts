import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native shell configuration for the App Store / Play Store builds.
 * The web app itself is unaffected by this file.
 *
 * webDir points at the static bundle produced by `npm run build:mobile`,
 * which snapshots each route to HTML so the app runs fully offline.
 */
const config: CapacitorConfig = {
  appId: "app.malajaap.counter",
  appName: "Mala Jaap",
  webDir: "dist/client",
  backgroundColor: "#2A0A0F",
  android: {
    backgroundColor: "#2A0A0F",
  },
  ios: {
    contentInset: "always",
    backgroundColor: "#2A0A0F",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 1200,
      backgroundColor: "#2A0A0F",
      showSpinner: false,
    },
  },
};

export default config;
