import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimelineChart } from "./TimelineChart";

const meta: Meta<typeof TimelineChart> = {
  title: "Galyan UI/TimelineChart",
  component: TimelineChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof TimelineChart>;

export default meta;
type Story = StoryObj<typeof TimelineChart>;

const sprintTasks = [
  { label: "Planning", start: 0, end: 3 },
  { label: "Design Mockups", start: 2, end: 5 },
  { label: "Database Setup", start: 4, end: 7 },
  { label: "API Development", start: 6, end: 12 },
  { label: "Frontend UI", start: 8, end: 14 },
  { label: "Integration testing", start: 12, end: 17 },
  { label: "Deployment", start: 16, end: 18 },
];

export const Default: Story = {
  args: {
    data: sprintTasks,
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
