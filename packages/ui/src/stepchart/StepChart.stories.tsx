import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StepChart } from "./StepChart";

const meta: Meta<typeof StepChart> = {
  title: "Galyan UI/StepChart",
  component: StepChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["line", "area"],
    },
    height: { control: "number" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof StepChart>;

export default meta;
type Story = StoryObj<typeof StepChart>;

const stepData = [
  { step: "Step 1", value: 10 },
  { step: "Step 2", value: 25 },
  { step: "Step 3", value: 18 },
  { step: "Step 4", value: 42 },
  { step: "Step 5", value: 30 },
  { step: "Step 6", value: 55 },
];

const seriesConfig = [
  { key: "value", name: "Progress Level", color: "var(--gy-primary)" },
];

export const Line: Story = {
  args: {
    variant: "line",
    data: stepData,
    xAxisKey: "step",
    series: seriesConfig,
    height: 350,
  },
};

export const Area: Story = {
  args: {
    ...Line.args,
    variant: "area",
  },
};

export const LoadingState: Story = {
  args: {
    ...Line.args,
    loading: true,
    data: [],
  },
};
