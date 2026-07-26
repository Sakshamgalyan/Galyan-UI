import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CorrelationChart } from "./CorrelationChart";

const meta: Meta<typeof CorrelationChart> = {
  title: "Galyan UI/CorrelationChart",
  component: CorrelationChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof CorrelationChart>;

export default meta;
type Story = StoryObj<typeof CorrelationChart>;

const variablesList = ["Age", "Income", "Education", "Spending"];
const correlationMatrix = [
  [1.0, 0.45, 0.12, -0.22],
  [0.45, 1.0, 0.65, 0.55],
  [0.12, 0.65, 1.0, 0.38],
  [-0.22, 0.55, 0.38, 1.0],
];

export const Default: Story = {
  args: {
    variables: variablesList,
    matrix: correlationMatrix,
    height: 350,
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    matrix: [],
  },
};
