import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ParetoChart } from "./ParetoChart";

const meta: Meta<typeof ParetoChart> = {
  title: "Galyan UI/ParetoChart",
  component: ParetoChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof ParetoChart>;

export default meta;
type Story = StoryObj<typeof ParetoChart>;

const defectsData = [
  { name: "Late Delivery", value: 45 },
  { name: "Broken Screen", value: 30 },
  { name: "Wrong Color", value: 12 },
  { name: "Software Bug", value: 8 },
  { name: "Bad Packaging", value: 5 },
];

export const Default: Story = {
  args: {
    data: defectsData,
    height: 350,
    barColor: "var(--gy-primary)",
    lineColor: "var(--gy-danger)",
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};
