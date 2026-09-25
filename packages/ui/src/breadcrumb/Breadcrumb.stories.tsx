import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const HomeIcon = () => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = () => (
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
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const DocumentIcon = () => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

/**
 * Navigation aid showing hierarchical location path with optional sleek back button.
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "Galyan UI/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 680, padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
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
      options: ["default", "subtle", "ghost"],
      table: {
        type: { summary: "default | subtle | ghost" },
        defaultValue: { summary: "default" },
      },
    },
    showBackButton: { control: "boolean" },
    backButtonLabel: { control: "text" },
    maxItems: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/settings" },
  { label: "Profile" },
];

export const Default: Story = {
  args: {
    items: demoItems,
    size: "md",
    variant: "default",
    showBackButton: false,
  },
};

export const WithBackButton: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Profile" },
        ]}
        showBackButton
        onBackClick={() => alert("Back button clicked")}
      />
    </div>
  ),
};

export const WithBackButtonAndLabel: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings" },
          { label: "Profile" },
        ]}
        showBackButton
        backButtonLabel="Back"
        onBackClick={() => alert("Back button clicked")}
      />
    </div>
  ),
};

export const InteractiveCurrentPath: Story = {
  render: () => {
    const [path, setPath] = useState<string[]>([
      "Home",
      "Reconciliation",
      "Transaction Summary",
      "Transaction Details",
    ]);

    const handleBack = () => {
      if (path.length > 1) {
        setPath((prev) => prev.slice(0, prev.length - 1));
      }
    };

    const items = path.map((segment, idx) => ({
      label: segment,
      href: idx < path.length - 1 ? `#${segment.toLowerCase()}` : undefined,
    }));

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "var(--gy-radius-md, 0.375rem)",
            border: "1.5px solid var(--gy-primary, #6366f1)",
            background: "color-mix(in srgb, var(--gy-primary, #6366f1) 5%, transparent)",
            fontSize: "0.875rem",
            color: "var(--gy-text, #0f172a)",
          }}
        >
          <strong>Current Path:</strong> {path.join(" / ")}
        </div>

        <Breadcrumb
          items={items}
          showBackButton={path.length > 1}
          onBackClick={handleBack}
          onItemClick={(item, idx) => {
            setPath(path.slice(0, idx + 1));
          }}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/", icon: <HomeIcon /> },
      { label: "Projects", href: "/projects", icon: <FolderIcon /> },
      { label: "Design System", icon: <DocumentIcon /> },
    ],
    showBackButton: true,
  },
};

export const CustomSeparators: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>
          Slash Separator (default)
        </span>
        <Breadcrumb items={demoItems} showBackButton />
      </div>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>
          Chevron Separator
        </span>
        <Breadcrumb items={demoItems} separator="›" showBackButton />
      </div>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>
          Arrow Separator
        </span>
        <Breadcrumb items={demoItems} separator="→" showBackButton />
      </div>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>
          Bullet Separator
        </span>
        <Breadcrumb items={demoItems} separator="•" showBackButton />
      </div>
    </div>
  ),
};

export const CollapsedLongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Company", href: "/company" },
      { label: "Engineering", href: "/company/eng" },
      { label: "Frontend", href: "/company/eng/fe" },
      { label: "UI Components", href: "/company/eng/fe/ui" },
      { label: "Breadcrumb" },
    ],
    maxItems: 3,
    showBackButton: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Small (sm)
        </span>
        <Breadcrumb items={demoItems} size="sm" showBackButton />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Medium (md - default)
        </span>
        <Breadcrumb items={demoItems} size="md" showBackButton />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Large (lg)
        </span>
        <Breadcrumb items={demoItems} size="lg" showBackButton />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Default
        </span>
        <Breadcrumb items={demoItems} variant="default" showBackButton />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Subtle
        </span>
        <Breadcrumb items={demoItems} variant="subtle" showBackButton />
      </div>
      <div>
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Ghost
        </span>
        <Breadcrumb items={demoItems} variant="ghost" showBackButton />
      </div>
    </div>
  ),
};
