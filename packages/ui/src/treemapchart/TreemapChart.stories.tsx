import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TreemapChart } from "./TreemapChart";

const meta: Meta<typeof TreemapChart> = {
  title: "Galyan UI/TreemapChart",
  component: TreemapChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof TreemapChart>;

export default meta;
type Story = StoryObj<typeof TreemapChart>;

const treemapData = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 150 },
  { name: "Category D", value: 200 },
  { name: "Category E", value: 80 },
  { name: "Category F", value: 120 },
];

export const Default: Story = {
  args: {
    data: treemapData,
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
