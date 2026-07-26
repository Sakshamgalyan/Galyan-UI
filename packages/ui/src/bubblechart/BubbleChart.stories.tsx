import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BubbleChart } from "./BubbleChart";

const meta: Meta<typeof BubbleChart> = {
  title: "Galyan UI/BubbleChart",
  component: BubbleChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof BubbleChart>;

export default meta;
type Story = StoryObj<typeof BubbleChart>;

const bubbleData = [
  { x: 10, y: 30, z: 120, name: "A" },
  { x: 30, y: 200, z: 450, name: "B" },
  { x: 45, y: 100, z: 90, name: "C" },
  { x: 50, y: 400, z: 300, name: "D" },
  { x: 70, y: 150, z: 240, name: "E" },
  { x: 100, y: 250, z: 600, name: "F" },
  { x: 120, y: 500, z: 180, name: "G" },
];

export const Default: Story = {
  args: {
    data: bubbleData,
    name: "Customer Value",
    xLabel: "Usage (Hours)",
    yLabel: "Engagement Score",
    zLabel: "Revenue ($)",
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
