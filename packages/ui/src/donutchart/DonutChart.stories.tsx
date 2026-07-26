import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DonutChart } from "./DonutChart";

const meta: Meta<typeof DonutChart> = {
  title: "Galyan UI/DonutChart",
  component: DonutChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "semi"],
    },
    height: { control: "number" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof DonutChart>;

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

export const SemiDonut: Story = {
  args: {
    ...Standard.args,
    variant: "semi",
  },
};

export const LoadingState: Story = {
  args: {
    ...Standard.args,
    loading: true,
    data: [],
  },
};
