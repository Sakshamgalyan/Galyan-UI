import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const QuestionIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f59e0b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const meta: Meta<typeof Textarea> = {
  title: "Galyan UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label text above the textarea" },
    placeholder: { control: "text", description: "Placeholder text" },
    helperText: {
      control: "text",
      description: "Helper text below the textarea",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "filled", "focused", "error", "success", "disabled"],
      table: {
        type: {
          summary: "default | filled | focused | error | success | disabled",
        },
        defaultValue: { summary: "default" },
      },
    },
    fullWidth: { control: "boolean" },
    required: { control: "boolean" },
    hasError: { control: "boolean" },
    hasSuccess: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isFocused: { control: "boolean" },
    maxCharCount: { control: "number" },
    autoResize: { control: "boolean" },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    disableBorderEffects: {
      control: "boolean",
      description: "Disables the focus ring and border color change",
    },
    borderRadius: {
      control: "text",
      description: "Custom border radius CSS value",
    },
    rows: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 440 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Type your message here…",
    helperText: "We typically respond within 24 hours.",
  },
};

export const WithDifferentHelperIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea
        label="Default Info Icon"
        placeholder="Share your thoughts…"
        helperText="Information visible to workspace members"
      />
      <Textarea
        label="Help / Question Icon"
        placeholder="Describe how to reproduce the issue…"
        helperIcon={<QuestionIcon />}
        helperText="Include specific steps, environment, and expected outcome"
      />
      <Textarea
        label="Security / Shield Icon"
        placeholder="Enter encrypted payload or secret notes…"
        helperIcon={<ShieldIcon />}
        helperText="Encrypted with AES-256 before storage"
      />
      <Textarea
        label="Star / Highlight Icon"
        placeholder="Write your review…"
        helperIcon={<StarIcon />}
        helperText="Top reviews will be featured on the community homepage"
      />
      <Textarea
        label="Required with Warning Icon"
        placeholder="Reason for account cancellation…"
        required
        helperText="This explanation is mandatory for account processing"
      />
      <Textarea
        label="Success with Checkmark Icon"
        placeholder="Valid JSON configuration"
        hasSuccess
        value={`{\n  "status": "healthy",\n  "version": "1.0.0"\n}`}
        helperText="Configuration syntax is verified and valid"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea
        label="Small (sm)"
        size="sm"
        placeholder="Compact textarea for concise notes"
        helperText="Small scale with 0.875rem font size"
      />
      <Textarea
        label="Medium (md - default)"
        size="md"
        placeholder="Standard textarea for general forms"
        helperText="Standard balanced scale"
      />
      <Textarea
        label="Large (lg)"
        size="lg"
        placeholder="Spacious textarea for rich paragraphs and articles"
        helperText="Large scale with 1rem font size"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea
        label="Default"
        variant="default"
        placeholder="Standard outline variant"
        helperText="Default variant with clean 1px border"
      />
      <Textarea
        label="Filled"
        variant="filled"
        placeholder="Filled background variant"
        helperText="Filled with subtle muted background"
      />
      <Textarea
        label="Focused"
        variant="focused"
        placeholder="Active focused variant"
        helperText="Visually displays active primary focus ring"
      />
      <Textarea
        label="Error"
        variant="error"
        placeholder="Error state variant"
        helperText="Please resolve the issue before submitting"
      />
      <Textarea
        label="Success"
        variant="success"
        placeholder="Success state variant"
        hasSuccess
        helperText="All validations passed!"
      />
      <Textarea
        label="Disabled"
        variant="disabled"
        placeholder="Disabled variant"
        helperText="Editing is disabled"
      />
    </div>
  ),
};

export const RequiredField: Story = {
  args: {
    label: "Project Abstract",
    placeholder: "Provide an executive summary of the initiative…",
    required: true,
    helperText: "This field is required for project approval",
  },
};

export const CharCounter: Story = {
  render: () => {
    const [val, setVal] = useState(
      "Galyan UI is an advanced enterprise design system crafted with precision.",
    );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Textarea
          label="Bio / Summary"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          maxCharCount={100}
          helperText="Keep your summary clear and concise"
        />
        <Textarea
          label="Over Limit Example"
          value="This text is deliberately made too long to demonstrate the exceeded character counter warning state when exceeding maximum allowed limits."
          maxCharCount={80}
          hasError
          helperText="Character count exceeds allowed capacity"
        />
      </div>
    );
  },
};

export const AutoResize: Story = {
  render: () => {
    const [val, setVal] = useState(
      "Line 1: Auto-resize automatically adjusts height based on content.\nLine 2: Type additional lines or press Enter...\nLine 3: Notice how the height expands smoothly without scrollbars.",
    );
    return (
      <Textarea
        label="Auto-Resizing Content"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        autoResize
        placeholder="Type multiple paragraphs here…"
        helperText="Expands seamlessly as you type new lines"
      />
    );
  },
};

export const ResizeModes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea
        label="Vertical Resize (Default)"
        resize="vertical"
        placeholder="Drag bottom-right handle vertically"
      />
      <Textarea
        label="No Resize (Fixed)"
        resize="none"
        placeholder="Resize handle is disabled"
      />
      <Textarea
        label="Both (Horizontal & Vertical)"
        resize="both"
        placeholder="Resize in any direction"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: "Feedback",
    value: "Bad",
    hasError: true,
    helperText: "Feedback must be at least 15 characters long.",
  },
};

export const SuccessState: Story = {
  args: {
    label: "Customer Testimonial",
    value:
      "Galyan UI components significantly accelerated our development velocity and delivered a pristine user interface.",
    hasSuccess: true,
    helperText: "Testimonial is verified and approved for publication.",
  },
};

export const FilledVariant: Story = {
  render: () => {
    const [val, setVal] = useState("");
    return (
      <Textarea
        label="Internal Meeting Notes"
        variant="filled"
        placeholder="Start typing meeting notes…"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        helperText="Filled style variant blends smoothly with card backgrounds"
      />
    );
  },
};

export const CustomBorderRadius: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Textarea
        label="Default Radius (0.375rem)"
        placeholder="Standard border radius"
      />
      <Textarea
        label="Sharp Corners (0px)"
        borderRadius="0px"
        placeholder="Sharp rectangular styling"
      />
      <Textarea
        label="Extra Round (0.75rem)"
        borderRadius="0.75rem"
        placeholder="Smooth modern rounded corners"
      />
      <Textarea
        label="Super Round (1.25rem)"
        borderRadius="1.25rem"
        placeholder="Playful pill-like curvature"
      />
    </div>
  ),
};

export const DisabledBorderEffects: Story = {
  args: {
    label: "No Focus Ring Effect",
    placeholder: "Focus this textarea — no outer ring glow will appear",
    disableBorderEffects: true,
    helperText: "Border glow effects are disabled on this field",
  },
};

export const DisabledState: Story = {
  args: {
    label: "Archived Notes",
    value:
      "This document was archived on 2026-09-01 and cannot be modified further.",
    isDisabled: true,
    helperText: "Read-only archived field",
  },
};
