import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "./PieChart";
import type { PieChartItem } from "./PieChart";

const meta: Meta<typeof PieChart> = {
  title: "Galyan UI/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "segmented"],
    },
    height: { control: "number" },
    width: { control: "text" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
    paddingAngle: { control: "number" },
    cornerRadius: { control: "number" },
    startAngle: { control: "number" },
    endAngle: { control: "number" },
    strokeWidth: { control: "number" },
    animate: { control: "boolean" },
    animationDuration: { control: "number" },
    animationEasing: {
      control: "select",
      options: ["ease", "ease-in", "ease-out", "ease-in-out", "linear"],
    },
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof PieChart>;

const sampleData = [
  { name: "Direct", value: 4500, color: "var(--gy-primary, #3b82f6)" },
  { name: "Organic Search", value: 2500, color: "var(--gy-success, #10b981)" },
  { name: "Referral", value: 1500, color: "var(--gy-warning, #f59e0b)" },
  { name: "Social Media", value: 1500, color: "var(--gy-info, #06b6d4)" },
];

export const Standard: Story = {
  args: {
    variant: "standard",
    data: sampleData,
    height: 350,
    width: "100%",
    showLegend: true,
  },
};

export const SeamlessContiguous: Story = {
  args: {
    ...Standard.args,
    paddingAngle: 0,
    cornerRadius: 0,
    strokeWidth: 0,
  },
};

export const Segmented: Story = {
  args: {
    ...Standard.args,
    variant: "segmented",
  },
};

export const SegmentedWithGaps: Story = {
  args: {
    ...Standard.args,
    paddingAngle: 3,
    cornerRadius: 4,
  },
};

export const ResponsiveMobile: Story = {
  render: () => (
    <div
      style={{
        width: 320,
        border: "1px dashed #cbd5e1",
        padding: "0.75rem",
        borderRadius: "1rem",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          color: "#64748b",
          marginBottom: "0.5rem",
          fontWeight: 600,
        }}
      >
        Mobile Container Preview (320px)
      </div>
      <PieChart
        variant="standard"
        data={sampleData}
        height={320}
        width="100%"
        showLegend
      />
    </div>
  ),
};

export const CustomFormatter: Story = {
  args: {
    variant: "standard",
    data: sampleData,
    height: 350,
    tooltipConfig: {
      formatter: (val: number) => `$${val.toLocaleString()}`,
    },
  },
};

export const LoadingState: Story = {
  args: {
    ...Standard.args,
    loading: true,
    data: [],
  },
};

export const EmptyState: Story = {
  args: {
    ...Standard.args,
    data: [],
  },
};

export const DashboardCardBorderless: Story = {
  render: () => (
    <div
      style={{
        width: 360,
        height: 320,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "1rem",
        padding: "1rem 1.25rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: "0.25rem" }}>
        <h4
          style={{
            margin: 0,
            fontSize: "0.9375rem",
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Acquisition Channels
        </h4>
        <p
          style={{
            margin: "2px 0 0 0",
            fontSize: "0.75rem",
            color: "#64748b",
          }}
        >
          Hover over slices or legend to inspect
        </p>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <PieChart
          variant="standard"
          data={sampleData}
          borderless
          height="100%"
          width="100%"
          showLegend
        />
      </div>
    </div>
  ),
};

export const InteractiveAnimation: Story = {
  render: function Render() {
    const sets: PieChartItem[][] = [
      [
        { name: "Direct", value: 4500, color: "var(--gy-primary, #3b82f6)" },
        {
          name: "Organic Search",
          value: 2500,
          color: "var(--gy-success, #10b981)",
        },
        { name: "Referral", value: 1500, color: "var(--gy-warning, #f59e0b)" },
        { name: "Social Media", value: 1500, color: "var(--gy-info, #06b6d4)" },
      ],
      [
        { name: "Direct", value: 2000, color: "var(--gy-primary, #3b82f6)" },
        {
          name: "Organic Search",
          value: 4500,
          color: "var(--gy-success, #10b981)",
        },
        { name: "Referral", value: 3000, color: "var(--gy-warning, #f59e0b)" },
        { name: "Social Media", value: 500, color: "var(--gy-info, #06b6d4)" },
      ],
      [
        { name: "Direct", value: 1200, color: "var(--gy-primary, #3b82f6)" },
        {
          name: "Organic Search",
          value: 1800,
          color: "var(--gy-success, #10b981)",
        },
        { name: "Referral", value: 4500, color: "var(--gy-warning, #f59e0b)" },
        { name: "Social Media", value: 2500, color: "var(--gy-info, #06b6d4)" },
      ],
    ];

    const [currentSet, setCurrentSet] = React.useState(0);
    const [key, setKey] = React.useState(0);
    const [gap, setGap] = React.useState(0);
    const activeData: PieChartItem[] =
      sets[currentSet] ?? sets[0] ?? sampleData;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => setCurrentSet((prev) => (prev + 1) % sets.length)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            Smooth Morph Data
          </button>
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            Replay Sweep Entrance
          </button>
          <button
            type="button"
            onClick={() => setGap((g) => (g === 0 ? 3 : 0))}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: gap === 0 ? "#f1f5f9" : "#3b82f6",
              color: gap === 0 ? "#0f172a" : "#ffffff",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            {gap === 0 ? "Add Slice Gaps (3px)" : "Remove Gaps (Seamless)"}
          </button>
        </div>
        <div style={{ width: 360, height: 350 }}>
          <PieChart
            key={key}
            data={activeData}
            variant="standard"
            height={350}
            paddingAngle={gap}
            cornerRadius={gap > 0 ? 4 : 0}
            animate={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </div>
      </div>
    );
  },
};
