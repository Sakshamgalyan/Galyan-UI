import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";
import React from "react";

const meta: Meta<typeof ProgressBar> = {
  title: "Galyan UI/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress percentage value (0-100)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    type: {
      control: "select",
      options: ["bar", "circular"],
      description: "Display type: linear bar or circular ring",
      table: {
        type: { summary: "'bar' | 'circular'" },
        defaultValue: { summary: "'bar'" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size preset for bar height or circle diameter",
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "gradient",
        "indigo",
        "purple",
      ],
      description:
        "Color theme variant preset (default uses active role theme color)",
      table: {
        type: {
          summary:
            "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gradient' | 'indigo' | 'purple'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    loading: {
      control: "boolean",
      description:
        "Whether the progress bar is in an indeterminate loading state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    indeterminate: {
      control: "boolean",
      description: "Alias for loading state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showValue: {
      control: "boolean",
      description: "Show numerical progress value percentage",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Custom label text above progress bar",
      table: { type: { summary: "string" } },
    },
    color: {
      control: "color",
      description: "Custom bar fill color override",
    },
    trackColor: {
      control: "color",
      description: "Custom track background color override",
    },
    strokeWidth: {
      control: "number",
      description: "Custom stroke width for circular type ring",
      table: { type: { summary: "number" } },
    },
    className: {
      control: "text",
      description: "Additional CSS class names for container",
      table: { type: { summary: "string" } },
    },
    barClassName: {
      control: "text",
      description: "Additional CSS class names for progress bar fill",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

/**
 * Default variant: automatically adopts the role/brand theme color (e.g. green for Customer, blue for Professional, violet for Samantrix).
 */
export const DefaultRoleTheme: Story = {
  name: "Default (Role Theme Color)",
  args: {
    variant: "default",
    progress: 72,
    label: "Role Theme Progress",
    showValue: true,
  },
};

/**
 * Exact replica of the Indeterminate Progress Bar Loading States from user screenshot.
 * Top: "Loading..." with purple indeterminate sliding bar.
 * Bottom: "Processing..." with green indeterminate sliding bar.
 */
export const LoadingStateMatch: Story = {
  name: "Loading & Processing States (User Upload Match)",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "480px",
        padding: "1rem",
      }}
    >
      <ProgressBar loading variant="purple" label="Loading..." size="md" />
      <ProgressBar loading variant="success" label="Processing..." size="md" />
    </div>
  ),
};

export const AllLoadingVariants: Story = {
  name: "All Loading Variants (Dual Fluid Waves & Glow)",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        maxWidth: "500px",
        padding: "1.25rem",
        background: "#ffffff",
        borderRadius: "1rem",
        border: "1px solid #e2e8f0",
      }}
    >
      <ProgressBar
        loading
        variant="purple"
        label="Purple Fluid Wave"
        size="md"
      />
      <ProgressBar
        loading
        variant="primary"
        label="Primary Fluid Wave"
        size="md"
      />
      <ProgressBar
        loading
        variant="success"
        label="Success Fluid Wave"
        size="md"
      />
      <ProgressBar
        loading
        variant="gradient"
        label="Vibrant Gradient Wave"
        size="md"
      />
      <ProgressBar
        loading
        variant="warning"
        label="Warning Fluid Wave"
        size="md"
      />
      <ProgressBar
        loading
        variant="danger"
        label="Danger Fluid Wave"
        size="md"
      />
      <ProgressBar loading variant="info" label="Info Fluid Wave" size="md" />
    </div>
  ),
};

export const DeterminateWithLoadingShimmer: Story = {
  name: "Active Progress with Luminous Shimmer",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "480px",
        padding: "1rem",
      }}
    >
      <ProgressBar
        progress={68}
        loading
        variant="purple"
        label="Uploading assets..."
        showValue
        size="md"
      />
      <ProgressBar
        progress={42}
        loading
        variant="gradient"
        label="Building deployment bundle..."
        showValue
        size="lg"
      />
      <ProgressBar
        progress={85}
        loading
        variant="success"
        label="Syncing database records..."
        showValue
        size="md"
      />
    </div>
  ),
};

export const InteractiveLoadingDemo: Story = {
  name: "Interactive Loading Toggle",
  render: function InteractiveStory() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [val, setVal] = React.useState(60);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "480px",
          padding: "1.25rem",
          background: "#ffffff",
          borderRadius: "1rem",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setIsLoading((prev) => !prev)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: isLoading ? "#8b5cf6" : "#f1f5f9",
              color: isLoading ? "#ffffff" : "#0f172a",
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 600,
            }}
          >
            {isLoading ? "Loading: ON" : "Loading: OFF"}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span
            style={{ fontSize: "0.8125rem", fontWeight: 600, minWidth: "35px" }}
          >
            {val}%
          </span>
        </div>

        <ProgressBar
          progress={val}
          loading={isLoading}
          variant="purple"
          label={isLoading ? "Processing files..." : "Sync Completed"}
          showValue
          size="md"
        />

        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <ProgressBar
            type="circular"
            progress={val}
            loading={isLoading}
            variant="purple"
            size="md"
            showValue
          />
          <ProgressBar
            type="circular"
            progress={val}
            loading={isLoading}
            variant="gradient"
            size="lg"
            showValue
          />
        </div>
      </div>
    );
  },
};

export const DefaultLinearBar: Story = {
  args: {
    progress: 65,
    type: "bar",
    size: "md",
    variant: "primary",
    label: "Downloading update",
    showValue: true,
  },
};

export const IndeterminateCircularRings: Story = {
  name: "Indeterminate Circular Spinners",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <ProgressBar type="circular" loading size="sm" variant="purple" />
      <ProgressBar
        type="circular"
        loading
        size="md"
        variant="indigo"
        label="Syncing"
      />
      <ProgressBar
        type="circular"
        loading
        size="lg"
        variant="success"
        label="Uploading"
      />
    </div>
  ),
};

export const DefaultCircularRing: Story = {
  args: {
    progress: 78,
    type: "circular",
    size: "lg",
    variant: "gradient",
    label: "Storage",
    showValue: true,
  },
};

export const LinearBarVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "500px",
      }}
    >
      <ProgressBar
        progress={75}
        variant="primary"
        label="Primary Progress"
        showValue
      />
      <ProgressBar
        progress={60}
        variant="success"
        label="Success Progress"
        showValue
      />
      <ProgressBar
        progress={45}
        variant="warning"
        label="Warning Progress"
        showValue
      />
      <ProgressBar
        progress={90}
        variant="danger"
        label="Danger Progress"
        showValue
      />
      <ProgressBar
        progress={80}
        variant="info"
        label="Info Progress"
        showValue
      />
      <ProgressBar
        progress={65}
        variant="indigo"
        label="Indigo Progress"
        showValue
      />
      <ProgressBar
        progress={70}
        variant="purple"
        label="Purple Progress"
        showValue
      />
      <ProgressBar
        progress={85}
        variant="gradient"
        label="Gradient Progress"
        showValue
      />
    </div>
  ),
};

export const CircularRingVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <ProgressBar
        type="circular"
        progress={75}
        size="sm"
        variant="primary"
        showValue
      />
      <ProgressBar
        type="circular"
        progress={85}
        size="md"
        variant="indigo"
        showValue
        label="Disk"
      />
      <ProgressBar
        type="circular"
        progress={92}
        size="lg"
        variant="gradient"
        showValue
        label="Score"
      />
      <ProgressBar
        type="circular"
        progress={60}
        size="xl"
        variant="success"
        showValue
        label="Battery"
      />
    </div>
  ),
};
