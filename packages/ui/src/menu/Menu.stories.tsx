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

const HomeIcon = () => (
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

const ProfileIcon = () => (
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

const DocumentIcon = () => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

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

const meta: Meta<typeof Menu> = {
  title: "Galyan UI/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        type: "code",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 680, minHeight: 180 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    items: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
    onItemClick: {
      table: { disable: true },
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "minimal", "glassmorphic", "glass"],
    },
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    collapsible: {
      control: "boolean",
    },
    defaultCollapsed: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
  },
  args: {
    variant: "bordered",
    size: "md",
    orientation: "vertical",
    collapsible: true,
  },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "bordered",
    size: "md",
    orientation: "vertical",
    collapsible: true,
  },
  render: function Render(args) {
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

export const NavigationMenuDemo: Story = {
  render: function Render(args) {
    const [active, setActive] = useState("home");
    const demoItems = [
      { id: "home", label: "Home", icon: <HomeIcon /> },
      { id: "profile", label: "Profile", icon: <ProfileIcon />, badge: "2" },
      { id: "div1", label: "", divider: true },
      { id: "settings", label: "Settings", icon: <SettingsIcon /> },
      {
        id: "documents",
        label: "Documents",
        icon: <DocumentIcon />,
        disabled: true,
      },
    ];
    return (
      <div style={{ width: 260 }}>
        <Menu
          {...args}
          items={demoItems}
          activeItemId={active}
          onItemClick={setActive}
        />
      </div>
    );
  },
};

export const Minimal: Story = {
  render: function Render(args) {
    const [active, setActive] = useState("dashboard");
    return (
      <div style={{ width: 300 }}>
        <Menu
          {...args}
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
  render: function Render(args) {
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
          {...args}
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
  render: function Render(args) {
    const [active, setActive] = useState("all-users");
    return (
      <div style={{ width: 300 }}>
        <Menu
          {...args}
          variant="bordered"
          items={menuItems}
          activeItemId={active}
          onItemClick={setActive}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
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
              <div
                style={{ fontSize: "0.75rem", color: "var(--gy-text-subtle)" }}
              >
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
  args: {
    orientation: "horizontal",
    variant: "bordered",
  },
  render: function Render(args) {
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
        {...args}
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
  args: {
    orientation: "horizontal",
    variant: "minimal",
  },
  render: function Render(args) {
    const [active, setActive] = useState("overview");
    const navItems = [
      { id: "overview", label: "Overview", icon: <DashboardIcon /> },
      { id: "projects", label: "Projects", icon: <FolderIcon />, badge: "4" },
      { id: "team", label: "Team Members", icon: <UsersIcon /> },
      { id: "settings", label: "Workspace Settings", icon: <SettingsIcon /> },
    ];
    return (
      <Menu
        {...args}
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
  render: function Render(args) {
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
          <span
            style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}
          >
            Small (sm)
          </span>
          <Menu
            {...args}
            size="sm"
            items={menuItems.slice(0, 2)}
            activeItemId={active}
            onItemClick={setActive}
          />
        </div>
        <div>
          <span
            style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}
          >
            Medium (md)
          </span>
          <Menu
            {...args}
            size="md"
            items={menuItems.slice(0, 2)}
            activeItemId={active}
            onItemClick={setActive}
          />
        </div>
        <div>
          <span
            style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}
          >
            Large (lg)
          </span>
          <Menu
            {...args}
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

export const Glassmorphic: Story = {
  args: {
    variant: "glassmorphic",
    size: "md",
    collapsible: true,
  },
  render: function Render(args) {
    const [active, setActive] = useState("dashboard");
    const glassItems = [
      { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      {
        id: "projects",
        label: "Projects",
        icon: <FolderIcon />,
        badge: "6",
        children: [
          { id: "active-projects", label: "Active Sprints" },
          { id: "archived-projects", label: "Archived" },
        ],
      },
      {
        id: "team",
        label: "Team",
        icon: <UsersIcon />,
        children: [
          { id: "members", label: "Members" },
          { id: "roles", label: "Permissions" },
        ],
      },
      { id: "div1", label: "", divider: true },
      { id: "settings", label: "Settings", icon: <SettingsIcon /> },
      {
        id: "documents",
        label: "Documents",
        icon: <DocumentIcon />,
        disabled: true,
      },
    ];

    return (
      <div
        style={{
          position: "relative",
          padding: "2.5rem 2rem",
          background:
            "radial-gradient(circle at 15% 15%, rgba(251, 146, 60, 0.4) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(56, 189, 248, 0.45) 0%, transparent 45%), linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)",
          borderRadius: "1.5rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.4)",
        }}
      >
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h3
            style={{
              margin: "0 0 0.25rem",
              color: "#ffffff",
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            Glassmorphic Menu
          </h3>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "0.875rem",
            }}
          >
            Frosted translucency, backdrop blur, and modern light refraction
          </p>
        </div>

        <div style={{ width: 320, position: "relative", zIndex: 1 }}>
          <Menu
            {...args}
            variant="glassmorphic"
            items={glassItems}
            activeItemId={active}
            onItemClick={setActive}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  boxShadow: "0 2px 8px rgba(99, 102, 241, 0.4)",
                }}
              >
                G
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#0f172a",
                  }}
                >
                  Galyan Workspace
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  Design System Pro
                </div>
              </div>
            </div>
          </Menu>
        </div>
      </div>
    );
  },
};

export const GlassmorphicHorizontal: Story = {
  args: {
    variant: "glassmorphic",
    orientation: "horizontal",
    size: "md",
  },
  render: function Render(args) {
    const [active, setActive] = useState("dashboard");
    const navItems = [
      { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      {
        id: "projects",
        label: "Projects",
        icon: <FolderIcon />,
        badge: "3",
        children: [
          { id: "active-sprints", label: "Active Sprints" },
          { id: "roadmaps", label: "Roadmaps" },
          { id: "analytics", label: "Project Analytics" },
        ],
      },
      {
        id: "team",
        label: "Team",
        icon: <UsersIcon />,
        children: [
          { id: "all-members", label: "All Members" },
          { id: "roles", label: "Roles & Permissions" },
        ],
      },
      { id: "settings", label: "Settings", icon: <SettingsIcon /> },
    ];

    return (
      <div
        style={{
          position: "relative",
          padding: "3rem 2rem",
          background:
            "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 40%, #8b5cf6 100%)",
          borderRadius: "1.5rem",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(14, 165, 233, 0.35)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              margin: "0 0 0.25rem",
              color: "#ffffff",
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            Horizontal Glassmorphic Navbar
          </h3>
          <p
            style={{
              margin: 0,
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "0.875rem",
            }}
          >
            Horizontal bar with frosted glass dropdown popovers
          </p>
        </div>

        <Menu
          {...args}
          orientation="horizontal"
          variant="glassmorphic"
          items={navItems}
          activeItemId={active}
          onItemClick={setActive}
        />
      </div>
    );
  },
};

export const GlassmorphicDarkMode: Story = {
  render: function Render() {
    const [active, setActive] = useState("analytics");
    const darkItems = [
      { id: "analytics", label: "Analytics", icon: <DashboardIcon /> },
      {
        id: "cloud",
        label: "Cloud Services",
        icon: <FolderIcon />,
        badge: "Live",
        children: [
          { id: "clusters", label: "Kubernetes Clusters" },
          { id: "databases", label: "Managed Databases" },
        ],
      },
      {
        id: "access",
        label: "Security & Keys",
        icon: <SettingsIcon />,
        children: [
          { id: "tokens", label: "API Tokens" },
          { id: "audit", label: "Audit Logs" },
        ],
      },
      { id: "div1", label: "", divider: true },
      { id: "team", label: "Collaborators", icon: <UsersIcon /> },
    ];

    return (
      <div
        className="gy-dark dark"
        data-color-mode="dark"
        data-theme="dark"
        style={{
          position: "relative",
          padding: "2.5rem 2rem",
          background:
            "radial-gradient(circle at 20% 15%, rgba(139, 92, 246, 0.35) 0%, transparent 45%), radial-gradient(circle at 80% 85%, rgba(236, 72, 153, 0.3) 0%, transparent 45%), linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%)",
          borderRadius: "1.5rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        }}
      >
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h3
            style={{
              margin: "0 0 0.25rem",
              color: "#f8fafc",
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            Dark Mode Glassmorphic
          </h3>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.875rem" }}>
            Dark frosted glass with subtle neon violet accents
          </p>
        </div>

        <div style={{ width: 320, position: "relative", zIndex: 1 }}>
          <Menu
            variant="glassmorphic"
            items={darkItems}
            activeItemId={active}
            onItemClick={setActive}
          />
        </div>
      </div>
    );
  },
};

