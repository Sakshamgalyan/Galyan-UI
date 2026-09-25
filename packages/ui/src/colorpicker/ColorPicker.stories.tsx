import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Galyan UI/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Selected color value",
    },
    defaultValue: {
      control: "text",
      description: "Initial color value for uncontrolled mode",
      table: { defaultValue: { summary: "#5223BC" } },
    },
    label: {
      control: "text",
      description: "Label displayed above the input",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    hasError: {
      control: "boolean",
      description: "Whether the component shows an error state",
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the component is disabled",
    },
    isRequired: {
      control: "boolean",
      description: "Whether the field is required",
    },
    showAlpha: {
      control: "boolean",
      description: "Whether to show the alpha transparency slider",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size of the color picker trigger",
      table: { defaultValue: { summary: "md" } },
    },
    placement: {
      control: "select",
      options: ["bottom", "top", "left", "right"],
      description: "Placement of the floating popover",
    },
    align: {
      control: "select",
      options: ["start", "end", "center"],
      description: "Alignment of the floating popover",
    },
    zIndex: {
      control: "number",
      description: "Z-index of the popover",
    },
    className: {
      control: "text",
      description: "Custom CSS class",
    },
    id: {
      control: "text",
      description: "Unique HTML id attribute",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accent Color",
    defaultValue: "#5223BC",
    helperText: "Choose a primary accent color for your interface",
  },
  render: function Render(args) {
    const [color, setColor] = useState(args.defaultValue || "#5223BC");
    return (
      <div style={{ width: 280 }}>
        <ColorPicker
          {...args}
          value={color}
          onChange={(newColor) => setColor(newColor)}
        />
        <div
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            background: color,
            color: "#ffffff",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "0.875rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "background 0.2s ease",
          }}
        >
          Selected: {color}
        </div>
      </div>
    );
  },
};

export const WithAlpha: Story = {
  args: {
    label: "Background Transparency",
    defaultValue: "rgba(82, 35, 188, 0.75)",
    showAlpha: true,
    helperText: "Supports 8-digit HEX and RGBA alpha transparency",
  },
  render: function Render(args) {
    const [color, setColor] = useState(args.defaultValue || "rgba(82, 35, 188, 0.75)");
    return (
      <div style={{ width: 280 }}>
        <ColorPicker
          {...args}
          value={color}
          onChange={(newColor) => setColor(newColor)}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const [c1, setC1] = useState("#22C55E");
    const [c2, setC2] = useState("#5223BC");
    const [c3, setC3] = useState("#3B82F6");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          width: 280,
        }}
      >
        <ColorPicker
          size="sm"
          label="Small (sm)"
          value={c1}
          onChange={setC1}
        />
        <ColorPicker
          size="md"
          label="Medium (md)"
          value={c2}
          onChange={setC2}
        />
        <ColorPicker
          size="lg"
          label="Large (lg)"
          value={c3}
          onChange={setC3}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: function Render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          width: 280,
        }}
      >
        <ColorPicker
          label="Required Color"
          isRequired
          defaultValue="#EC4899"
          helperText="This field is required"
        />
        <ColorPicker
          label="Invalid Selection"
          hasError
          defaultValue="#EF4444"
          helperText="Please select a valid contrast color"
        />
        <ColorPicker
          label="Disabled Color"
          isDisabled
          defaultValue="#94A3B8"
          helperText="You cannot modify this locked color"
        />
      </div>
    );
  },
};

export const CustomPresets: Story = {
  args: {
    label: "Brand Palettes",
    defaultValue: "#6366F1",
    presets: [
      "#6366F1",
      "#4F46E5",
      "#4338CA",
      "#3730A3",
      "#06B6D4",
      "#0891B2",
      "#0E7490",
      "#155E75",
      "#F43F5E",
      "#E11D48",
      "#BE123C",
      "#9F1239",
    ],
    helperText: "Palette customized for brand themes",
  },
  render: function Render(args) {
    const [color, setColor] = useState(args.defaultValue || "#6366F1");
    return (
      <div style={{ width: 280 }}>
        <ColorPicker
          {...args}
          value={color}
          onChange={(newColor) => setColor(newColor)}
        />
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: function Render() {
    const [color, setColor] = useState("#5223BC");
    return (
      <div
        style={{
          padding: "2.5rem",
          background: "#0f172a",
          borderRadius: "1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
          width: 320,
        }}
        data-color-mode="dark"
      >
        <div style={{ textAlign: "center", width: "100%" }}>
          <h4
            style={{
              margin: "0 0 0.25rem",
              color: "#f8fafc",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Dark Mode ColorPicker
          </h4>
          <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
            Luminous dark theme with vivid popover contrasts
          </span>
        </div>
        <ColorPicker
          label="Theme Glow Color"
          value={color}
          onChange={setColor}
          showAlpha
        />
      </div>
    );
  },
};
