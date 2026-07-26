import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FinancialChart } from "./FinancialChart";

const meta: Meta<typeof FinancialChart> = {
  title: "Galyan UI/FinancialChart",
  component: FinancialChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    showGrid: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof FinancialChart>;

export default meta;
type Story = StoryObj<typeof FinancialChart>;

const stockData = [
  { date: "Mon", open: 120, high: 128, low: 118, close: 125 },
  { date: "Tue", open: 125, high: 130, low: 122, close: 123 },
  { date: "Wed", open: 123, high: 124, low: 115, close: 118 },
  { date: "Thu", open: 118, high: 126, low: 117, close: 124 },
  { date: "Fri", open: 124, high: 132, low: 123, close: 131 },
];

export const Candlestick: Story = {
  args: {
    data: stockData,
    xAxisKey: "date",
    height: 350,
  },
};

export const LoadingState: Story = {
  args: {
    ...Candlestick.args,
    loading: true,
    data: [],
  },
};
