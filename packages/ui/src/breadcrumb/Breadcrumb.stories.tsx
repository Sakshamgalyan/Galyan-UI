import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["default", "subtle", "ghost"] },
    showBackButton: { control: "boolean" },
    maxItems: { control: "number" },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones" },
];

export const Default: Story = {
  args: {
    items: demoItems,
    size: "md",
    variant: "default",
    showBackButton: false,
  },
};

export const WithSleekBackButton: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>
          Icon-only Back Button
        </h4>
        <Breadcrumb
          items={demoItems}
          showBackButton
          onBackClick={() => alert("Back button clicked")}
        />
      </div>

      <div>
        <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", color: "var(--gy-text-muted)" }}>
          Back Button with Label
        </h4>
        <Breadcrumb
          items={demoItems}
          showBackButton
          backButtonLabel="Back"
          onBackClick={() => alert("Back button clicked")}
        />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/", icon: <HomeIcon /> },
      { label: "Projects", href: "/projects", icon: <FolderIcon /> },
      { label: "Design System", icon: <DocumentIcon /> },
    ],
    showBackButton: true,
    backButtonLabel: "Back",
  },
};

export const CustomSeparators: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>Slash Separator (default)</span>
        <Breadcrumb items={demoItems} />
      </div>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>Chevron Separator</span>
        <Breadcrumb items={demoItems} separator="›" />
      </div>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>Arrow Separator</span>
        <Breadcrumb items={demoItems} separator="→" />
      </div>
      <div>
        <span style={{ fontSize: "0.8rem", color: "var(--gy-text-muted)" }}>Bullet Separator</span>
        <Breadcrumb items={demoItems} separator="•" />
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
    backButtonLabel: "Back",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Breadcrumb items={demoItems} size="sm" showBackButton />
      <Breadcrumb items={demoItems} size="md" showBackButton />
      <Breadcrumb items={demoItems} size="lg" showBackButton />
    </div>
  ),
};
