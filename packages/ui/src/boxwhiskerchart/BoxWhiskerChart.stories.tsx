import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BoxWhiskerChart } from "./BoxWhiskerChart";

const meta: Meta<typeof BoxWhiskerChart> = {
  title: "Galyan UI/BoxWhiskerChart",
  component: BoxWhiskerChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    width: { control: "number" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof BoxWhiskerChart>;

export default meta;
type Story = StoryObj<typeof BoxWhiskerChart>;

const boxPlotData = [
  { label: "Group A", min: 10, q1: 25, median: 45, q3: 60, max: 95 },
  { label: "Group B", min: 20, q1: 35, median: 50, q3: 75, max: 110 },
  { label: "Group C", min: 5, q1: 15, median: 30, q3: 45, max: 80 },
];

export const Default: Story = {
  args: {
    data: boxPlotData,
    height: 350,
    width: 500,
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
