import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { Chip } from "../chips/Chips";

const QuestionIcon = () => (
  <svg
    width="16"
    height="16"
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
    width="16"
    height="16"
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

const CreditCardIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

/**
 * Collapsible panels for presenting hierarchical, grouped, or FAQ information.
 */
const meta: Meta<typeof Accordion> = {
  title: "Galyan UI/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "bordered", "flush", "separated"],
    },
    disabled: { control: "boolean" },
    defaultExpanded: { control: "boolean" },
    expanded: { control: "boolean" },
    unmountOnExit: { control: "boolean" },
    expandIconPosition: { control: "inline-radio", options: ["left", "right"] },
    title: { control: "text" },
    subtitle: { control: "text" },
    className: { control: "text" },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Credit card",
    subtitle: "8 attributes",
    defaultExpanded: true,
    size: "md",
    variant: "default",
    expandIconPosition: "right",
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <p style={{ margin: 0 }}>
          Credit card information including card number, expiry date, CVV, and
          cardholder details.
        </p>
        <p style={{ margin: 0 }}>
          Use the controls below to change the accordion properties!
        </p>
        <p style={{ margin: 0, fontWeight: 600 }}>
          Try changing &quot;expandIconPosition&quot; to see the chevron move
          between left and right.
        </p>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <span>Card Number</span>
          <span>Expiry Date</span>
          <span>CVV</span>
          <span>Cardholder Name</span>
        </div>
      </div>
    ),
  },
};

export const SeparatedCards: Story = {
  render: () => (
    <Accordion
      variant="separated"
      items={[
        {
          id: "1",
          title: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
              }}
            >
              <CreditCardIcon />
              <span>Billing & Subscription</span>
              <span style={{ marginLeft: "auto", marginRight: "0.5rem" }}>
                <Chip size="sm" variant="success">
                  Active
                </Chip>
              </span>
            </div>
          ),
          subtitle: "Payment methods, invoices & receipts",
          content:
            "Manage your payment methods, invoice receipts, and auto-renewal settings.",
        },
        {
          id: "2",
          title: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <ShieldIcon />
              <span>Security & Authentication</span>
            </div>
          ),
          subtitle: "2FA, biometric keys & session management",
          content:
            "Protect your workspace with 2FA, biometric keys, and session management.",
        },
        {
          id: "3",
          title: (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <QuestionIcon />
              <span>Developer API Keys</span>
            </div>
          ),
          subtitle: "Samantrix, metalixia & easyLife apps",
          content:
            "Generate and rotate API keys for easyLife, metalixia, and samantrix apps.",
        },
      ]}
    />
  ),
};

export const BorderedGroup: Story = {
  render: () => (
    <Accordion
      variant="bordered"
      items={[
        {
          id: "1",
          title: "How does the Brand × Role theme system work?",
          subtitle: "Multi-brand styling architecture",
          content:
            "Brands define the company palette (easyLife, metalixia, samantrix) while roles adjust surfaces and permission-based accents.",
        },
        {
          id: "2",
          title: "Can I provide custom primary colors?",
          subtitle: "Dynamic color ramp generator",
          content:
            "Yes! Pass brand='custom' and customTheme={{ primary: '#ff6600' }} to dynamically derive a complete color ramp.",
        },
        {
          id: "3",
          title: "Is dark mode supported out of the box?",
          subtitle: "CSS custom properties support",
          content:
            "Yes, all components support light and dark modes seamlessly via CSS custom properties.",
        },
      ]}
    />
  ),
};

export const LeftIconPosition: Story = {
  args: {
    title: "Credit card",
    subtitle: "8 attributes",
    expandIconPosition: "left",
    defaultExpanded: true,
    variant: "default",
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <p style={{ margin: 0 }}>
          Credit card information including card number, expiry date, CVV, and
          cardholder details.
        </p>
        <p style={{ margin: 0, fontWeight: 600 }}>
          The expand icon is now positioned on the left side of the header.
        </p>
      </div>
    ),
  },
};

export const DisabledItems: Story = {
  render: () => (
    <Accordion
      variant="separated"
      items={[
        {
          id: "1",
          title: "Available Feature",
          subtitle: "Ready to use",
          content: "This section can be opened and closed normally.",
        },
        {
          id: "2",
          title: "Pro Feature (Locked)",
          subtitle: "Enterprise license required",
          content: "You need an enterprise license to view this content.",
          disabled: true,
        },
      ]}
    />
  ),
};
