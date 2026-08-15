const SW_URL = "/sw.js";

function isPreviewHost(host: string) {
  return (
    host.startsWith("id-preview--") ||
    host.startsWith("preview--") ||
    host === "lovableproject.com" ||
    host.endsWith(".lovableproject.com") ||
    host === "lovableproject-dev.com" ||
    host.endsWith(".lovableproject-dev.com") ||
    host === "beta.lovable.dev" ||
    host.endsWith(".beta.lovable.dev")
  );
}

async function unregisterAppSw() {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.allSettled(
    regs
      .filter((r) => (r.active?.scriptURL ?? r.installing?.scriptURL ?? "").endsWith(SW_URL))
      .map((r) => r.unregister()),
  );
}

export function registerAppServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  const refused =
    !import.meta.env.PROD ||
    window.self !== window.top ||
    isPreviewHost(window.location.hostname) ||
    new URL(window.location.href).searchParams.get("sw") === "off";

  if (refused) {
    void unregisterAppSw();
    return;
  }

  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(SW_URL, { scope: "/" });
  });
}
