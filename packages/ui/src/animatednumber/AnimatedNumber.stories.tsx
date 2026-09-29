import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedNumber } from "./AnimatedNumber";

/**
 * High-performance, butter-smooth animated number component with customizable typography,
 * zero-jitter tabular numerals, luxury easing curves, rolling odometer mode, vertical slide mode,
 * and 3D split-flap flip transitions.
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
      options: ["counter", "roller", "slide", "flip"],
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
    revolutions: { control: { type: "range", min: 0, max: 5, step: 1 } },
    stagger: { control: { type: "range", min: 0, max: 100, step: 5 } },
    staggerDirection: {
      control: "inline-radio",
      options: ["right-to-left", "left-to-right"],
    },
    showGradientMask: { control: "boolean" },
    pulseOnUpdate: { control: "boolean" },
    easing: {
      control: "select",
      options: [
        "easeOutExpo",
        "easeOutQuart",
        "easeOut",
        "easeInOut",
        "spring",
        "bounce",
        "linear",
      ],
    },
    animateOnMount: { control: "boolean" },
  },
};

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
    duration: 1400,
    revolutions: 2,
    stagger: 40,
    easing: "easeOutExpo",
    showGradientMask: true,
  },
};

export const SpringBounceTransition: Story = {
  args: {
    value: 94820,
    prefix: "$",
    mode: "roller",
    variant: "h1",
    weight: "bold",
    duration: 1300,
    revolutions: 2,
    easing: "spring",
    showGradientMask: true,
  },
};

export const SlideTransition: Story = {
  args: {
    value: 54930,
    prefix: "$",
    mode: "slide",
    variant: "h1",
    weight: "bold",
    duration: 500,
    easing: "easeOutExpo",
    showGradientMask: true,
  },
};

export const FlipClock3D: Story = {
  args: {
    value: 78420,
    prefix: "$",
    mode: "flip",
    variant: "h1",
    weight: "bold",
    duration: 600,
    easing: "spring",
  },
};

export const TransitionModesShowcase: Story = {
  render: function Render() {
    const [val, setVal] = useState(62840);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          padding: "1.5rem",
          width: "100%",
          maxWidth: 680,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
            onClick={() => setVal(Math.floor(Math.random() * 90000) + 10000)}
          >
            Randomize Value
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
            onClick={() => setVal((v) => v + 250)}
          >
            +250
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
            onClick={() => setVal(999999)}
          >
            Set to 1M
          </button>
          <button
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
            onClick={() => setVal(1200)}
          >
            Reset
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
            width: "100%",
          }}
        >
          {/* 1. Multi-turn Roller */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#64748b",
                marginBottom: "0.5rem",
              }}
            >
              Multi-Revolution Roller
            </div>
            <AnimatedNumber
              value={val}
              prefix="$"
              mode="roller"
              variant="h3"
              weight="bold"
              duration={1300}
              revolutions={2}
              stagger={35}
              easing="spring"
              showGradientMask
            />
          </div>

          {/* 2. Slide Ticker */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#64748b",
                marginBottom: "0.5rem",
              }}
            >
              Vertical Slide Ticker
            </div>
            <AnimatedNumber
              value={val}
              prefix="$"
              mode="slide"
              variant="h3"
              weight="bold"
              duration={500}
              easing="easeOutExpo"
              showGradientMask
            />
          </div>

          {/* 3. 3D Split-Flap Flip */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#64748b",
                marginBottom: "0.5rem",
              }}
            >
              3D Split-Flap Flip
            </div>
            <AnimatedNumber
              value={val}
              prefix="$"
              mode="flip"
              variant="h3"
              weight="bold"
              duration={600}
              easing="spring"
            />
          </div>

          {/* 4. Pulse Counter */}
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#64748b",
                marginBottom: "0.5rem",
              }}
            >
              Interpolating Counter
            </div>
            <AnimatedNumber
              value={val}
              prefix="$"
              mode="counter"
              variant="h3"
              weight="bold"
              duration={1000}
              easing="easeOutExpo"
              pulseOnUpdate
            />
          </div>
        </div>
      </div>
    );
  },
};

export const InteractiveValueToggle: Story = {
  render: function Render(args) {
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
  render: function Render(args) {
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
    duration: 1200,
    revolutions: 2,
    stagger: 35,
    easing: "spring",
    decimals: 0,
    mode: "roller",
    showGradientMask: true,
  },
};

export const StatsDashboardCards: Story = {
  render: function Render() {
    const [metricMultiplier, setMetricMultiplier] = useState(1);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <button
          style={{
            padding: "0.4rem 0.875rem",
            fontSize: "0.8125rem",
            borderRadius: "0.375rem",
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() =>
            setMetricMultiplier((m) => (m === 1 ? 1.45 : m === 1.45 ? 0.8 : 1))
          }
        >
          Toggle Live Inflow Surge
        </button>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "1.25rem 1.5rem",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              background: "#ffffff",
              minWidth: 180,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                color: "#64748b",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              Total Revenue
            </div>
            <AnimatedNumber
              value={Math.round(42580 * metricMultiplier)}
              prefix="$"
              mode="roller"
              revolutions={2}
              variant="h3"
              weight="bold"
              duration={1300}
              easing="spring"
              showGradientMask
            />
          </div>
          <div
            style={{
              padding: "1.25rem 1.5rem",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              background: "#ffffff",
              minWidth: 180,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                color: "#64748b",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              Active Subscribers
            </div>
            <AnimatedNumber
              value={Math.round(14290 * metricMultiplier)}
              mode="slide"
              variant="h3"
              weight="bold"
              duration={600}
              easing="easeOutExpo"
              showGradientMask
            />
          </div>
          <div
            style={{
              padding: "1.25rem 1.5rem",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              background: "#ffffff",
              minWidth: 180,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                color: "#64748b",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              Conversion Rate
            </div>
            <AnimatedNumber
              value={+(98.4 * Math.min(1.01, metricMultiplier)).toFixed(1)}
              suffix="%"
              decimals={1}
              mode="roller"
              variant="h3"
              weight="bold"
              duration={1200}
              easing="spring"
              showGradientMask
            />
          </div>
        </div>
      </div>
    );
  },
};
