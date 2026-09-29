import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";
import type { DonutChartItem } from "./DonutChart";

const meta: Meta<typeof DonutChart> = {
  title: "Galyan UI/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "semi"],
    },
    height: { control: "number" },
    width: { control: "text" },
    showLegend: { control: "boolean" },
    showCenterMetric: { control: "boolean" },
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
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof DonutChart>;

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
    showCenterMetric: true,
    paddingAngle: 4,
    cornerRadius: 6,
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
      <DonutChart
        variant="standard"
        data={sampleData}
        height={320}
        width="100%"
        showLegend
        showCenterMetric
      />
    </div>
  ),
};

export const SemiDonut: Story = {
  args: {
    ...Standard.args,
    variant: "semi",
    height: 300,
    paddingAngle: 4,
    cornerRadius: 6,
  },
};

export const SegmentedWithGaps: Story = {
  args: {
    ...Standard.args,
    paddingAngle: 3,
    cornerRadius: 4,
  },
};

export const CustomCenterMetric: Story = {
  args: {
    variant: "standard",
    data: sampleData,
    height: 350,
    centerMetric: {
      label: "Total Visitors",
      value: "10.0k",
    },
    tooltipConfig: {
      formatter: (val: number) => `${val.toLocaleString()} visits`,
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

export const DashboardCardPreview: Story = {
  render: () => {
    const channelData = [
      { name: "Verified Email", value: 86, color: "#10b981" },
      { name: "WhatsApp / Phone", value: 289, color: "#f59e0b" },
      { name: "Instagram Presence", value: 81, color: "#ec4899" },
      { name: "Website Active", value: 8, color: "#6366f1" },
    ];

    return (
      <div
        style={{
          width: 340,
          background: "#ffffff",
          borderRadius: "1.5rem",
          padding: "1.25rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#0f172a",
              }}
            >
              Contact Channel Reachability
            </div>
            <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>
              Coverage across verified channels
            </div>
          </div>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.1)",
              color: "#059669",
              fontSize: "0.6875rem",
              fontWeight: 700,
            }}
          >
            Multi-Channel
          </span>
        </div>

        <div style={{ width: "100%", height: 250 }}>
          <DonutChart
            data={channelData}
            variant="standard"
            height={250}
            borderless
            showLegend
            showCenterMetric
          />
        </div>
      </div>
    );
  },
};

export const MinimalThreeSegmentDonut: Story = {
  render: () => {
    const minimalData = [
      { name: "Teal Segment", value: 75, color: "#3B8B9B" },
      { name: "Gold Segment", value: 17, color: "#D8A436" },
      { name: "Coral Segment", value: 8, color: "#E0533C" },
    ];

    return (
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ width: 280, height: 280 }}>
          <DonutChart
            data={minimalData}
            variant="standard"
            height={280}
            width={280}
            paddingAngle={0}
            cornerRadius={0}
            stroke="var(--gy-surface, #ffffff)"
            strokeWidth={1}
            showLegend={false}
            showCenterMetric={false}
            borderless
          />
        </div>
      </div>
    );
  },
};

export const MinimalDonutWithLegend: Story = {
  render: () => {
    const minimalData = [
      { name: "Active Users", value: 75, color: "#3B8B9B" },
      { name: "Inactive Users", value: 17, color: "#D8A436" },
      { name: "Churned Users", value: 8, color: "#E0533C" },
    ];

    return (
      <div
        style={{
          width: 320,
          background: "#ffffff",
          borderRadius: "1.25rem",
          padding: "1.25rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
        }}
      >
        <DonutChart
          data={minimalData}
          variant="standard"
          height={280}
          paddingAngle={0}
          cornerRadius={0}
          stroke="var(--gy-surface, #ffffff)"
          strokeWidth={1}
          showLegend={true}
          showCenterMetric={true}
          borderless
        />
      </div>
    );
  },
};

export const InteractiveAnimation: Story = {
  render: function Render() {
    const sets: DonutChartItem[][] = [
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
    const activeData: DonutChartItem[] =
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
        <div style={{ display: "flex", gap: "0.5rem" }}>
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
        </div>
        <div style={{ width: 360, height: 350 }}>
          <DonutChart
            key={key}
            data={activeData}
            variant="standard"
            height={350}
            animate={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </div>
      </div>
    );
  },
};
