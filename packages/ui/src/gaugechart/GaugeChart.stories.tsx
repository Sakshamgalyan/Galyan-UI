import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GaugeChart, type GaugeSegment } from "./GaugeChart";

const meta: Meta<typeof GaugeChart> = {
  title: "Galyan UI/GaugeChart",
  component: GaugeChart,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    min: { control: "number" },
    max: { control: "number" },
    needle: { control: "boolean" },
    showValue: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
    unit: { control: "text" },
  },
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof GaugeChart>;

const fiveSegments: GaugeSegment[] = [
  { value: 20, color: "#10b981", label: "Very Low" },
  { value: 40, color: "#06b6d4", label: "Low" },
  { value: 60, color: "#f59e0b", label: "Medium" },
  { value: 80, color: "#f97316", label: "High" },
  { value: 100, color: "#ef4444", label: "Critical" },
];

export const Default: Story = {
  args: {
    value: 72,
    needle: true,
    height: 230,
    width: "100%",
    showValue: true,
    showLegend: true,
    unit: "%",
  },
};

export const ResponsiveMobile: Story = {
  render: () => (
    <div
      style={{
        width: 280,
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
        Mobile Container Preview (280px)
      </div>
      <GaugeChart
        value={64}
        needle={true}
        height={210}
        width="100%"
        showValue
        showLegend
      />
    </div>
  ),
};

export const FiveTierScale: Story = {
  args: {
    value: 85,
    segments: fiveSegments,
    height: 240,
    width: "100%",
    showValue: true,
    showLegend: true,
    unit: "%",
  },
};

export const SpeedometerCustomRange: Story = {
  args: {
    value: 125,
    min: 0,
    max: 200,
    segments: [
      { value: 60, color: "var(--gy-success, #10b981)", label: "Eco" },
      { value: 120, color: "var(--gy-primary, #3b82f6)", label: "Cruising" },
      { value: 160, color: "var(--gy-warning, #f59e0b)", label: "Sport" },
      { value: 200, color: "var(--gy-danger, #ef4444)", label: "Max" },
    ],
    height: 240,
    width: "100%",
    unit: " mph",
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};
