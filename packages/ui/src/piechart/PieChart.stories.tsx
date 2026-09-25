import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "./PieChart";

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

export const Segmented: Story = {
  args: {
    ...Standard.args,
    variant: "segmented",
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
