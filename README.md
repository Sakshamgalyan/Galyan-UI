# Galyan UI Monorepo

[![Storybook](https://img.shields.io/badge/Storybook-10.6-FF4785?style=flat-square&logo=storybook)](https://storybook.js.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.10-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/repo)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-F69220?style=flat-square&logo=pnpm)](https://pnpm.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![npm @galyan/ui](https://img.shields.io/npm/v/@galyan/ui?style=flat-square&color=black&logo=npm)](https://www.npmjs.com/package/@galyan/ui)
[![npm @galyan/theme](https://img.shields.io/npm/v/@galyan/theme?style=flat-square&color=black&logo=npm)](https://www.npmjs.com/package/@galyan/theme)

Welcome to **Galyan UI**, a modern React 19 component library and design system monorepo built with [Turborepo](https://turbo.build/repo), [pnpm](https://pnpm.io/), and [Storybook](https://storybook.js.org/).

---

## 📦 What's Inside?

### Packages (`packages/`)

- **`@galyan/ui`**: React 19 component library (built with `tsup`, ESM + CJS). Includes:
  - **Inputs & forms**: Button, ClearButton, Input, Textarea, Checkbox, RadioGroup, Toggle, Dropdown, DatePicker, Calendar, TimePicker, ColorPicker, FileUpload, DragDrop
  - **Layout & navigation**: Card, Accordion, Tab, StepTab, Stepper, Breadcrumb, Sidebar, Menu, ListItemGroup, Table
  - **Feedback & overlays**: Modal, Tooltip, Toaster, Banner, ProgressBar, Spinner, Skeleton, EmptyState, Chips
  - **Display**: Typography, AnimatedNumber
  - **Charts** (Recharts / d3-geo): Area, Bar, Line, Pie, Donut, Radar, Scatter, Bubble, Stacked, Composed, Step, Range, Histogram, Box-Whisker, Heatmap, Treemap, Waterfall, Pareto, Gauge, Triangular, Timeline, Financial, Correlation, and Choropleth Map
- **`@galyan/theme`**: Design tokens (colors, spacing, typography, radius, shadows, borders, opacity, z-index, breakpoints, durations, easings, animations), brand + role theme system, `ThemeProvider` / `useTheme`, light/dark color modes, custom themes, CSS variables, fonts, and global resets.
- **`@repo/eslint-config`**: Shared ESLint configurations.
- **`@repo/typescript-config`**: Shared TypeScript configuration files (`tsconfig.json`).

### Apps (`apps/`)

- **`storybook`**: Storybook 10 (Vite) documentation and component preview app with an introduction page, component catalog, composition examples, and Chromatic visual testing integration.

---

## 🚀 Quick Start

Requires **Node.js 20+** and **pnpm 9**.

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

## 🧩 Using the Packages

```bash
pnpm add @galyan/ui @galyan/theme
```

```tsx
import { ThemeProvider } from "@galyan/theme";
import "@galyan/theme/css/variables";
import "@galyan/theme/css/globals";
import "@galyan/ui/styles.css";
import { Button } from "@galyan/ui";

export function App() {
  return (
    <ThemeProvider brand="easylife" role="customer" defaultColorMode="system">
      <Button>Get started</Button>
    </ThemeProvider>
  );
}
```

Additional CSS entry points: `@galyan/theme/css/reset` and `@galyan/theme/css/fonts`.

---

## 🛠️ CLI Commands

| Command                | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| `pnpm storybook`       | Starts the Storybook development server on port 6006                             |
| `pnpm build-storybook` | Builds the static Storybook site                                                 |
| `pnpm chromatic`       | Publishes Storybook to Chromatic for visual testing                              |
| `pnpm dev`             | Runs `dev` tasks across the workspace via Turborepo                              |
| `pnpm build`           | Builds all packages (`@galyan/theme`, `@galyan/ui`) and apps in dependency order |
| `pnpm check-types`     | Runs TypeScript type checking (`tsc --noEmit`) across the entire workspace       |
| `pnpm lint`            | Runs ESLint across all apps and packages                                         |
| `pnpm format`          | Formats the whole repo with Prettier                                             |
| `pnpm format:check`    | Checks formatting with Prettier without writing changes                          |
| `pnpm changeset`       | Creates a manual changeset for `@galyan/ui` or `@galyan/theme`                   |
| `pnpm publish`         | Interactive release: prompts for the bump type, then versions and publishes      |
| `pnpm publish:patch`   | Bumps patch version (e.g. `1.0.6` ➔ `1.0.7`) and publishes to NPM                |
| `pnpm publish:minor`   | Bumps minor version (e.g. `1.0.6` ➔ `1.1.0`) and publishes to NPM                |
| `pnpm publish:major`   | Bumps major version (e.g. `1.0.6` ➔ `2.0.0`) and publishes to NPM                |
| `pnpm publish:test`    | Publishes a snapshot test version under the `test` dist-tag                      |
| `pnpm release`         | Alias for `pnpm publish`                                                         |

---

## 🎨 Theme System (Brand × Role)

Theming works on two axes: a **brand** (the app/company palette) and a **role** (the user type). `ThemeProvider` applies them as `data-brand`, `data-role`, and `data-color-mode` attributes on `<html>`, and components pick up the matching `--gy-*` CSS variables automatically.

### Brands

| Brand       | Primary                   | Notes                                      |
| ----------- | ------------------------- | ------------------------------------------ |
| `easylife`  | Green `#22c55e` (default) | Slate neutrals, light canvas               |
| `metalixia` | Lavender-blue `#707fdd`   | Slate neutrals, light canvas               |
| `samantrix` | Violet `#7c5cff`          | Ink neutrals, always-dark canvas           |
| `custom`    | Any hex you provide       | Full palette derived from a single primary |

### Roles

- **`customer`** (default): uses the brand's primary color
- **`professional`**: Blue `#3b82f6`
- **`agent`**: Coral/Red `#ef4444`
- **`admin`**: Indigo `#6366f1`

### Color Modes & Custom Themes

- `defaultColorMode`: `"light"`, `"dark"`, or `"system"` (default). The choice is saved to `localStorage` under `storageKey` (default `"gy-theme"`; pass `null` to turn this off).
- `customTheme={{ primary: "#ff6600", fontFamily, fontFamilyMono, fontFamilyDisplay }}` with `brand="custom"` builds a full theme from one color.
- `fontFamily`, `fontFamilyMono`, and `fontFamilyDisplay` props override the font variables.
- `useTheme()` returns the current `brand`, `role`, `colorMode`, `resolvedMode`, and setters (`setBrand`, `setRole`, `setColorMode`, `setCustomTheme`, font setters) for changing the theme at runtime.

> The old single `defaultRole` prop (e.g. `defaultRole="metalixia"`) still works but is deprecated. Use `brand` + `role` instead.

---

## 🚢 CI/CD

- **Chromatic Storybook** is published by the publish script after every successful production release (patch/minor/major). Set `CHROMATIC_PROJECT_TOKEN` in your environment first; without it the step is skipped. Pass `--no-chromatic` to skip it, or run `pnpm chromatic` to publish manually. Only changed stories are tested, and changes are auto-accepted.
- **NPM publishing** is run locally with the publish script (see below). There are no GitHub Actions workflows.

---

## 📦 Versioning & Releases

Releases use [Changesets](https://github.com/changesets/changesets) through `scripts/publish.mjs`.

### 1. Publishing a Release

```bash
npm login            # once; the script checks this with `npm whoami`
pnpm publish:patch   # or publish:minor / publish:major, or `pnpm publish` to choose interactively
```

The script:

1. Finds all public packages in `packages/` (`@galyan/ui`, `@galyan/theme`).
2. Checks NPM authentication.
3. Type-checks and builds the `@galyan/*` packages.
4. Creates a changeset (using your `--message`, or the last 5 commits) and bumps versions and `CHANGELOG.md` files.
5. Publishes to NPM with `pnpm changeset publish` (`latest` tag by default).
6. Commits the version bumps as `chore(release): v<version>`. Push it yourself with `git push origin main --tags`.

If publishing fails, or with `--dry-run`, it reverts the version and changelog changes.

### 2. Test / Snapshot Releases

```bash
pnpm publish:test
```

Publishes a snapshot version (e.g. `0.0.0-test-...`) under the `test` dist-tag, so `latest` is not affected.

### 3. Publish Script Options

| Flag                | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `--dry-run`         | Runs versioning and build without publishing; reverts changes after |
| `--tag <name>`      | NPM dist-tag (default: `latest` for releases, `test` for test)      |
| `--otp <code>`      | One-time password for NPM two-factor authentication                 |
| `--message "<txt>"` | Custom changelog entry                                              |
| `--no-git-commit`   | Skips the release commit                                            |
| `--no-build`        | Skips the pre-publish build                                         |
| `--skip-auth`       | Skips the `npm whoami` check                                        |
| `--no-chromatic`    | Skips publishing Storybook to Chromatic after the release           |

Example: `pnpm publish:minor --message "Add TimePicker" --otp 123456`

### 4. Manual Changesets (Optional)

To pick the bump type per package or write your own release notes:

1. Run `pnpm changeset` and follow the prompts.
2. Commit the generated markdown file in `.changeset/`.

`scripts/auto-changeset.mjs` can also create a changeset from Conventional Commits (`feat` ➔ minor, `fix`/`perf`/`refactor`/`revert` ➔ patch, `!` or `BREAKING CHANGE` ➔ major). It skips this if a manual changeset already exists.

---

## 📄 License

MIT © Saksham Galyan
