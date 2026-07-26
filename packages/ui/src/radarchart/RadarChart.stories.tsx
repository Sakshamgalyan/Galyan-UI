import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "./RadarChart";

const meta: Meta<typeof RadarChart> = {
  title: "Galyan UI/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "filled"],
    },
    height: { control: "number" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof RadarChart>;

export default meta;
type Story = StoryObj<typeof RadarChart>;

const radarData = [
  { subject: "Speed", playerA: 120, playerB: 110 },
  { subject: "Shooting", playerA: 98, playerB: 130 },
  { subject: "Passing", playerA: 86, playerB: 95 },
  { subject: "Dribbling", playerA: 99, playerB: 90 },
  { subject: "Defending", playerA: 85, playerB: 115 },
  { subject: "Physical", playerA: 65, playerB: 85 },
];

const seriesConfig = [
  { key: "playerA", name: "Player A", color: "var(--gy-primary)" },
  { key: "playerB", name: "Player B", color: "var(--gy-success)" },
];

export const Filled: Story = {
  args: {
    variant: "filled",
    data: radarData,
    angleKey: "subject",
    series: seriesConfig,
    height: 350,
  },
};

export const Standard: Story = {
  args: {
    ...Filled.args,
    variant: "standard",
  },
};

export const LoadingState: Story = {
  args: {
    ...Filled.args,
    loading: true,
    data: [],
  },
};
