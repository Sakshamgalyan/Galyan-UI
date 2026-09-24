import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedNumber } from "./AnimatedNumber";

/**
 * High-performance, butter-smooth animated number component with customizable typography,
 * zero-jitter tabular numerals, luxury easing curves, and rolling odometer mode.
 */
const meta: Meta<typeof AnimatedNumber> = {
  title: "Galyan UI/AnimatedNumber",
  component: AnimatedNumber,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    mode: {
      control: "inline-radio",
      options: ["counter", "roller"],
    },
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
    separator: { control: "text" },
    easing: {
      control: "select",
      options: ["easeOutExpo", "easeOutQuart", "easeOut", "easeInOut", "spring", "linear"],
    },
    animateOnMount: { control: "boolean" },
  },
} satisfies Meta<typeof AnimatedNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 12500,
    prefix: "$",
    mode: "counter",
    variant: "h1",
    weight: "bold",
    duration: 1200,
    decimals: 0,
    easing: "easeOutExpo",
  },
};

export const RollingOdometer: Story = {
  args: {
    value: 84920,
    prefix: "$",
    mode: "roller",
    variant: "h1",
    weight: "bold",
    duration: 1200,
    decimals: 0,
  },
};

export const InteractiveValueToggle: Story = {
  render: (args) => {
    const [val, setVal] = useState(12450);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => setVal(Math.floor(Math.random() * 90000) + 1000)}
          >
            Randomize Value
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => setVal(0)}
          >
            Reset to 0
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => setVal(999999)}
          >
            Set to 1M
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
    duration: 1200,
    decimals: 2,
    mode: "counter",
    easing: "easeOutExpo",
  },
};

export const RollingOdometerInteractive: Story = {
  render: (args) => {
    const [val, setVal] = useState(48291);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => setVal(Math.floor(Math.random() * 90000) + 10000)}
          >
            Randomize Value
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => setVal(val + 100)}
          >
            +100
          </button>
        </div>
        <AnimatedNumber {...args} value={val} />
      </div>
    );
  },
  args: {
    prefix: "$",
    suffix: " USD",
    variant: "h1",
    weight: "bold",
    duration: 1000,
    decimals: 0,
    mode: "roller",
  },
};

export const StatsDashboardCards: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <div
          style={{
            padding: "1.25rem 1.5rem",
            border: "1px solid #e2e8f0",
            borderRadius: "0.75rem",
            background: "#ffffff",
            minWidth: 180,
          }}
        >
          <div style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Total Revenue
          </div>
          <AnimatedNumber
            value={42580}
            prefix="$"
            variant="h3"
            weight="bold"
            duration={1500}
            easing="easeOutExpo"
          />
        </div>
        <div
          style={{
            padding: "1.25rem 1.5rem",
            border: "1px solid #e2e8f0",
            borderRadius: "0.75rem",
            background: "#ffffff",
            minWidth: 180,
          }}
        >
          <div style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Active Subscribers
          </div>
          <AnimatedNumber
            value={14290}
            variant="h3"
            weight="bold"
            duration={1500}
            easing="easeOutExpo"
          />
        </div>
        <div
          style={{
            padding: "1.25rem 1.5rem",
            border: "1px solid #e2e8f0",
            borderRadius: "0.75rem",
            background: "#ffffff",
            minWidth: 180,
          }}
        >
          <div style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
            Conversion Rate
          </div>
          <AnimatedNumber
            value={98.4}
            suffix="%"
            decimals={1}
            variant="h3"
            weight="bold"
            duration={1500}
            easing="easeOutExpo"
          />
        </div>
      </div>
    );
  },
};
