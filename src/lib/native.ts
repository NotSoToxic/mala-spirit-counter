/**
 * Thin bridge to native capabilities when the app runs inside the Capacitor
 * shell (App Store / Play Store builds). In a normal browser every function
 * here is a no-op, so web behaviour is unchanged.
 */

type CapacitorGlobal = { isNativePlatform?: () => boolean };

export function isNative(): boolean {
  if (typeof window === "undefined") return false;
  const cap = (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
  return Boolean(cap?.isNativePlatform?.());
}

/** Native haptic tap. Returns false when unavailable so callers can fall back. */
export function nativeHaptic(strength: "light" | "medium" | "heavy" = "light"): boolean {
  if (!isNative()) return false;
  void (async () => {
    try {
      const { Haptics, ImpactStyle } = await import("@capacitor/haptics");
      const style =
        strength === "heavy"
          ? ImpactStyle.Heavy
          : strength === "medium"
            ? ImpactStyle.Medium
            : ImpactStyle.Light;
      await Haptics.impact({ style });
    } catch {
      /* plugin unavailable */
    }
  })();
  return true;
}

/** Configure status bar and dismiss the splash screen once the app is ready. */
export function initNativeShell(): void {
  if (!isNative()) return;
  void (async () => {
    try {
      const { StatusBar, Style } = await import("@capacitor/status-bar");
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setOverlaysWebView({ overlay: true });
    } catch {
      /* not available on this platform */
    }
    try {
      const { SplashScreen } = await import("@capacitor/splash-screen");
      await SplashScreen.hide();
    } catch {
      /* not available */
    }
  })();
}
