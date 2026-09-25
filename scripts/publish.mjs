#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

// ── Parse CLI Arguments ───────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('-')));
const positional = args.filter((a) => !a.startsWith('-'));

const rawBumpType = (positional[0] || '').toLowerCase();
const isDryRun = flags.has('--dry-run');
const skipBuild = flags.has('--no-build');
const skipGit = flags.has('--no-git-commit') || flags.has('--no-git');
const skipAuthCheck = flags.has('--skip-auth') || flags.has('--skip-auth-check') || isDryRun;

// Parse --tag=<value> or --tag <value>
let distTag = '';
const tagFlagIdx = args.findIndex((a) => a === '--tag' || a.startsWith('--tag='));
if (tagFlagIdx !== -1) {
  if (args[tagFlagIdx].includes('=')) {
    distTag = args[tagFlagIdx].split('=')[1];
  } else if (args[tagFlagIdx + 1] && !args[tagFlagIdx + 1].startsWith('-')) {
    distTag = args[tagFlagIdx + 1];
  }
}

// Parse --otp=<code> or --otp <code>
let otpCode = '';
const otpFlagIdx = args.findIndex((a) => a === '--otp' || a.startsWith('--otp='));
if (otpFlagIdx !== -1) {
  if (args[otpFlagIdx].includes('=')) {
    otpCode = args[otpFlagIdx].split('=')[1];
  } else if (args[otpFlagIdx + 1] && !args[otpFlagIdx + 1].startsWith('-')) {
    otpCode = args[otpFlagIdx + 1];
  }
}

// Parse custom message: --message="..." or leftover positional arguments
let customMessage = '';
const msgFlagIdx = args.findIndex((a) => a === '--message' || a.startsWith('--message='));
if (msgFlagIdx !== -1) {
  if (args[msgFlagIdx].includes('=')) {
    customMessage = args[msgFlagIdx].split('=')[1];
  } else if (args[msgFlagIdx + 1] && !args[msgFlagIdx + 1].startsWith('-')) {
    customMessage = args[msgFlagIdx + 1];
  }
} else if (positional.length > 1) {
  customMessage = positional.slice(1).join(' ');
}

// ── Validation & Help ────────────────────────────────────────────────────────
const VALID_BUMPS = ['patch', 'minor', 'major', 'test', 'beta'];

if (flags.has('--help') || flags.has('-h')) {
  console.log(`
\x1b[1m\x1b[34m[Galyan UI - Publish Script]\x1b[0m

\x1b[33mUsage:\x1b[0m
  pnpm publish:patch               \x1b[90m# Bump patch (1.0.4 -> 1.0.5) & publish to NPM\x1b[0m
  pnpm publish:minor               \x1b[90m# Bump minor (1.0.4 -> 1.1.0) & publish to NPM\x1b[0m
  pnpm publish:major               \x1b[90m# Bump major (1.0.4 -> 2.0.0) & publish to NPM\x1b[0m
  pnpm publish:test                \x1b[90m# Publish snapshot test version with @test tag\x1b[0m

\x1b[33mOptions:\x1b[0m
  --dry-run                        \x1b[90m# Simulate versioning & build without uploading to NPM\x1b[0m
  --tag <name>                     \x1b[90m# NPM dist-tag (default: 'latest' for release, 'test' for test)\x1b[0m
  --otp <code>                     \x1b[90m# One-Time Password for NPM Two-Factor Authentication\x1b[0m
  --message "<text>"               \x1b[90m# Custom changelog entry message\x1b[0m
  --no-git-commit                  \x1b[90m# Skip automatic git commit and git push\x1b[0m
  --no-build                       \x1b[90m# Skip pre-flight build\x1b[0m
  --skip-auth                      \x1b[90m# Skip npm whoami authentication verification\x1b[0m
`);
  process.exit(0);
}

async function askBumpType() {
  if (!process.stdin.isTTY) {
    console.log('\x1b[33mNon-interactive environment detected. Defaulting release type to [PATCH].\x1b[0m\n');
    return 'patch';
  }

  const rl = readline.createInterface({ input, output });
  console.log(`\n\x1b[1m\x1b[36m? Select the release type you want to publish:\x1b[0m`);
  console.log(`  \x1b[1m1)\x1b[0m \x1b[32mpatch\x1b[0m  \x1b[90m- Bug fixes & small updates (e.g. 1.0.4 -> 1.0.5)\x1b[0m`);
  console.log(`  \x1b[1m2)\x1b[0m \x1b[34mminor\x1b[0m  \x1b[90m- New features, backward-compatible (e.g. 1.0.4 -> 1.1.0)\x1b[0m`);
  console.log(`  \x1b[1m3)\x1b[0m \x1b[35mmajor\x1b[0m  \x1b[90m- Breaking changes (e.g. 1.0.4 -> 2.0.0)\x1b[0m`);
  console.log(`  \x1b[1m4)\x1b[0m \x1b[33mtest\x1b[0m   \x1b[90m- Snapshot test version with @test tag (e.g. 0.0.0-test-...)\x1b[0m\n`);

  while (true) {
    const rawAnswer = await rl.question('\x1b[1mEnter choice [1-4] or name (default: 1 [patch]): \x1b[0m');
    const answer = rawAnswer.trim().toLowerCase();

    if (!answer || answer === '1' || answer === 'patch') {
      rl.close();
      return 'patch';
    }
    if (answer === '2' || answer === 'minor') {
      rl.close();
      return 'minor';
    }
    if (answer === '3' || answer === 'major') {
      rl.close();
      return 'major';
    }
    if (answer === '4' || answer === 'test') {
      rl.close();
      return 'test';
    }
    if (answer === 'beta') {
      rl.close();
      return 'beta';
    }
    console.log('\x1b[31mInvalid choice. Please enter 1 (patch), 2 (minor), 3 (major), or 4 (test).\x1b[0m');
  }
}

let resolvedBumpType = rawBumpType;
if (!resolvedBumpType) {
  resolvedBumpType = await askBumpType();
} else if (!VALID_BUMPS.includes(resolvedBumpType)) {
  console.log(`
\x1b[1m\x1b[34m[Galyan UI - Publish Script]\x1b[0m

\x1b[33mUsage:\x1b[0m
  pnpm publish:patch               \x1b[90m# Bump patch (1.0.4 -> 1.0.5) & publish to NPM\x1b[0m
  pnpm publish:minor               \x1b[90m# Bump minor (1.0.4 -> 1.1.0) & publish to NPM\x1b[0m
  pnpm publish:major               \x1b[90m# Bump major (1.0.4 -> 2.0.0) & publish to NPM\x1b[0m
  pnpm publish:test                \x1b[90m# Publish snapshot test version with @test tag\x1b[0m

\x1b[33mOptions:\x1b[0m
  --dry-run                        \x1b[90m# Simulate versioning & build without uploading to NPM\x1b[0m
  --tag <name>                     \x1b[90m# NPM dist-tag (default: 'latest' for release, 'test' for test)\x1b[0m
  --otp <code>                     \x1b[90m# One-Time Password for NPM Two-Factor Authentication\x1b[0m
  --message "<text>"               \x1b[90m# Custom changelog entry message\x1b[0m
  --no-git-commit                  \x1b[90m# Skip automatic git commit and git push\x1b[0m
  --no-build                       \x1b[90m# Skip pre-flight build\x1b[0m
  --skip-auth                      \x1b[90m# Skip npm whoami authentication verification\x1b[0m
`);
  process.exit(1);
}
const bumpType = resolvedBumpType;

// Helper to execute commands synchronously with inherited stdio
function run(cmd, opts = {}) {
  console.log(`\x1b[90m$ ${cmd}\x1b[0m`);
  try {
    return execSync(cmd, { stdio: 'inherit', encoding: 'utf8', ...opts });
  } catch (err) {
    if (opts.throwOnError) {
      throw err;
    }
    console.error(`\x1b[31mCommand failed: ${cmd}\x1b[0m`);
    process.exit(1);
  }
}

function runQuiet(cmd, opts = {}) {
  try {
    return execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'], encoding: 'utf8', ...opts }).trim();
  } catch {
    return '';
  }
}

// ── Check NPM Authentication ─────────────────────────────────────────────────
function checkNpmAuth() {
  if (skipAuthCheck) return;
  try {
    const user = execSync('npm whoami', { stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8' }).trim();
    console.log(`\x1b[32m✔ Authenticated with NPM as:\x1b[0m \x1b[1m${user}\x1b[0m`);
  } catch (err) {
    console.error(`\n\x1b[1m\x1b[31m❌ NPM Authentication Failed (E401 / Not Logged In)\x1b[0m`);
    console.error(`\x1b[33mYou are not currently logged in to NPM or your credentials have expired.\x1b[0m`);
    console.error(`To publish \x1b[1m@galyan\x1b[0m packages, please login first in your terminal:`);
    console.error(`  \x1b[1m\x1b[36mnpm login\x1b[0m\n`);
    console.error(`Then re-run:`);
    console.error(`  \x1b[1m\x1b[32mpnpm run publish\x1b[0m\n`);
    console.error(`\x1b[90m(Tip: To test building and versioning without publishing to NPM, use: pnpm run publish --dry-run)\x1b[0m\n`);
    process.exit(1);
  }
}

// ── Discover Public Packages ─────────────────────────────────────────────────
const packagesDir = path.resolve('packages');
const publicPackages = [];

if (fs.existsSync(packagesDir)) {
  const dirs = fs.readdirSync(packagesDir);
  for (const dir of dirs) {
    const pkgPath = path.join(packagesDir, dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (!pkg.private && pkg.name) {
        publicPackages.push({
          name: pkg.name,
          dir: path.join(packagesDir, dir),
          pkgPath,
          version: pkg.version,
        });
      }
    }
  }
}

if (publicPackages.length === 0) {
  console.error('\x1b[31mNo public packages found in packages/ to publish.\x1b[0m');
  process.exit(1);
}

console.log('\n\x1b[1m\x1b[36m=== Galyan NPM Publisher ===\x1b[0m');
console.log(`Target bump type: \x1b[32m\x1b[1m${bumpType.toUpperCase()}\x1b[0m ${isDryRun ? '\x1b[33m(DRY-RUN)\x1b[0m' : ''}`);
console.log('Public packages targeted:');
publicPackages.forEach((p) => console.log(`  - \x1b[1m${p.name}\x1b[0m (current: v${p.version})`));

// Verify auth upfront before performing builds or bumping versions
checkNpmAuth();

// ── Pre-flight Checks ────────────────────────────────────────────────────────
console.log('\n\x1b[1m[1/4] Running Type Check on packages...\x1b[0m');
run('pnpm --filter "@galyan/*" check-types');

if (!skipBuild) {
  console.log('\n\x1b[1m[2/4] Building packages...\x1b[0m');
  run('pnpm --filter "@galyan/*" build');
} else {
  console.log('\n\x1b[90mSkipping build step (--no-build flag set)\x1b[0m');
}

// ── Handle Changeset & Versioning ────────────────────────────────────────────
const changesetDir = path.resolve('.changeset');
if (!fs.existsSync(changesetDir)) {
  fs.mkdirSync(changesetDir, { recursive: true });
}

// Gather recent commits for changelog context if no custom message
let commitLog = '';
if (!customMessage) {
  const recentCommits = runQuiet('git log -n 5 --oneline');
  if (recentCommits) {
    commitLog = recentCommits
      .split('\n')
      .map((c) => `- ${c}`)
      .join('\n');
  }
}

const releaseNote =
  customMessage ||
  (commitLog
    ? `Release update (${bumpType}):\n${commitLog}`
    : `Release update (${bumpType}) for Galyan packages.`);

if (bumpType === 'test' || bumpType === 'beta') {
  // ── TEST / BETA SNAPSHOT PUBLISH ───────────────────────────────────────────
  const snapshotTag = distTag || (bumpType === 'beta' ? 'beta' : 'test');
  console.log(`\n\x1b[1m[3/4] Creating test snapshot version with tag [@${snapshotTag}]...\x1b[0m`);

  // Create temporary changeset for snapshot versioning
  const tempChangesetFile = path.join(changesetDir, `test-snapshot-${Date.now()}.md`);
  const changesetContent = `---
${publicPackages.map((p) => `"${p.name}": patch`).join('\n')}
---

${releaseNote}
`;
  fs.writeFileSync(tempChangesetFile, changesetContent, 'utf8');

  try {
    // Generate snapshot versions in package.json
    run(`pnpm changeset version --snapshot ${snapshotTag}`);

    // Rebuild with the snapshot version
    console.log('\n\x1b[1m[4/4] Building and publishing test snapshot to NPM...\x1b[0m');
    run('pnpm --filter "@galyan/*" build');

    // Read generated snapshot versions
    const snapshotVersions = publicPackages.map((p) => {
      const updatedPkg = JSON.parse(fs.readFileSync(p.pkgPath, 'utf8'));
      return `${p.name}@${updatedPkg.version}`;
    });
    console.log('\nSnapshot versions prepared:');
    snapshotVersions.forEach((v) => console.log(`  - \x1b[32m${v}\x1b[0m`));

    if (isDryRun) {
      console.log('\n\x1b[33m[DRY-RUN] Snapshot publish simulated successfully! No packages were uploaded.\x1b[0m');
    } else {
      let publishCmd = `pnpm changeset publish --tag ${snapshotTag} --no-git-tag`;
      if (otpCode) publishCmd += ` --otp ${otpCode}`;
      run(publishCmd, { throwOnError: true });
      console.log(`\n\x1b[32m✔ Successfully published test version to NPM with tag [@${snapshotTag}]!\x1b[0m`);
    }
  } finally {
    // Always revert snapshot version modifications in package.json and clean up temp changeset
    console.log('\n\x1b[90mCleaning up snapshot state in working directory...\x1b[0m');
    if (fs.existsSync(tempChangesetFile)) {
      try { fs.unlinkSync(tempChangesetFile); } catch {}
    }
    runQuiet('git checkout packages/*/package.json packages/*/CHANGELOG.md');
  }
} else {
  // ── PRODUCTION RELEASE: PATCH / MINOR / MAJOR ──────────────────────────────
  const finalTag = distTag || 'latest';
  console.log(`\n\x1b[1m[3/4] Bumping package versions (${bumpType.toUpperCase()})...\x1b[0m`);

  // Write changeset file for explicit bump
  const changesetFile = path.join(changesetDir, `release-${bumpType}-${Date.now()}.md`);
  const changesetContent = `---
${publicPackages.map((p) => `"${p.name}": ${bumpType}`).join('\n')}
---

${releaseNote}
`;
  fs.writeFileSync(changesetFile, changesetContent, 'utf8');

  // Apply version bump and update CHANGELOGs
  run('pnpm changeset version');

  // Re-read updated package versions
  const updatedVersions = publicPackages.map((p) => {
    const updatedPkg = JSON.parse(fs.readFileSync(p.pkgPath, 'utf8'));
    return { name: p.name, oldVersion: p.version, newVersion: updatedPkg.version };
  });

  console.log('\n\x1b[32m✔ Package versions successfully bumped:\x1b[0m');
  updatedVersions.forEach((u) => {
    console.log(`  - \x1b[1m${u.name}\x1b[0m: v${u.oldVersion} -> \x1b[32mv${u.newVersion}\x1b[0m`);
  });

  // Re-build packages with updated versions
  console.log('\n\x1b[1m[4/4] Building distribution bundles for release...\x1b[0m');
  run('pnpm --filter "@galyan/*" build');

  if (isDryRun) {
    console.log('\n\x1b[33m[DRY-RUN] Release build and version bump simulated successfully! No packages published.\x1b[0m');
    console.log('\x1b[90mReverting package.json and CHANGELOG.md changes because --dry-run was specified...\x1b[0m');
    runQuiet('git checkout packages/*/package.json packages/*/CHANGELOG.md');
  } else {
    try {
      console.log('\n\x1b[1mPublishing to NPM registry...\x1b[0m');
      let publishCmd = `pnpm changeset publish --tag ${finalTag}`;
      if (otpCode) publishCmd += ` --otp ${otpCode}`;
      run(publishCmd, { throwOnError: true });
    } catch (err) {
      console.error('\n\x1b[31m❌ Publishing to NPM failed.\x1b[0m');
      console.log('\x1b[33mReverting package.json and CHANGELOG.md changes to keep working directory clean...\x1b[0m');
      runQuiet('git checkout packages/*/package.json packages/*/CHANGELOG.md');
      console.log('\x1b[90mEnsure you are logged in via `npm login` or have NPM_TOKEN set, and retry.\x1b[0m\n');
      process.exit(1);
    }

    // Commit and tag if in a git repository
    if (!skipGit) {
      try {
        const status = runQuiet('git status --porcelain');
        if (status) {
          const primaryVersion = updatedVersions[0]?.newVersion || bumpType;
          console.log('\n\x1b[1mCommitting version bumps and changelogs to Git...\x1b[0m');
          run('git add packages/*/package.json packages/*/CHANGELOG.md');
          run(`git commit -m "chore(release): v${primaryVersion}"`);
          console.log('\x1b[32m✔ Committed release changes.\x1b[0m');
          console.log('\x1b[33mTip: Run `git push origin main --tags` to push the release commit and tags.\x1b[0m');
        }
      } catch (e) {
        console.log('\x1b[90mNote: Git auto-commit skipped or failed:', e.message, '\x1b[0m');
      }
    }

    console.log(`\n\x1b[32m\x1b[1m🎉 Successfully published ${bumpType.toUpperCase()} release to NPM!\x1b[0m\n`);
  }
}
