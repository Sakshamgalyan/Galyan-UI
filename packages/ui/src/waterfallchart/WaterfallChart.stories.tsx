import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { WaterfallChart } from "./WaterfallChart";

const meta: Meta<typeof WaterfallChart> = {
  title: "Galyan UI/WaterfallChart",
  component: WaterfallChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof WaterfallChart>;

export default meta;
type Story = StoryObj<typeof WaterfallChart>;

const revenueBridge = [
  { label: "Start (Q1)", value: 100, isTotal: true },
  { label: "New Product", value: 30 },
  { label: "Services", value: 15 },
  { label: "Churn", value: -20 },
  { label: "Discounts", value: -10 },
  { label: "End (Q2)", value: 115, isTotal: true },
];

export const Default: Story = {
  args: {
    data: revenueBridge,
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
