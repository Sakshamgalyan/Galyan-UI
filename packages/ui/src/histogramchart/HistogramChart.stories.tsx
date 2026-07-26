import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HistogramChart } from "./HistogramChart";

const meta: Meta<typeof HistogramChart> = {
  title: "Galyan UI/HistogramChart",
  component: HistogramChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
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

export const Default: Story = {
  args: {
    data: binsData,
    height: 350,
    color: "var(--gy-primary)",
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};
