# @galyan/theme reference

Design tokens, brand/role themes, `ThemeProvider`, and the `--gy-*` CSS variable system. Version `1.0.6`. Peer deps `react`/`react-dom` `^19.0.0` (optional). Node `>=20`.

Source of truth: `packages/theme/src/` (`tokens/`, `themes/`, `provider/`, `css/`).

---

## 1. Installation & CSS imports

```bash
pnpm add @galyan/theme @galyan/ui
```

### Export map (`package.json`)

| Import path | Resolves to | Contents |
|---|---|---|
| `@galyan/theme` | `dist/index.js` / `dist/index.cjs` / `dist/index.d.ts` | JS tokens, themes, `ThemeProvider`, `useTheme`, `ThemeContext`, `resolveTheme`, `deriveCustomTheme`, types |
| `@galyan/theme/css/reset` | `dist/css/reset.css` | Modern reset (box-sizing, zero margins, `button`/`a`/list resets, `#root,#__next{isolation:isolate}`) |
| `@galyan/theme/css/variables` | `dist/css/variables.css` | **All `--gy-*` variables**, brand/role/dark selectors, `@keyframes gy-*` |
| `@galyan/theme/css/globals` | `dist/css/globals.css` | `html,body` font/color/background from vars, `::selection`, `:focus-visible` outline, scrollbar hiding for `[class*="gy-"]`, scrollbar utilities, reduced-motion |
| `@galyan/theme/css/fonts` | `dist/css/fonts.css` | Inter (Google Fonts, 100–900) + Geist Mono 400/500 (jsDelivr) |
| `@galyan/ui/styles.css` | `@galyan/ui` `dist/index.css` | Component CSS (consumes `--gy-*`); also imports DM Sans + Unbounded from Google Fonts |

`sideEffects: ["**/*.css"]` — CSS imports are never tree-shaken.

### Recommended import order (matches `apps/storybook/.storybook/preview.tsx`)

```ts
import "@galyan/theme/css/reset";      // optional
import "@galyan/theme/css/variables";  // required — defines every --gy-* var
import "@galyan/theme/css/globals";    // recommended — body bg/text/font, focus ring
import "@galyan/theme/css/fonts";      // optional — loads Inter + Geist Mono
import "@galyan/ui/styles.css";        // component styles, last
```

`variables.css` must load before anything that reads `var(--gy-*)`. Components ship hardcoded fallbacks (e.g. `var(--gy-radius-md, 0.375rem)`), so missing variables degrade to EasyLife-light-ish defaults rather than breaking.

---

## 2. ThemeProvider

```tsx
import { ThemeProvider } from "@galyan/theme";

<ThemeProvider brand="easylife" role="professional" defaultColorMode="system">
  {children}
</ThemeProvider>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | — (required) | |
| `brand` | `ThemeBrand` = `"easylife" \| "metalixia" \| "samantrix" \| "custom"` | `"easylife"` (or from `defaultRole`) | App/company brand. Re-synced when the prop changes. |
| `role` | `ThemeRole` = `"customer" \| "professional" \| "agent" \| "admin"` | `"customer"` (or from `defaultRole`) | User-type role. Only visually affects `easylife`. |
| `defaultColorMode` | `ColorMode` = `"light" \| "dark" \| "system"` | `"system"` | Initial mode. Re-synced when the prop changes. |
| `storageKey` | `string \| null` | `"gy-theme"` | localStorage key for persistence. `null` disables persistence. |
| `fontFamily` | `string` | `undefined` | Sets `--gy-font-sans`, `--gy-font-family`, `--gy-custom-font-sans` inline on `<html>`. |
| `fontFamilyMono` | `string` | `undefined` | Sets `--gy-font-mono`, `--gy-custom-font-mono`. |
| `fontFamilyDisplay` | `string` | `undefined` | Sets `--gy-font-display`, `--gy-custom-font-display`. |
| `customTheme` | `CustomThemeConfig` | `undefined` | `{ primary: string; fontFamily?; fontFamilyMono?; fontFamilyDisplay? }`. Colors only applied when `brand === "custom"`; its font fields are used as initial fonts regardless. |
| `defaultRole` | `LegacyThemeRole` (**deprecated**) | `undefined` | Old flat API. Mapped below. Logs a `console.warn` in non-production when used without `brand`. |

### Legacy `defaultRole` mapping

| `defaultRole` | → `brand` | → `role` |
|---|---|---|
| `customer` | easylife | customer |
| `professional` | easylife | professional |
| `agent` | easylife | agent |
| `admin` | easylife | admin |
| `metalixia` | metalixia | customer |
| `samantrix` | samantrix | customer |
| `custom` | custom | customer |

`brand`/`role` props take precedence over `defaultRole`.

### Behavior

- **Attributes on `document.documentElement` (`<html>`)**, set in `useEffect`:

  | Attribute | Value |
  |---|---|
  | `data-brand` | current `brand` |
  | `data-role` | current `role` |
  | `data-color-mode` | `resolvedMode` (`"light"` / `"dark"`, never `"system"`) |
  | `data-theme` | legacy compat: `role` when brand is `easylife`, otherwise the `brand` name |

- **Resolved mode:** `samantrix` → always `"dark"`. Otherwise `"system"` follows `matchMedia("(prefers-color-scheme: dark)")` (live listener), else the explicit mode.
- **Persistence:** on mount, reads `localStorage[storageKey]` as JSON `{ brand?, role?, colorMode?, fontFamily?, fontFamilyMono?, fontFamilyDisplay?, customTheme? }`; any stored field overrides the initial props. Every setter merges its field into that JSON. Errors (private mode, bad JSON) are swallowed.
- **Custom brand:** when `brand === "custom"` and a `primary` exists, `deriveCustomTheme(...)` output is written as inline styles on `<html>`; switching away removes them (plus all `CUSTOM_THEME_VARS`).
- **Fonts:** inline `style.setProperty` on `<html>`; clearing a font removes the property so the stylesheet default returns.
- **SSR / "use client":** the whole built bundle carries a `"use client"` banner (tsup), and provider files are `"use client"`. Attributes are only applied after hydration, so the first paint uses the `:root` defaults (EasyLife, light). To avoid a flash, render matching `data-brand` / `data-role` / `data-color-mode` / `data-theme` on `<html>` from the server yourself (and `suppressHydrationWarning` on `<html>` if they may differ). Importing JS tokens from `@galyan/theme` inside a Server Component pulls in a client module; prefer CSS vars on the server.

---

## 3. useTheme(), deriveCustomTheme, resolveTheme

### `useTheme(): ThemeContextValue`

| Field | Type | Description |
|---|---|---|
| `brand` | `ThemeBrand` | Current brand |
| `role` | `ThemeRole` | Current role |
| `colorMode` | `ColorMode` | User preference (`light`/`dark`/`system`) |
| `resolvedMode` | `"light" \| "dark"` | Effective mode (samantrix forces `dark`) |
| `fontFamily` | `string \| undefined` | Custom sans font |
| `fontFamilyMono` | `string \| undefined` | Custom mono font |
| `fontFamilyDisplay` | `string \| undefined` | Custom display font |
| `setBrand` | `(brand: ThemeBrand) => void` | Persisted |
| `setRole` | `(role: ThemeRole) => void` | Persisted |
| `setColorMode` | `(mode: ColorMode) => void` | Persisted |
| `setFontFamily` | `(font?: string) => void` | `undefined` clears. Persisted |
| `setFontFamilyMono` | `(font?: string) => void` | Persisted |
| `setFontFamilyDisplay` | `(font?: string) => void` | Persisted |
| `setCustomTheme` | `(config: CustomThemeConfig) => void` | Stores config, applies any provided fonts, **switches brand to `"custom"`**, persists `{brand:"custom", customTheme}` |

Note: `ThemeContext` has a default value (easylife / customer / system / light, no-op setters), so `useTheme()` outside a provider returns those defaults instead of throwing.

Exported types: `ThemeBrand`, `ThemeRole`, `LegacyThemeRole`, `ColorMode`, `ThemeContextValue`, `CustomThemeConfig`, `BrandTheme`, `RoleOverride`, `DeepPartial`, `BreakpointKey`, `ColorScale`, `RadiusKey`, `ShadowKey`, `SpacingKey`, `ZIndexKey`.

### `deriveCustomTheme(primaryHex, fontFamily?, fontFamilyMono?, fontFamilyDisplay?): Record<string, string>`

Pure, dependency-free. Returns a map of CSS variable name → value:

| Keys | Derivation |
|---|---|
| `--gy-custom-primary-50` … `-950` (11 steps) | HSL ramp at fixed lightness (50:0.95, 100:0.9, 200:0.82, 300:0.7, 400:0.58, 500: input hex, 600:0.4, 700:0.32, 800:0.24, 900:0.17, 950:0.1); saturation ×0.6 at ≤100 and ≥900 |
| `--gy-custom-primary` | input hex |
| `--gy-custom-primary-hover` / `-active` / `-muted` / `-subtle` | ramp 600 / 700 / 200 / 50 |
| `--gy-custom-primary-fg` | `#ffffff` if contrast vs white ≥ 4.5, else `#0f172a` |
| `--gy-custom-secondary` | hue +30°, same saturation, lightness 0.45 |
| `--gy-custom-secondary-hover` / `-muted` / `-subtle` | secondary ramp 600 / 200 / 50 |
| `--gy-custom-secondary-fg` | `#ffffff` |
| `--gy-custom-text-link` / `-text-link-hover` | ramp 600 / 700 |
| `--gy-custom-border-focus`, `--gy-custom-focus-outline`, `--gy-custom-brand` | input hex |
| `--gy-custom-focus-ring` | `rgba(r, g, b, 0.4)` of primary |
| `--gy-custom-brand-dark` / `-brand-light` | ramp 700 / 200 |
| `--gy-custom-gradient-primary` | `linear-gradient(135deg, primary 0%, secondary 100%)` |
| `--gy-custom-gradient-hero` | `linear-gradient(135deg, ramp50 0%, ramp100 50%, secRamp50 100%)` |
| `--gy-custom-gradient-brand` | `linear-gradient(135deg, ramp600 0%, secRamp600 100%)` |
| `--gy-custom-neu-bg` | `#e2e8f0` mixed 10% toward primary |
| if fonts passed | `--gy-custom-font-sans` + `--gy-font-sans` + `--gy-font-family`; `--gy-custom-font-mono` + `--gy-font-mono`; `--gy-custom-font-display` + `--gy-font-display` |

Background/surface/text/border (non-focus)/divider/disabled/skeleton/elevation/overlay are **not** derived; the `[data-brand="custom"]` block reads optional `--gy-custom-background`, `--gy-custom-surface`, `--gy-custom-text`, etc., falling back to EasyLife light values. You can set those manually for a fully custom canvas.

### `resolveTheme(brand: string, role: string): BrandTheme`

Deep-merges a brand's JS token object with a role override. Unknown brand → `easylifeBrand`. Overrides exist only for `easylife` × `professional` / `agent` / `admin`; every other combo returns the brand object unchanged. Returned `BrandTheme` keys: `primary` (50–950 + `default`/`emphasis`/`muted`/`subtle`/`fg`), `secondary`, `background`, `surface`, `text`, `border`, `divider`, `focus`, `disabled`, `skeleton`, `brand`, `gradient`, `elevation` (0–3).

Also exported: `easylifeBrand`, `metalixiaBrand`, `samantrixBrand`, `customerOverride` (`{}`), `professionalOverrideEasylife`, `agentOverrideEasylife`, `adminOverrideEasylife`, `baseTheme`.

---

## 4. Brands × roles

### Brands (CSS values)

| Brand | Primary | Hover / Active | Secondary | Canvas | Text | Notes |
|---|---|---|---|---|---|---|
| `easylife` (default, also `:root`) | `#22c55e` green | `#16a34a` / `#15803d` | `#14b8a6` teal | light `#ffffff` | `#0f172a` slate | Only brand with role variants |
| `metalixia` | `#707fdd` lavender-blue | `#5a67c4` / `#4a57b4` | `#5a67c4` | light `#ffffff`, muted `#f1f2f7` | `#0f172a` | Roles ignored |
| `samantrix` | `#7c5cff` violet | `#6438f0` / `#5028c4` | `#ab93ff` | **always dark** ink `#06060a`, surface `#0a0a12` | `#ffffff`, muted `#9a9ab4` | Forced dark; excluded from dark-mode overrides; `--gy-border-error: #f2543d` |
| `custom` | from `--gy-custom-primary` (fallback `#22c55e`) | derived | hue +30° | EasyLife light unless `--gy-custom-*` set | EasyLife | Via `customTheme` / `setCustomTheme` |

### Roles (EasyLife only; selector `[data-brand="easylife"][data-role="<role>"]` or legacy `[data-theme="<role>"]` / `.gy-theme-<role>`)

| Role | Primary | Secondary | Other changes |
|---|---|---|---|
| `customer` | brand default (green `#22c55e`) | teal `#14b8a6` | none |
| `professional` | blue `#3b82f6` (hover `#2563eb`, active `#1d4ed8`) | indigo `#6366f1` | link `#2563eb`, focus, brand, gradients, neu-bg `#e3e8f0` |
| `agent` | rose `#f43f5e` (hover `#e11d48`, active `#be123c`) | rose `#f43f5e` | **warm stone neutrals**: bg-subtle `#faf5f5`, bg-muted `#f5eaea`, text `#1c1917`, text-muted `#57534e`, border `#e7e5e4`; gradient to orange `#fb923c` |
| `admin` | indigo `#6366f1` (hover `#4f46e5`, active `#4338ca`) | violet `#8b5cf6` | link, focus, brand, gradients, neu-bg `#e4e2f2` |

**Combination rule:** brand block sets everything → easylife role block overrides primary/secondary/link/focus/brand/gradient (agent also neutrals) → dark-mode block overrides neutrals (bg/surface/text/border/divider/disabled/skeleton/elevation/neu). Dark mode never changes primary/secondary/status colors.

**JS vs CSS mismatch (agent):** `agentOverrideEasylife` / `resolveTheme("easylife","agent")` uses red/coral (`primary.default #f87171`, scale = red, secondary `#fb923c`), while `variables.css` uses rose `#f43f5e`. The CSS is what renders; treat JS agent values as divergent.

---

## 5. Exported JS tokens

All values are strings. `import { spacing, radius, ... } from "@galyan/theme"`.

### `colors` — 50–950 scales (+ `white` `#ffffff`, `black` `#000000`, `transparent`)

Palettes: `green`, `teal`, `blue`, `indigo`, `slate`, `emerald`, `amber`, `red`, `sky`, `rose`, `purple`, `orange` (Tailwind-identical values), plus brand-specific:

| Step | `violet` (Samantrix) | `ink` (Samantrix neutral) |
|---|---|---|
| 50 | `#f2efff` | `#e6e6f0` |
| 100 | `#e4ddff` | `#c4c4d8` |
| 200 | `#cabbff` | `#9a9ab4` |
| 300 | `#ab93ff` | `#6b6b85` |
| 400 | `#8f70ff` | `#3d3d54` |
| 500 | `#7c5cff` | `#2a2a3d` |
| 600 | `#6438f0` | `#1c1c2b` |
| 700 | `#5028c4` | `#13131f` |
| 800 | `#3c1e94` | `#0e0e18` |
| 900 | `#2a1568` | `#0a0a12` |
| 950 | `#1a0d42` | `#06060a` |

Key 500s: green `#22c55e`, teal `#14b8a6`, blue `#3b82f6`, indigo `#6366f1`, slate `#64748b`, emerald `#10b981`, amber `#f59e0b`, red `#ef4444`, sky `#0ea5e9`, rose `#f43f5e`, purple `#a855f7`, orange `#f97316`.

### `spacing` (key → rem, px)

| 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0px | 0.125rem | 0.25rem | 0.375rem | 0.5rem | 0.625rem | 0.75rem | 0.875rem | 1rem | 1.25rem | 1.5rem | 1.75rem | 2rem | 2.25rem | 2.5rem | 2.75rem | 3rem |

| 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 80 | 96 | 128 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 3.5rem | 4rem | 5rem | 6rem | 7rem | 8rem | 9rem | 10rem | 12rem | 14rem | 16rem | 18rem | 20rem | 24rem | 32rem |

(key × 4px; e.g. `4` = 16px)

### `radius`

| none | xs | sm | md | lg | xl | 2xl | 3xl | full |
|---|---|---|---|---|---|---|---|---|
| 0px | 0.125rem (2px) | 0.25rem (4px) | 0.375rem (6px) | 0.5rem (8px) | 0.75rem (12px) | 1rem (16px) | 1.5rem (24px) | 9999px |

### `shadows`

| Key | Value |
|---|---|
| `none` | `none` |
| `xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |
| `inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` |
| `focus` | `0 0 0 3px` (append a color, e.g. `var(--gy-focus-ring)`) |
| `modal` | `0 32px 64px -12px rgb(0 0 0 / 0.35), 0 0 0 1px rgb(0 0 0 / 0.05)` |
| `dropdown` | `0 4px 16px -2px rgb(0 0 0 / 0.12), 0 2px 6px -1px rgb(0 0 0 / 0.08)` |
| `popover` | `0 8px 24px -4px rgb(0 0 0 / 0.15), 0 2px 8px -2px rgb(0 0 0 / 0.08)` |

### `zIndex`

| hide | auto | base | raised | sticky | fixed | drawer | modal | dropdown | popover | toast | tooltip | loading |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| -1 | auto | 0 | 1 | 1100 | 1200 | 1300 | 9999 | 10050 | 10050 | 10100 | 100000 | 100050 |

(dropdown/popover sit above modal so menus inside modals work.)

### `breakpoints`

| xs | sm | md | lg | xl | 2xl | 3xl |
|---|---|---|---|---|---|---|
| 480px | 640px | 768px | 1024px | 1280px | 1536px | 1920px |

No CSS variables exist for breakpoints (CSS vars can't be used in media queries) — hardcode these px values.

### `durations` / `easings`

| durations | instant 0ms · fast 100ms · normal 200ms · slow 300ms · slower 500ms · slowest 700ms |
|---|---|
| **easings** | linear `linear` · ease `ease` · easeIn `cubic-bezier(0.4, 0, 1, 1)` · easeOut `cubic-bezier(0, 0, 0.2, 1)` · easeInOut `cubic-bezier(0.4, 0, 0.2, 1)` · spring `cubic-bezier(0.34, 1.56, 0.64, 1)` · bounce `cubic-bezier(0.68, -0.55, 0.265, 1.55)` |

### `opacity`

Keys `0 5 10 15 20 25 30 40 50 60 70 75 80 90 95 100` → `"0"`, `"0.05"` … `"1"` (key / 100).

### `borders`

`width`: `0` 0px, `1` 1px, `2` 2px, `4` 4px, `8` 8px. `style`: `solid`, `dashed`, `dotted`, `none`.

### Typography (`typography` = `{ fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, paragraphSpacing, headingScale, bodyScale, captionScale }`; first five also exported individually)

| `fontFamily` | Value |
|---|---|
| `sans` | `'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `serif` | `'Georgia', 'Times New Roman', serif` |
| `mono` | `'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace` |
| `display` | `'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif` |

| `fontWeight` | thin 100 · extralight 200 · light 300 · regular 400 · medium 500 · semibold 600 · bold 700 · extrabold 800 · black 900 |
|---|---|
| **`fontSize`** | 2xs 0.625rem (10) · xs 0.75rem (12) · sm 0.875rem (14) · md 1rem (16) · lg 1.125rem (18) · xl 1.25rem (20) · 2xl 1.5rem (24) · 3xl 1.875rem (30) · 4xl 2.25rem (36) · 5xl 3rem (48) · 6xl 3.75rem (60) · 7xl 4.5rem (72) |
| **`lineHeight`** | none 1 · tight 1.25 · snug 1.375 · normal 1.5 · relaxed 1.625 · loose 2 · `"3"`…`"10"` = .75rem, 1rem, 1.25rem, 1.5rem, 1.75rem, 2rem, 2.25rem, 2.5rem |
| **`letterSpacing`** | tighter -0.05em · tight -0.025em · normal 0em · wide 0.025em · wider 0.05em · widest 0.1em |
| **`paragraphSpacing`** | none 0 · sm 0.5rem · md 1rem · lg 1.5rem · xl 2rem |

| `headingScale` | size | weight | lineHeight | letterSpacing |
|---|---|---|---|---|
| h1 | 5xl | bold | tight | tight |
| h2 | 4xl | bold | tight | tight |
| h3 | 3xl | semibold | snug | normal |
| h4 | 2xl | semibold | snug | normal |
| h5 | xl | semibold | normal | normal |
| h6 | lg | semibold | normal | normal |

`bodyScale`: `body-xl` (xl, relaxed), `body-lg` (lg, relaxed), `body-md` (md, normal), `body-sm` (sm, normal), `body-xs` (xs, normal) — all weight regular. `captionScale`: `caption-lg` (xs), `caption-md` (2xs) — medium, normal, letterSpacing wide.

### `animations`

Keyframe objects: `fade.in/out`, `slide.inUp/inDown/inLeft/inRight` (±8px), `zoom.in/out` (scale 0.95), `collapse.open/close` (uses `--gy-collapse-height`), `shake`, `spin`, `bounce`, `pulse`, `ripple`, `wave` (`.keyframes`).

### `baseTheme` (shared semantic JS)

`success` / `warning` / `danger` / `info` (`subtle`, `muted`, `default`, `emphasis`, `fg`), `neutral` (slate 50–950), `overlay` (`light` `rgba(0, 0, 0, 0.4)`, `dark` `rgba(0, 0, 0, 0.6)`, `blur` `rgba(0, 0, 0, 0.3)`), `chart` 1–8, `social` (google `#EA4335`, facebook `#1877F2`, twitter `#1DA1F2`, linkedin `#0A66C2`, whatsapp `#25D366`, github `#181717`), `status` (online/offline/busy/away). Only chart/status/semantic-status have CSS-var equivalents; `social` and `overlay.blur` are JS-only.

---

## 6. CSS variables (`@galyan/theme/css/variables`)

### Selector model

| Layer | Selectors | Scope |
|---|---|---|
| Shared (theme-independent) | `:root` | typography, spacing, radius, shadow, z, motion, status, chart, neu geometry |
| EasyLife brand (default) | `:root`, `[data-brand="easylife"]`, `.gy-brand-easylife`, `[data-theme="customer"]`, `.gy-theme-customer` | all color roles |
| Metalixia | `[data-brand="metalixia"]`, `.gy-brand-metalixia`, `[data-theme="metalixia"]`, `.gy-theme-metalixia` | |
| Samantrix | `[data-brand="samantrix"]`, `.gy-brand-samantrix`, `[data-theme="samantrix"]`, `.gy-theme-samantrix` | |
| Custom | `[data-brand="custom"]`, `.gy-brand-custom`, `[data-theme="custom"]`, `.gy-theme-custom` | every color = `var(--gy-custom-*, <easylife fallback>)` |
| Roles | `[data-brand="easylife"][data-role="professional\|agent\|admin"]`, `[data-theme="<role>"]`, `.gy-theme-<role>` | |
| Dark | `[data-color-mode="dark"]` or `.gy-dark`, both `:not([data-brand="samantrix"]):not([data-theme="samantrix"])` | neutrals only |

The class selectors (`.gy-brand-*`, `.gy-theme-*`, `.gy-dark`) let you scope a theme to a subtree without the provider.

### Color roles — light (EasyLife) vs dark (all non-samantrix brands) vs Samantrix

"—" in Dark = not overridden by dark mode (keeps brand/role value).

#### Primary / secondary / brand

| Variable | Meaning | EasyLife | Dark | Samantrix |
|---|---|---|---|---|
| `--gy-color-primary-50` … `-950` | Full primary ramp (11 steps) | green scale | — | violet scale |
| `--gy-primary` | Main brand action color (buttons, active states) | `#22c55e` | — | `#7c5cff` |
| `--gy-primary-hover` | Hover state | `#16a34a` | — | `#6438f0` |
| `--gy-primary-active` | Pressed state | `#15803d` | — | `#5028c4` |
| `--gy-primary-muted` | Soft tint (selection, light badges) | `#bbf7d0` | — | `#cabbff` |
| `--gy-primary-subtle` | Very light tinted background | `#f0fdf4` | — | `#f2efff` |
| `--gy-primary-fg` | Text/icon on primary | `#ffffff` | — | `#ffffff` |
| `--gy-secondary` | Secondary accent | `#14b8a6` | — | `#ab93ff` |
| `--gy-secondary-hover` | Secondary hover | `#0d9488` | — | `#8f70ff` |
| `--gy-secondary-muted` | Secondary tint | `#99f6e4` | — | `#cabbff` |
| `--gy-secondary-subtle` | Secondary light bg | `#f0fdfa` | — | `#f2efff` |
| `--gy-secondary-fg` | Text on secondary | `#ffffff` | — | `#ffffff` |
| `--gy-brand` | Brand identity color | `#22c55e` | — | `#7c5cff` |
| `--gy-brand-dark` | Darker brand | `#15803d` | — | `#5028c4` |
| `--gy-brand-light` | Lighter brand | `#bbf7d0` | — | `#cabbff` |
| `--gy-gradient-primary` | Primary→secondary gradient | `linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)` | — | `linear-gradient(135deg, #2a1568 0%, #7c5cff 100%)` |
| `--gy-gradient-hero` | Soft hero background | `linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdfa 100%)` | — (stays light!) | `linear-gradient(135deg, #06060a 0%, #0a0a12 50%, #13131f 100%)` |
| `--gy-gradient-brand` | Strong brand gradient | `linear-gradient(135deg, #16a34a 0%, #0d9488 100%)` | — | `linear-gradient(135deg, #5028c4 0%, #7c5cff 100%)` |

#### Background / surface / elevation

| Variable | Meaning | EasyLife | Dark | Samantrix |
|---|---|---|---|---|
| `--gy-background` | Page canvas | `#ffffff` | `#0f172a` | `#06060a` |
| `--gy-background-subtle` | Slightly offset section bg | `#f8fafc` | `#1e293b` | `#0a0a12` |
| `--gy-background-muted` | Muted fills (hover rows, tracks, chips) | `#f1f5f9` | `#334155` | `#13131f` |
| `--gy-background-inverse` | Inverted bg (tooltips, dark bars) | `#0f172a` | `#ffffff` | `#ffffff` |
| `--gy-surface` | Card/panel bg | `#ffffff` | `#1e293b` | `#0a0a12` |
| `--gy-surface-raised` | Raised card / nested panel | `#ffffff` | `#334155` | `#13131f` |
| `--gy-surface-overlay` | Modal/popover/dropdown bg | `#ffffff` | `#1e293b` | `#0e0e18` |
| `--gy-surface-sunken` | Inset wells, inputs areas | `#f8fafc` | `#0f172a` | `#06060a` |
| `--gy-surface-disabled` | Disabled surface | `#f1f5f9` | `#334155` | `#13131f` |
| `--gy-elevation-0` … `-3` | Layered surface stack (0 lowest) | `#ffffff` `#f8fafc` `#f1f5f9` `#e2e8f0` | `#0f172a` `#1e293b` `#334155` `#475569` | `#06060a` `#0a0a12` `#13131f` `#1c1c2b` |
| `--gy-overlay` | Modal backdrop | `rgba(0, 0, 0, 0.4)` | — | `rgba(0, 0, 0, 0.6)` |
| `--gy-overlay-dark` | Stronger backdrop | `rgba(0, 0, 0, 0.6)` | — | `rgba(0, 0, 0, 0.8)` |

#### Text

| Variable | Meaning | EasyLife | Dark | Samantrix |
|---|---|---|---|---|
| `--gy-text` | Primary body/heading text | `#0f172a` | `#f8fafc` | `#ffffff` |
| `--gy-text-muted` | Secondary text, labels | `#475569` | `#cbd5e1` | `#9a9ab4` |
| `--gy-text-subtle` | Placeholder, hints, captions | `#94a3b8` | `#94a3b8` | `#6b6b85` |
| `--gy-text-disabled` | Disabled text | `#cbd5e1` | `#64748b` | `#3d3d54` |
| `--gy-text-inverse` | Text on inverse bg | `#ffffff` | `#0f172a` | `#06060a` |
| `--gy-text-link` | Link color | `#16a34a` | — | `#ab93ff` |
| `--gy-text-link-hover` | Link hover | `#15803d` | — | `#8f70ff` |

#### Border / divider / focus / disabled / skeleton

| Variable | Meaning | EasyLife | Dark | Samantrix |
|---|---|---|---|---|
| `--gy-border` | Default border (cards, inputs) | `#e2e8f0` | `#334155` | `#1c1c2b` |
| `--gy-border-muted` | Faint border | `#f1f5f9` | `#1e293b` | `#13131f` |
| `--gy-border-strong` | Emphasized border, input hover, scrollbar thumb | `#cbd5e1` | `#475569` | `#2a2a3d` |
| `--gy-border-focus` | Focused input border | `#22c55e` | — | `#7c5cff` |
| `--gy-border-error` | Invalid input border | `#ef4444` | — | `#f2543d` |
| `--gy-divider` | Separator lines | `#e2e8f0` | `#334155` | `#1c1c2b` |
| `--gy-divider-strong` | Strong separator | `#cbd5e1` | `#475569` | `#2a2a3d` |
| `--gy-focus-ring` | Focus halo color (`box-shadow: 0 0 0 3px var(--gy-focus-ring)`) | `rgba(34, 197, 94, 0.4)` | — | `rgba(124, 92, 255, 0.4)` |
| `--gy-focus-outline` | `:focus-visible` outline color (used by globals.css) | `#22c55e` | — | `#7c5cff` |
| `--gy-disabled-bg` | Disabled control bg | `#f1f5f9` | `#334155` | `#13131f` |
| `--gy-disabled-text` | Disabled control text | `#94a3b8` | `#64748b` | `#3d3d54` |
| `--gy-disabled-border` | Disabled control border | `#e2e8f0` | `#475569` | `#1c1c2b` |
| `--gy-skeleton-base` | Skeleton block color | `#f1f5f9` | `#1e293b` | `#13131f` |
| `--gy-skeleton-shimmer` | Shimmer gradient (a `linear-gradient`, use as `background`) | `linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)` | `…#1e293b 25%, #334155 50%, #1e293b 75%` | `…#13131f 25%, #1c1c2b 50%, #13131f 75%` |

Note: in the JS `BrandTheme`, `skeleton.shimmer` is a flat color and `disabled.background` maps to CSS `--gy-disabled-bg`.

#### Metalixia differences from EasyLife (all other brand-level values identical)

`--gy-primary #707fdd`, hover `#5a67c4`, active `#4a57b4`, muted `#b9c2f0`, subtle `#f0f2fb`; secondary `#5a67c4` / hover `#4a57b4` / muted `#b9c2f0` / subtle `#f1f2f7`; `--gy-background-muted #f1f2f7`; `--gy-border-muted #f1f2f7`; link `#707fdd` / `#5a67c4`; focus `#707fdd`, ring `rgba(112, 127, 221, 0.4)`; brand `#707fdd` / dark `#4a57b4` / light `#b9c2f0`; `--gy-skeleton-base #f1f2f7` (shimmer `#f1f2f7 25%, #e2e8f0 50%, #f1f2f7 75%`); `--gy-elevation-2 #f1f2f7`; gradients primary `linear-gradient(135deg, #707fdd 0%, #5a67c4 100%)`, hero `linear-gradient(135deg, #f0f2fb 0%, #dbe0f7 50%, #f1f2f7 100%)`, brand `linear-gradient(135deg, #707fdd 0%, #5a67c4 50%, #4a57b4 100%)`; `--gy-neu-bg #e5e6f5`, `--gy-neu-shadow-dark rgba(160, 165, 195, 0.5)`.

#### Status (shared `:root`, identical in light and dark)

| Variable set | default | `-subtle` | `-muted` | `-emphasis` | `-fg` |
|---|---|---|---|---|---|
| `--gy-success*` | `#10b981` | `#ecfdf5` | `#a7f3d0` | `#059669` | `#ffffff` |
| `--gy-warning*` | `#f59e0b` | `#fffbeb` | `#fde68a` | `#d97706` | `#ffffff` |
| `--gy-danger*` | `#ef4444` | `#fef2f2` | `#fecaca` | `#dc2626` | `#ffffff` |
| `--gy-info*` | `#0ea5e9` | `#f0f9ff` | `#bae6fd` | `#0284c7` | `#ffffff` |

`default` = solid fill/icon; `subtle` = alert/badge background; `muted` = soft border/tint; `emphasis` = hover/strong text; `fg` = text on solid. Subtle variants are light-only colors — in dark mode prefer `color-mix(in srgb, var(--gy-success) 15%, transparent)` (the pattern `@galyan/ui` uses with `--gy-primary`).

| Variable | Value | Meaning |
|---|---|---|
| `--gy-status-online` | `#10b981` | Presence dot: online |
| `--gy-status-offline` | `#94a3b8` | offline |
| `--gy-status-busy` | `#ef4444` | busy |
| `--gy-status-away` | `#f59e0b` | away |
| `--gy-chart-1` … `-8` | `#6366f1` `#22c55e` `#f59e0b` `#ef4444` `#0ea5e9` `#a855f7` `#f97316` `#14b8a6` | Categorical chart series, in order |

#### Neumorphism

| Variable | Meaning | EasyLife | professional / agent / admin | Metalixia | Dark | Samantrix |
|---|---|---|---|---|---|---|
| `--gy-neu-distance` | Shadow offset | `6px` (all) | | | | |
| `--gy-neu-blur` | Shadow blur | `12px` (all) | | | | |
| `--gy-neu-intensity` | Strength factor | `0.15` (all) | | | | |
| `--gy-neu-radius` | Corner radius | `var(--gy-radius-xl)` (all) | | | | |
| `--gy-neu-bg` | Neumorphic surface | `#e2ece5` | `#e3e8f0` / `#f2e6e6` / `#e4e2f2` | `#e5e6f5` | `#1e293b` | `#0a0a12` |
| `--gy-neu-shadow-light` | Highlight shadow | `rgba(255, 255, 255, 0.85)` | same | same | `rgba(255, 255, 255, 0.06)` | `rgba(255, 255, 255, 0.04)` |
| `--gy-neu-shadow-dark` | Low shadow | `rgba(165, 190, 172, 0.5)` | `rgba(163, 177, 198, 0.5)` / `rgba(200, 170, 170, 0.5)` / `rgba(168, 163, 200, 0.5)` | `rgba(160, 165, 195, 0.5)` | `rgba(0, 0, 0, 0.6)` | `rgba(0, 0, 0, 0.7)` |

### Typography (`:root`)

| Variable | Value |
|---|---|
| `--gy-font-sans` | `"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (overridable via `fontFamily`) |
| `--gy-font-serif` | `"Georgia", "Times New Roman", serif` |
| `--gy-font-mono` | `"Geist Mono", "JetBrains Mono", "Fira Code", monospace` |
| `--gy-font-display` | `"Inter", -apple-system, BlinkMacSystemFont, sans-serif` |
| `--gy-font-family` | not in stylesheet — set inline only when `fontFamily` is provided |
| `--gy-font-weight-{thin,light,regular,medium,semibold,bold,extrabold,black}` | 100, 300, 400, 500, 600, 700, 800, 900 (no `extralight` var) |
| `--gy-font-size-{2xs,xs,sm,md,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl}` | 0.625rem, 0.75rem, 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 1.875rem, 2.25rem, 3rem, 3.75rem, 4.5rem |
| `--gy-line-height-{none,tight,snug,normal,relaxed,loose}` | 1, 1.25, 1.375, 1.5, 1.625, 2 |
| `--gy-letter-spacing-{tighter,tight,normal,wide,wider,widest}` | -0.05em, -0.025em, 0em, 0.025em, 0.05em, 0.1em |

### Spacing (`:root`) — subset of the JS scale; dots become dashes

| Numeric | `--gy-spacing-0` 0px · `-0-5` 0.125rem · `-1` 0.25rem · `-1-5` 0.375rem · `-2` 0.5rem · `-2-5` 0.625rem · `-3` 0.75rem · `-3-5` 0.875rem · `-4` 1rem · `-5` 1.25rem · `-6` 1.5rem · `-8` 2rem · `-10` 2.5rem · `-12` 3rem · `-16` 4rem · `-20` 5rem · `-24` 6rem · `-32` 8rem |
|---|---|
| **T-shirt aliases** | `--gy-spacing-xs` 0.25rem · `-sm` 0.5rem · `-md` 1rem · `-lg` 1.5rem · `-xl` 2rem · `-2xl` 3rem |

Not defined as vars: 7, 9, 11, 14, 28+ except 32 — use rem literals from the JS scale.

### Radius, shadow, z-index, motion (`:root`)

| Group | Variables |
|---|---|
| Radius | `--gy-radius-none` 0px · `-xs` 0.125rem · `-sm` 0.25rem · `-md` 0.375rem · `-lg` 0.5rem · `-xl` 0.75rem · `-2xl` 1rem · `-3xl` 1.5rem · `-full` 9999px |
| Shadow | `--gy-shadow-xs`, `-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `-inner`, `-modal`, `-dropdown`, `-popover` (values = JS `shadows`; no `-none` / `-focus` var) |
| Z-index | `--gy-z-sticky` 1100 · `-fixed` 1200 · `-drawer` 1300 · `-modal` 9999 · `-dropdown` 10050 · `-popover` 10050 · `-toast` 10100 · `-tooltip` 100000 · `-loading` 100050 |
| Duration | `--gy-duration-instant` 0ms · `-fast` 100ms · `-normal` 200ms · `-slow` 300ms · `-slower` 500ms (no `slowest`) |
| Easing | `--gy-ease` ease · `--gy-ease-in` cubic-bezier(0.4, 0, 1, 1) · `--gy-ease-out` cubic-bezier(0, 0, 0.2, 1) · `--gy-ease-in-out` cubic-bezier(0.4, 0, 0.2, 1) · `--gy-ease-spring` cubic-bezier(0.34, 1.56, 0.64, 1) · `--gy-ease-bounce` cubic-bezier(0.68, -0.55, 0.265, 1.55) |
| Runtime helper | `--gy-collapse-height` (set per element; used by collapse keyframes, fallback `auto`) |

### Keyframes (in variables.css)

`gy-fade-in`, `gy-fade-out`, `gy-slide-in-up`, `gy-slide-in-down`, `gy-slide-in-left`, `gy-slide-in-right`, `gy-zoom-in`, `gy-zoom-out`, `gy-spin`, `gy-pulse`, `gy-bounce`, `gy-shake`, `gy-ripple`, `gy-wave` (for `--gy-skeleton-shimmer` with `background-size: 200% 100%`), `gy-collapse-open`, `gy-collapse-close`, `gy-slide-toast-in-right`, `gy-count-up`.

Example: `animation: gy-fade-in var(--gy-duration-normal) var(--gy-ease-out);`

### `--gy-custom-*` inputs (custom brand)

Every color role above has a `--gy-custom-<same-suffix>` hook read by `[data-brand="custom"]`, e.g. `--gy-custom-primary`, `--gy-custom-background`, `--gy-custom-surface-raised`, `--gy-custom-text-muted`, `--gy-custom-border-strong`, `--gy-custom-disabled-bg`, `--gy-custom-skeleton-shimmer`, `--gy-custom-elevation-0..3`, `--gy-custom-overlay`, `--gy-custom-neu-shadow-dark`. `deriveCustomTheme` fills only the subset listed in section 3.

### Variables used by `@galyan/ui` that the theme does NOT define

Components reference these with inline fallbacks; they are component-level hooks, not design tokens. Don't use them in custom CSS expecting theme values: `--gy-surface-hover`, `--gy-surface-muted`, `--gy-bg-muted`, `--gy-text-primary`, `--gy-font-heading`, `--gy-font-size-base`, `--gy-font-size-3xs`, `--gy-font-weight-normal`, `--gy-border-hover`, `--gy-primary-border`, `--gy-{success,danger,info,warning}-{light,border}`, `--gy-purple`, plus component-scoped vars (`--gy-sidebar-*`, `--gy-tooltip-*`, `--gy-map-*`, `--gy-tree-*`, `--gy-table-cell-px/py`, `--gy-empty-*`, `--gy-cylinder-*`, `--gy-bar-*`, etc.).

`@galyan/ui` also sets `font-family: "DM Sans", var(--gy-font-sans, …)` on every `[class*="gy-"]` element and hides scrollbars on them (opt back in with `.gy-scrollbar-visible`; force-hide with `.gy-no-scrollbar` / `.gy-scrollbar-none` / `.gy-hide-scrollbar`).

---

## 7. Guidance

### Styling custom components to match

- Use semantic vars, never hex: `background: var(--gy-surface); color: var(--gy-text); border: 1px solid var(--gy-border); border-radius: var(--gy-radius-lg); padding: var(--gy-spacing-4); box-shadow: var(--gy-shadow-sm);`. They then follow brand, role, and dark mode automatically.
- Prefer semantic over ramp: `--gy-primary` / `--gy-primary-hover` over `--gy-color-primary-500/600`. Use the ramp only for data-viz shades.
- Text hierarchy: `--gy-text` → `--gy-text-muted` → `--gy-text-subtle` → `--gy-text-disabled`.
- Layering: page `--gy-background` → card `--gy-surface` → nested `--gy-surface-raised`; floating layers `--gy-surface-overlay` + `--gy-shadow-dropdown|popover|modal` + matching `--gy-z-*`.
- Focus: `outline: none; box-shadow: 0 0 0 3px var(--gy-focus-ring);` (what `.gy-btn` does), or rely on the globals `:focus-visible` outline.
- Tints that work in dark mode: `color-mix(in srgb, var(--gy-primary) 12%, transparent)` rather than `--gy-*-subtle`.
- Motion: `transition: background-color var(--gy-duration-fast) var(--gy-ease-in-out);` — globals.css already disables motion under `prefers-reduced-motion: reduce`.
- Keep a fallback when shipping standalone CSS: `var(--gy-radius-md, 0.375rem)`.
- React logic that needs a color (canvas, charts): read `resolveTheme(brand, role)` with `useTheme()`, or `getComputedStyle(document.documentElement).getPropertyValue("--gy-primary")` (the latter reflects custom brand and CSS-only agent values).

### Adding a brand

1. `packages/theme/src/themes/brands/<name>.ts`: export `<name>Brand` with the same shape as `easylifeBrand` (type `BrandTheme`); re-export from `brands/index.ts`.
2. Register it in `brandThemes` in `themes/resolveTheme.ts` (and role overrides in `roleOverrides[<name>]` if it needs role variants).
3. Add `"<name>"` to `ThemeBrand` (and `LegacyThemeRole` + `LEGACY_MAP` if legacy support is wanted) in `provider/ThemeContext.ts` / `ThemeProvider.tsx`.
4. `css/variables.css`: add a block `[data-brand="<name>"], .gy-brand-<name>, [data-theme="<name>"], .gy-theme-<name> { … }` defining **every** brand-level variable (primary ramp + semantic, secondary, background, surface, text, border, divider, focus, disabled, skeleton, brand, gradient, elevation, overlay, neu-*). Role variants: `[data-brand="<name>"][data-role="<role>"]`.
5. If always-dark (like samantrix): force `resolvedMode` in `ThemeProvider` and add `:not([data-brand="<name>"])` to the dark-mode selector.
6. Optionally add a primitive palette to `tokens/colors.ts`. Rebuild (`pnpm --filter @galyan/theme build` copies `src/css` → `dist/css`).

For a one-off runtime brand without code changes, use `brand="custom"` + `customTheme={{ primary: "#hex" }}` (or `setCustomTheme`).
