import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";
import { Button } from "../button/Button";

/**
 * Prominent contextual feedback messages, alerts, and system notices.
 */
const meta: Meta<typeof Banner> = {
  title: "Galyan UI/Banner",
  component: Banner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 660, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger", "neutral"],
    },
    bannerStyle: { control: "select", options: ["subtle", "solid", "outline"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    title: { control: "text" },
    description: { control: "text" },
    fullWidth: { control: "boolean" },
    bordered: { control: "boolean" },
    dismissible: { control: "boolean" },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "System Maintenance Scheduled",
    description:
      "We will be performing routine server maintenance on Sunday at 02:00 UTC.",
    variant: "info",
    bannerStyle: "subtle",
    size: "md",
    fullWidth: true,
    bordered: true,
    dismissible: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Banner
        variant="info"
        title="Information Update"
        description="A new software version (v2.4.0) is ready for deployment."
        dismissible
      />
      <Banner
        variant="success"
        title="Payment Succeeded"
        description="Your enterprise invoice #2049 has been processed."
        dismissible
      />
      <Banner
        variant="warning"
        title="Storage Quota Nearing Limit"
        description="You have used 88% of your available workspace storage."
        dismissible
      />
      <Banner
        variant="danger"
        title="Deployment Failed"
        description="Build #819 encountered syntax compilation errors."
        dismissible
      />
      <Banner
        variant="neutral"
        title="Tip of the Day"
        description="Press ⌘+K anytime to quickly open the command palette."
        dismissible
      />
    </div>
  ),
};

export const SolidVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Banner
        variant="info"
        bannerStyle="solid"
        title="New Cloud Region Available"
        description="You can now deploy workloads in Frankfurt (eu-central-1)."
        dismissible
      />
      <Banner
        variant="success"
        bannerStyle="solid"
        title="Security Audit Passed"
        description="100% compliance with SOC2 and ISO27001 standards."
        dismissible
      />
      <Banner
        variant="warning"
        bannerStyle="solid"
        title="Action Required: API Key Deprecation"
        description="Legacy tokens will stop working on September 30, 2026."
        dismissible
      />
      <Banner
        variant="danger"
        bannerStyle="solid"
        title="Critical Security Alert"
        description="Unauthorized IP address attempted admin portal login."
        dismissible
      />
    </div>
  ),
};

export const WithActionButtons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Banner
        variant="info"
        title="Try our new AI Assistant"
        description="Accelerate your workflow with contextual code completions."
        button={<Button size="sm" variant="primary">Try Now</Button>}
        dismissible
      />
      <Banner
        variant="warning"
        title="Verify your recovery email"
        description="Please confirm your secondary address to prevent lockout."
        button={<Button size="sm" variant="secondary">Verify</Button>}
        dismissible
      />
    </div>
  ),
};

export const RichContentAndBullets: Story = {
  render: () => (
    <Banner
      variant="info"
      title="What's new in Galyan v2.0"
      dismissible
    >
      <div style={{ marginTop: "0.25rem" }}>
        <ul style={{ margin: "0", paddingLeft: "1.25rem" }}>
          <li>Two-axis theme architecture (Brand × Role)</li>
          <li>Custom zero-dependency color derivation</li>
          <li>Refined dark theme and soft high-contrast components</li>
        </ul>
      </div>
    </Banner>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Banner size="sm" variant="info" title="Small Banner" description="Compact notification message." />
      <Banner size="md" variant="info" title="Medium Banner (Default)" description="Standard size notification message." />
      <Banner size="lg" variant="info" title="Large Banner" description="Prominent large callout with extensive details." />
    </div>
  ),
};
