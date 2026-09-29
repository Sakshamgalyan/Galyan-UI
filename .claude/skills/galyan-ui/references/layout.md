# Layout, Navigation & Data Display Components

Containers, disclosure, navigation, lists, tables and text primitives from `@galyan/ui`. None of these components forward refs except `ListItem`. Only `CardHeader`/`CardBody`/`CardFooter`/`CardInfo`, `ListItem`, `ListItemGroup` and `Typography` pass native HTML attributes through. Every other component accepts only the props listed here.

---

## Card

A container that groups related content, with variants, shadow, hover effects and a skeleton loading state.
Import: `import { Card, CardHeader, CardBody, CardFooter, CardInfo, type CardProps, type CardVariant, type CardPadding, type CardShadow, type CardHoverEffect, type CardRadius, type CardHeaderProps, type CardBodyProps, type CardFooterProps, type CardInfoProps } from "@galyan/ui";`

`Card` does not extend native attributes and does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"default" \| "elevated" \| "outlined" \| "filled" \| "glassmorphic" \| "glass"` | `"default"` | Visual style |
| padding | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Preset padding |
| shadow | `"none" \| "sm" \| "md" \| "lg"` | `"sm"` | Shadow depth |
| hoverEffect | `"none" \| "lift" \| "glow" \| "border"` | `"none"` | Hover animation |
| bgColor | `string` | — | Inline background color |
| customPadding | `string` | — | Inline CSS padding (overrides `padding`) |
| border | `boolean` | `true` | Show border |
| radius | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"lg"` | Corner radius |
| className | `string` | `""` | Extra class |
| isLoading | `boolean` | `false` | Render skeleton instead of children |
| skeletonLines | `number` | `3` | Number of skeleton lines when loading |
| skeletonContent | `ReactNode` | — | Custom skeleton to show while loading |
| children | `ReactNode` | — | Content |
| onClick | `(e: MouseEvent<HTMLDivElement>) => void` | — | Makes the card clickable (adds `role="button"` and `tabIndex=0`) |
| style | `CSSProperties` | — | Inline style (merged last) |

**Sub-components:**
- `CardHeader`, `CardBody` and `CardFooter` take `HTMLAttributes<HTMLDivElement>` plus `children`. They are layout slots.
- `CardInfo` is a stat/KPI tile. It extends `HTMLAttributes<HTMLDivElement>`.

| CardInfo Prop | Type | Default | Description |
|---|---|---|---|
| title **(required)** | `string` | — | Label |
| value **(required)** | `string \| number` | — | Main value |
| icon | `ReactNode` | — | Icon at top-right |
| trend | `{ value: number; label?: string }` | — | Shows ↑ when `value >= 0`, otherwise ↓, followed by `abs(value)%` and the label |
| footer | `string` | — | Footer text |
| className | `string` | `""` | Extra class |

```tsx
<Card variant="elevated" hoverEffect="lift">
  <CardHeader><Typography variant="h4">Project</Typography></CardHeader>
  <CardBody><Typography>Details go here.</Typography></CardBody>
  <CardFooter><Button>Open</Button></CardFooter>
</Card>

<Card><CardInfo title="Revenue" value="$12,400" trend={{ value: 8.2, label: "vs last month" }} /></Card>
```

Notes:
- While `isLoading` is true, `onClick` is not attached.
- `CardInfo` is not a card on its own. It renders only a div, so wrap it in `Card` if you want card styling.

---

## Accordion

A collapsible panel. You can use it as a single panel (`title` + `children`) or as a group driven by `items`.
Import: `import { Accordion, type AccordionItemData, type AccordionProps, type AccordionSize, type AccordionVariant, type ExpandIconPosition } from "@galyan/ui";`

It does not extend native attributes and does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| variant | `"default" \| "bordered" \| "flush" \| "separated" \| "filled" \| "glassmorphic" \| "glass"` | `"default"` | Visual style |
| disabled | `boolean` | `false` | Disable toggling (in group mode, disables every item) |
| defaultExpanded | `boolean` | `false` | Initial state in single mode (uncontrolled) |
| expanded | `boolean` | — | Controlled state in single mode |
| onChange | `(expanded: boolean) => void` | — | Single-mode toggle callback |
| unmountOnExit | `boolean` | `false` | Unmount the panel content while collapsed |
| expandIconPosition | `"left" \| "right" \| "start" \| "end"` | `"right"` | Chevron side |
| expandIcon | `ReactNode \| ((expanded: boolean) => ReactNode)` | chevron | Custom expand icon |
| rotateIcon | `boolean` | `true` unless `expandIcon` is a function | Rotate the icon when open |
| icon | `ReactNode` | — | Leading icon in the header |
| actions | `ReactNode` | — | Header actions (clicks do not toggle the panel) |
| title | `ReactNode` | — | Header title |
| subtitle | `ReactNode` | — | Secondary header text |
| description | `ReactNode` | — | Fallback used when `subtitle` is not set |
| children | `ReactNode` | — | Panel content (single mode) |
| className | `string` | `""` | Extra class |
| items | `AccordionItemData[]` | — | Group mode: renders one accordion per item |
| allowMultiple | `boolean` | `true` | Group mode: allow several items open at once |
| defaultExpandedIds | `string[]` | — | Group mode: initially open ids (uncontrolled) |
| expandedIds | `string[]` | — | Group mode: controlled open ids |
| onExpandedChange | `(expandedIds: string[]) => void` | — | Group mode: callback with the new open ids |

**AccordionItemData**

| Field | Type | Description |
|---|---|---|
| id **(required)** | `string` | Unique id |
| title **(required)** | `ReactNode` | Header title |
| content **(required)** | `ReactNode` | Panel body |
| subtitle / description | `ReactNode` | Secondary text |
| icon | `ReactNode` | Leading icon |
| actions | `ReactNode` | Header actions |
| disabled | `boolean` | Disable this item |
| defaultExpanded | `boolean` | Initially open (used only when `defaultExpandedIds` is not given) |
| expanded | `boolean` | Forces this item's open state (overrides group state) |
| expandIconPosition | `ExpandIconPosition` | Per-item override |
| expandIcon | `ReactNode \| ((expanded: boolean) => ReactNode)` | Per-item override |
| rotateIcon | `boolean` | Per-item override |

```tsx
<Accordion title="Shipping" subtitle="3-5 business days">
  <Typography>We ship worldwide.</Typography>
</Accordion>

<Accordion
  variant="separated"
  allowMultiple={false}
  items={[
    { id: "a", title: "What is Galyan?", content: "A React UI kit." },
    { id: "b", title: "Is it free?", content: "Yes.", defaultExpanded: true },
  ]}
/>
```

Notes:
- The component runs in group mode when `items` is a non-empty array. In group mode, `title`, `children`, `expanded` and `onChange` are ignored.
- Single mode is controlled when `expanded` is set. Group mode is controlled when `expandedIds` is set.

---

## Tabs

A tab bar that renders the content of the active tab.
Import: `import { Tabs, type TabsProps, type TabItem, type TabVariant, type TabSize } from "@galyan/ui";`

It does not extend native attributes and does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| items **(required)** | `TabItem[]` | — | Tab definitions |
| variant | `"classic" \| "button" \| "card" \| "outline" \| "ghost" \| "merged"` | `"classic"` | Visual style |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| activeTab | `string` | — | Controlled active id |
| defaultTab | `string` | first item id | Initial active id (uncontrolled) |
| onTabChange | `(id: string) => void` | — | Selection callback |
| onChange | `(id: string) => void` | — | **Deprecated.** Use `onTabChange` |
| fullWidth | `boolean` | `false` | Stretch triggers to full width |
| disabled | `boolean` | `false` | Disable all tabs |
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Layout |
| className | `string` | `""` | Extra class |

**TabItem**

| Field | Type | Description |
|---|---|---|
| id **(required)** | `string` | Unique id |
| label **(required)** | `ReactNode` | Trigger label |
| content | `ReactNode` | Panel content (omit it to use the tabs as a plain switcher) |
| disabled | `boolean` | Disable this tab |
| badge | `string \| number` | Badge after the label |
| icon | `ReactNode` | Icon before the label |

```tsx
const [tab, setTab] = useState("overview");
<Tabs
  variant="button"
  activeTab={tab}
  onTabChange={setTab}
  items={[
    { id: "overview", label: "Overview", content: <Overview /> },
    { id: "billing", label: "Billing", badge: 2, content: <Billing /> },
  ]}
/>
```

---

## StepTab

A vertical timeline of clickable step cards. The active card expands to show its description, details and content.
Import: `import { StepTab, type StepTabProps, type StepTabItem, type StepTabSize } from "@galyan/ui";`

It does not extend native attributes and does not forward a ref. `StepTabVariant` and `StepTabItemDetail` are not exported from the package.

| Prop | Type | Default | Description |
|---|---|---|---|
| items **(required)** | `StepTabItem[]` | — | Timeline entries |
| activeId | `string` | — | Controlled active id |
| defaultActiveId | `string` | first item id | Initial active id (uncontrolled) |
| onStepChange | `(id: string) => void` | — | Selection callback |
| header | `ReactNode` | — | Content above the timeline |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| variant | `"default" \| "glassmorphic" \| "glass"` | `"default"` | Visual style |
| className | `string` | `""` | Extra class |

**StepTabItem**

| Field | Type | Description |
|---|---|---|
| id **(required)** | `string` | Unique id |
| title **(required)** | `string` | Card title |
| timestamp | `string` | Time label |
| details | `{ label: string; value: ReactNode }[]` | Key/value rows (shown only when the card is active) |
| description | `ReactNode` | Shown only when the card is active |
| content | `ReactNode` | Extra content (shown only when the card is active) |
| status | `"completed" \| "active" \| "upcoming" \| "error"` | Declared in the type but not used for rendering |

```tsx
<StepTab
  header={<Typography variant="h5">Order history</Typography>}
  items={[
    { id: "1", title: "Order placed", timestamp: "Jan 2, 10:00", details: [{ label: "Order", value: "#1234" }] },
    { id: "2", title: "Shipped", timestamp: "Jan 3, 14:20", description: "Left the warehouse." },
  ]}
/>
```

---

## Stepper

A horizontal or vertical progress indicator. Steps before the current one render as completed with a check mark, and the current step's `content` is shown below the track.
Import: `import { Stepper, type StepperProps, type Step, type StepStatus, type StepperSize } from "@galyan/ui";`

It does not extend native attributes and does not forward a ref. `StepperVariant` is not exported from the package.

| Prop | Type | Default | Description |
|---|---|---|---|
| steps **(required)** | `Step[]` | — | Step definitions |
| activeStep | `number` | — | Controlled current index (0-based) |
| defaultStep | `number` | `0` | Initial index (uncontrolled) |
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` | Layout |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| variant | `"default" \| "glassmorphic" \| "glass"` | `"default"` | Visual style |
| onStepClick | `(index: number) => void` | — | Fired when an indicator is clicked |
| onStepChange | `(index: number) => void` | — | Fired when an indicator is clicked |
| onComplete | `() => void` | — | Declared but never called by the component |
| className | `string` | `""` | Extra class |

**Step**

| Field | Type | Description |
|---|---|---|
| id **(required)** | `string` | Unique id |
| label **(required)** | `string` | Step label |
| description | `string` | Sub-label |
| icon | `ReactNode` | Replaces the step number (not shown once the step is completed) |
| content | `ReactNode` | Panel shown while this step is active |
| optional | `boolean` | Shows "Optional" when there is no `description` |

`StepStatus` is `"upcoming" | "active" | "completed" | "error"`. Status is derived from the index, so `"error"` is never applied.

```tsx
const [step, setStep] = useState(0);
<Stepper
  steps={[
    { id: "acct", label: "Account", content: <AccountForm /> },
    { id: "pay", label: "Payment", optional: true, content: <PaymentForm /> },
    { id: "done", label: "Confirm", content: <Review /> },
  ]}
  activeStep={step}
  onStepChange={setStep}
/>
<Button onClick={() => setStep((s) => Math.min(s + 1, 2))}>Next</Button>
```

Notes:
- The component has no built-in Next/Back buttons. Drive `activeStep` yourself.
- Clicking any indicator jumps to that step. It is not linear.

---

## Breadcrumb

A navigation trail with an optional back button and optional collapsing.
Import: `import { Breadcrumb, type BreadcrumbProps, type BreadcrumbItemDef, type BreadcrumbItem, type BreadcrumbSize, type BreadcrumbVariant } from "@galyan/ui";` (`BreadcrumbItem` is an alias of `BreadcrumbItemDef`.)

It does not extend native attributes and does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| items **(required)** | `BreadcrumbItemDef[]` | — | Trail. The last item renders as the current page (not a link) |
| separator | `ReactNode` | `/` | Separator between items |
| onItemClick | `(item: BreadcrumbItemDef, index: number) => void` | — | Click callback |
| showBackButton | `boolean` | `false` | Show a back-arrow button first |
| backButtonLabel | `string` | — | Visible label and aria-label for the back button (aria-label falls back to "Go back") |
| onBackClick | `() => void` | — | Back button handler |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| variant | `"default" \| "subtle" \| "ghost"` | `"default"` | Visual style |
| maxItems | `number` | — | Collapse to first / ••• / last when `items.length > maxItems + 1`. Clicking ••• expands the trail |
| className | `string` | `""` | Extra class |

**BreadcrumbItemDef**

| Field | Type | Description |
|---|---|---|
| id | `string` | Key (falls back to the index) |
| label **(required)** | `ReactNode` | Text |
| href | `string` | Link target. Without it, the default click action is prevented, so use `onItemClick` |
| icon | `ReactNode` | Leading icon |
| disabled | `boolean` | Non-interactive link |

```tsx
<Breadcrumb
  showBackButton
  onBackClick={() => history.back()}
  items={[
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Profile" },
  ]}
/>
```

---

## Sidebar

An app navigation sidebar with collapse, responsive mobile drawer, nested items, groups and role color schemes. You can drive it with `items` or compose it from sub-components.
Import: `import { Sidebar, SidebarHeader, SidebarLogo, SidebarText, SidebarDivider, SidebarBody, SidebarFooter, SidebarGroup, SidebarItem, useSidebar, type SidebarProps, type SidebarPosition, type SidebarVariant, type SidebarActiveVariant, type SidebarItemData, type SidebarRolePreset, type SidebarCustomColorScheme, type SidebarColorScheme } from "@galyan/ui";`

It renders an `<aside>`. It does not extend native attributes and does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| collapsed | `boolean` | — | Controlled collapsed state |
| defaultCollapsed | `boolean` | `false` | Initial state (uncontrolled) |
| onCollapseChange | `(collapsed: boolean) => void` | — | Fired by the toggle button or the mobile backdrop |
| collapsible | `boolean` | `true` | Show the collapse toggle button |
| position | `"left" \| "right"` | `"left"` | Side |
| variant | `"default" \| "floating" \| "bordered" \| "compact" \| "glass" \| "glassmorphic" \| "dark"` | `"default"` | Visual style |
| activeVariant | `"pill" \| "line" \| "subtle" \| "glow"` | `"pill"` | Active-item style |
| accentColor | `string` | — | Accent color (ignored when `colorScheme` is set) |
| colorScheme | `SidebarRolePreset \| SidebarCustomColorScheme` | — | Role preset or custom colors |
| width | `string \| number` | `260` | Expanded width (numbers are px) |
| collapsedWidth | `string \| number` | `70` | Collapsed width |
| header | `ReactNode` | — | Header slot |
| footer | `ReactNode` | — | Footer slot |
| items | `SidebarItemData[]` | — | Navigation items |
| activeItemId | `string` | — | Active item id |
| onItemClick | `(id: string) => void` | — | Item click callback |
| responsive | `boolean` | `true` | Auto-collapse and become a drawer overlay below `breakpoint` |
| breakpoint | `number` | `768` | Mobile breakpoint in px |
| showBackdropOnMobile | `boolean` | `true` | Backdrop behind the open mobile drawer |
| children | `ReactNode` | — | Custom content, rendered in the body before `items` |
| className | `string` | `""` | Extra class |
| style | `CSSProperties` | — | Inline style |

**SidebarItemData**

| Field | Type | Description |
|---|---|---|
| id **(required)** | `string` | Unique id |
| label **(required)** | `ReactNode` | Text (shown as a tooltip when collapsed) |
| icon | `ReactNode` | Icon (always visible) |
| badge | `ReactNode` | Badge (shown as a dot when collapsed) |
| badgeColor | `"primary" \| "danger" \| "success" \| "warning" \| "neutral"` | Default `"danger"` |
| disabled | `boolean` | Disable the item |
| divider | `boolean` | Render a divider instead of an item |
| group | `string` | Group title. Items with the same group are grouped together in insertion order |
| children | `SidebarItemData[]` | Nested items (expandable) |
| defaultExpanded | `boolean` | Initially expand the nested items |
| onClick | `() => void` | Per-item click handler |

**SidebarRolePreset:** `"admin" | "editor" | "viewer" | "moderator" | "owner" | "support" | "guest"`

**SidebarCustomColorScheme:** `{ primary: string; surfaceLight?: string; surfaceDark?: string; textLight?: string; textDark?: string; border?: string }`

**Sub-components** (for custom composition inside `<Sidebar>` as `children`):
- `SidebarHeader`, `SidebarLogo`, `SidebarText`, `SidebarBody` and `SidebarFooter` take `{ children (required), className? }`.
- `SidebarDivider` takes `{ className? }`.
- `SidebarGroup` takes `{ title?, children (required), className? }`. It hides the title when the sidebar is collapsed.
- `SidebarItem` takes `{ id (required), label (required), icon?, badge?, badgeColor? = "danger", disabled? = false, active?, onClick?, className? }`. It reads `activeItemId` and `onItemClick` from the Sidebar context. `active` overrides that selection.
- `useSidebar()` returns `{ isCollapsed, position, variant, activeVariant, accentColor?, activeItemId?, onItemClick? }`.

```tsx
const [active, setActive] = useState("dashboard");
<div style={{ display: "flex", height: "100vh" }}>
  <Sidebar
    header={<SidebarLogo>Acme</SidebarLogo>}
    activeItemId={active}
    onItemClick={setActive}
    colorScheme="admin"
    items={[
      { id: "dashboard", label: "Dashboard", icon: <HomeIcon /> },
      { id: "users", label: "Users", group: "Manage", badge: 3 },
      { id: "reports", label: "Reports", group: "Manage", children: [
        { id: "sales", label: "Sales" }, { id: "traffic", label: "Traffic" },
      ] },
    ]}
  />
  <main style={{ flex: 1 }}>...</main>
</div>
```

Notes:
- When `collapsed` is controlled, update it from `onCollapseChange`.
- When uncontrolled, the sidebar auto-collapses once the viewport is at or below `breakpoint`.
- A parent item with children shows as active when one of its children is the `activeItemId`.

---

## Menu

A vertical or horizontal navigation menu with nested, expandable items. The `menu` module also re-exports `Tooltip`.
Import: `import { Menu, Tooltip, type MenuProps, type MenuItem, type MenuSize, type MenuVariant, type TooltipProps, type TooltipPosition } from "@galyan/ui";` (`Tooltip` is the same component exported from the tooltip module and is documented there.)

It renders a `<nav>`. It does not extend native attributes and does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| items | `MenuItem[]` | `[]` | Menu entries |
| orientation | `"vertical" \| "horizontal"` | `"vertical"` | Layout. In horizontal mode, one submenu opens at a time and an outside click closes it |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| variant | `"default" \| "bordered" \| "minimal" \| "glassmorphic" \| "glass"` | `"bordered"` | Visual style |
| onItemClick | `(id: string) => void` | — | Click callback (also fires for parent items) |
| activeItemId | `string` | — | Highlighted item id |
| collapsible | `boolean` | `true` | Allow parents to toggle their children (shows a chevron) |
| defaultCollapsed | `boolean` | `false` | When false, all top-level parents start expanded (vertical only) |
| activeMenuItemColor | `string` | — | Background color of the active item |
| maxHeight | `string` | — | Max height with vertical scrolling |
| children | `ReactNode` | — | Header content rendered above the list |
| readOnly | `boolean` | `false` | Ignore all clicks |
| className | `string` | `""` | Extra class |

**MenuItem**

| Field | Type | Description |
|---|---|---|
| id **(required)** | `string` | Unique id |
| label **(required)** | `ReactNode` | Text |
| icon | `ReactNode` | Leading icon |
| badge | `ReactNode` | Trailing badge |
| disabled | `boolean` | Disable the item |
| divider | `boolean` | Render a divider instead of an item |
| children | `MenuItem[]` | Nested items |

```tsx
const [active, setActive] = useState("inbox");
<Menu
  activeItemId={active}
  onItemClick={setActive}
  items={[
    { id: "inbox", label: "Inbox", badge: 4 },
    { id: "d1", label: "", divider: true },
    { id: "folders", label: "Folders", children: [
      { id: "work", label: "Work" }, { id: "personal", label: "Personal" },
    ] },
  ]}
/>
```

---

## ListItemGroup / ListItem

A selectable list with single or multiple selection. You can pass it `items` data or compose it from `ListItem` children.
Import: `import { ListItemGroup, ListItem, type ListItemGroupProps, type ListItemProps, type ListItemData, type ListItemSelectedVariant, type ListItemGroupSize } from "@galyan/ui";`

**ListItemGroup** extends `HTMLAttributes<HTMLDivElement>` (except `onChange` and `defaultValue`). It does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| items | `ListItemData[]` | — | Data-driven items (when set, `children` is ignored) |
| value | `string \| number \| (string \| number)[]` | — | Controlled selection (an array when `multiple`) |
| defaultValue | `string \| number \| (string \| number)[]` | — | Initial selection (uncontrolled) |
| onChange | `(value: any, item?: ListItemData) => void` | — | Selection callback |
| multiple | `boolean` | `false` | Toggle multiple values |
| selectedVariant | `"accent-bar" \| "subtle" \| "pill" \| "outline"` | `"accent-bar"` | Selected style |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| accentColor | `string` | — | Accent color |
| bordered | `boolean` | `true` | Container border |
| width | `string \| number` | — | Container width (numbers are px) |
| className | `string` | `""` | Extra class |
| children | `ReactNode` | — | `ListItem` elements |

**ListItem** extends `HTMLAttributes<HTMLDivElement>` and **forwards its ref** to a div.

| Prop | Type | Default | Description |
|---|---|---|---|
| value | `string \| number` | — | Selection value (needed for group selection) |
| label | `ReactNode` | — | Text (`children` takes precedence) |
| description | `ReactNode` | — | Secondary text |
| icon | `ReactNode` | — | Leading icon |
| suffix | `ReactNode` | — | Trailing text |
| hasDot | `boolean` | `false` | Trailing status dot |
| dotColor | `string` | — | Dot color |
| badge | `ReactNode` | — | Trailing badge |
| disabled | `boolean` | `false` | Disable the item |
| selected | `boolean` | — | Force the selected state (overrides the group) |
| selectedVariant | `ListItemSelectedVariant` | from group, else `"accent-bar"` | Selected style |
| accentColor | `string` | from group | Accent color |
| size | `ListItemGroupSize` | from group, else `"md"` | Size |
| children | `ReactNode` | — | Label content |

**ListItemData:** `{ id: string | number (required); label: ReactNode (required); description?; icon?; suffix?; hasDot?: boolean; dotColor?: string; badge?; disabled?: boolean; color?: string (per-item accent); onClick?: () => void; [key: string]: any }`. The `id` becomes the item's value.

```tsx
const [sel, setSel] = useState<string | number>("all");
<ListItemGroup value={sel} onChange={setSel} width={280}>
  <ListItem value="all" label="All mail" badge="12" />
  <ListItem value="starred" label="Starred" description="Important threads" />
  <ListItem value="spam" label="Spam" hasDot dotColor="#ef4444" disabled />
</ListItemGroup>
```

Notes: `onChange`'s second argument (`item`) is currently always `undefined`, both with `items` and with children. Look up the item by value yourself.

---

## Table

A generic data table with sorting, row selection, pagination, sticky and fixed columns, nested tree rows, a loading skeleton, an empty state and responsive modes.
Import: `import { Table, type TableProps, type Column, type SortDirection } from "@galyan/ui";`

It is generic (`Table<T>`). It does not extend native attributes and does not forward a ref. `TablePaginationConfig` and `TableResponsiveMode` are not exported from the package.

| Prop | Type | Default | Description |
|---|---|---|---|
| columns **(required)** | `Column<T>[]` | — | Column definitions |
| data **(required)** | `T[]` | `[]` | Rows |
| rowKey | `(row: T) => string` | `row.id`, else the index | Row key (used for selection and expansion) |
| variant | `"default" \| "striped" \| "simple" \| "primary" \| "secondary"` | `"default"` | Visual style |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Density |
| hoverable | `boolean` | `true` | Row hover highlight |
| showHeader | `boolean` | `true` | Render the header row |
| sortable | `boolean` | `true` | Master switch for sorting |
| emptyState | `ReactNode` | — | Custom empty content |
| emptyStateLabel | `string` | `"No data available"` | Default empty title |
| emptyStateMessage | `string` | — | Default empty description |
| emptyStateIcon | `ReactNode` | — | Default empty icon |
| noBorder | `boolean` | `false` | Remove the outer border |
| sortConfig | `{ key: string; direction: SortDirection } \| null` | — | Controlled sort (switches sorting to controlled mode) |
| onSort | `(key: string, direction: SortDirection) => void` | — | Called in controlled sort mode |
| fixedLeftmost | `boolean` | `false` | Stick the first column (and the checkbox column) to the left |
| fixedRightmost | `boolean` | `false` | Stick the last column to the right |
| isRowSelection | `boolean` | `false` | Show a checkbox column |
| selectable | `boolean` | `false` | Alias of `isRowSelection` (kept for backwards compatibility) |
| selectedRows | `string[]` | `[]` | Selected row keys (always controlled) |
| onRowSelect | `(keys: string[]) => void` | — | Selection callback |
| onSelectionChange | `(keys: string[]) => void` | — | Alias of `onRowSelect` (kept for backwards compatibility) |
| onRowClick | `(row: T, event: MouseEvent) => void` | — | Row click (also Enter/Space) |
| pagination | `boolean \| { currentPage: number; totalPages: number; totalItems?: number; itemsPerPage?: number }` | `false` | `true` paginates the rows locally. An object gives controlled (server-side) pagination |
| onPageChange | `(page: number) => void` | — | Called only for controlled (object) pagination |
| nestedChildrenAccessor | `keyof T \| ((row: T) => T[] \| undefined)` | — | Enables expandable child rows |
| nestedDefaultExpanded | `boolean` | `false` | Expand nested rows initially |
| treeLines | `boolean` | `true` | Draw tree connector lines for nested rows |
| treeLineColor | `string` | — | Tree line color |
| isLoading | `boolean` | `false` | Show skeleton rows |
| skeletonRows | `number` | `5` | Number of skeleton rows |
| skeletonContent | `ReactNode` | — | Custom loading content |
| showPaginationSkeleton | `boolean` | `true` | Skeleton pagination bar while loading |
| paginationDisabled | `boolean` | `false` | Disable the pagination buttons |
| headerAlign | `"left" \| "center" \| "right"` | `"left"` | Default header alignment |
| ellipsis | `boolean` | `true` | Truncate text cells |
| showTooltip | `boolean` | `true` | Tooltip on truncated text cells |
| paginationVariant | `"numbers" \| "compact"` | `"compact"` | Page numbers, or a "Page X of Y" bar |
| pageSize | `number` | `10` | Rows per page for local pagination |
| stickyHeader | `boolean` | `false` | Sticky header row |
| responsive | `"scroll" \| "stack" \| "cards" \| boolean` | `"scroll"` | `"scroll"`/`true` scrolls horizontally, `"stack"`/`"cards"` shows cards at ≤640px, `false` turns it off |
| ariaLabel | `string` | — | Accessible label |
| rounded | `boolean \| "none" \| "sm" \| "md" \| "lg" \| "xl"` | `"xl"` | Corner rounding (`false` or `"none"` means square) |
| borderRadius | `string \| number` | — | Custom radius |
| style | `CSSProperties` | — | Wrapper style |
| className | `string` | `""` | Extra class |

**Column\<T\>**

| Field | Type | Description |
|---|---|---|
| key **(required)** | `string` | Unique key (also used as the sort key) |
| header **(required)** | `ReactNode` | Header content |
| accessor **(required)** | `(row: T) => ReactNode` | Cell renderer. It is also the value sorted on (numbers sort numerically, everything else as strings) |
| sortable | `boolean` | Set `false` to disable sorting for this column. Columns are sortable by default when the table is `sortable` |
| width | `string` | Column width (px/rem, used to compute fixed-column offsets) |
| maxWidth | `string` | Max width |
| align | `"left" \| "center" \| "right"` | Cell alignment |
| headerAlign | `"left" \| "center" \| "right"` | Header alignment override |
| ellipsis | `boolean` | Per-column truncation override |
| showTooltip | `boolean` | Per-column tooltip override |
| fixed | `"left" \| "right" \| boolean` | Sticky column (`true` means `"left"`) |

`SortDirection` is `"asc" | "desc"`.

```tsx
interface User { id: string; name: string; role: string; revenue: number }
const columns: Column<User>[] = [
  { key: "name", header: "Name", accessor: (r) => r.name, fixed: "left", width: "180px" },
  { key: "role", header: "Role", accessor: (r) => r.role },
  { key: "revenue", header: "Revenue", accessor: (r) => r.revenue, align: "right" },
];
const [selected, setSelected] = useState<string[]>([]);
<Table
  columns={columns}
  data={users}
  isRowSelection
  selectedRows={selected}
  onRowSelect={setSelected}
  pagination
  pageSize={5}
/>
```

Notes:
- Sorting is uncontrolled unless `sortConfig` is passed. In that case, handle `onSort` and update `sortConfig` yourself. The table still sorts `data` locally by that key, so for server-side sorting, pass `data` that is already sorted.
- Pagination is local with `pagination={true}`, and `onPageChange` is not called in that mode. With an object, you slice the data and handle `onPageChange`.
- Selection is always controlled. Without `onRowSelect` updating `selectedRows`, the checkboxes will not change.
- If an accessor returns JSX, its sort value is `String(jsx)` and it gets no ellipsis tooltip. Only string and number cells get the tooltip.

---

## Typography

A text primitive with semantic variants, weights, alignment and spacing.
Import: `import { Typography, type TypographyProps, type TypographyVariant, type TypographyWeight, type TypographyAlign, type TypographyMargin } from "@galyan/ui";` (`TypographyPadding` is not exported from the package. Its values are the same as `TypographyMargin`.)

It extends `HTMLAttributes<HTMLElement>` (rest props are spread onto the tag). It does not forward a ref.

| Prop | Type | Default | Description |
|---|---|---|---|
| variant | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p" \| "span" \| "label" \| "small"` | `"p"` | Style and default tag |
| weight | `"light" \| "normal" \| "medium" \| "semibold" \| "bold" \| "extrabold"` | — | Font weight |
| align | `"left" \| "center" \| "right" \| "justify"` | — | Text alignment |
| margin | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"none"` | Margin preset |
| padding | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"none"` | Padding preset |
| textColor | `string` | — | Inline text color |
| bgColor | `string` | — | Inline background color |
| className | `string` | `""` | Extra class |
| children | `ReactNode` | — | Content |
| as | `ElementType` | tag matching `variant` | Override the rendered element (the variant styling is kept) |
| htmlFor | `string` | — | For `label` usage |

```tsx
<Typography variant="h2" weight="bold" margin="sm">Dashboard</Typography>
<Typography variant="small" textColor="var(--gy-text-muted)">Updated 2m ago</Typography>
<Typography variant="h3" as="div">Styled like h3, rendered as div</Typography>
<Typography variant="label" htmlFor="email">Email</Typography>
```
