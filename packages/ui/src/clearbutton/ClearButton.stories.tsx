import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ClearButton } from "./ClearButton";
import { Input } from "../input/Input";
import { TimePicker } from "../timepicker/TimePicker";
import { Dropdown } from "../dropdown/Dropdown";

const meta: Meta<typeof ClearButton> = {
  title: "Galyan UI/ClearButton",
  component: ClearButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A unified, accessible, and beautifully micro-animated clear / close button used across TimePicker, Input, Dropdown, DatePicker, and Tags.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
      description: "Size preset of the clear button",
    },
    variant: {
      control: "select",
      options: ["subtle", "filled"],
      description: "Visual appearance variant",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label for screen readers",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClearButton>;

export const Default: Story = {
  args: {
    size: "sm",
    variant: "subtle",
    ariaLabel: "Clear",
  },
};

export const Sizing: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <ClearButton size="xs" />
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>xs (16px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <ClearButton size="sm" />
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>sm (20px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <ClearButton size="md" />
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>md (24px)</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <ClearButton variant="subtle" size="md" />
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Subtle (Ghost)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <ClearButton variant="filled" size="md" />
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Filled (Pill)</span>
      </div>
    </div>
  ),
};

export const InComponentsEcosystem: Story = {
  render: () => {
    const [inputValue, setInputValue] = useState("Search query with clearable icon");
    const [dropdownVal, setDropdownVal] = useState<string[]>(["react", "tailwind"]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "420px" }}>
        <div>
          <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            1. In TimePicker
          </label>
          <TimePicker
            label="Schedule Meeting"
            defaultValue="10:30 AM"
            clearable
          />
        </div>

        <div>
          <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            2. In Input
          </label>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            clearable
            onClear={() => setInputValue("")}
            placeholder="Type anything..."
          />
        </div>

        <div>
          <label style={{ fontSize: "0.875rem", fontWeight: 600, display: "block", marginBottom: "0.5rem" }}>
            3. In Dropdown Multi-Select Tags & Trigger Clear
          </label>
          <Dropdown
            options={[
              { value: "react", label: "React" },
              { value: "tailwind", label: "Tailwind CSS" },
              { value: "next", label: "Next.js" },
              { value: "vite", label: "Vite" },
            ]}
            multiple
            clearable
            value={dropdownVal}
            onChange={(v) => setDropdownVal(v as string[])}
            placeholder="Select technologies"
          />
        </div>
      </div>
    );
  },
};
