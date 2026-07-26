import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StackedChart } from "./StackedChart";

const meta: Meta<typeof StackedChart> = {
  title: "Galyan UI/StackedChart",
  component: StackedChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bar", "area"],
    },
    height: { control: "number" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof StackedChart>;

export default meta;
type Story = StoryObj<typeof StackedChart>;

const sampleData = [
  { month: "Jan", organic: 120, paid: 80, referral: 30 },
  { month: "Feb", organic: 140, paid: 95, referral: 45 },
  { month: "Mar", organic: 170, paid: 110, referral: 40 },
  { month: "Apr", organic: 150, paid: 130, referral: 55 },
  { month: "May", organic: 200, paid: 150, referral: 70 },
  { month: "Jun", organic: 220, paid: 180, referral: 80 },
];

const seriesConfig = [
  { key: "organic", name: "Organic Traffic", color: "var(--gy-primary)" },
  { key: "paid", name: "Paid Campaigns", color: "var(--gy-success)" },
  { key: "referral", name: "Referral Sources", color: "var(--gy-warning)" },
];

export const Bar: Story = {
  args: {
    variant: "bar",
    data: sampleData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
  },
};

export const Area: Story = {
  args: {
    ...Bar.args,
    variant: "area",
  },
};

export const LoadingState: Story = {
  args: {
    ...Bar.args,
    loading: true,
    data: [],
  },
};
