import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../button/Button";
import React from "react";

const InfoCircleIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
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

const TrashIcon = () => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SettingsIcon = () => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
    content: {
      control: "text",
      description: "Content displayed inside the tooltip popup",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Tooltip popup positioning relative to target",
    },
    variant: {
      control: "select",
      options: ["default", "dark", "light", "primary"],
      description: "Color style variant of the tooltip",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size scale of the tooltip popup",
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "both"],
      description: "How the tooltip should be triggered",
    },
    linebreak: {
      control: "boolean",
      description: "Whether text should break into multiple lines",
    },
    maxWidth: {
      control: "text",
      description: "Custom maximum width for multi-line text wrapping",
    },
    hasArrow: {
      control: "boolean",
      description: "Whether to show directional arrow pointer",
    },
    usePortal: {
      control: "boolean",
      description: "Render tooltip in portal to avoid overflow clipping",
    },
    delay: {
      control: "number",
      description: "Delay in milliseconds before showing tooltip on hover",
    },
    shortcut: {
      control: "text",
      description: "Optional keyboard shortcut badge (e.g. ⌘K or Ctrl+S)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {
    content: "Save document to cloud storage",
    placement: "top",
    variant: "default",
    size: "md",
    trigger: "hover",
    hasArrow: true,
    usePortal: true,
    shortcut: "⌘S",
    delay: 100,
  },
  render: (args) => (
    <div style={{ padding: "4rem 3rem" }}>
      <Tooltip {...args}>
        <Button variant="primary">Hover to Preview Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div style={{ padding: "3rem" }}>
      <Tooltip
        content={
          <span>
            This is a tooltip using <b>Galyan UI</b>!
          </span>
        }
      >
        <button
          style={{
            fontSize: 18,
            padding: "8px 12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "6px",
            border: "1px solid var(--gy-border, #cbd5e1)",
            background: "var(--gy-surface, #ffffff)",
            color: "var(--gy-text, #0f172a)",
          }}
        >
          <InfoCircleIcon />
        </button>
      </Tooltip>
    </div>
  ),
};

export const Placement: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 2rem",
      }}
    >
      <Tooltip content="Tooltip on top" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
};

export const WithLineBreak: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <Tooltip
        content="This is a very long tooltip that will break into multiple lines when linebreak is enabled"
        linebreak={true}
        maxWidth="220px"
      >
        <Button variant="secondary">Linebreak Enabled</Button>
      </Tooltip>
      <Tooltip
        content="This is a very long tooltip that will stay on one line when linebreak is disabled"
        linebreak={false}
      >
        <Button variant="secondary">Linebreak Disabled</Button>
      </Tooltip>
    </div>
  ),
};

export const LineBreakComparison: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 36,
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ display: "flex", gap: 32 }}>
        <Tooltip content="Short tooltip" linebreak={false}>
          <Button variant="secondary">Short Content (No Linebreak)</Button>
        </Tooltip>
        <Tooltip content="Short tooltip" linebreak={true} maxWidth="300px">
          <Button variant="secondary">Short Content (With Linebreak)</Button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        <Tooltip
          content="This is a very long tooltip content that demonstrates how the tooltip behaves without linebreak enabled"
          linebreak={false}
        >
          <Button variant="secondary">Long Content (No Linebreak)</Button>
        </Tooltip>
        <Tooltip
          content="This is a very long tooltip content that demonstrates how the tooltip behaves with linebreak enabled and max-width applied"
          linebreak={true}
          maxWidth="250px"
        >
          <Button variant="secondary">Long Content (With Linebreak)</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const WithPortal: Story = {
  render: () => (
    <div
      style={{
        padding: 24,
        overflow: "hidden",
        border: "2px solid var(--gy-border, #e2e8f0)",
        borderRadius: 8,
        position: "relative",
        maxWidth: 420,
        background: "var(--gy-surface, #ffffff)",
      }}
    >
      <div
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          marginBottom: 16,
          color: "var(--gy-text, #0f172a)",
        }}
      >
        Container with overflow: hidden
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <Tooltip
          content="This tooltip may be clipped by the container's overflow: hidden"
          placement="top"
          usePortal={false}
        >
          <Button variant="secondary">Non-Portal</Button>
        </Tooltip>

        <Tooltip
          content="This tooltip uses portal rendering to avoid clipping!"
          placement="top"
          usePortal={true}
        >
          <Button variant="primary">Portal (Default)</Button>
        </Tooltip>
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: "0.8125rem",
          color: "var(--gy-text-muted, #64748b)",
        }}
      >
        Portal is enabled by default to ensure tooltips render smoothly above modals, dialogs, and tables.
      </div>
    </div>
  ),
};

export const TriggerTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        alignItems: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <Tooltip
          content="This tooltip appears on hover (default behavior)"
          trigger="hover"
        >
          <Button variant="secondary">Hover Trigger</Button>
        </Tooltip>

        <Tooltip
          content="Click me to toggle this tooltip! Click outside or press Esc to hide."
          trigger="click"
        >
          <Button variant="secondary">Click Trigger</Button>
        </Tooltip>

        <Tooltip
          content="This tooltip responds to both hover AND click events"
          trigger="both"
        >
          <Button variant="secondary">Both Triggers</Button>
        </Tooltip>
      </div>
      <div
        style={{
          textAlign: "center",
          color: "var(--gy-text-muted, #64748b)",
          fontSize: "0.8125rem",
          maxWidth: 500,
        }}
      >
        Hover tooltips appear on mouse enter/leave. Click tooltips toggle on click and close on outside click or Escape. Both mode supports all interactions.
      </div>
    </div>
  ),
};

export const ClickTooltipExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--gy-text, #0f172a)",
        }}
      >
        Click Tooltips for Interactive Elements
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <Tooltip
          content={
            <div>
              <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                Help Information
              </div>
              <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
                • Feature A: Description here
                <br />
                • Feature B: More details
                <br />• Feature C: Additional info
              </div>
            </div>
          }
          trigger="click"
          maxWidth="260px"
          linebreak
        >
          <Button variant="primary">Help (Click)</Button>
        </Tooltip>

        <Tooltip
          content="Click to see more options. This stays open until you click elsewhere or press Escape."
          trigger="click"
        >
          <Button variant="secondary">Options (Click)</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => {
    const longText =
      "This is an example of a tooltip with very long content that contains multiple sentences and paragraphs. When you have extensive information to display in a tooltip, it's important to ensure that the content wraps properly and remains readable.";

    const veryLongText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 48,
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--gy-text)" }}>
            Long Content with Different Max Widths
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <Tooltip
              content={longText}
              linebreak={true}
              maxWidth="200px"
              placement="top"
            >
              <Button variant="secondary">Narrow (200px)</Button>
            </Tooltip>

            <Tooltip
              content={longText}
              linebreak={true}
              maxWidth="350px"
              placement="top"
            >
              <Button variant="secondary">Medium (350px)</Button>
            </Tooltip>

            <Tooltip
              content={longText}
              linebreak={true}
              maxWidth="500px"
              placement="top"
            >
              <Button variant="secondary">Wide (500px)</Button>
            </Tooltip>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--gy-text)" }}>
            Very Long Content with Linebreak (Top & Bottom)
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <Tooltip
              content={veryLongText}
              linebreak={true}
              maxWidth="380px"
              placement="top"
            >
              <Button variant="secondary">Very Long Text (Top)</Button>
            </Tooltip>

            <Tooltip
              content={veryLongText}
              linebreak={true}
              maxWidth="380px"
              placement="bottom"
            >
              <Button variant="secondary">Very Long Text (Bottom)</Button>
            </Tooltip>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--gy-text)" }}>
            Long Content with Rich Formatting
          </div>
          <Tooltip
            content={
              <div>
                <div style={{ fontWeight: 600, marginBottom: "8px" }}>
                  Detailed Feature Description
                </div>
                <div style={{ fontSize: "13px", lineHeight: "1.5" }}>{longText}</div>
                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--gy-border, rgba(255,255,255,0.2))",
                    fontSize: "12px",
                  }}
                >
                  <strong>Note:</strong> This tooltip demonstrates how long content with formatting can be displayed effectively.
                </div>
              </div>
            }
            linebreak={true}
            maxWidth="450px"
            placement="top"
          >
            <Button variant="primary">Rich Content Tooltip</Button>
          </Tooltip>
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <Tooltip content="Small compact tooltip" size="sm" shortcut="⌘S">
        <Button variant="secondary" size="sm">
          Small (sm)
        </Button>
      </Tooltip>
      <Tooltip content="Medium default tooltip" size="md" shortcut="⌘M">
        <Button variant="secondary">Medium (md - Default)</Button>
      </Tooltip>
      <Tooltip content="Large spacious tooltip" size="lg" shortcut="⌘L">
        <Button variant="secondary" size="lg">
          Large (lg)
        </Button>
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

      <Tooltip
        content="Clean frosted light tooltip"
        variant="light"
        shortcut="⌘L"
      >
        <Button variant="secondary">Always Light</Button>
      </Tooltip>

      <Tooltip content="Sleek soft dark tooltip" variant="dark" shortcut="⌘K">
        <Button variant="secondary">Always Dark</Button>
      </Tooltip>

      <Tooltip
        content="Brand themed accent tooltip"
        variant="primary"
        shortcut="⌘P"
      >
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
      <Tooltip content="Copy link to clipboard" placement="top" shortcut="⌘C">
        <Button variant="secondary" size="sm">
          <CopyIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Bookmark this project" placement="top" shortcut="⌘B">
        <Button variant="secondary" size="sm">
          <BookmarkIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Delete permanently" placement="top" shortcut="⌫">
        <Button variant="outline" size="sm">
          <TrashIcon />
        </Button>
      </Tooltip>

      <Tooltip content="Open settings panel" placement="top" shortcut="⌘,">
        <Button variant="secondary" size="sm">
          <SettingsIcon />
        </Button>
      </Tooltip>
    </div>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <div style={{ padding: "3rem 2rem" }}>
      <Tooltip
        content="Clean floating pill without arrow pointer"
        hasArrow={false}
        placement="top"
        shortcut="Esc"
      >
        <Button variant="primary">Hover for Arrowless Tooltip</Button>
      </Tooltip>
    </div>
  ),
};
