#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// ── Parse CLI Arguments ───────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("-")));

const isDryRun = flags.has("--dry-run");
const skipBuild = flags.has("--no-build");
const autoAccept = !flags.has("--no-auto-accept");

// Parse --token=<value> or --token <value>
let token = "";
const tokenFlagIdx = args.findIndex(
  (a) => a === "--token" || a.startsWith("--token="),
);
if (tokenFlagIdx !== -1) {
  if (args[tokenFlagIdx].includes("=")) {
    token = args[tokenFlagIdx].split("=")[1];
  } else if (
    args[tokenFlagIdx + 1] &&
    !args[tokenFlagIdx + 1].startsWith("-")
  ) {
    token = args[tokenFlagIdx + 1];
  }
}

if (flags.has("--help") || flags.has("-h")) {
  console.log(`
\x1b[1m\x1b[34m[Galyan UI - Storybook Publish Script]\x1b[0m

\x1b[33mUsage:\x1b[0m
  pnpm publish:storybook           \x1b[90m# Build packages & publish Storybook to Chromatic\x1b[0m

\x1b[33mOptions:\x1b[0m
  --token <token>                  \x1b[90m# Chromatic project token (default: CHROMATIC_PROJECT_TOKEN)\x1b[0m
  --dry-run                        \x1b[90m# Build Storybook locally without uploading to Chromatic\x1b[0m
  --no-build                       \x1b[90m# Skip building @galyan/* packages first\x1b[0m
  --no-auto-accept                 \x1b[90m# Leave visual changes for review instead of auto-accepting\x1b[0m
  --check                          \x1b[90m# Only verify a Chromatic token is available\x1b[0m

\x1b[33mToken:\x1b[0m
  Read from --token, then CHROMATIC_PROJECT_TOKEN in the environment or a
  root .env file (gitignored).
`);
  process.exit(0);
}

// Helper to execute commands synchronously with inherited stdio
function run(cmd, opts = {}) {
  console.log(`\x1b[90m$ ${cmd}\x1b[0m`);
  try {
    return execSync(cmd, { stdio: "inherit", encoding: "utf8", ...opts });
  } catch {
    console.error(`\x1b[31mCommand failed: ${cmd}\x1b[0m`);
    process.exit(1);
  }
}

// ── Resolve Chromatic Token ──────────────────────────────────────────────────
const envFile = path.resolve(".env");
if (!token && !process.env.CHROMATIC_PROJECT_TOKEN && fs.existsSync(envFile)) {
  try {
    process.loadEnvFile(envFile);
  } catch {}
}
token = token || process.env.CHROMATIC_PROJECT_TOKEN || "";

if (!token && !isDryRun) {
  console.error(`\n\x1b[1m\x1b[31m❌ Chromatic project token not found\x1b[0m`);
  console.error(
    `Set \x1b[1mCHROMATIC_PROJECT_TOKEN\x1b[0m in your environment or in a root \x1b[1m.env\x1b[0m file,`,
  );
  console.error(`or pass it directly:`);
  console.error(
    `  \x1b[1m\x1b[36mpnpm publish:storybook --token <token>\x1b[0m\n`,
  );
  process.exit(1);
}

// --check only verifies a token is available (used by `pnpm publish:all`
// before anything is published to NPM).
if (flags.has("--check")) {
  console.log("\x1b[32m✔ Chromatic project token found.\x1b[0m");
  process.exit(0);
}

console.log("\n\x1b[1m\x1b[36m=== Galyan Storybook Publisher ===\x1b[0m");
if (isDryRun) console.log("\x1b[33m(DRY-RUN)\x1b[0m");

// ── Build Packages ───────────────────────────────────────────────────────────
// Storybook imports @galyan/* from their dist output, so they must be built.
if (!skipBuild) {
  console.log("\n\x1b[1m[1/2] Building packages...\x1b[0m");
  run('pnpm --filter "@galyan/*" build');
} else {
  console.log("\n\x1b[90mSkipping package build (--no-build flag set)\x1b[0m");
}

// ── Publish ──────────────────────────────────────────────────────────────────
if (isDryRun) {
  console.log("\n\x1b[1m[2/2] Building Storybook locally...\x1b[0m");
  run("pnpm --filter storybook build-storybook");
  console.log(
    "\n\x1b[33m[DRY-RUN] Storybook built successfully! Nothing was uploaded to Chromatic.\x1b[0m\n",
  );
  process.exit(0);
}

console.log("\n\x1b[1m[2/2] Publishing Storybook to Chromatic...\x1b[0m");
let chromaticCmd =
  "pnpm --filter storybook exec chromatic --config-file chromatic.config.json";
if (autoAccept) chromaticCmd += " --auto-accept-changes";
run(chromaticCmd, {
  env: { ...process.env, CHROMATIC_PROJECT_TOKEN: token },
});

console.log(
  "\n\x1b[32m\x1b[1m🎉 Successfully published Storybook to Chromatic!\x1b[0m\n",
);
