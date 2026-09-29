---
name: galyan-ui
description: Context for the Galyan UI design system (@galyan/ui React 19 components and @galyan/theme tokens, brands, roles, CSS variables). Use when building UI with Galyan components, looking up a component's props or usage, theming an app (ThemeProvider, brand/role, dark mode, custom theme), styling custom elements with --gy-* variables, or adding/editing components, stories, or tokens in this monorepo.
---

# Galyan UI

Galyan UI is a pnpm + Turborepo monorepo with two published packages:

| Package         | Path              | What it is                                                                                  |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| `@galyan/ui`    | `packages/ui`     | React 19 component library: about 35 UI components and 25 charts (Recharts, d3-geo)         |
| `@galyan/theme` | `packages/theme`  | Design tokens, brand × role themes, `ThemeProvider` / `useTheme`, `--gy-*` CSS variables    |

The Storybook app (`apps/storybook`, Storybook 10 + Vite) documents everything. Run it with `pnpm storybook` (port 6006).

## Reference files. Read the one you need before writing code

| File                                                   | Covers                                                                                                   |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [references/theme.md](references/theme.md)             | CSS imports, ThemeProvider props, useTheme, brands, roles, JS tokens, the full `--gy-*` variable list      |
| [references/forms.md](references/forms.md)             | Button, ClearButton, Input/InputGroup, Textarea, Checkbox, RadioGroup, Toggle, Dropdown, DatePicker/MonthPicker, Calendar/MonthCalendar, TimePicker, ColorPicker, FileUpload, ReorderList/KanbanBoard (dragdrop) |
| [references/layout.md](references/layout.md)           | Card, Accordion, Tabs, StepTab, Stepper, Breadcrumb, Sidebar, Menu, ListItemGroup/ListItem, Table, Typography       |
| [references/feedback.md](references/feedback.md)       | Modal, Tooltip, ToasterProvider/useToast, Banner, ProgressBar, Spinner, Skeleton, EmptyState/NoData, Chip/ChipsInput, AnimatedNumber        |
| [references/charts.md](references/charts.md)           | Shared chart props plus Bar, Line, Area, Pie, Donut, Scatter, Bubble, Radar, Treemap, Heatmap, Composed, Step, Stacked, Range, Correlation, Triangular, Financial, BoxWhisker, Histogram, Pareto, Gauge, Waterfall, Timeline, ChoroplethMap |

Each reference gives a component's exports, a props table (name, type, default), and a usage example. **Never guess a prop.** If a prop isn't in the reference, check `packages/ui/src/<folder>/<Component>.tsx`. The source is the final authority, and the references can fall behind it.

## App setup

```bash
pnpm add @galyan/ui @galyan/theme   # peer deps: react ^19, react-dom ^19
```

```tsx
// app root (client component in Next.js: the provider is "use client")
import { ThemeProvider } from "@galyan/theme";
import "@galyan/theme/css/reset";      // optional
import "@galyan/theme/css/variables";
import "@galyan/theme/css/globals";
import "@galyan/ui/styles.css";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider brand="easylife" role="customer" defaultColorMode="system">
      {children}
    </ThemeProvider>
  );
}
```

```tsx
import { Button, Input, Card, Modal, BarChart } from "@galyan/ui";   // all named exports from the root
import { useTheme } from "@galyan/theme";
```

## Theming in one screen

- **Brand** (`easylife` default · `metalixia` · `samantrix` (always dark) · `custom`) sets the overall palette.
- **Role** (`customer` default · `professional` blue · `agent` rose/coral · `admin` indigo) changes the primary accent. **Roles only change colors on the `easylife` brand**; on other brands the role has no visual effect.
- **Color mode**: `"light" | "dark" | "system"`. It's saved to localStorage under `storageKey` (default `"gy-theme"`; `null` turns this off).
- **Custom brand**: `<ThemeProvider brand="custom" customTheme={{ primary: "#ff6600", fontFamily: "'Outfit', sans-serif" }}>`. The full palette is derived from the one primary color.
- At runtime, `const { brand, role, resolvedMode, setBrand, setRole, setColorMode, setCustomTheme } = useTheme();`
- The provider writes `data-brand`, `data-role`, `data-color-mode` (plus the legacy `data-theme`) on `<html>`, and the CSS variables switch based on these attributes.
- `defaultRole="metalixia"`-style props are **deprecated**. Use `brand` + `role` instead.

## Rules for writing app code with Galyan

1. **Use a Galyan component before writing your own.** Check the index above first. For example, use `Typography` for text, `Card` for surfaces, `ToasterProvider` + `useToast()` for notifications (mount the provider once at the root), and `EmptyState` for empty lists.
2. **Style with tokens, never hardcoded values.** In custom CSS use `var(--gy-primary)`, surface, text, border, radius, spacing and shadow variables (see theme.md), so the styles follow the brand, role and dark mode.
3. **Leave hardcoded colors out of component props** unless the prop is meant for that (for example chart `colors`). Components already follow the active theme. Many take a `color`/`variant` such as `"role"` or `"primary"`.
4. Components are client components. The build adds a `"use client"` banner, so they work in the Next.js App Router, but `ThemeProvider` must be rendered inside a client boundary.
5. Pass `className` to extend styles. Don't override the internal `gy-*` classes.

## Working inside this repo

**Structure of a component**: `packages/ui/src/<lowercasename>/`
- `<Name>.tsx`: starts with `"use client"`, imports `./<name>.css`, exports `<Name>` and `<Name>Props` (plus variant/size union types)
- `<name>.css`: BEM-style classes prefixed with `gy-` (`gy-spinner`, `gy-spinner--md`, `gy-spinner__circle`), styled only with `var(--gy-*, fallback)`
- `index.ts`: `export { Name } from "./Name"; export type { NameProps, ... } from "./Name";`
- `<Name>.stories.tsx`: `title: "Galyan UI/<Name>"`, `tags: ["autodocs"]`, `argTypes` with `description` and `table.type/defaultValue`

**Adding a component**
1. Create the folder and files following the pattern above. Reuse existing parts (such as `Typography`, `Spinner`, `ClearButton`) instead of duplicating them.
2. Add `export * from "./<folder>/index";` to `packages/ui/src/index.ts`.
3. Write stories, and add the component to `apps/storybook/src/Catalog.stories.tsx` if it belongs in the catalog.
4. Add a section to the matching `references/*.md` file in this skill.
5. Check with `pnpm check-types`, `pnpm lint`, and `pnpm build`.

**Tokens and themes**: tokens are in `packages/theme/src/tokens/*.ts`, CSS variables in `packages/theme/src/css/variables.css`, brands in `themes/brands/`, and roles in `themes/roles/`. If you add a brand, update the `ThemeBrand` union in `provider/ThemeContext.ts` too.

**Commands**: `pnpm storybook`, `pnpm build`, `pnpm check-types`, `pnpm lint`, `pnpm format`. For releases use `pnpm publish:patch|minor|major|test` (local script `scripts/publish.mjs`, Changesets). Don't publish unless the user asks.

**Commits**: use Conventional Commits (`feat:`, `fix:`, `refactor:`, `feat(x)!:` for breaking changes).
