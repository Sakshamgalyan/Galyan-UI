# Chart Components

All chart components are exported from `@galyan/ui` (import the stylesheet once: `import "@galyan/ui/styles.css";`). Most are built on **recharts** (`ResponsiveContainer` inside a sized wrapper `div`); a few are pure CSS/SVG (`CorrelationChart`, `TriangularChart`, `HeatmapChart`, `BarChart`), and `ChoroplethMap` uses pre-projected d3-geo / world-atlas SVG paths.

**Colors come from theme CSS variables.** Defaults are `var(--gy-primary)`, `--gy-success`, `--gy-warning`, `--gy-danger`, `--gy-info`, then `#8b5cf6`, `#ec4899` (multi-series palette, cycled by index). Axes use `--gy-border-strong` / `--gy-text-subtle`, grid uses `--gy-border`, tooltips use `--gy-surface` / `--gy-border` / `--gy-radius-lg` / `--gy-shadow-md`. Any `color` prop accepts any CSS color, including `var(--gy-*)`. Up/down semantics (Waterfall, Financial) use `--gy-success` / `--gy-danger`.

Every chart is a client component (`"use client"`). `data`-driven charts render a `Skeleton` when `loading` is true, and most render an `EmptyState` when `data` is empty.

`Chart` is a thin **generic wrapper** (`type="line" | "bar" | ...`) for quick charts; prefer the dedicated component when you need its extra options.

## Shared props / types

These props mean the same thing on every chart that accepts them. Per-chart sections list only which shared props the chart has (with its own default when that differs) plus chart-specific props.

| Prop | Type | Typical default | Description |
|---|---|---|---|
| `height` | `number \| string` | varies per chart (listed per chart) | Wrapper height. Must be set for recharts to size. |
| `width` | `number \| string` | `"100%"` | Wrapper width. (`TriangularChart`: `number`, default `400`.) |
| `loading` | `boolean` | `false` | Show a `Skeleton` placeholder instead of the chart. |
| `className` | `string` | `""` | Extra class on the wrapper div (`gy-<name>chart`). |
| `showGrid` | `boolean` | `true` | Dashed cartesian grid (horizontal lines only on most). |
| `showLegend` | `boolean` | `true` | Show legend. |
| `animate` | `boolean` | `true` | Enable entrance/update animation. |
| `animationDuration` | `number` | varies (ms) | Animation length. |
| `animationEasing` | `"ease" \| "ease-in" \| "ease-out" \| "ease-in-out" \| "linear"` | varies | Easing (GaugeChart also allows `"spring"`; BarChart takes any CSS `string`). |
| `animationBegin` | `number` | `0` | Delay (ms) before animation starts. |
| `responsive` | `boolean` | `true` | Observe container size (ResizeObserver) and switch to a compact layout on small widths. |
| `tooltipConfig` | `{ show?: boolean; formatter?: (value: number) => string }` | `{ show: true }` | Toggle tooltip / format values. Signature differs on Radar, Treemap, Timeline, Choropleth (see those). |
| `tokens` | `Record<string, string>` | — | CSS custom properties spread onto the wrapper `style`, e.g. `{ "--gy-primary": "#0ea5e9" }`. |
| `borderless` | `boolean` | `false` | Remove the card border/background. |
| `truncateCharacterAfter` | `number` | — | Truncate axis/category labels after N chars (adds `...`). |

**Series shape** (`LineChartSeries`, `AreaChartSeries`, `StepChartSeries`, `StackedChartSeries`, `RadarChartSeries`, `ChartSeries` — all identical):

```ts
{ key: string; name?: string; color?: string }
// key  = property on each data row to plot
// name = legend/tooltip label (defaults to key)
// color = defaults to the theme palette by index
```

Series-based charts take **wide rows**: `data: any[]`, one object per x value, with `xAxisKey` naming the category field and one numeric field per series key:

```ts
const data = [
  { month: "Jan", revenue: 4000, cost: 2400 },
  { month: "Feb", revenue: 3000, cost: 1398 },
];
```

---

## Chart

Generic wrapper that renders a line / bar / area / pie / donut chart (recharts) or a world choropleth from one `type` prop. Use for quick, simple charts.

```ts
import { Chart, type ChartProps, type ChartType, type ChartSeries } from "@galyan/ui";
```

Shared: `height` (300), `showGrid`, `showLegend`, `className`, `animate`, `animationDuration` (1200), `animationEasing` (`"ease-in-out"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"line" \| "bar" \| "area" \| "pie" \| "donut" \| "region" \| "choropleth"` | required | Chart kind. `region`/`choropleth` render `<ChoroplethMap variant="world">`. |
| `data` | `any[]` | required | Wide rows (line/bar/area); `{[nameKey], [valueKey], color?}` rows (pie/donut); `MapRegionItem[]` (map). |
| `xAxisKey` | `string` | — | Category field (line/bar/area). |
| `series` | `ChartSeries[]` | `[]` | Series to plot (line/bar/area). |
| `nameKey` | `string` | — | Slice label field (pie/donut). Required for pie/donut. |
| `valueKey` | `string` | — | Slice value field (pie/donut). Required for pie/donut. |
| `selectedRegion` | `string \| null` | — | Map only: controlled selected region. |
| `onRegionClick` | `(region: { id; name; value?; item?: MapRegionItem }) => void` | — | Map only. |
| `colorScale` | `string[]` | — | Map only (see ChoroplethMap). |
| `highlightColor` / `activeColor` / `baseColor` | `string` | — | Map only. |
| `showZoomControls` | `boolean` | `true` | Map only. |

```tsx
<Chart
  type="bar"
  data={[{ month: "Jan", sales: 40 }, { month: "Feb", sales: 55 }]}
  xAxisKey="month"
  series={[{ key: "sales", name: "Sales" }]}
/>
<Chart type="donut" data={[{ label: "A", count: 30 }, { label: "B", count: 70 }]} nameKey="label" valueKey="count" />
```

## BarChart

Custom (non-recharts) bar chart with three visual styles: vertical `cylindrical` / `filled` bars or `horizontal` progress-style rows. Use for ranked categories, shares, and KPI breakdowns.

```ts
import { BarChart, type BarChartProps, type BarChartItem, type BarChartVariant, type BarChartTooltipConfig, type BarValueFormat } from "@galyan/ui";
```

Shared: `height` (no default), `width`, `loading`, `className`, `borderless`, `tokens`, `truncateCharacterAfter`, `tooltipConfig`, `responsive`, `animate`, `animationDuration` (900), `animationEasing` (`string`, default `"cubic-bezier(0.16, 1, 0.3, 1)"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"cylindrical" \| "filled" \| "horizontal"` | required | Visual style. |
| `data` | `BarChartItem[]` | `[]` | `{ label: string; value: number; icon?: ReactNode; color?; fillColor?; trackColor?; displayValue?: string \| number; [key]: any }` |
| `barColor` | `string` | — | Fill for all bars (item `color` / `fillColor` wins). |
| `trackColor` | `string` | — | Background track color. |
| `maxValue` | `number` | max of data | Value that maps to 100% bar length. |
| `maxBars` | `number` | — | Show only the first N items. |
| `backgroundColor` / `textColor` | `string` | — | Container / text colors. |
| `barWidth` / `barSpacing` | `number \| string` | auto | Bar thickness / gap. |
| `showValues` | `boolean` | `true` | Show value labels. |
| `valueFormat` | `"percentage" \| "value" \| "both" \| (value, percentage, item) => string` | `"percentage"` | Label format. Note `"percentage"` prints `${item.value}%` (raw value + `%`); `displayValue` overrides everything. |
| `horizontalAlignment` | `"stacked" \| "inline"` | `"stacked"` | Horizontal variant: label above bar vs. beside it. |
| `skeletonContent` | `ReactNode` | — | Custom loading content. |

```tsx
<BarChart
  variant="cylindrical"
  height={280}
  maxValue={100}
  data={[
    { label: "Card", value: 62 },
    { label: "UPI", value: 28 },
    { label: "Wallet", value: 10 },
  ]}
/>
```

## LineChart

Multi-series line chart. Use for trends over time/categories.

```ts
import { LineChart, type LineChartProps, type LineChartSeries } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `showLegend`, `loading`, `className`, `animate`, `animationDuration` (1200), `animationEasing` (`"ease-in-out"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | `[]` | Wide rows (see Shared). |
| `series` | `LineChartSeries[]` | required | Lines to draw. |
| `xAxisKey` | `string` | required | Category field. |
| `variant` | `"monotone" \| "straight" \| "stepped"` | `"monotone"` | Curve type. |
| `dotSize` | `number` | `4` | Point radius. |
| `strokeWidth` | `number` | `2` | Line width. |

```tsx
<LineChart
  data={[{ month: "Jan", users: 120, orders: 80 }, { month: "Feb", users: 180, orders: 95 }]}
  xAxisKey="month"
  series={[{ key: "users", name: "Users" }, { key: "orders", name: "Orders" }]}
/>
```

## AreaChart

Multi-series area chart with gradient or solid fill. Use for volume/trend emphasis.

```ts
import { AreaChart, type AreaChartProps, type AreaChartSeries } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `showLegend`, `loading`, `className`, `animate`, `animationDuration` (1200), `animationEasing` (`"ease-in-out"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | `[]` | Wide rows. |
| `series` | `AreaChartSeries[]` | required | Areas to draw. |
| `xAxisKey` | `string` | required | Category field. |
| `variant` | `"gradient" \| "solid"` | `"gradient"` | Fill style. |

```tsx
<AreaChart
  data={[{ day: "Mon", visits: 300 }, { day: "Tue", visits: 450 }]}
  xAxisKey="day"
  series={[{ key: "visits", name: "Visits" }]}
/>
```

## StepChart

Step-interpolated line or area chart. Use for values that change in discrete jumps (pricing tiers, inventory, status levels).

```ts
import { StepChart, type StepChartProps, type StepChartSeries } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `showLegend`, `loading`, `className`. No animation props.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | `[]` | Wide rows. |
| `series` | `StepChartSeries[]` | required | Series to draw. |
| `xAxisKey` | `string` | required | Category field. |
| `variant` | `"line" \| "area"` | `"line"` | Render as step lines or step areas. |

```tsx
<StepChart
  variant="area"
  data={[{ t: "Q1", price: 10 }, { t: "Q2", price: 10 }, { t: "Q3", price: 14 }]}
  xAxisKey="t"
  series={[{ key: "price", name: "Price" }]}
/>
```

## StackedChart

Stacked bar or stacked area chart. Use to show part-to-whole composition across categories.

```ts
import { StackedChart, type StackedChartProps, type StackedChartSeries } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `showLegend`, `loading`, `className`, `animate`, `animationDuration` (1200), `animationEasing` (`"ease-in-out"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | `[]` | Wide rows; each series key is one stack segment. |
| `series` | `StackedChartSeries[]` | required | Segments (stack order = array order). |
| `xAxisKey` | `string` | required | Category field. |
| `variant` | `"bar" \| "area"` | `"bar"` | Stacked bars or stacked areas. |

```tsx
<StackedChart
  data={[{ q: "Q1", web: 40, app: 25 }, { q: "Q2", web: 50, app: 35 }]}
  xAxisKey="q"
  series={[{ key: "web", name: "Web" }, { key: "app", name: "App" }]}
/>
```

## ComposedChart

Mixes line, bar and area series on one cartesian chart. Use to compare metrics of different kinds (e.g. volume bars + rate line).

```ts
import { ComposedChart, type ComposedChartProps, type ComposedChartSeries } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `showLegend`, `loading`, `className`. No animation props.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | `[]` | Wide rows. |
| `series` | `ComposedChartSeries[]` | required | `{ key: string; type: "line" \| "bar" \| "area"; name?: string; color?: string }` |
| `xAxisKey` | `string` | required | Category field. |

```tsx
<ComposedChart
  data={[{ m: "Jan", orders: 120, conv: 30 }, { m: "Feb", orders: 150, conv: 42 }]}
  xAxisKey="m"
  series={[
    { key: "orders", type: "bar", name: "Orders" },
    { key: "conv", type: "line", name: "Conversions" },
  ]}
/>
```

## RangeChart

Single band showing a low-high range per x value (recharts range area). Use for min/max, confidence bands, temperature ranges.

```ts
import { RangeChart, type RangeChartProps } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `loading`, `className`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | `[]` | Rows containing `xAxisKey`, `lowKey`, `highKey` fields. |
| `xAxisKey` | `string` | required | Category field. |
| `lowKey` | `string` | required | Field with the band's lower value. |
| `highKey` | `string` | required | Field with the band's upper value. |
| `name` | `string` | `"Range Band"` | Tooltip label. |
| `color` | `string` | `"var(--gy-primary)"` | Stroke/fill (fill at 0.2 opacity). |

```tsx
<RangeChart
  data={[{ day: "Mon", min: 12, max: 22 }, { day: "Tue", min: 14, max: 25 }]}
  xAxisKey="day"
  lowKey="min"
  highKey="max"
  name="Temperature"
/>
```

## ScatterChart

X/Y scatter plot of one dataset. Use to show correlation between two numeric variables.

```ts
import { ScatterChart, type ScatterChartProps, type ScatterChartItem } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `loading`, `className`. Legend always shown.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `ScatterChartItem[]` | `[]` | `{ x: number; y: number; name?: string }` |
| `name` | `string` | `"Scatter Dataset"` | Legend label. |
| `xLabel` / `yLabel` | `string` | `"X"` / `"Y"` | Axis names in tooltip. |
| `barColor` | `string` | `"var(--gy-primary)"` | Point color. |

```tsx
<ScatterChart data={[{ x: 10, y: 30 }, { x: 25, y: 48 }, { x: 40, y: 62 }]} xLabel="Spend" yLabel="Revenue" />
```

## BubbleChart

Scatter plot with a third dimension mapped to bubble size (z range 64-400 px²). Use for three-variable comparisons.

```ts
import { BubbleChart, type BubbleChartProps, type BubbleChartItem } from "@galyan/ui";
```

Shared: `height` (300), `width`, `showGrid`, `loading`, `className`. Legend always shown.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `BubbleChartItem[]` | `[]` | `{ x: number; y: number; z: number; name?: string }` |
| `name` | `string` | `"Bubble Dataset"` | Legend label. |
| `xLabel` / `yLabel` / `zLabel` | `string` | `"X"` / `"Y"` / `"Size"` | Axis names in tooltip. |
| `barColor` | `string` | `"var(--gy-primary)"` | Bubble color (0.7 opacity). |

```tsx
<BubbleChart data={[{ x: 10, y: 30, z: 200 }, { x: 30, y: 50, z: 800 }]} zLabel="Users" />
```

## PieChart

Pie chart with active-slice hover, legend and optional segmented look. Use for simple part-to-whole with few categories.

```ts
import { PieChart, type PieChartProps, type PieChartItem } from "@galyan/ui";
```

Shared: `height` (320), `width`, `showLegend`, `loading`, `borderless`, `className`, `responsive`, `tooltipConfig`, `tokens`, `animate`, `animationDuration` (1000), `animationEasing` (`"ease-out"`), `animationBegin` (0).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `PieChartItem[]` | `[]` | `{ name: string; value: number; color?: string; [key]: any }` |
| `variant` | `"standard" \| "segmented"` | `"standard"` | Segmented only adds a 4° gap when `paddingAngle` is `undefined`; since `paddingAngle` defaults to `0`, pass `paddingAngle` explicitly. |
| `innerRadius` | `number \| string` | `0` | >0 makes a ring. |
| `outerRadius` | `number \| string` | auto | Outer radius. |
| `paddingAngle` | `number` | `0` | Gap between slices (degrees). |
| `cornerRadius` | `number` | `0` | Slice corner rounding. |
| `startAngle` / `endAngle` | `number` | `0` / `360` | Arc span. |
| `stroke` | `string` | `"none"` (or surface color if `strokeWidth` > 0) | Slice border color. |
| `strokeWidth` | `number` | `0` (or 1 if `stroke` set) | Slice border width. |
| `onItemClick` | `(item: PieChartItem, index: number) => void` | — | Slice click. |

```tsx
<PieChart data={[{ name: "Chrome", value: 62 }, { name: "Safari", value: 24 }, { name: "Other", value: 14 }]} />
```

## DonutChart

Donut (full or semicircle) with a center total/metric. Use for part-to-whole where a headline total matters.

```ts
import { DonutChart, type DonutChartProps, type DonutChartItem } from "@galyan/ui";
```

Shared: `height` (320), `width`, `showLegend`, `loading`, `borderless`, `className`, `responsive`, `tooltipConfig` (formatter also formats the center total), `tokens`, `animate`, `animationDuration` (1000), `animationEasing` (`"ease-out"`), `animationBegin` (0).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `DonutChartItem[]` | `[]` | `{ name: string; value: number; color?: string; [key]: any }` |
| `variant` | `"standard" \| "semi"` | `"standard"` | Full ring or half-circle gauge-like donut. |
| `innerRadius` | `number \| string` | `"60%"` (`"55%"` compact) | Hole size. |
| `outerRadius` | `number \| string` | auto | Outer radius. |
| `paddingAngle` | `number` | `4` | Gap between slices. |
| `cornerRadius` | `number` | `6` | Slice rounding. |
| `startAngle` / `endAngle` | `number` | `90` (standard) / `180` (semi) start | Arc span override. |
| `stroke` | `string` | `"var(--gy-surface, #ffffff)"` | Slice border. |
| `strokeWidth` | `number` | `2` | Slice border width. |
| `showCenterMetric` | `boolean` | `true` | Show center label/value. |
| `centerMetric` | `{ label?: string; value?: string \| number }` | label `"Total"`, value = sum | Override center text. |
| `onItemClick` | `(item: DonutChartItem, index: number) => void` | — | Slice click. |

```tsx
<DonutChart
  data={[{ name: "Paid", value: 820 }, { name: "Pending", value: 140 }, { name: "Failed", value: 40 }]}
  centerMetric={{ label: "Transactions" }}
/>
```

## RadarChart

Multi-series radar/spider chart. Use to compare entities across several dimensions.

```ts
import { RadarChart, type RadarChartProps, type RadarChartSeries } from "@galyan/ui";
```

Shared: `height` (340), `width`, `showGrid`, `showLegend`, `loading`, `className`, `responsive`, `tokens`, `animate`, `animationDuration` (1000), `animationEasing` (`"ease-out"`), `animationBegin` (default: series index × 150).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `any[]` | `[]` | One row per axis: `{ [angleKey]: string, [seriesKey]: number, ... }` |
| `series` | `RadarChartSeries[]` | required | Polygons to draw. |
| `angleKey` | `string` | required | Field holding the axis/dimension label. |
| `variant` | `"standard" \| "filled" \| "dots"` | `"filled"` | Outline, filled, or with dots. |
| `gridType` | `"polygon" \| "circle"` | `"polygon"` | Grid shape. |
| `tooltipConfig` | `{ show?: boolean; formatter?: (value: number, name?: string) => string }` | `{ show: true }` | Tooltip. |
| `onSeriesClick` | `(series: RadarChartSeries, index: number) => void` | — | Series/legend click. |

```tsx
<RadarChart
  data={[
    { skill: "Speed", a: 80, b: 60 },
    { skill: "Power", a: 65, b: 90 },
    { skill: "Range", a: 70, b: 75 },
  ]}
  angleKey="skill"
  series={[{ key: "a", name: "Model A" }, { key: "b", name: "Model B" }]}
/>
```

## TreemapChart

Treemap of proportional rectangles with a summary header. Use for hierarchical or share-of-total data with many categories.

```ts
import { TreemapChart, type TreemapChartProps, type TreemapChartItem } from "@galyan/ui";
```

Shared: `height` (340), `width`, `loading`, `className`, `responsive`, `tokens`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TreemapChartItem[]` | `[]` | `{ name: string; value: number; color?: string; children?: TreemapChartItem[]; [key]: any }` |
| `dataKey` | `string` | `"value"` | Numeric field used for tile size. |
| `colorScale` | `string[]` | theme palette | Tile colors (cycled by index). |
| `showSummaryHeader` | `boolean` | `true` | Show title/total header. |
| `summaryTitle` | `string` | `"Hierarchical Breakdown"` | Header title. |
| `aspectRatio` | `number` | `4 / 3` | Tile layout aspect ratio. |
| `tooltipConfig` | `{ show?: boolean; formatter?: (value: number, item?: TreemapChartItem) => string }` | `{ show: true }` | Tooltip. |
| `onItemClick` | `(item: TreemapChartItem, index: number) => void` | — | Tile click. |

```tsx
<TreemapChart
  summaryTitle="Revenue by region"
  data={[{ name: "EU", value: 420 }, { name: "US", value: 380 }, { name: "APAC", value: 210 }]}
/>
```

## HeatmapChart

CSS-grid heatmap; cell opacity scales from min to max value using one base color. Use for intensity across two categorical axes (day x hour, etc.).

```ts
import { HeatmapChart, type HeatmapChartProps, type HeatmapDataCell } from "@galyan/ui";
```

Shared: `height` (350), `width`, `loading`, `className`, `tokens`, `animate`, `animationDuration` (700), `animationEasing` (`"ease-out"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `HeatmapDataCell[]` | `[]` | `{ x: string; y: string; value: number }` - `x`/`y` must match labels below. |
| `xAxisLabels` | `string[]` | `[]` | Column labels (order). |
| `yAxisLabels` | `string[]` | `[]` | Row labels (order). |
| `baseColor` | `string` | `"var(--gy-primary)"` | Cell color. |
| `stagger` | `boolean` | `true` | Staggered cell entrance animation. |
| `onCellClick` | `(cell: HeatmapDataCell) => void` | — | Cell click. |

```tsx
<HeatmapChart
  xAxisLabels={["Mon", "Tue"]}
  yAxisLabels={["AM", "PM"]}
  data={[
    { x: "Mon", y: "AM", value: 4 }, { x: "Tue", y: "AM", value: 9 },
    { x: "Mon", y: "PM", value: 2 }, { x: "Tue", y: "PM", value: 6 },
  ]}
/>
```

## CorrelationChart

Square correlation matrix grid (CSS). Positive values use `positiveColor`, negative use `negativeColor`; opacity = |value|. Use for variable correlation analysis.

```ts
import { CorrelationChart, type CorrelationChartProps } from "@galyan/ui";
```

Shared: `height` (350), `width`, `loading`, `className`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variables` | `string[]` | `[]` | Variable names (row and column labels). |
| `matrix` | `number[][]` | `[]` | N×N values in `[-1, 1]`; `matrix[row][col]` aligned with `variables`. |
| `positiveColor` | `string` | `"var(--gy-primary)"` | Color for values ≥ 0. |
| `negativeColor` | `string` | `"var(--gy-danger)"` | Color for values < 0. |

```tsx
<CorrelationChart
  variables={["Price", "Demand", "Ads"]}
  matrix={[
    [1, -0.72, 0.15],
    [-0.72, 1, 0.58],
    [0.15, 0.58, 1],
  ]}
/>
```

## TriangularChart

Ternary (three-component) SVG plot; each point's a/b/c are normalized to their sum. Use for compositions of three parts (soil, mix ratios).

```ts
import { TriangularChart, type TriangularChartProps, type TriangularChartItem } from "@galyan/ui";
```

Shared: `loading`, `className`. `height`/`width` are `number` only (defaults `360` / `400`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TriangularChartItem[]` | `[]` | `{ a: number; b: number; c: number; name: string }` |
| `labelA` / `labelB` / `labelC` | `string` | `"Component A"` / `"Component B"` / `"Component C"` | Vertex labels (A bottom-left, B bottom-right, C top). |
| `color` | `string` | `"var(--gy-primary)"` | Point color. |

```tsx
<TriangularChart
  labelA="Clay" labelB="Silt" labelC="Sand"
  data={[{ name: "Sample 1", a: 20, b: 30, c: 50 }, { name: "Sample 2", a: 45, b: 35, c: 20 }]}
/>
```

## FinancialChart

Candlestick (OHLC) chart; green when `close >= open`, red otherwise. Use for price series.

```ts
import { FinancialChart, type FinancialChartProps, type FinancialChartItem } from "@galyan/ui";
```

Shared: `height` (350), `width`, `showGrid`, `loading`, `className`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `FinancialChartItem[]` | `[]` | `{ date: string; open: number; high: number; low: number; close: number }` |
| `xAxisKey` | `string` | `"date"` | Category field. |

```tsx
<FinancialChart
  data={[
    { date: "Mon", open: 100, high: 110, low: 95, close: 108 },
    { date: "Tue", open: 108, high: 112, low: 101, close: 103 },
  ]}
/>
```

## BoxWhiskerChart

Box-and-whisker plot from precomputed five-number summaries. Use to compare distributions across groups.

```ts
import { BoxWhiskerChart, type BoxWhiskerChartProps, type BoxWhiskerItem } from "@galyan/ui";
```

Shared: `height` (350), `width`, `loading`, `className`, `responsive`, `showGrid`, `tooltipConfig`, `tokens`, `truncateCharacterAfter`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `BoxWhiskerItem[]` | `[]` | `{ label: string; min: number; q1: number; median: number; q3: number; max: number; color?: string; [key]: any }` |
| `color` | `string` | `"var(--gy-primary, #3b82f6)"` | Box color (item `color` overrides). |

```tsx
<BoxWhiskerChart
  data={[
    { label: "API A", min: 20, q1: 45, median: 60, q3: 80, max: 120 },
    { label: "API B", min: 15, q1: 30, median: 42, q3: 55, max: 90 },
  ]}
/>
```

## HistogramChart

Frequency histogram over pre-binned data with summary header. Use for distributions.

```ts
import { HistogramChart, type HistogramChartProps, type HistogramItem } from "@galyan/ui";
```

Shared: `height` (320), `width`, `showGrid`, `loading`, `className`, `responsive`, `tooltipConfig`, `tokens`, `truncateCharacterAfter`, `animate`, `animationDuration` (800), `animationEasing` (`"ease-out"`), `animationBegin` (0).

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `HistogramItem[]` | `[]` | `{ bin: string; frequency: number; color?: string; [key]: any }` (bin e.g. `"0-10"`). |
| `color` | `string` | `"var(--gy-primary, #3b82f6)"` | Bar color. |
| `showSummaryHeader` | `boolean` | `true` | Show header. |
| `summaryTitle` | `string` | `"Distribution"` | Header title. |
| `barCategoryGap` | `number \| string` | `2` | Gap between bars. |
| `tickFormatter` | `(bin: string) => string` | — | X-axis label formatter (overrides truncation). |
| `xAxisTickAngle` | `number` | auto (-35 when crowded) | X tick label angle. |
| `onBarClick` | `(item: HistogramItem, index: number) => void` | — | Bar click. |

```tsx
<HistogramChart
  data={[{ bin: "0-10", frequency: 4 }, { bin: "10-20", frequency: 12 }, { bin: "20-30", frequency: 7 }]}
/>
```

## ParetoChart

Bars sorted descending plus a cumulative-% line on a right axis (0-100%). Sorting and cumulative % are computed for you. Use for 80/20 analysis.

```ts
import { ParetoChart, type ParetoChartProps, type ParetoItem } from "@galyan/ui";
```

Shared: `height` (350), `width`, `showGrid`, `loading`, `className`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `ParetoItem[]` | `[]` | `{ name: string; value: number }` (any order). |
| `barColor` | `string` | `"var(--gy-primary)"` | Bar color. |
| `lineColor` | `string` | `"var(--gy-danger)"` | Cumulative line color. |

```tsx
<ParetoChart data={[{ name: "Timeout", value: 42 }, { name: "Declined", value: 88 }, { name: "Fraud", value: 12 }]} />
```

## GaugeChart

Semicircular gauge with colored segments and optional needle. Use for a single KPI against thresholds.

```ts
import { GaugeChart, type GaugeChartProps, type GaugeSegment } from "@galyan/ui";
```

Shared: `height` (220), `width`, `showLegend`, `loading`, `className`, `responsive`, `tooltipConfig`, `tokens`, `animate`, `animationDuration` (1000), `animationEasing` (adds `"spring"`; default `"ease-out"`).

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current value (clamped to min..max). |
| `min` | `number` | `0` | Scale minimum. |
| `max` | `number` | `100` | Scale maximum. |
| `segments` | `GaugeSegment[]` | Low (33, success) / Medium (66, warning) / High (100, danger) | `{ value: number /* upper limit */; color: string; label?: string; min?: number }`, ascending. |
| `needle` | `boolean` | `true` | Show needle. |
| `showValue` | `boolean` | `true` | Show value text. |
| `unit` | `string` | `"%"` | Unit suffix. |
| `onSegmentClick` | `(segment: GaugeSegment, index: number) => void` | — | Segment click. |

```tsx
<GaugeChart
  value={72}
  segments={[
    { value: 50, color: "var(--gy-danger)", label: "Poor" },
    { value: 80, color: "var(--gy-warning)", label: "OK" },
    { value: 100, color: "var(--gy-success)", label: "Great" },
  ]}
/>
```

## WaterfallChart

Waterfall of running totals; positive deltas green, negative red, `isTotal` bars (primary) reset the running sum to their value. Use for P&L / bridge breakdowns.

```ts
import { WaterfallChart, type WaterfallChartProps, type WaterfallItem } from "@galyan/ui";
```

Shared: `height` (350), `width`, `showGrid`, `loading`, `className`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `WaterfallItem[]` | `[]` | `{ label: string; value: number; isTotal?: boolean }` - `value` is a delta, or the absolute total when `isTotal`. |

```tsx
<WaterfallChart
  data={[
    { label: "Start", value: 1000, isTotal: true },
    { label: "Sales", value: 400 },
    { label: "Refunds", value: -150 },
    { label: "End", value: 1250, isTotal: true },
  ]}
/>
```

## ChoroplethMap

Interactive world map (pre-projected Natural Earth paths) or US state tile grid, colored by region value, with zoom/pan, selection, beacons and tooltips. Use for geographic distributions.

```ts
import { ChoroplethMap, WORLD_COUNTRIES, type ChoroplethMapProps, type MapRegionItem, type MapVariant, type WorldCountryPath } from "@galyan/ui";
```

Shared: `height` (480), `width`, `loading`, `className`, `animate`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"world" \| "tiles"` | `"world"` | World map or US state tile grid (2-letter state ids like `"CA"`). |
| `data` | `MapRegionItem[]` | `[]` | `{ id: string; name?: string; value?: number; color?: string; tooltip?: ReactNode; [key]: any }` - `id` matches ISO2 (`"ZA"`), ISO3 (`"ZAF"`), or country/state name (case-insensitive). |
| `selectedRegion` | `string \| null` | — | Controlled selection. |
| `defaultSelectedRegion` | `string \| null` | — | Uncontrolled initial selection. |
| `onRegionClick` | `(region: { id: string; name: string; value?: number; item?: MapRegionItem }) => void` | — | Region click. |
| `onRegionHover` | `(region: { id; name; value?; item? } \| null) => void` | — | Hover in/out. |
| `baseColor` | `string` | `"var(--gy-map-base, #f8fafc)"` | Regions without data. |
| `borderColor` | `string` | `"var(--gy-map-border, #cbd5e1)"` | Region borders. |
| `activeColor` | `string` | `"var(--gy-map-active, #c7d2fe)"` | Regions with data (when no `colorScale`). |
| `highlightColor` | `string` | `"var(--gy-map-highlight, #4338ca)"` | Hovered/selected region. |
| `colorScale` | `string[]` | — | Low→high buckets; region value mapped between data min and max. Item `color` overrides. |
| `showZoomControls` | `boolean` | `true` | Zoom buttons (1x-4x). |
| `allowPan` | `boolean` | `true` | Drag to pan. |
| `showGraticule` | `boolean` | `true` | Lat/long grid (world). |
| `showBeacons` | `boolean` | `true` | Pulsing markers on data regions (world). |
| `tooltipConfig` | `{ show?: boolean; formatter?: (region: { id; name; value?; item? }) => ReactNode }` | `{ show: true }` | Tooltip. |

`WORLD_COUNTRIES: WorldCountryPath[]` (`{ id; iso3; numericId?; name; rawName?; path; centroid: [x, y]; bounds? }`, 1000×500 viewBox) is exported for custom lookups.

```tsx
<ChoroplethMap
  data={[
    { id: "US", value: 1200 },
    { id: "IN", value: 950 },
    { id: "ZAF", value: 300 },
  ]}
  colorScale={["#e0e7ff", "#a5b4fc", "#6366f1", "#4338ca"]}
  onRegionClick={(r) => console.log(r.id, r.value)}
/>
```

## TimelineChart

Gantt-style horizontal timeline of tasks with optional progress, built on recharts bars. Use for project schedules and phases.

```ts
import { TimelineChart, type TimelineChartProps, type TimelineItem } from "@galyan/ui";
```

Shared: `height` (340), `width`, `showGrid`, `loading`, `className`, `responsive`, `tokens`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TimelineItem[]` | `[]` | `{ label: string; start: number; end: number; color?: string; progress?: number /* 0-100 */; [key]: any }` - start/end are numeric (timestamps or day offsets). |
| `showSummaryHeader` | `boolean` | `true` | Show header. |
| `summaryTitle` | `string` | `"Project Timeline"` | Header title. |
| `unit` | `string` | `"Day"` | Duration unit in tooltip (pluralized with `s`). |
| `tooltipConfig` | `{ show?: boolean; unit?: string; formatter?: (start: number, end: number, item: TimelineItem) => ReactNode }` | `{ show: true }` | Tooltip. |
| `onItemClick` | `(item: TimelineItem, index: number) => void` | — | Bar click. |

```tsx
<TimelineChart
  data={[
    { label: "Design", start: 0, end: 5, progress: 100 },
    { label: "Build", start: 4, end: 14, progress: 40 },
    { label: "QA", start: 12, end: 18 },
  ]}
/>
```
