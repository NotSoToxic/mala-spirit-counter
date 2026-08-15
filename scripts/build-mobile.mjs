#!/usr/bin/env node
/**
 * Produces a fully static bundle in dist/client for the Capacitor native shell.
 *
 * The web deployment is server-rendered, but a native app ships without a server,
 * so this script builds the app and then writes a static HTML entry that boots the
 * client bundle directly. Routing happens client-side, and all data lives in
 * localStorage, so the packaged app works completely offline.
 *
 * Usage: npm run build:mobile
 */
import { spawn } from "node:child_process";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = "dist/client";
const ASSETS_DIR = join(OUT_DIR, "assets");
// Routes that need their own index.html so a deep link / reload inside the app resolves.
const ROUTES = ["/stats", "/settings"];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: true });
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`)),
    );
  });
}

function html({ entry, css }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no" />
    <meta name="theme-color" content="#2A0A0F" />
    <title>Mala Jaap — Bead Counter</title>
    <meta name="description" content="A calm, offline mala counter for your daily jaap: 108-bead rounds, streaks and lifetime totals." />
    <link rel="icon" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Karla:wght@400;500;600;700&display=swap" />
${css.map((f) => `    <link rel="stylesheet" href="/assets/${f}" />`).join("\n")}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${entry}"></script>
  </body>
</html>
`;
}

async function main() {
  console.log("→ Building web app…");
  await run("npx", ["vite", "build"]);

  const files = await readdir(ASSETS_DIR);
  const entry = files.find((f) => /^index-.*\.js$/.test(f));
  const css = files.filter((f) => f.endsWith(".css"));
  if (!entry) throw new Error("Could not find the client entry bundle in dist/client/assets");

  const page = html({ entry, css });
  await writeFile(join(OUT_DIR, "index.html"), page, "utf8");
  console.log(`  ✓ / → ${OUT_DIR}/index.html`);

  for (const route of ROUTES) {
    const dir = join(OUT_DIR, route.slice(1));
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), page, "utf8");
    console.log(`  ✓ ${route} → ${dir}/index.html`);
  }

  console.log("\n✓ Static bundle ready in dist/client");
  console.log("  Next: npx cap sync");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
