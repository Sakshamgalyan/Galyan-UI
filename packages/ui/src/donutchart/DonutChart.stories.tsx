import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>
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
