import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "./AreaChart";

const meta: Meta<typeof AreaChart> = {
  title: "Galyan UI/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["gradient", "solid"],
    },
    height: { control: "number" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof AreaChart>;

const trendData = [
  { month: "Jan", revenue: 4500, expenses: 2800 },
  { month: "Feb", revenue: 5200, expenses: 3100 },
  { month: "Mar", revenue: 4900, expenses: 3400 },
  { month: "Apr", revenue: 6300, expenses: 4000 },
  { month: "May", revenue: 5800, expenses: 3800 },
  { month: "Jun", revenue: 7100, expenses: 4200 },
  { month: "Jul", revenue: 8500, expenses: 4900 },
];

const seriesConfig = [
  { key: "revenue", name: "Revenue", color: "var(--gy-primary)" },
  { key: "expenses", name: "Expenses", color: "var(--gy-danger)" },
];

export const Gradient: Story = {
  args: {
    variant: "gradient",
    data: trendData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
  },
};

export const Solid: Story = {
  args: {
    ...Gradient.args,
    variant: "solid",
  },
};

export const LoadingState: Story = {
  args: {
    ...Gradient.args,
    loading: true,
    data: [],
  },
};
