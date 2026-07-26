import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScatterChart } from "./ScatterChart";

const meta: Meta<typeof ScatterChart> = {
  title: "Galyan UI/ScatterChart",
  component: ScatterChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof ScatterChart>;

export default meta;
type Story = StoryObj<typeof ScatterChart>;

const scatterData = [
  { x: 10, y: 30, name: "A" },
  { x: 30, y: 200, name: "B" },
  { x: 45, y: 100, name: "C" },
  { x: 50, y: 400, name: "D" },
  { x: 70, y: 150, name: "E" },
  { x: 100, y: 250, name: "F" },
  { x: 120, y: 500, name: "G" },
];

export const Default: Story = {
  args: {
    data: scatterData,
    name: "User Signups",
    xLabel: "Ad Spend ($)",
    yLabel: "Signups Count",
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
