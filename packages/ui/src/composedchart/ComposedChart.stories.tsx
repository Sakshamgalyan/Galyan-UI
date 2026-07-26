import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ComposedChart } from "./ComposedChart";

const meta: Meta<typeof ComposedChart> = {
  title: "Galyan UI/ComposedChart",
  component: ComposedChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof ComposedChart>;

export default meta;
type Story = StoryObj<typeof ComposedChart>;

const trendData = [
  { month: "Jan", revenue: 4500, expenses: 2800, target: 4000 },
  { month: "Feb", revenue: 5200, expenses: 3100, target: 4200 },
  { month: "Mar", revenue: 4900, expenses: 3400, target: 4400 },
  { month: "Apr", revenue: 6300, expenses: 4000, target: 4600 },
  { month: "May", revenue: 5800, expenses: 3800, target: 4800 },
  { month: "Jun", revenue: 7100, expenses: 4200, target: 5000 },
  { month: "Jul", revenue: 8500, expenses: 4900, target: 5200 },
];

const seriesConfig = [
  { key: "revenue", type: "bar", name: "Revenue", color: "var(--gy-primary)" },
  {
    key: "expenses",
    type: "area",
    name: "Expenses",
    color: "var(--gy-danger)",
  },
  {
    key: "target",
    type: "line",
    name: "Target Target",
    color: "var(--gy-success)",
  },
] as const;

export const Default: Story = {
  args: {
    data: trendData,
    xAxisKey: "month",
    series: [...seriesConfig],
    height: 350,
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};
