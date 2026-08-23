import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../button/Button";
import React from "react";

const BookmarkIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const meta: Meta<typeof Tooltip> = {
  title: "Galyan UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Tooltip popup positioning relative to target",
    },
    variant: {
      control: "select",
      options: ["default", "dark", "light", "primary"],
      description: "Color style variant of the tooltip",
    },
    maxWidth: {
      control: "text",
      description: "Custom maximum width for wrapping longer multi-line text",
    },
    delay: {
      control: "number",
      description: "Delay in milliseconds before showing tooltip on hover",
    },
    shortcut: {
      control: "text",
      description: "Optional keyboard shortcut badge (e.g. ⌘K or Ctrl+S)",
    },
    content: {
      control: "text",
      description: "Content inside the tooltip popup",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Save document to cloud",
    position: "top",
    delay: 120,
    shortcut: "⌘S",
    children: <Button variant="primary">Save Changes</Button>,
  },
};

export const MaxWidthMultiLine: Story = {
  render: () => (
    <div style={{ padding: "3rem 2rem" }}>
      <Tooltip
        maxWidth={220}
        position="top"
        content="This tooltip contains a longer explanation that wraps cleanly across multiple lines without text clipping."
      >
        <Button variant="secondary">Hover for Long Description (maxWidth 220px)</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <Tooltip content="Adaptive theme tooltip" variant="default" shortcut="⌘D">
        <Button variant="secondary">Adaptive Default</Button>
      </Tooltip>

      <Tooltip content="Clean frosted light tooltip" variant="light" shortcut="⌘L">
        <Button variant="secondary">Always Light</Button>
      </Tooltip>

      <Tooltip content="Sleek soft dark tooltip" variant="dark" shortcut="⌘K">
        <Button variant="secondary">Always Dark</Button>
      </Tooltip>

      <Tooltip content="Brand themed accent tooltip" variant="primary" shortcut="⌘P">
        <Button variant="primary">Primary Brand</Button>
      </Tooltip>
    </div>
  ),
};

export const WithKeyboardShortcuts: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <Tooltip content="Copy link to clipboard" position="top" shortcut="⌘C">
        <Button variant="secondary" size="sm">
          <CopyIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Bookmark this project" position="top" shortcut="⌘B">
        <Button variant="secondary" size="sm">
          <BookmarkIcon />
        </Button>
      </Tooltip>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        justifyContent: "center",
        padding: "4rem 2rem",
      }}
    >
      <Tooltip content="Tooltip placed on top" position="top">
        <Button variant="secondary">Hover Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip placed on bottom" position="bottom">
        <Button variant="secondary">Hover Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip placed on left" position="left">
        <Button variant="secondary">Hover Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip placed on right" position="right">
        <Button variant="secondary">Hover Right</Button>
      </Tooltip>
    </div>
  ),
};

export const StandaloneInfoIcon: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "2rem",
        color: "var(--gy-text)",
      }}
    >
      <span>Two-Factor Authentication</span>
      <Tooltip
        content="Enforces time-based OTP codes on every new login attempt"
        position="right"
      />
    </div>
  ),
};
