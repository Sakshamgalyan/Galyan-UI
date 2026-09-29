# Feedback, Overlay & Display Components

Modals, tooltips, toasts, banners, loading indicators, empty states, chips and animated numbers from `@galyan/ui`. All are `"use client"` function components. None of them forward refs; unless a section says otherwise, props do **not** extend native HTML attributes, so only the listed props are accepted.

---

## Modal

Accessible dialog, rendered through a portal, with an optional header, body and footer (built-in Cancel/Confirm buttons).
Import: `import { Modal, type ModalProps, type ModalSize, type ModalVariant, type ModalPosition } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` **(required)** | `boolean` | — | Controls visibility. |
| `onClose` | `() => void` | — | Called on Escape, backdrop click, close (X) button, and after the cancel button. |
| `size` | `ModalSize` (`"sm" \| "md" \| "lg" \| "xl"`) | `"md"` | Dialog width preset. |
| `position` | `ModalPosition` (`"center" \| "top"`) | `"center"` | Vertical placement. |
| `variant` | `ModalVariant` (`"default" \| "sidebar" \| "compact" \| "fullscreen" \| "glassmorphic" \| "glass"`) | `"default"` | Visual style. |
| `icon` | `React.ReactNode` | — | Icon shown in the header. |
| `title` | `React.ReactNode` | — | Header title (rendered as `h2`). |
| `subtitle` | `React.ReactNode` | — | Header subtitle. |
| `footer` | `React.ReactNode` | — | Custom footer. Replaces the built-in buttons. |
| `cancelText` | `string` | — | If set, renders a secondary Cancel button. |
| `confirmText` | `string` | — | If set, renders a primary Confirm button. |
| `onCancel` | `() => void` | — | Cancel button handler. `onClose` is also called afterwards. |
| `onConfirm` | `() => void` | — | Confirm button handler. It does **not** close the modal. |
| `isConfirmLoading` | `boolean` | `false` | Loading state on the Confirm button. |
| `children` | `React.ReactNode` | — | Body content. |
| `showCloseButton` | `boolean` | `true` | Show the X button. |
| `closable` | `boolean` | `true` | If `false`, turns off Escape, backdrop close and the X button. |
| `preventBackdropClose` | `boolean` | `false` | Turns off closing on backdrop click only. |
| `customWidth` | `string` | — | Sets both width and max-width (e.g. `"720px"`). |
| `customHeight` | `string` | — | Dialog height. |
| `customBackground` | `string` | — | Dialog background. |
| `customBorderRadius` | `string` | — | Dialog border radius. |
| `customHeader` | `React.ReactNode` | — | Replaces the whole header (icon, titles and X button). |
| `animationDuration` | `number` | `200` | Enter animation in ms. |
| `disableAnimation` | `boolean` | `false` | Turns off enter animations. |
| `className` | `string` | `""` | Class on the dialog element. |

```tsx
const [open, setOpen] = useState(false);

<Button variant="primary" onClick={() => setOpen(true)}>Open</Button>
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  subtitle="This action requires security verification."
  cancelText="Cancel"
  confirmText="Confirm & Proceed"
  onConfirm={() => setOpen(false)}
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

Notes:
- The modal is fully controlled. You must flip `isOpen` yourself in `onClose` and, if you want it to close, in `onConfirm`.
- It is portaled to `document.body` and renders nothing until mounted on the client (SSR-safe).
- While open it traps Tab focus, locks body scroll (`overflow: hidden`), and restores focus to the previously focused element on close.
- The footer appears only when `footer`, `cancelText` or `confirmText` is set.

---

## Tooltip

Floating tooltip positioned with `@floating-ui/react`. It opens on hover and/or click, flips automatically, and can show a keyboard-shortcut hint.
Import: `import { Tooltip, type TooltipProps, type TooltipPosition, type TooltipVariant, type TooltipSize, type TooltipTrigger } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` **(required)** | `React.ReactNode` | — | Tooltip body. If it is falsy, the tooltip never shows. |
| `children` | `React.ReactNode` | — | Trigger element. |
| `target` | `React.ReactNode` | — | Alias for `children` (takes precedence). |
| `position` | `TooltipPosition` (`"top" \| "bottom" \| "left" \| "right"`) | — | Placement. Overrides `placement`. |
| `placement` | `TooltipPosition` | `"top"` | Placement (alias). |
| `variant` | `TooltipVariant` (`"default" \| "dark" \| "light" \| "primary"`) | `"default"` | Color theme. |
| `size` | `TooltipSize` (`"xs" \| "sm" \| "md" \| "lg" \| "xl"`) | `"md"` | Size scale. |
| `delay` | `number` | `100` | Show delay in ms. |
| `width` | `string` | — | Fixed width. |
| `maxWidth` | `string \| number` | — | Max width (a number is treated as px). |
| `linebreak` | `boolean` | `false` | Allow wrapping. Otherwise text is `nowrap`, unless `maxWidth` is set and a string `content` is longer than 60 characters. |
| `hasArrow` | `boolean` | `true` | Show the arrow. |
| `shortcut` | `string` | — | Keyboard hint rendered in `<kbd>` (e.g. `"⌘K"`). |
| `usePortal` | `boolean` | `true` | Render in a `FloatingPortal` to avoid clipping. |
| `trigger` | `TooltipTrigger` (`"hover" \| "click" \| "both"`) | `"hover"` | Interaction that opens it. |
| `className` | `string` | `""` | Class on the popover. |
| `disabled` | `boolean` | `false` | Turns the tooltip off. |
| `smartPosition` | `boolean` | `true` | Flip between top and bottom when there is not enough space (no horizontal flips). |
| `zIndex` | `number` | `100000` | Popover z-index. |

```tsx
<Tooltip content="Save changes" shortcut="⌘S" placement="bottom">
  <Button variant="secondary">Save</Button>
</Tooltip>

{/* No children/target: renders a default info (i) icon as the trigger */}
<Tooltip content="Explains this field" trigger="click" />
```

Notes:
- The trigger is wrapped in a `<span class="gy-tooltip-trigger">`.
- The tooltip closes on outside mousedown or Escape.
- Open state is internal only; there is no controlled `open` prop.

---

## Toaster (ToasterProvider + useToast)

Toast notification system: a provider holds the queue and renders the stack, and the `useToast()` hook exposes an imperative `toast` API.
Import: `import { ToasterProvider, useToast, type Toast, type ToastVariant, type ToastStyle, type ToastSize, type ToastPosition, type ToastMethods, type ToasterProviderProps } from "@galyan/ui";`

There is no standalone `Toaster` component and no global `toast()` function. You must mount `<ToasterProvider>` high in the tree, then call `useToast()` from a descendant component.

### ToasterProviderProps

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` **(required)** | `React.ReactNode` | — | App subtree. |
| `position` | `ToastPosition` (`"top-right" \| "top-left" \| "top-center" \| "bottom-right" \| "bottom-left" \| "bottom-center"`) | `"bottom-right"` | Stack position. |
| `defaultVariant` | `ToastVariant` | `"info"` | Variant used when a toast has no `variant`. |
| `defaultStyle` | `ToastStyle` | `"subtle"` | Style used when none is resolved from the toast. |

### `useToast()` return value

| Member | Type | Description |
|---|---|---|
| `toast` | `ToastMethods` | Imperative API (see below). Every call returns the toast `id` (`string`). |
| `toasts` | `Toast[]` | Current queue. |
| `dismiss` | `(id: string) => void` | Remove one toast (calls its `onDismiss`). |
| `dismissAll` | `() => void` | Remove all toasts. |
| `update` | `(id: string, data: Partial<Omit<Toast, "id">>) => void` | Patch a toast. It also schedules auto-dismiss again (4000 ms unless a duration is given or the variant is `"loading"`). |

`useToast()` throws `"useToast must be used inside ToasterProvider"` when it is called outside the provider.

### `ToastMethods`

- `toast(data: Omit<Toast, "id">): string` — full form (`title` is required).
- Shorthand helpers, each with the signature `(title: React.ReactNode, options?: ToastOptions) => string`: `toast.success`, `.error`, `.warning`, `.info`, `.loading`, `.default`, `.neutral`, `.primary`, `.secondary`, `.glassmorphic`, `.glass`, `.solid`, `.outline`, `.minimal`.
  - `.loading` forces `duration: 0`, so the toast stays until it is dismissed or updated.
  - `.glassmorphic`, `.glass`, `.solid`, `.outline` and `.minimal` also default `toastStyle` to the matching style.
- `toast.promise<T>(promise, { loading, success, error }, options?) => Promise<T>` — shows a loading toast, then updates it to success or error. `success` and `error` can be nodes or functions `(data) => node` / `(err) => node`. It resolves with the promise's value or rethrows its error.

`ToastOptions` = `Partial<Omit<Toast, "id" | "title">>`. It is not re-exported from the package; derive it with `Parameters<ToastMethods["success"]>[1]` if you need the type.

### `Toast` fields

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | auto | Generated; you don't set it. |
| `title` **(required)** | `React.ReactNode` | — | Main text. |
| `description` | `React.ReactNode` | — | Secondary text. |
| `variant` | `ToastVariant` | provider `defaultVariant` | `"default" \| "neutral" \| "success" \| "error" \| "warning" \| "info" \| "loading" \| "primary" \| "secondary" \| "glassmorphic" \| "glass" \| "solid" \| "outline" \| "minimal"` |
| `toastStyle` | `ToastStyle` | derived | `"subtle" \| "solid" \| "outline" \| "glassmorphic" \| "glass" \| "minimal"` |
| `styleVariant` | `ToastStyle` | — | Alias for `toastStyle` (lower precedence). |
| `size` | `ToastSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Size. |
| `duration` | `number` | `4000` (`0` for loading) | Auto-hide in ms; `0` means persistent. Shows a progress bar when > 0. |
| `autoHideDuration` | `number` | — | Alias for `duration` (takes precedence). |
| `dismissible` | `boolean` | `true` | Show the close button. |
| `actions` | `React.ReactNode` | — | Action buttons area. |
| `onDismiss` | `() => void` | — | Called when the toast is dismissed. |
| `icon` | `React.ReactNode` | variant icon | Custom icon. |
| `className` | `string` | — | Class on the toast. |
| `containerProps` | `React.HTMLAttributes<HTMLDivElement>` | — | Spread onto the toast root. |

```tsx
// app root
<ToasterProvider position="top-right">
  <App />
</ToasterProvider>

// any descendant
function SaveButton() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => {
        toast.success("Saved", { description: "Your changes are live." });
        toast.promise(uploadFile(), {
          loading: "Uploading...",
          success: (data) => `Uploaded ${data.id}`,
          error: (err) => `Upload failed: ${err.message}`,
        });
      }}
    >
      Save
    </Button>
  );
}
```

Notes:
- The toast stack is portaled to `document.body` after mount.
- A "Clear All (n)" button appears when more than one toast is showing.
- Toasts have `role="alert"`.

---

## Banner

Inline alert or notice strip with a variant icon, title/description, an optional action, and an animated dismiss.
Import: `import { Banner, type BannerProps, type BannerVariant, type BannerStyle, type BannerSize } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `BannerVariant` (`"info" \| "success" \| "warning" \| "danger" \| "neutral"`) | `"info"` | Semantic color and default icon. |
| `bannerStyle` | `BannerStyle` (`"subtle" \| "solid" \| "outline"`) | `"subtle"` | Visual style. |
| `title` | `React.ReactNode` | — | Heading text. |
| `description` | `React.ReactNode` | — | Body text. |
| `size` | `BannerSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Padding and font size. |
| `icon` | `React.ReactNode` | variant icon | Custom leading icon. |
| `button` | `React.ReactNode` | — | Action element on the right. |
| `fullWidth` | `boolean` | `true` | Take the full container width. |
| `dismissible` | `boolean` | `false` | Show a close button. |
| `onDismiss` | `() => void` | — | Called after the dismiss animation (~280 ms). |
| `className` | `string` | `""` | Class on the banner root. |
| `bordered` | `boolean` | `true` | Render a border. |
| `align` | `"center" \| "start"` | `"center"` | Vertical alignment of items. |
| `children` | `React.ReactNode` | — | Used instead of `description` when provided. |

```tsx
<Banner
  variant="warning"
  title="Storage Quota Nearing Limit"
  description="You have used 88% of your available workspace storage."
  button={<Button size="sm">Upgrade</Button>}
  dismissible
/>
```

Notes:
- Dismissal is internal state. Once dismissed, the banner returns `null` and cannot be shown again without remounting it (e.g. change its `key`).
- The banner has `role="alert"`.

---

## ProgressBar

Linear or circular progress indicator with determinate, indeterminate and loading states.
Import: `import { ProgressBar, type ProgressBarProps, type ProgressSize, type ProgressColor } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| `progress` | `number` | `0` | Value 0–100 (clamped). |
| `type` | `"bar" \| "circular"` | `"bar"` | Linear bar or ring. |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Bar height, or ring diameter (40/64/96/128 px). |
| `variant` | `"default" \| "primary" \| "success" \| "warning" \| "danger" \| "info" \| "gradient" \| "indigo" \| "purple"` | `"default"` | Color variant (`default` follows the active role theme). |
| `color` | `string` | — | Custom bar/stroke color. |
| `trackColor` | `string` | — | Custom track color. |
| `loading` | `boolean` | `false` | Loading state. Indeterminate when `progress` is 0; shimmer when `progress` > 0. |
| `indeterminate` | `boolean` | `false` | Force indeterminate animation. |
| `showLabel` | `boolean` | `false` | Show the percentage (same effect as `showValue`). |
| `label` | `string` | — | Label text above the bar; also used as `aria-label`. |
| `showValue` | `boolean` | `false` | Show the percentage value. |
| `className` | `string` | `""` | Container class. |
| `barClassName` | `string` | `""` | Class on the bar/fill. |
| `strokeWidth` | `number` | 4/6/8/10 by size | Ring stroke width (circular only). |

`ProgressSize` and `ProgressColor` are exported aliases of the `size` and `variant` unions.

```tsx
<ProgressBar progress={62} label="Uploading" showValue variant="success" />
<ProgressBar type="circular" size="lg" progress={75} showValue />
<ProgressBar indeterminate label="Processing" />
```

---

## Spinner

Circular loading spinner with an optional text label.
Import: `import { Spinner, type SpinnerProps, type SpinnerSize, type SpinnerColor } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `SpinnerSize` (`"xs" \| "sm" \| "md" \| "lg" \| "xl"`) | `"md"` | Size. |
| `color` | `SpinnerColor` (`"default" \| "role" \| "primary" \| "white" \| "neutral"`) | `"default"` | Color. |
| `label` | `string` | — | Visible label; also the `aria-label` (defaults to `"Loading..."`). |
| `className` | `string` | `""` | Container class. |

```tsx
<Spinner size="sm" label="Loading results..." />
```

---

## Skeleton

Placeholder block shown while content is loading.
Import: `import { Skeleton, type SkeletonProps, type SkeletonVariant, type SkeletonShape, type SkeletonAnimation } from "@galyan/ui";`

It extends `React.HTMLAttributes<HTMLDivElement>`, so any other div attributes (including `style`) are passed through. `ref` is not typed or forwarded.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `SkeletonVariant` (`"text" \| "circular" \| "rectangular"`) | `"text"` | Shape. |
| `width` | `string` | — | CSS width (e.g. `"120px"`, `"100%"`). |
| `height` | `string` | — | CSS height. |
| `className` | `string` | `""` | Extra class. |

```tsx
<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Skeleton variant="circular" width="40px" height="40px" />
  <div style={{ flex: 1 }}>
    <Skeleton width="60%" />
    <Skeleton width="90%" />
  </div>
</div>
<Skeleton variant="rectangular" width="100%" height="160px" />
```

Notes:
- `SkeletonShape` is an alias of `SkeletonVariant`.
- `SkeletonAnimation` (`"wave" | "pulse" | "none"`) is exported as a type only; there is **no** `animation` prop.
- The element renders with `aria-hidden="true"`.

---

## EmptyState (alias `NoData`)

Centered "nothing here" placeholder with an icon, title, description and an optional action.
Import: `import { EmptyState, NoData, type EmptyStateProps } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `React.ReactNode` | `"No data available"` | Heading. |
| `description` | `React.ReactNode` | — | Supporting text. |
| `icon` | `React.ReactNode \| null` | default tray icon | Custom icon. Pass `null` (or any falsy node) to hide it. |
| `action` | `React.ReactNode` | — | Action area (e.g. a Button). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size. |
| `variant` | `"default" \| "subtle" \| "card" \| "dashed" \| "gradient" \| "glass" \| "spotlight"` | `"default"` | Visual style. |
| `className` | `string` | `""` | Extra class. |
| `style` | `React.CSSProperties` | — | Inline styles. |
| `children` | `React.ReactNode` | — | Extra content rendered below the action. |

```tsx
<EmptyState
  size="lg"
  title="No activity recorded yet"
  description="Connect your data source to see analytics in real time."
  action={<Button variant="primary">Connect Data Source</Button>}
/>
```

---

## Chip / ChipsInput

`Chip` is a tag/pill that can be clickable, selectable or removable. `ChipsInput` is a controlled tag-entry field that renders the values as chips.
Import: `import { Chip, ChipsInput, type ChipProps, type ChipsInputProps, type ChipVariant, type ChipSize } from "@galyan/ui";`
(`ChipRadius`, `"none" | "sm" | "md" | "lg" | "full"`, is not re-exported.)

### Chip

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` **(required)** | `React.ReactNode` | — | Label. |
| `variant` | `ChipVariant` (`"solid" \| "soft" \| "outline" \| "success" \| "warning" \| "danger" \| "neutral"`) | `"soft"` | Style/color. |
| `size` | `ChipSize` (`"sm" \| "md" \| "lg"`) | `"md"` | Size. |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "full"` | `"full"` | Corner radius. |
| `removable` | `boolean` | `false` | Show the remove (x) button. |
| `onRemove` | `() => void` | — | Remove handler (the click does not propagate to `onClick`). |
| `clickable` | `boolean` | `false` | Adds `role="button"`, `tabIndex` and Enter/Space handling. |
| `selected` | `boolean` | `false` | Selected styling. |
| `onClick` | `() => void` | — | Click handler. Fires **only** when `clickable` is true. |
| `icon` | `React.ReactNode` | — | Leading icon. |
| `className` | `string` | `""` | Extra class. |

### ChipsInput

| Prop | Type | Default | Description |
|---|---|---|---|
| `values` **(required)** | `string[]` | — | Current tags (controlled). |
| `onChange` **(required)** | `(values: string[]) => void` | — | Receives the new array. |
| `placeholder` | `string` | `"Add a tag..."` | Shown when the input is empty. |
| `disabled` | `boolean` | `false` | Turns off input and removal. |
| `maxItems` | `number` | — | Max tags; the input hides once the limit is reached. |
| `chipVariant` | `ChipVariant` | `"soft"` | Variant of the rendered chips. |
| `chipRadius` | `"none" \| "sm" \| "md" \| "lg" \| "full"` | `"full"` | Radius of the rendered chips. |
| `className` | `string` | `""` | Extra class. |

```tsx
<Chip variant="success" icon={<CheckIcon />}>Active</Chip>
<Chip clickable selected={active} onClick={() => setActive(!active)}>Filter</Chip>
<Chip removable onRemove={() => remove(id)}>react</Chip>

const [tags, setTags] = useState<string[]>(["design", "frontend"]);
<ChipsInput values={tags} onChange={setTags} placeholder="Type and press Enter..." />
```

Notes on ChipsInput:
- Enter or `,` adds a tag, and so does blurring the input.
- Backspace on an empty input removes the last tag.
- Values are trimmed; empty and duplicate values are ignored.

---

## AnimatedNumber

Animated numeric display with four modes (`counter` interpolation, `roller` odometer, `slide`, `flip`) and built-in formatting.
Import: `import { AnimatedNumber, cssEasingMap, type AnimatedNumberProps, type AnimatedNumberVariant, type AnimatedNumberWeight, type AnimatedNumberMode, type AnimatedNumberEasing } from "@galyan/ui";`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` **(required)** | `number` | — | Target value. It animates whenever this changes. |
| `variant` | `AnimatedNumberVariant` (`"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p" \| "span"`) | `"span"` | Typography variant and element. |
| `weight` | `AnimatedNumberWeight` (`"bold" \| "semibold" \| "medium" \| "regular" \| "light"`) | `"regular"` | Font weight. |
| `duration` | `number` | `1000` | Animation duration in ms. |
| `mode` | `AnimatedNumberMode` (`"counter" \| "roller" \| "slide" \| "flip"`) | `"counter"` | Animation style. |
| `easing` | `AnimatedNumberEasing` (`"easeOutExpo" \| "easeOutQuart" \| "easeOut" \| "easeInOut" \| "spring" \| "bounce" \| "linear"`) | `"easeOutExpo"` | Easing curve. |
| `initialValue` | `number` | — | Starting value (otherwise `0` if `animateOnMount` is true, else `value`). |
| `animateOnMount` | `boolean` | `true` | Animate from the start value on first render. |
| `format` | `(n: number) => string` | — | Custom formatter. Overrides `decimals` and `separator`. |
| `className` | `string` | `""` | Extra class. |
| `prefix` | `string` | `""` | Text before the number (e.g. `"$"`). |
| `suffix` | `string` | `""` | Text after the number (e.g. `"%"`). |
| `decimals` | `number` | `0` | Fixed decimal places. |
| `separator` | `string` | `","` | Thousands separator. |
| `onComplete` | `() => void` | — | Called when the animation ends (**counter mode only**). |
| `revolutions` | `number` | `2` | Full 0–9 spins per digit (roller mode). |
| `stagger` | `number` | `35` | Per-digit delay in ms (roller/slide/flip; capped at 300–350 ms). |
| `staggerDirection` | `"right-to-left" \| "left-to-right"` | `"right-to-left"` | Direction of the stagger cascade. |
| `showGradientMask` | `boolean` | `true` | Top/bottom fade (roller/slide). |
| `timingFunction` | `string` | from `cssEasingMap[easing]` | CSS timing function override (roller/slide/flip). |
| `pulseOnUpdate` | `boolean` | `false` | Scale pulse on value change (counter mode). |
| `color` | `string` | — | CSS text color. |
| `style` | `React.CSSProperties` | — | Inline styles. |

`cssEasingMap: Record<AnimatedNumberEasing, string>` is the map from easing names to the `cubic-bezier(...)` strings used by the CSS-driven modes.

```tsx
const [val, setVal] = useState(12450);

<AnimatedNumber value={val} prefix="$" mode="roller" variant="h3" weight="bold" />
<AnimatedNumber value={98.6} decimals={1} suffix="%" easing="spring" pulseOnUpdate />
```
