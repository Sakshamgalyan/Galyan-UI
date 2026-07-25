import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const packagesDir = path.resolve('packages');
const packageNames = [];

if (fs.existsSync(packagesDir)) {
  const dirs = fs.readdirSync(packagesDir);
  for (const dir of dirs) {
    const pkgPath = path.join(packagesDir, dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (!pkg.private && pkg.name) {
        packageNames.push(pkg.name);
      }
    }
  }
}

if (packageNames.length === 0) {
  console.log('No public packages found to release.');
  process.exit(0);
}

const changesetDir = path.resolve('.changeset');
let manualChangesetsExist = false;
if (fs.existsSync(changesetDir)) {
  const files = fs.readdirSync(changesetDir);
  manualChangesetsExist = files.some(
    (f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md'
  );
}

if (manualChangesetsExist) {
  console.log('Manual changeset file found. Skipping auto-changeset generation.');
  process.exit(0);
}

let commits = [];
try {
  let range = '-n 15';
  try {
    const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    if (lastTag) {
      range = `${lastTag}..HEAD`;
    }
  } catch {
    // No tags found yet, fall back to recent commits
  }
  const rawLog = execSync(`git log ${range} --oneline`, { encoding: 'utf8' });
  commits = rawLog.trim().split('\n').filter(Boolean);
} catch (err) {
  console.error('Warning: could not fetch git log:', err.message);
}

if (commits.length === 0) {
  console.log('No new commits found. Skipping auto-changeset.');
  process.exit(0);
}

console.log('Analyzing commits for conventional commit patterns:');
commits.forEach((c) => console.log(`  - ${c}`));

let bumpType = 'patch';
let isMajor = false;
let isMinor = false;
let isPatch = false;

for (const commitMsg of commits) {
  if (/BREAKING CHANGE|!\s*:/i.test(commitMsg)) {
    isMajor = true;
  } else if (/^([a-f0-9]+\s+)?feat(\(.*\))?:/i.test(commitMsg)) {
    isMinor = true;
  } else if (/^([a-f0-9]+\s+)?(fix|perf|refactor|revert)(\(.*\))?:/i.test(commitMsg)) {
    isPatch = true;
  }
}

if (isMajor) {
  bumpType = 'major';
} else if (isMinor) {
  bumpType = 'minor';
} else if (isPatch) {
  bumpType = 'patch';
}

console.log(`\nDetermined version bump type: [${bumpType.toUpperCase()}]`);

const changesetContent = `---
${packageNames.map((name) => `"${name}": ${bumpType}`).join('\n')}
---

Auto version bump (${bumpType}) based on Conventional Commits:
${commits.map((c) => `- ${c}`).join('\n')}
`;

if (!fs.existsSync(changesetDir)) {
  fs.mkdirSync(changesetDir, { recursive: true });
}

const filename = `auto-release-${Date.now()}.md`;
fs.writeFileSync(path.join(changesetDir, filename), changesetContent);
console.log(`Created auto-changeset: .changeset/${filename}`);

