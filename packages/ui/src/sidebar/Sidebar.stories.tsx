import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarGroup,
  SidebarItem,
  SidebarFooter,
  SidebarItemData,
} from "./Sidebar";

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

const AnalyticsIcon = () => (
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
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ProjectsIcon = () => (
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

const NotificationIcon = () => (
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
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const meta: Meta<typeof Sidebar> = {
  title: "Galyan UI/Sidebar",
  component: Sidebar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    collapsed: { control: "boolean" },
    collapsible: { control: "boolean" },
    position: {
      control: "inline-radio",
      options: ["left", "right"],
    },
    variant: {
      control: "select",
      options: ["default", "floating", "bordered", "compact", "glass", "dark"],
    },
    activeVariant: {
      control: "select",
      options: ["pill", "line", "subtle", "glow"],
    },
    accentColor: { control: "color" },
    width: { control: "text" },
    collapsedWidth: { control: "text" },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const standardSidebarItems: SidebarItemData[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon />,
    group: "MAIN MENU",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <AnalyticsIcon />,
    badge: "Live",
    badgeColor: "success",
    group: "MAIN MENU",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <ProjectsIcon />,
    badge: "12",
    badgeColor: "neutral",
    group: "WORKSPACE",
  },
  {
    id: "team",
    label: "Team Members",
    icon: <UsersIcon />,
    group: "WORKSPACE",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <NotificationIcon />,
    badge: "3",
    badgeColor: "danger",
    group: "WORKSPACE",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    group: "PREFERENCES",
  },
  {
    id: "documents",
    label: "Archived Docs",
    icon: <DocumentIcon />,
    disabled: true,
    group: "PREFERENCES",
  },
];

const nestedSidebarItems: SidebarItemData[] = [
  {
    id: "home",
    label: "Dashboard",
    icon: <HomeIcon />,
    group: "MAIN MENU",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <AnalyticsIcon />,
    badge: "Live",
    badgeColor: "success",
    group: "MAIN MENU",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <ProjectsIcon />,
    group: "WORKSPACE",
    defaultExpanded: true,
    children: [
      { id: "projects-active", label: "Active Sprints" },
      { id: "projects-roadmap", label: "Product Roadmap" },
      { id: "projects-backlog", label: "Backlog Items", badge: "8", badgeColor: "neutral" },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: <UsersIcon />,
    group: "WORKSPACE",
    children: [
      { id: "team-members", label: "Directory" },
      { id: "team-roles", label: "Permissions" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon />,
    group: "PREFERENCES",
  },
];

const BrandHeader = ({ color = "#10b981" }: { color?: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "8px",
        background: color,
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "1rem",
        flexShrink: 0,
      }}
    >
      G
    </div>
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <span style={{ fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2 }}>
        Galyan Studio
      </span>
      <span style={{ fontSize: "0.75rem", color: "var(--gy-text-subtle, #94a3b8)" }}>
        Enterprise v2.4
      </span>
    </div>
  </div>
);

const UserFooter = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#6366f1",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: "0.8125rem",
        flexShrink: 0,
      }}
    >
      SG
    </div>
    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
      <span style={{ fontWeight: 600, fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        Saksham Galyan
      </span>
      <span style={{ fontSize: "0.75rem", color: "var(--gy-text-subtle, #94a3b8)" }}>
        Admin Owner
      </span>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    collapsible: true,
    variant: "default",
    activeVariant: "pill",
    accentColor: "#10b981",
    position: "left",
    width: 260,
    collapsedWidth: 70,
  },
  render: (args) => {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "600px",
          width: "740px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-background-muted, #f8fafc)",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color={args.accentColor || "#10b981"} />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h2 style={{ margin: "0 0 0.5rem" }}>Dashboard Overview</h2>
          <p style={{ color: "var(--gy-text-muted)" }}>
            Selected navigation route: <strong>{active}</strong>
          </p>
        </main>
      </div>
    );
  },
};

export const LineIndicatorVariant: Story = {
  args: {
    variant: "default",
    activeVariant: "line",
    accentColor: "#3b82f6",
    collapsible: true,
  },
  render: (args) => {
    const [active, setActive] = useState("analytics");
    return (
      <div
        style={{
          height: "580px",
          width: "720px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-background-muted, #f8fafc)",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#3b82f6" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Line Indicator Style</h3>
          <p style={{ color: "var(--gy-text-muted)" }}>
            Vertical accent bar indicator on active item.
          </p>
        </main>
      </div>
    );
  },
};

export const NestedAccordionItems: Story = {
  args: {
    variant: "default",
    activeVariant: "pill",
    accentColor: "#7c3aed",
    collapsible: true,
  },
  render: (args) => {
    const [active, setActive] = useState("projects-active");
    return (
      <div
        style={{
          height: "600px",
          width: "740px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-background-muted, #f8fafc)",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#7c3aed" />}
          footer={<UserFooter />}
          items={nestedSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Nested Accordion Navigation</h3>
          <p style={{ color: "var(--gy-text-muted)" }}>
            Selected sub-route: <strong>{active}</strong>
          </p>
        </main>
      </div>
    );
  },
};

export const FloatingElevated: Story = {
  args: {
    variant: "floating",
    collapsible: true,
    accentColor: "#10b981",
  },
  render: (args) => {
    const [active, setActive] = useState("projects");
    return (
      <div
        style={{
          height: "580px",
          width: "720px",
          display: "flex",
          borderRadius: "1.25rem",
          background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
          padding: "0.5rem",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#10b981" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Floating Elevated Variant</h3>
          <p style={{ color: "var(--gy-text-muted)" }}>
            Elevated aesthetic with rounded container and soft ambient drop shadows.
          </p>
        </main>
      </div>
    );
  },
};

export const Glassmorphism: Story = {
  args: {
    variant: "glass",
    accentColor: "#6366f1",
    collapsible: true,
  },
  render: (args) => {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "580px",
          width: "720px",
          display: "flex",
          borderRadius: "1.25rem",
          background: "linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #dbeafe 100%)",
          padding: "0.5rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#6366f1" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Glassmorphism Backdrop</h3>
          <p style={{ color: "var(--gy-text-muted)" }}>
            Frosted glass with backdrop blur and subtle translucent borders.
          </p>
        </main>
      </div>
    );
  },
};

export const CollapsedIconMode: Story = {
  args: {
    defaultCollapsed: true,
    collapsible: true,
    variant: "default",
    accentColor: "#10b981",
  },
  render: (args) => {
    const [active, setActive] = useState("analytics");
    return (
      <div
        style={{
          height: "560px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-background-muted, #f8fafc)",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#10b981" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Compact Icon View</h3>
          <p style={{ color: "var(--gy-text-muted)" }}>
            Hover over any icon to preview its floating tooltip label.
          </p>
        </main>
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "580px",
          width: "760px",
          display: "flex",
          borderRadius: "1.25rem",
          overflow: "hidden",
          background: "#0b132b",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        }}
        data-color-mode="dark"
      >
        <Sidebar
          variant="dark"
          accentColor="#10b981"
          header={<BrandHeader color="#10b981" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2.5rem", color: "#f8fafc" }}>
          <h2 style={{ margin: "0 0 0.5rem" }}>Dark Mode Workspace</h2>
          <p style={{ color: "#94a3b8" }}>
            Luminous active highlights, deep slate surface elevation, and high-contrast badges.
          </p>
        </main>
      </div>
    );
  },
};
