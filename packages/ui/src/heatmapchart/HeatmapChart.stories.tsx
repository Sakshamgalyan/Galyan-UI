import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HeatmapChart } from "./HeatmapChart";

const meta: Meta<typeof HeatmapChart> = {
  title: "Galyan UI/HeatmapChart",
  component: HeatmapChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof HeatmapChart>;

export default meta;
type Story = StoryObj<typeof HeatmapChart>;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["Morning", "Afternoon", "Evening", "Night"];

const heatmapData = [
  { x: "Mon", y: "Morning", value: 12 },
  { x: "Mon", y: "Afternoon", value: 45 },
  { x: "Mon", y: "Evening", value: 78 },
  { x: "Mon", y: "Night", value: 3 },
  { x: "Tue", y: "Morning", value: 24 },
  { x: "Tue", y: "Afternoon", value: 50 },
  { x: "Tue", y: "Evening", value: 85 },
  { x: "Tue", y: "Night", value: 8 },
  { x: "Wed", y: "Morning", value: 31 },
  { x: "Wed", y: "Afternoon", value: 40 },
  { x: "Wed", y: "Evening", value: 92 },
  { x: "Wed", y: "Night", value: 10 },
  { x: "Thu", y: "Morning", value: 15 },
  { x: "Thu", y: "Afternoon", value: 62 },
  { x: "Thu", y: "Evening", value: 70 },
  { x: "Thu", y: "Night", value: 5 },
  { x: "Fri", y: "Morning", value: 40 },
  { x: "Fri", y: "Afternoon", value: 88 },
  { x: "Fri", y: "Evening", value: 110 },
  { x: "Fri", y: "Night", value: 18 },
];

export const Default: Story = {
  args: {
    data: heatmapData,
    xAxisLabels: days,
    yAxisLabels: hours,
    height: 300,
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};
