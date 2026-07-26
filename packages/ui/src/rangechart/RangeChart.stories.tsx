import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RangeChart } from "./RangeChart";

const meta: Meta<typeof RangeChart> = {
  title: "Galyan UI/RangeChart",
  component: RangeChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof RangeChart>;

export default meta;
type Story = StoryObj<typeof RangeChart>;

const temperatureData = [
  { day: "Mon", minTemp: 18, maxTemp: 24 },
  { day: "Tue", minTemp: 19, maxTemp: 26 },
  { day: "Wed", minTemp: 20, maxTemp: 28 },
  { day: "Thu", minTemp: 17, maxTemp: 23 },
  { day: "Fri", minTemp: 16, maxTemp: 22 },
  { day: "Sat", minTemp: 18, maxTemp: 25 },
  { day: "Sun", minTemp: 20, maxTemp: 27 },
];

export const Default: Story = {
  args: {
    data: temperatureData,
    xAxisKey: "day",
    lowKey: "minTemp",
    highKey: "maxTemp",
    name: "Temperature Range",
    color: "var(--gy-primary)",
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
