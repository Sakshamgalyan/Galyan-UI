import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Galyan UI/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Type your message…",
    helperText: "Max 500 characters",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea label="Default" variant="default" placeholder="Default" />
      <Textarea label="Filled" variant="filled" placeholder="Filled" />
      <Textarea label="Focused" variant="focused" placeholder="Focused" />
      <Textarea
        label="Error"
        variant="error"
        placeholder="Error"
        helperText="Something went wrong"
      />
      <Textarea
        label="Success"
        variant="success"
        placeholder="Success"
        helperText="Looks good!"
        hasSuccess
      />
      <Textarea label="Disabled" variant="disabled" placeholder="Disabled" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea label="Small" size="sm" placeholder="Small textarea" />
      <Textarea label="Medium" size="md" placeholder="Medium textarea" />
      <Textarea label="Large" size="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const CharCounter: Story = {
  render: () => {
    const [val, setVal] = useState("Hello world");
    return (
      <Textarea
        label="Bio"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        maxCharCount={100}
        helperText="Tell us about yourself"
      />
    );
  },
};

export const AutoResize: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <Textarea
        label="Auto-resize"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        autoResize
        placeholder="This grows as you type…"
      />
    );
  },
};
