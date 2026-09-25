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
