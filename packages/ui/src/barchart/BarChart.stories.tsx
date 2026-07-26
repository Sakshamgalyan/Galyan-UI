import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BarChart, type BarChartItem } from "./BarChart";

const meta: Meta<typeof BarChart> = {
  title: "Galyan UI/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["cylindrical", "filled", "horizontal"],
    },
    height: { control: "number" },
    showValues: { control: "boolean" },
    loading: { control: "boolean" },
    maxBars: { control: "number" },
  },
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof BarChart>;

// Simple vector icon helper
const createIcon = (color: string) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const sampleData: BarChartItem[] = [
  { label: "E-commerce Store", value: 85000, icon: createIcon("#ffffff") },
  { label: "SaaS Subscriptions", value: 62000, icon: createIcon("#ffffff") },
  { label: "Consulting Services", value: 43000, icon: createIcon("#ffffff") },
  { label: "Mobile Apps Market", value: 71000, icon: createIcon("#ffffff") },
  { label: "Offline Retail Shop", value: 29000, icon: createIcon("#ffffff") },
];

const filledSampleData: BarChartItem[] = [
  {
    label: "E-commerce Store",
    value: 85000,
    icon: createIcon("var(--gy-primary)"),
  },
  {
    label: "SaaS Subscriptions",
    value: 62000,
    icon: createIcon("var(--gy-success)"),
  },
  {
    label: "Consulting Services",
    value: 43000,
    icon: createIcon("var(--gy-warning)"),
  },
  {
    label: "Mobile Apps Market",
    value: 71000,
    icon: createIcon("var(--gy-danger)"),
  },
  {
    label: "Offline Retail Shop",
    value: 29000,
    icon: createIcon("var(--gy-info)"),
  },
];

export const Cylindrical: Story = {
  args: {
    variant: "cylindrical",
    data: sampleData,
    height: 300,
    barWidth: 40,
    barSpacing: 20,
    showValues: true,
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    data: filledSampleData,
    height: 300,
    barWidth: 24,
    barSpacing: 24,
    showValues: true,
  },
};

export const Horizontal: Story = {
  args: {
    variant: "horizontal",
    data: filledSampleData,
    height: 320,
    barWidth: 14,
    barSpacing: 16,
    showValues: true,
  },
};

export const TruncatedLabels: Story = {
  args: {
    variant: "horizontal",
    data: filledSampleData,
    height: 320,
    truncateCharacterAfter: 10,
    showValues: true,
  },
};

export const LoadingState: Story = {
  args: {
    variant: "cylindrical",
    data: [],
    loading: true,
    height: 300,
    maxBars: 5,
  },
};

export const HorizontalLoadingState: Story = {
  args: {
    variant: "horizontal",
    data: [],
    loading: true,
    height: 320,
    maxBars: 5,
  },
};
