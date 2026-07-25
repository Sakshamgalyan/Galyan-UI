# Galyan UI Monorepo

[![Storybook](https://img.shields.io/badge/Storybook-8.6-FF4785?style=flat-square&logo=storybook)](https://storybook.js.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.10-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/repo)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

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

| Command | Description |
|---|---|
| `pnpm storybook` | Starts the Storybook 8 development server locally |
| `pnpm build` | Builds all packages (`@galyan/theme`, `@galyan/ui`) and apps in dependency order |
| `pnpm check-types` | Runs TypeScript type checking (`tsc --noEmit`) across the entire workspace |
| `pnpm lint` | Runs ESLint across all apps and packages |
| `pnpm format` | Formats code with Prettier |
| `pnpm changeset` | Generates a version bump changeset for `@galyan/ui` or `@galyan/theme` |
| `pnpm release` | Builds workspace packages and publishes updated versions to NPM |

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
- **Automated NPM Releases**: Merging changesets to `main` automatically triggers GitHub Actions to bump versions (`@changesets/cli`) and publish `@galyan/theme` & `@galyan/ui` to the NPM registry.

---

## 📄 License

MIT © Saksham Galyan
