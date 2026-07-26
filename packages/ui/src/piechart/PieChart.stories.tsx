import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "./PieChart";

const meta: Meta<typeof PieChart> = {
  title: "Galyan UI/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "segmented"],
    },
    height: { control: "number" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof PieChart>;

const sampleData = [
  { name: "Direct", value: 45, color: "var(--gy-primary)" },
  { name: "Organic Search", value: 25, color: "var(--gy-success)" },
  { name: "Referral", value: 15, color: "var(--gy-warning)" },
  { name: "Social Media", value: 15, color: "var(--gy-info)" },
];

export const Standard: Story = {
  args: {
    variant: "standard",
    data: sampleData,
    height: 350,
  },
};

export const Segmented: Story = {
  args: {
    ...Standard.args,
    variant: "segmented",
  },
};

export const LoadingState: Story = {
  args: {
    ...Standard.args,
    loading: true,
    data: [],
  },
};
