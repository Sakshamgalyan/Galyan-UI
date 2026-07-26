import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chart } from "./Chart";

const meta: Meta<typeof Chart> = {
  title: "Galyan UI/Chart",
  component: Chart,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["line", "bar", "area", "pie", "donut"],
    },
    height: { control: "number" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof Chart>;

// Mock data for Line, Bar, and Area charts
const trendData = [
  { month: "Jan", revenue: 4500, expenses: 2800, users: 120 },
  { month: "Feb", revenue: 5200, expenses: 3100, users: 150 },
  { month: "Mar", revenue: 4900, expenses: 3400, users: 180 },
  { month: "Apr", revenue: 6300, expenses: 4000, users: 220 },
  { month: "May", revenue: 5800, expenses: 3800, users: 260 },
  { month: "Jun", revenue: 7100, expenses: 4200, users: 310 },
  { month: "Jul", revenue: 8500, expenses: 4900, users: 380 },
];

const seriesConfig = [
  { key: "revenue", name: "Revenue ($)", color: "var(--gy-primary)" },
  { key: "expenses", name: "Expenses ($)", color: "var(--gy-danger)" },
];

// Mock data for Pie and Donut charts
const shareData = [
  { label: "Direct", share: 45, color: "var(--gy-primary)" },
  { label: "Organic Search", share: 25, color: "var(--gy-success)" },
  { label: "Referral", share: 15, color: "var(--gy-warning)" },
  { label: "Social Media", share: 15, color: "var(--gy-info)" },
];

export const LineChartStory: Story = {
  name: "Line Chart",
  args: {
    type: "line",
    data: trendData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
    showGrid: true,
    showLegend: true,
  },
};

export const BarChartStory: Story = {
  name: "Bar Chart",
  args: {
    type: "bar",
    data: trendData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
    showGrid: true,
    showLegend: true,
  },
};

export const AreaChartStory: Story = {
  name: "Area Chart",
  args: {
    type: "area",
    data: trendData,
    xAxisKey: "month",
    series: seriesConfig,
    height: 350,
    showGrid: true,
    showLegend: true,
  },
};

export const PieChartStory: Story = {
  name: "Pie Chart",
  args: {
    type: "pie",
    data: shareData,
    nameKey: "label",
    valueKey: "share",
    height: 350,
    showGrid: false,
    showLegend: true,
  },
};

export const DonutChartStory: Story = {
  name: "Donut Chart",
  args: {
    type: "donut",
    data: shareData,
    nameKey: "label",
    valueKey: "share",
    height: 350,
    showGrid: false,
    showLegend: true,
  },
};
