import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Galyan UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size of the checkbox",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    color: {
      control: "radio",
      options: ["primary", "error"],
      description: "Color theme of the checkbox",
      table: {
        type: { summary: "primary | error" },
        defaultValue: { summary: "primary" },
      },
    },
    variant: {
      control: "radio",
      options: ["solid", "outline", "soft"],
      description: "The variant style of the checkbox",
      table: {
        type: { summary: "solid | outline | soft" },
        defaultValue: { summary: "solid" },
      },
    },
    label: {
      control: "text",
      description: "Text label displayed next to the checkbox",
    },
    description: {
      control: "text",
      description: "Secondary helper text underneath label",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    indeterminate: {
      control: "boolean",
      description: "If true, renders the checkbox in an indeterminate state",
    },
    isDisabled: {
      control: "boolean",
      description: "If true, the checkbox will be disabled",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for interactive states in Storybook
const InteractiveCheckbox = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Checkbox
      {...args}
      checked={args.checked !== undefined ? args.checked : checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 420 }}>
      <InteractiveCheckbox
        label="Two-factor authentication"
        description="Receive a secure SMS confirmation code whenever you sign in."
        defaultChecked
      />
      <InteractiveCheckbox
        label="Weekly telemetry & performance digest"
        description="Get actionable summaries of error rates and API latency."
      />
      <InteractiveCheckbox
        label="Beta feature access"
        description="Test unreleased experimental components before public rollouts."
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <InteractiveCheckbox size="sm" label="Small checkbox (16px)" />
      <InteractiveCheckbox size="md" label="Medium checkbox (20px)" defaultChecked />
      <InteractiveCheckbox size="lg" label="Large checkbox (24px)" defaultChecked />
    </div>
  ),
};

export const ColorsAndVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <strong style={{ fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>Primary Brand</strong>
        <InteractiveCheckbox
          color="primary"
          variant="solid"
          label="Solid Primary"
          checked
        />
        <InteractiveCheckbox
          color="primary"
          variant="outline"
          label="Outline Primary"
          checked
        />
        <InteractiveCheckbox
          color="primary"
          variant="soft"
          label="Soft Primary"
          checked
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <strong style={{ fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>Error / Danger</strong>
        <InteractiveCheckbox
          color="error"
          variant="solid"
          label="Solid Error"
          checked
        />
        <InteractiveCheckbox
          color="error"
          variant="outline"
          label="Outline Error"
          checked
        />
        <InteractiveCheckbox
          color="error"
          variant="soft"
          label="Soft Error"
          checked
        />
      </div>
    </div>
  ),
};

export const SelectAllGroup: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "easyLife Customer App", checked: true },
      { id: "2", label: "metalixia Dashboard", checked: false },
      { id: "3", label: "samantrix Dark Studio", checked: true },
    ]);

    const allChecked = items.every((i) => i.checked);
    const isIndeterminate = items.some((i) => i.checked) && !allChecked;

    const handleSelectAll = () => {
      const next = !allChecked;
      setItems(items.map((i) => ({ ...i, checked: next })));
    };

    const toggle = (id: string) => {
      setItems(items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: 280 }}>
        <Checkbox
          label="Select all workspaces"
          checked={allChecked}
          indeterminate={isIndeterminate}
          onChange={handleSelectAll}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: "1.75rem" }}>
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox label="Disabled unchecked" isDisabled />
      <Checkbox label="Disabled checked" isDisabled checked />
      <Checkbox label="Disabled indeterminate" isDisabled indeterminate />
    </div>
  ),
};
