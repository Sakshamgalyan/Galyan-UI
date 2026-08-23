import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";

const DashboardIcon = () => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UsersIcon = () => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const FolderIcon = () => (
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
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const meta: Meta<typeof Menu> = {
  title: "Galyan UI/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 680, minHeight: 180 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: { control: "select", options: ["default", "bordered", "minimal"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    collapsible: { control: "boolean" },
  },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  {
    id: "users",
    label: "Users",
    icon: <UsersIcon />,
    children: [
      { id: "all-users", label: "All Users" },
      { id: "roles", label: "Roles & Permissions" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    children: [
      { id: "general", label: "General" },
      { id: "security", label: "Security" },
    ],
  },
];

export const Default: Story = {
  args: {
    variant: "bordered",
    size: "md",
    collapsible: true,
  },
  render: (args) => {
    const [active, setActive] = useState("all-users");
    return (
      <div style={{ width: 300 }}>
        <Menu
          {...args}
          items={menuItems}
          activeItemId={active}
          onItemClick={setActive}
        />
      </div>
    );
  },
};

export const Minimal: Story = {
  render: () => {
    const [active, setActive] = useState("dashboard");
    return (
      <div style={{ width: 300 }}>
        <Menu
          variant="minimal"
          items={menuItems}
          activeItemId={active}
          onItemClick={setActive}
        />
      </div>
    );
  },
};

export const WithBadgesAndDividers: Story = {
  render: () => {
    const [active, setActive] = useState("inbox");
    const badgeItems = [
      { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      { id: "inbox", label: "Inbox", icon: <UsersIcon />, badge: "12" },
      { id: "notifications", label: "Notifications", badge: "NEW" },
      { id: "div1", label: "", divider: true },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon />,
        badge: "Pro",
        children: [
          { id: "general", label: "General" },
          { id: "billing", label: "Billing & Plans", badge: "Up" },
        ],
      },
    ];
    return (
      <div style={{ width: 300 }}>
        <Menu
          variant="bordered"
          items={badgeItems}
          activeItemId={active}
          onItemClick={setActive}
        />
      </div>
    );
  },
};

export const WithCustomHeader: Story = {
  render: () => {
    const [active, setActive] = useState("all-users");
    return (
      <div style={{ width: 300 }}>
        <Menu
          variant="bordered"
          items={menuItems}
          activeItemId={active}
          onItemClick={setActive}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--gy-primary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              SG
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                Saksham Galyan
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--gy-text-subtle)" }}>
                Admin Workspace
              </div>
            </div>
          </div>
        </Menu>
      </div>
    );
  },
};

export const HorizontalMenu: Story = {
  render: () => {
    const [active, setActive] = useState("dashboard");
    const horizontalItems = [
      { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      {
        id: "users",
        label: "Users",
        icon: <UsersIcon />,
        children: [
          { id: "all-users", label: "All Users" },
          { id: "roles", label: "Roles & Permissions" },
        ],
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon />,
        children: [
          { id: "general", label: "General" },
          { id: "security", label: "Security" },
        ],
      },
    ];
    return (
      <Menu
        orientation="horizontal"
        variant="bordered"
        items={horizontalItems}
        activeItemId={active}
        onItemClick={setActive}
      />
    );
  },
};

export const HorizontalMinimalNavbar: Story = {
  render: () => {
    const [active, setActive] = useState("overview");
    const navItems = [
      { id: "overview", label: "Overview", icon: <DashboardIcon /> },
      { id: "projects", label: "Projects", icon: <FolderIcon />, badge: "4" },
      { id: "team", label: "Team Members", icon: <UsersIcon /> },
      { id: "settings", label: "Workspace Settings", icon: <SettingsIcon /> },
    ];
    return (
      <Menu
        orientation="horizontal"
        variant="minimal"
        items={navItems}
        activeItemId={active}
        onItemClick={setActive}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [active, setActive] = useState("users");
    return (
      <div
        style={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>
            Small (sm)
          </span>
          <Menu
            size="sm"
            items={menuItems.slice(0, 2)}
            activeItemId={active}
            onItemClick={setActive}
          />
        </div>
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>
            Medium (md)
          </span>
          <Menu
            size="md"
            items={menuItems.slice(0, 2)}
            activeItemId={active}
            onItemClick={setActive}
          />
        </div>
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>
            Large (lg)
          </span>
          <Menu
            size="lg"
            items={menuItems.slice(0, 2)}
            activeItemId={active}
            onItemClick={setActive}
          />
        </div>
      </div>
    );
  },
};
