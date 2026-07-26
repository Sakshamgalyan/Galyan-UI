import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChoroplethMap } from "./ChoroplethMap";

const meta: Meta<typeof ChoroplethMap> = {
  title: "Galyan UI/ChoroplethMap",
  component: ChoroplethMap,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof ChoroplethMap>;

export default meta;
type Story = StoryObj<typeof ChoroplethMap>;

const sampleStateData = [
  { id: "CA", value: 92000 },
  { id: "TX", value: 84000 },
  { id: "NY", value: 71000 },
  { id: "FL", value: 65000 },
  { id: "IL", value: 43000 },
  { id: "PA", value: 39000 },
  { id: "OH", value: 29000 },
  { id: "GA", value: 31000 },
  { id: "NC", value: 24000 },
  { id: "MI", value: 18000 },
];

export const Default: Story = {
  args: {
    data: sampleStateData,
    height: 360,
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};
