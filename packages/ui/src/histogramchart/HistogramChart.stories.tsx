import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HistogramChart } from "./HistogramChart";

const meta: Meta<typeof HistogramChart> = {
  title: "Galyan UI/HistogramChart",
  component: HistogramChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    width: { control: "text" },
    color: { control: "color" },
    showGrid: { control: "boolean" },
    showSummaryHeader: { control: "boolean" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
  },
} satisfies Meta<typeof HistogramChart>;

export default meta;
type Story = StoryObj<typeof HistogramChart>;

const binsData = [
  { bin: "0-10", frequency: 15 },
  { bin: "10-20", frequency: 32 },
  { bin: "20-30", frequency: 56 },
  { bin: "30-40", frequency: 41 },
  { bin: "40-50", frequency: 23 },
  { bin: "50-60", frequency: 8 },
];

const latencyBins = [
  { bin: "0-50ms", frequency: 120 },
  { bin: "50-100ms", frequency: 340 },
  { bin: "100-150ms", frequency: 580 },
  { bin: "150-200ms", frequency: 210 },
  { bin: "200-250ms", frequency: 95 },
  { bin: "250-300ms", frequency: 40 },
  { bin: "300ms+", frequency: 15 },
];

export const Default: Story = {
  args: {
    data: binsData,
    height: 340,
    width: "100%",
    color: "var(--gy-primary, #3b82f6)",
    summaryTitle: "Age Distribution",
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
      <HistogramChart
        data={latencyBins}
        height={300}
        width="100%"
        summaryTitle="Latency"
      />
    </div>
  ),
};

export const CustomColorAndFormatter: Story = {
  args: {
    data: latencyBins,
    height: 340,
    width: "100%",
    color: "var(--gy-success, #10b981)",
    summaryTitle: "Server Request Latency",
    tooltipConfig: {
      formatter: (v: number) => `${v.toLocaleString()} requests`,
    },
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};

export const EmptyState: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};
