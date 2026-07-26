import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TriangularChart } from "./TriangularChart";

const meta: Meta<typeof TriangularChart> = {
  title: "Galyan UI/TriangularChart",
  component: TriangularChart,
  tags: ["autodocs"],
  argTypes: {
    height: { control: "number" },
    width: { control: "number" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof TriangularChart>;

export default meta;
type Story = StoryObj<typeof TriangularChart>;

const soilClassification = [
  { a: 60, b: 20, c: 20, name: "Heavy Clay" },
  { a: 15, b: 65, c: 20, name: "Silty Loam" },
  { a: 20, b: 20, c: 60, name: "Sandy Loam" },
  { a: 33, b: 33, c: 33, name: "Medium Loam" },
  { a: 10, b: 10, c: 80, name: "Loamy Sand" },
];

export const Default: Story = {
  args: {
    data: soilClassification,
    labelA: "Clay (A)",
    labelB: "Silt (B)",
    labelC: "Sand (C)",
    height: 380,
    width: 400,
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [],
  },
};
