import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GaugeChart } from "./GaugeChart";

const meta: Meta<typeof GaugeChart> = {
  title: "Galyan UI/GaugeChart",
  component: GaugeChart,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    needle: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof GaugeChart>;

export const Default: Story = {
  args: {
    value: 72,
    needle: true,
    height: 200,
    width: 300,
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};
