import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const HomeIcon = () => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ActivityIcon = () => (
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
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const FileTextIcon = () => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const meta: Meta<typeof Tabs> = {
  title: "Galyan UI/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["classic", "button", "card", "outline", "ghost", "merged"],
      description: "Visual variant style of the tabs",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the tab triggers",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Orientation of the tab list",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether tabs expand to occupy full width",
    },
    disabled: {
      control: "boolean",
      description: "Whether all tabs are disabled",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 680, maxWidth: "100%", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const simpleItems = [
  { id: "tab1", label: "Tab label", content: <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>Content for Tab 1</p> },
  { id: "tab2", label: "Tab label", content: <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>Content for Tab 2</p> },
  { id: "tab3", label: "Tab label", content: <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>Content for Tab 3</p> },
  { id: "tab4", label: "Tab label", content: <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>Content for Tab 4</p> },
  { id: "tab5", label: "Tab label", content: <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>Content for Tab 5</p> },
  { id: "tab6", label: "Tab label", content: <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>Content for Tab 6</p> },
];

const demoItems = [
  {
    id: "overview",
    label: "Overview",
    icon: <HomeIcon />,
    content: (
      <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>
        Overview content goes here. This is the main dashboard view.
      </p>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <ActivityIcon />,
    badge: 3,
    content: (
      <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>
        Analytics data and charts would render in this panel.
      </p>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileTextIcon />,
    content: (
      <p style={{ color: "var(--gy-text-muted)", margin: "0.5rem 0" }}>
        Report generation tools and export options live here.
      </p>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    disabled: true,
    content: <p>Settings (disabled)</p>,
  },
];

export const Playground: Story = {
  args: {
    items: simpleItems,
    variant: "classic",
    size: "md",
  },
};

export const Classic: Story = {
  args: {
    items: simpleItems,
    variant: "classic",
  },
};

export const Button: Story = {
  args: {
    items: simpleItems,
    variant: "button",
  },
};

export const Card: Story = {
  args: {
    items: simpleItems,
    variant: "card",
  },
};

export const Outline: Story = {
  args: {
    items: simpleItems,
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    items: simpleItems,
    variant: "ghost",
  },
};

export const Merged: Story = {
  args: {
    items: simpleItems,
    variant: "merged",
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants: Array<"classic" | "button" | "card" | "outline" | "ghost" | "merged"> = [
      "classic",
      "button",
      "card",
      "outline",
      "ghost",
      "merged",
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {variants.map((v) => (
          <div key={v}>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--gy-text-subtle)",
                marginBottom: "0.5rem",
              }}
            >
              Variant: {v}
            </div>
            <Tabs items={simpleItems} variant={v} />
          </div>
        ))}
      </div>
    );
  },
};

export const WithIconsAndBadges: Story = {
  args: {
    items: demoItems,
    variant: "classic",
  },
};

export const VerticalTabs: Story = {
  args: {
    items: demoItems,
    variant: "classic",
    orientation: "vertical",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--gy-text-subtle)",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Small (sm)
        </span>
        <Tabs items={simpleItems.slice(0, 4)} variant="classic" size="sm" />
      </div>
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--gy-text-subtle)",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Medium (md - Default)
        </span>
        <Tabs items={simpleItems.slice(0, 4)} variant="merged" size="md" />
      </div>
      <div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--gy-text-subtle)",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Large (lg)
        </span>
        <Tabs items={simpleItems.slice(0, 4)} variant="button" size="lg" />
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    items: simpleItems.slice(0, 4),
    variant: "card",
    fullWidth: true,
  },
};

export const RoleThemes: Story = {
  render: () => {
    const roles: Array<{ name: string; brand?: string; role?: string; desc: string }> = [
      { name: "Customer Role (EasyLife Green)", brand: "easylife", role: "customer", desc: "Green primary color (#22c55e)" },
      { name: "Professional Role (Blue/Indigo)", brand: "easylife", role: "professional", desc: "Blue primary color (#3b82f6)" },
      { name: "Agent Role (Rose / Coral)", brand: "easylife", role: "agent", desc: "Rose primary color (#f43f5e)" },
      { name: "Samantrix Brand (Violet / Dark)", brand: "samantrix", role: "customer", desc: "Violet primary color (#7c5cff)" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {roles.map((r) => (
          <div
            key={r.name}
            data-brand={r.brand}
            data-role={r.role}
            data-theme={r.brand === "easylife" ? r.role : r.brand}
            style={{
              padding: "1.25rem",
              borderRadius: "0.75rem",
              border: "1px solid var(--gy-border, #e2e8f0)",
              background: "var(--gy-surface, #ffffff)",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--gy-text, #0f172a)",
                  display: "block",
                }}
              >
                {r.name}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--gy-text-muted, #64748b)",
                }}
              >
                {r.desc}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--gy-text-subtle)", display: "block", marginBottom: "0.25rem" }}>Classic:</span>
                <Tabs items={simpleItems.slice(0, 4)} variant="classic" />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--gy-text-subtle)", display: "block", marginBottom: "0.25rem" }}>Button:</span>
                <Tabs items={simpleItems.slice(0, 4)} variant="button" />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--gy-text-subtle)", display: "block", marginBottom: "0.25rem" }}>Card:</span>
                <Tabs items={simpleItems.slice(0, 4)} variant="card" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

