# Galyan UI Monorepo

[![Storybook](https://img.shields.io/badge/Storybook-8.6-FF4785?style=flat-square&logo=storybook)](https://storybook.js.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.10-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/repo)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![npm @galyan/ui](https://img.shields.io/npm/v/@galyan/ui?style=flat-square&color=black&logo=npm)](https://www.npmjs.com/package/@galyan/ui)
[![npm @galyan/theme](https://img.shields.io/npm/v/@galyan/theme?style=flat-square&color=black&logo=npm)](https://www.npmjs.com/package/@galyan/theme)

Welcome to **Galyan UI**, a modern React 19 component library and design system monorepo built with [Turborepo](https://turbo.build/repo), [pnpm](https://pnpm.io/), and [Storybook](https://storybook.js.org/).

---

## 📦 What's Inside?

### Packages (`packages/`)

- **`@galyan/ui`**: High-performance React 19 component library containing Buttons, Inputs, Dropdowns, DatePickers, MonthPickers, FileUpload, Modals, Menus, Chips, Steppers, and more.
- **`@galyan/theme`**: Design tokens, color palettes, role-based theme system (Customer, Professional, Agent, Admin), typography, CSS variables, and global resets.
- **`@repo/eslint-config`**: Shared ESLint configurations.
- **`@repo/typescript-config`**: Shared TypeScript configuration files (`tsconfig.json`).

### Apps (`apps/`)

- **`storybook`**: Storybook 8 documentation and component preview app with interactive controls and Chromatic visual testing integration.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Storybook Locally

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) to interactively explore and test components.

### 3. Build All Packages & Apps

```bash
pnpm build
```

---

## 🛠️ CLI Commands

| Command                 | Description                                                                      |
| ----------------------- | -------------------------------------------------------------------------------- |
| `pnpm storybook`        | Starts the Storybook 8 development server locally                                |
| `pnpm build`            | Builds all packages (`@galyan/theme`, `@galyan/ui`) and apps in dependency order |
| `pnpm check-types`      | Runs TypeScript type checking (`tsc --noEmit`) across the entire workspace       |
| `pnpm lint`             | Runs ESLint across all apps and packages                                         |
| `pnpm format`           | Formats code with Prettier                                                       |
| `pnpm changeset`        | Generates a version bump changeset for `@galyan/ui` or `@galyan/theme`           |
| `pnpm version-packages` | Generates auto-changesets and bumps package versions locally                     |
| `pnpm release`          | Builds workspace packages and publishes updated versions to NPM                  |

---

## 🎨 Theme & Role Color System

Galyan UI includes dynamic role-based theme variables:

- **Customer Role**: `--gy-primary` (Emerald Green `#22c55e`)
- **Professional Role**: `--gy-primary` (Blue `#3b82f6`)
- **Agent Role**: `--gy-primary` (Coral `#f97316`)
- **Admin Role**: `--gy-primary` (Indigo `#6366f1`)

Components automatically adapt their accent colors, active states, and hover transitions based on the active role theme.

---

## 🚢 CI/CD & Automated Publishing

- **Chromatic Storybook**: Pushing to `main` or opening a Pull Request automatically builds Storybook, runs visual regression tests, and publishes preview links on Chromatic.
- **Automated NPM Releases**: Pushing or merging changes to `main` automatically triggers GitHub Actions to bump versions and publish packages to the NPM registry. See the **Versioning & Releases** section below for details.

---

## 📦 Versioning & Releases

This monorepo features an automated versioning system driven by **Conventional Commits** and **Changesets**.

### 1. Automated Releases (`main` branch)

When changes are pushed or merged to the `main` branch, the GitHub Action automatically:

1. Analyzes commit messages since the last release tag (or recent commits).
2. Generates an automatic changeset based on Conventional Commit patterns.
3. Bumps package versions in `package.json` files and updates the `CHANGELOG.md` files.
4. Commits these changes with the message `chore(release): auto-bump package versions [skip ci]` and pushes them back to `main`.
5. Publishes the updated `@galyan/ui` and `@galyan/theme` packages to the NPM registry.

#### Conventional Commit Guidelines

Commit messages determine the release type bump automatically:

- **Major Bump** (`1.0.1` ➔ `2.0.0`): Triggered by including `BREAKING CHANGE` in the commit body, or adding `!` after the type/scope in the commit header.
  - _Example:_ `feat(table)!: redesign table API`
- **Minor Bump** (`1.0.1` ➔ `1.1.0`): Triggered by commits starting with `feat` or `feat(...)`.
  - _Example:_ `feat: add new MonthPicker component`
- **Patch Bump** (`1.0.1` ➔ `1.0.2`): Triggered by commits starting with `fix`, `perf`, `refactor`, or `revert`.
  - _Example:_ `fix: adjust modal layout spacing`

### 2. Beta & Snapshot Releases (`test-version` branch)

To publish a preview/test version of the packages without triggering a production release:

1. Push or merge changes to the `test-version` branch.
2. The GitHub Action will generate a snapshot version and publish it to NPM with the `beta` tag.

### 3. Manual Changesets (Optional)

If you want to manually specify the version bump type or write a custom changelog entry:

1. Run:
   ```bash
   pnpm changeset
   ```
2. Follow the interactive prompts to define the version bump and release notes.
3. Commit the generated markdown file in the `.changeset` directory.

If a manual changeset file exists, the automated commit analyzer will respect it and skip auto-generating one.

---

## 📄 License

MIT © Saksham Galyan
