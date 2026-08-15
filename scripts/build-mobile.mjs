#!/usr/bin/env node
/**
 * Produces a fully static bundle in dist/client for the Capacitor native shell.
 *
 * The web deployment is server-rendered, but a native app has no server, so this
 * script builds the app, boots the built server locally, snapshots each route to
 * an HTML file, and shuts the server down. The result is a plain folder of HTML +
 * assets that Capacitor can ship inside the iOS/Android binary.
 *
 * Usage: npm run build:mobile
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROUTES = ["/", "/stats", "/settings"];
const PORT = 4183;
const OUT_DIR = "dist/client";

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: true, ...opts });
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`)),
    );
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server did not start at ${url}`);
}

async function main() {
  console.log("→ Building web app…");
  await run("npx", ["vite", "build"]);

  console.log("→ Starting built server for snapshotting…");
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--host", "127.0.0.1"], {
    stdio: "inherit",
    shell: true,
  });

  try {
    await waitForServer(`http://127.0.0.1:${PORT}/`);

    for (const route of ROUTES) {
      const res = await fetch(`http://127.0.0.1:${PORT}${route}`);
      if (!res.ok) throw new Error(`${route} responded ${res.status}`);
      const html = await res.text();
      const file =
        route === "/" ? join(OUT_DIR, "index.html") : join(OUT_DIR, route.slice(1), "index.html");
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, html, "utf8");
      console.log(`  ✓ ${route} → ${file}`);
    }
  } finally {
    server.kill("SIGTERM");
  }

  console.log("\n✓ Static bundle ready in dist/client");
  console.log("  Next: npx cap sync");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
