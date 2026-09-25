import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "./RadarChart";

const meta: Meta<typeof RadarChart> = {
  title: "Galyan UI/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "filled", "dots"],
    },
    gridType: {
      control: "select",
      options: ["polygon", "circle"],
    },
    height: { control: "number" },
    width: { control: "text" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
  },
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof RadarChart>;

const radarData = [
  { subject: "Speed", playerA: 120, playerB: 110 },
  { subject: "Shooting", playerA: 98, playerB: 130 },
  { subject: "Passing", playerA: 86, playerB: 95 },
  { subject: "Dribbling", playerA: 99, playerB: 90 },
  { subject: "Defending", playerA: 85, playerB: 115 },
  { subject: "Physical", playerA: 65, playerB: 85 },
];

const seriesConfig = [
  { key: "playerA", name: "Player A", color: "var(--gy-primary, #3b82f6)" },
  { key: "playerB", name: "Player B", color: "var(--gy-success, #10b981)" },
];

export const Filled: Story = {
  args: {
    variant: "filled",
    data: radarData,
    angleKey: "subject",
    series: seriesConfig,
    height: 350,
    width: "100%",
  },
};

export const Standard: Story = {
  args: {
    ...Filled.args,
    variant: "standard",
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
      <RadarChart
        variant="filled"
        data={radarData}
        angleKey="subject"
        series={seriesConfig}
        height={320}
        width="100%"
        showLegend
      />
    </div>
  ),
};

export const CircleGridWithDots: Story = {
  args: {
    variant: "dots",
    gridType: "circle",
    data: radarData,
    angleKey: "subject",
    series: seriesConfig,
    height: 350,
    width: "100%",
  },
};

export const CustomFormatter: Story = {
  args: {
    ...Filled.args,
    tooltipConfig: {
      formatter: (val: number, name?: string) => `${val} pts (${name})`,
    },
  },
};

export const LoadingState: Story = {
  args: {
    ...Filled.args,
    loading: true,
    data: [],
  },
};

export const EmptyState: Story = {
  args: {
    ...Filled.args,
    data: [],
  },
};
