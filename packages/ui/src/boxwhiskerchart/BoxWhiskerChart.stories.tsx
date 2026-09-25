import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxWhiskerChart, type BoxWhiskerItem } from "./BoxWhiskerChart";

const meta: Meta<typeof BoxWhiskerChart> = {
  title: "Galyan UI/BoxWhiskerChart",
  component: BoxWhiskerChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    width: { control: "text" },
    loading: { control: "boolean" },
    responsive: { control: "boolean" },
    showGrid: { control: "boolean" },
    color: { control: "color" },
    truncateCharacterAfter: { control: "number" },
  },
} satisfies Meta<typeof BoxWhiskerChart>;

export default meta;
type Story = StoryObj<typeof BoxWhiskerChart>;

const boxPlotData: BoxWhiskerItem[] = [
  {
    label: "Desktop Web",
    min: 120,
    q1: 240,
    median: 380,
    q3: 520,
    max: 780,
  },
  {
    label: "iOS Application",
    min: 85,
    q1: 190,
    median: 290,
    q3: 410,
    max: 620,
  },
  {
    label: "Android Application",
    min: 150,
    q1: 280,
    median: 420,
    q3: 590,
    max: 890,
  },
  {
    label: "Tablet Web",
    min: 110,
    q1: 220,
    median: 350,
    q3: 480,
    max: 710,
  },
];

const colorfulData: BoxWhiskerItem[] = [
  {
    label: "Engineering",
    min: 45,
    q1: 65,
    median: 82,
    q3: 98,
    max: 125,
    color: "var(--gy-primary, #3b82f6)",
  },
  {
    label: "Design",
    min: 35,
    q1: 52,
    median: 70,
    q3: 88,
    max: 110,
    color: "var(--gy-success, #10b981)",
  },
  {
    label: "Marketing",
    min: 25,
    q1: 45,
    median: 62,
    q3: 78,
    max: 95,
    color: "var(--gy-warning, #f59e0b)",
  },
  {
    label: "Sales",
    min: 50,
    q1: 75,
    median: 95,
    q3: 118,
    max: 145,
    color: "var(--gy-danger, #ef4444)",
  },
];

export const Default: Story = {
  args: {
    data: boxPlotData,
    height: 350,
    width: "100%",
    color: "var(--gy-primary, #3b82f6)",
    showGrid: true,
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
      <BoxWhiskerChart
        data={boxPlotData}
        height={300}
        width="100%"
        showGrid
      />
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    data: colorfulData,
    height: 350,
    width: "100%",
    showGrid: true,
  },
};

export const CustomFormatter: Story = {
  args: {
    data: boxPlotData,
    height: 350,
    width: "100%",
    tooltipConfig: {
      formatter: (v: number) => `${v} ms`,
    },
  },
};

export const TruncatedLabels: Story = {
  args: {
    data: [
      {
        label: "Very Long Category Title For Desktop",
        min: 10,
        q1: 25,
        median: 45,
        q3: 65,
        max: 90,
      },
      {
        label: "Another Extremely Long Department Name",
        min: 20,
        q1: 35,
        median: 55,
        q3: 75,
        max: 100,
      },
    ],
    height: 350,
    width: "100%",
    truncateCharacterAfter: 12,
  },
};

export const LoadingState: Story = {
  args: {
    data: [],
    loading: true,
    height: 350,
    width: "100%",
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    height: 350,
    width: "100%",
  },
};
