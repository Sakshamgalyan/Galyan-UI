import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedNumber } from "./AnimatedNumber";

/**
 * Smoothly animates numeric transitions with customizable typography variants and font weights.
 */
const meta: Meta<typeof AnimatedNumber> = {
  title: "Galyan UI/AnimatedNumber",
  component: AnimatedNumber,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"],
    },
    weight: {
      control: "select",
      options: ["bold", "semibold", "medium", "regular", "light"],
    },
    duration: { control: { type: "range", min: 300, max: 3000, step: 100 } },
    prefix: { control: "text" },
    suffix: { control: "text" },
    decimals: { control: { type: "number", min: 0, max: 4 } },
    easing: {
      control: "inline-radio",
      options: ["linear", "easeOut", "easeInOut"],
    },
  },
} satisfies Meta<typeof AnimatedNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 12500,
    prefix: "$",
    variant: "h2",
    weight: "bold",
    duration: 1200,
    decimals: 0,
    easing: "easeOut",
  },
};

export const InteractiveValueToggle: Story = {
  render: (args) => {
    const [val, setVal] = useState(1000);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{ padding: "0.375rem 0.75rem", cursor: "pointer" }}
            onClick={() => setVal(Math.floor(Math.random() * 50000))}
          >
            Randomize Value
          </button>
          <button
            style={{ padding: "0.375rem 0.75rem", cursor: "pointer" }}
            onClick={() => setVal(0)}
          >
            Reset to 0
          </button>
        </div>
        <AnimatedNumber {...args} value={val} />
      </div>
    );
  },
  args: {
    prefix: "$",
    variant: "h1",
    weight: "bold",
    duration: 1500,
    decimals: 2,
  },
};
