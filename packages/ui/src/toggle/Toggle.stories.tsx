import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Galyan UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    withIcon: {
      control: "boolean",
      description: "Whether to show icons inside the toggle",
    },
    label: {
      control: "text",
      description: "Text label displayed next to the toggle",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    isDisabled: {
      control: "boolean",
      description: "If true, the toggle will be disabled",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for interactive states in Storybook
const InteractiveToggle = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Toggle
      {...args}
      checked={args.checked !== undefined ? args.checked : checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
  render: (args) => <InteractiveToggle {...args} />,
};

export const WithIcons: Story = {
  args: {
    label: "Dark mode",
    withIcon: true,
  },
  render: (args) => <InteractiveToggle {...args} />,
};

export const CustomIcons: Story = {
  args: {
    label: "Custom Theme",
    withIcon: true,
    icon: {
      on: <span style={{ fontSize: "0.65rem" }}>🌙</span>,
      off: <span style={{ fontSize: "0.65rem" }}>☀️</span>,
    },
  },
  render: (args) => <InteractiveToggle {...args} />,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toggle label="Disabled off" isDisabled />
      <Toggle label="Disabled on" isDisabled checked />
      <Toggle label="Disabled with icon" isDisabled checked withIcon />
    </div>
  ),
};
