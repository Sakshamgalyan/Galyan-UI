import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarLogo,
  SidebarText,
  SidebarDivider,
  SidebarBody,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarItemData,
  type SidebarRolePreset,
} from "./Sidebar";
import { Avatar } from "../avatar/Avatar";
import { Badge } from "../badge/Badge";

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

const MessageSquareIcon = () => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
      options: [
        "default",
        "floating",
        "floating-glass",
        "floating-glassmorphic",
        "bordered",
        "compact",
        "glass",
        "glassmorphic",
        "dark",
      ],
    },
    activeVariant: {
      control: "select",
      options: ["pill", "line", "subtle", "glow"],
    },
    accentColor: { control: "color" },
    colorScheme: {
      control: "select",
      options: [
        undefined,
        "admin",
        "owner",
        "editor",
        "moderator",
        "viewer",
        "support",
        "guest",
      ],
    },
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
      {
        id: "projects-backlog",
        label: "Backlog Items",
        badge: "8",
        badgeColor: "neutral",
      },
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
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      width: "100%",
    }}
  >
    <div
      className="gy-sidebar-logo"
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
    <div
      className="gy-sidebar-text"
      style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: "0.95rem",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        Galyan Studio
      </span>
      <span
        style={{
          fontSize: "0.75rem",
          color: "var(--gy-text-subtle, #94a3b8)",
          whiteSpace: "nowrap",
        }}
      >
        Enterprise v2.4
      </span>
    </div>
  </div>
);

const UserFooter = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      width: "100%",
    }}
  >
    <div
      className="gy-sidebar-logo"
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
    <div
      className="gy-sidebar-text"
      style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}
    >
      <span
        style={{
          fontWeight: 600,
          fontSize: "0.875rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Saksham Galyan
      </span>
      <span
        style={{
          fontSize: "0.75rem",
          color: "var(--gy-text-subtle, #94a3b8)",
          whiteSpace: "nowrap",
        }}
      >
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
  render: function Render(args) {
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
  render: function Render(args) {
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
  render: function Render(args) {
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
  render: function Render(args) {
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
            Elevated aesthetic with rounded container and soft ambient drop
            shadows.
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
  render: function Render(args) {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "580px",
          width: "720px",
          display: "flex",
          borderRadius: "1.25rem",
          background:
            "linear-gradient(135deg, #e0e7ff 0%, #fae8ff 50%, #dbeafe 100%)",
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

export const GlassmorphicEffect: Story = {
  args: {
    variant: "glassmorphic",
    accentColor: "#8b5cf6",
    collapsible: true,
  },
  render: function Render(args) {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "600px",
          width: "780px",
          display: "flex",
          borderRadius: "1.5rem",
          background:
            "radial-gradient(circle at 15% 25%, #c7d2fe 0%, transparent 45%), radial-gradient(circle at 85% 75%, #fbcfe8 0%, #e0e7ff 100%)",
          padding: "1rem",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#8b5cf6" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main
          style={{
            flex: 1,
            padding: "2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: "1.25rem",
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.05)",
            }}
          >
            <h2 style={{ margin: "0 0 0.5rem", color: "#1e1b4b" }}>
              Glassmorphic Sidebar
            </h2>
            <p style={{ color: "#475569", lineHeight: 1.6 }}>
              State-of-the-art frosted glass aesthetic featuring high-density
              backdrop blur, specular inner bevels, liquid pill highlights, and
              luminous ambient glow.
            </p>
            <div
              style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "9999px",
                  background: "rgba(139, 92, 246, 0.15)",
                  color: "#7c3aed",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                }}
              >
                Active Route: {active}
              </span>
            </div>
          </div>
        </main>
      </div>
    );
  },
};

export const FloatingGlassmorphic: Story = {
  args: {
    variant: "floating-glass",
    activeVariant: "line",
    accentColor: "#7c3aed",
    collapsible: true,
  },
  render: function Render(args) {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "620px",
          width: "820px",
          display: "flex",
          borderRadius: "1.75rem",
          background:
            "radial-gradient(ellipse at top left, #c4b5fd 0%, transparent 50%), radial-gradient(ellipse at bottom right, #a7f3d0 0%, #f1f5f9 100%)",
          padding: "1rem",
          boxShadow: "0 24px 48px -12px rgba(124, 58, 237, 0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#7c3aed" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main
          style={{
            flex: 1,
            padding: "2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1.25rem",
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.75)",
              boxShadow: "0 12px 32px rgba(31, 38, 135, 0.06)",
            }}
          >
            <h2 style={{ margin: "0 0 0.5rem", color: "#1e1b4b" }}>
              Floating Glassmorphic Variant
            </h2>
            <p style={{ color: "#475569", lineHeight: 1.6 }}>
              Native floating inset container combined with theme-adaptive
              frosted glass blur, soft specular reflections, and responsive
              translucency that looks stunning in both light and dark modes.
            </p>
            <div
              style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "9999px",
                  background: "rgba(124, 58, 237, 0.15)",
                  color: "#7c3aed",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                }}
              >
                Active Route: {active}
              </span>
            </div>
          </div>
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
  render: function Render(args) {
    const [active, setActive] = useState("analytics");
    return (
      <div
        style={{
          height: "580px",
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
          header={<BrandHeader color="#10b981" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Slick Collapsed View</h3>
          <p style={{ color: "var(--gy-text-muted)", lineHeight: 1.6 }}>
            Notice how the logo and avatar remain perfectly centered without
            awkward wrapping, notification badge dots glow on the top-right
            corner of icons with badges, hover provides micro-elevation, and
            hovering any icon triggers a floating tooltip with badge
            information.
          </p>
        </main>
      </div>
    );
  },
};

export const ResponsiveMobileDrawer: Story = {
  args: {
    responsive: true,
    breakpoint: 768,
    showBackdropOnMobile: true,
    accentColor: "#0284c7",
    collapsible: true,
  },
  render: function Render(args) {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "580px",
          width: "100%",
          maxWidth: "760px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-background-muted, #f8fafc)",
          position: "relative",
        }}
      >
        <Sidebar
          {...args}
          header={<BrandHeader color="#0284c7" />}
          footer={<UserFooter />}
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Responsive Mobile Drawer</h3>
          <p style={{ color: "var(--gy-text-muted)", lineHeight: 1.6 }}>
            On viewport widths below 768px, the sidebar automatically collapses.
            When expanded on mobile devices, it elevates as a full-height
            overlay drawer with a frosted backdrop click-to-dismiss behavior.
          </p>
        </main>
      </div>
    );
  },
};

export const DarkMode: Story = {
  render: function Render() {
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
            Luminous active highlights, deep slate surface elevation, and
            high-contrast badges.
          </p>
        </main>
      </div>
    );
  },
};

/* ── Role-Based Color Schemes ─────────────────────────────────────────── */

const ROLE_COLORS: Record<string, string> = {
  admin: "#dc2626",
  owner: "#7c3aed",
  editor: "#2563eb",
  moderator: "#d97706",
  viewer: "#059669",
  support: "#0891b2",
  guest: "#6b7280",
  developer: "#0284c7",
  organization: "#7c3aed",
  "org-admin": "#059669",
  "org-member": "#475569",
};

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  owner: "Owner",
  editor: "Editor",
  moderator: "Moderator",
  viewer: "Viewer",
  support: "Support",
  guest: "Guest",
  developer: "Developer (Samantrix)",
  organization: "Organization (Samantrix)",
  "org-admin": "Org Admin (Samantrix)",
  "org-member": "Org Member (Samantrix)",
};

export const RoleColorSchemes: Story = {
  render: function Render() {
    const [active, setActive] = useState("home");
    const [role, setRole] = useState<string>("admin");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Role switcher */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {Object.keys(ROLE_COLORS).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border:
                  role === r
                    ? `2px solid ${ROLE_COLORS[r]}`
                    : "2px solid var(--gy-border, #e2e8f0)",
                background:
                  role === r ? ROLE_COLORS[r] : "var(--gy-surface, #ffffff)",
                color: role === r ? "#ffffff" : "var(--gy-text, #0f172a)",
                fontWeight: 600,
                fontSize: "0.8125rem",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.15s ease",
              }}
            >
              {r}
            </button>
          ))}
        </div>
        <div
          style={{
            height: "580px",
            width: "760px",
            display: "flex",
            border: "1px solid var(--gy-border, #e2e8f0)",
            borderRadius: "1rem",
            overflow: "hidden",
            background: "var(--gy-background-muted, #f8fafc)",
          }}
        >
          <Sidebar
            key={role}
            colorScheme={role as SidebarRolePreset}
            variant="default"
            header={<BrandHeader color={ROLE_COLORS[role]} />}
            footer={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  width: "100%",
                }}
              >
                <div
                  className="gy-sidebar-logo"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: ROLE_COLORS[role],
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
                <div
                  className="gy-sidebar-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Saksham Galyan
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: ROLE_COLORS[role],
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {ROLE_LABELS[role]}
                  </span>
                </div>
              </div>
            }
            items={standardSidebarItems}
            activeItemId={active}
            onItemClick={setActive}
          />
          <main style={{ flex: 1, padding: "2rem" }}>
            <h2 style={{ margin: "0 0 0.5rem" }}>
              Role:{" "}
              <span
                style={{
                  color: ROLE_COLORS[role],
                  textTransform: "capitalize",
                }}
              >
                {ROLE_LABELS[role]}
              </span>
            </h2>
            <p
              style={{
                color: "var(--gy-text-muted, #64748b)",
                lineHeight: 1.6,
              }}
            >
              Each role automatically applies a unique color theme across the
              sidebar — including active item backgrounds, group titles, toggle
              button, dividers, and the accent border strip.
            </p>
            <p
              style={{
                color: "var(--gy-text-muted, #64748b)",
                marginTop: "1rem",
                fontSize: "0.875rem",
              }}
            >
              Use{" "}
              <code
                style={{
                  background: "#f1f5f9",
                  padding: "0.125rem 0.375rem",
                  borderRadius: "4px",
                }}
              >
                colorScheme=&quot;{role}&quot;
              </code>{" "}
              to apply this theme.
            </p>
          </main>
        </div>
      </div>
    );
  },
};

export const RoleColorSchemesDark: Story = {
  render: function Render() {
    const [active, setActive] = useState("home");
    const [role, setRole] = useState<string>("admin");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {Object.keys(ROLE_COLORS).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border:
                  role === r
                    ? `2px solid ${ROLE_COLORS[r]}`
                    : "2px solid #334155",
                background: role === r ? ROLE_COLORS[r] : "#1e293b",
                color: role === r ? "#ffffff" : "#94a3b8",
                fontWeight: 600,
                fontSize: "0.8125rem",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.15s ease",
              }}
            >
              {r}
            </button>
          ))}
        </div>
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
            key={role}
            colorScheme={role as SidebarRolePreset}
            variant="default"
            header={<BrandHeader color={ROLE_COLORS[role]} />}
            footer={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  width: "100%",
                }}
              >
                <div
                  className="gy-sidebar-logo"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: ROLE_COLORS[role],
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
                <div
                  className="gy-sidebar-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      whiteSpace: "nowrap",
                      color: "#f8fafc",
                    }}
                  >
                    Saksham Galyan
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: ROLE_COLORS[role],
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {ROLE_LABELS[role]}
                  </span>
                </div>
              </div>
            }
            items={standardSidebarItems}
            activeItemId={active}
            onItemClick={setActive}
          />
          <main style={{ flex: 1, padding: "2.5rem", color: "#f8fafc" }}>
            <h2 style={{ margin: "0 0 0.5rem" }}>
              Role:{" "}
              <span
                style={{
                  color: ROLE_COLORS[role],
                  textTransform: "capitalize",
                }}
              >
                {ROLE_LABELS[role]}
              </span>
            </h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>
              Role-based color scheme in dark mode. Surface colors adapt to the
              role&apos;s dark tint, providing a cohesive dark theme.
            </p>
          </main>
        </div>
      </div>
    );
  },
};

export const CustomColorScheme: Story = {
  render: function Render() {
    const [active, setActive] = useState("home");
    return (
      <div
        style={{
          height: "580px",
          width: "760px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-background-muted, #f8fafc)",
        }}
      >
        <Sidebar
          colorScheme={{
            primary: "#e11d48",
            surfaceLight: "#fff1f2",
            surfaceDark: "#4c0519",
            textLight: "#be123c",
            textDark: "#fda4af",
            border: "#fecdd3",
          }}
          variant="floating"
          activeVariant="glow"
          header={<BrandHeader color="#e11d48" />}
          footer={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
              }}
            >
              <div
                className="gy-sidebar-logo"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #e11d48, #f43f5e)",
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
              <div
                className="gy-sidebar-text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  Saksham Galyan
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#e11d48",
                    fontWeight: 600,
                  }}
                >
                  Custom Brand
                </span>
              </div>
            </div>
          }
          items={standardSidebarItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main style={{ flex: 1, padding: "2rem" }}>
          <h2 style={{ margin: "0 0 0.5rem" }}>Custom Color Scheme</h2>
          <p
            style={{ color: "var(--gy-text-muted, #64748b)", lineHeight: 1.6 }}
          >
            Pass a custom{" "}
            <code
              style={{
                background: "#f1f5f9",
                padding: "0.125rem 0.375rem",
                borderRadius: "4px",
              }}
            >
              colorScheme
            </code>{" "}
            object with{" "}
            <code
              style={{
                background: "#f1f5f9",
                padding: "0.125rem 0.375rem",
                borderRadius: "4px",
              }}
            >
              primary
            </code>
            ,
            <code
              style={{
                background: "#f1f5f9",
                padding: "0.125rem 0.375rem",
                borderRadius: "4px",
              }}
            >
              {" "}
              surfaceLight
            </code>
            ,
            <code
              style={{
                background: "#f1f5f9",
                padding: "0.125rem 0.375rem",
                borderRadius: "4px",
              }}
            >
              {" "}
              surfaceDark
            </code>
            , and more fields for full brand customization.
          </p>
        </main>
      </div>
    );
  },
};

export const SamantrixWorkplaceSidebar: Story = {
  render: function Render() {
    const [active, setActive] = useState("workplace");
    const [collapsed, setCollapsed] = useState(false);

    const samantrixItems: SidebarItemData[] = [
      {
        id: "workplace",
        label: "3D Virtual Workplace",
        icon: <ProjectsIcon />,
        badge: "LIVE",
        badgeColor: "success",
        group: "VIRTUAL OFFICE",
      },
      {
        id: "proximity-audio",
        label: "Proximity Voice Channel",
        icon: <NotificationIcon />,
        badge: "Active",
        badgeColor: "primary",
        group: "VIRTUAL OFFICE",
      },
      {
        id: "rooms",
        label: "Floor Plan & Rooms",
        icon: <HomeIcon />,
        group: "VIRTUAL OFFICE",
        children: [
          { id: "room-boardroom", label: "Boardroom Alpha" },
          { id: "room-design", label: "Design Studio" },
          { id: "room-breakout", label: "Breakout Lounge" },
        ],
      },
      {
        id: "team-directory",
        label: "Team Directory",
        icon: <UsersIcon />,
        badge: "24",
        badgeColor: "neutral",
        group: "COLLABORATION",
      },
      {
        id: "documents",
        label: "Shared Whiteboards",
        icon: <DocumentIcon />,
        group: "COLLABORATION",
      },
      {
        id: "telemetry",
        label: "Realtime Telemetry",
        icon: <AnalyticsIcon />,
        group: "ORGANIZATION",
      },
      {
        id: "settings",
        label: "Tenant Settings",
        icon: <SettingsIcon />,
        group: "ORGANIZATION",
      },
    ];

    return (
      <div
        data-brand="samantrix"
        data-theme="samantrix"
        style={{
          height: "640px",
          width: "820px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-background, #f8fafc)",
        }}
      >
        <Sidebar
          collapsed={collapsed}
          onCollapseChange={setCollapsed}
          collapsible
          variant="default"
          activeVariant="pill"
          colorScheme="developer"
          header={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
              }}
            >
              <div
                className="gy-sidebar-logo"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, #7c5cff, #6366f1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1rem",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(124, 92, 255, 0.3)",
                }}
              >
                S
              </div>
              <div
                className="gy-sidebar-text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "0.9375rem",
                    lineHeight: 1.2,
                    color: "var(--gy-text, #0f172a)",
                  }}
                >
                  Samantrix HQ
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#7c5cff",
                    fontWeight: 600,
                  }}
                >
                  Digital Workplace v3.2
                </span>
              </div>
            </div>
          }
          footer={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
              }}
            >
              <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80"
                name="Elena Rostova"
                role="developer"
                status="online"
              />
              <div
                className="gy-sidebar-text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.8125rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Elena Rostova
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: "var(--gy-text-muted, #64748b)",
                  }}
                >
                  Desk #12 • Engineering
                </span>
              </div>
            </div>
          }
          items={samantrixItems}
          activeItemId={active}
          onItemClick={setActive}
        />
        <main
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            background: "var(--gy-surface, #ffffff)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
              Samantrix Virtual Office
            </h2>
            <Badge variant="developer" content="DEVELOPER TIER" size="sm" />
          </div>
          <p style={{ color: "var(--gy-text-muted, #64748b)", lineHeight: 1.6, margin: 0 }}>
            Configured with Samantrix brand colors, role-based developer accents, nested floor plan rooms, and online avatar presence in the footer.
          </p>
          <div
            style={{
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "var(--gy-surface-muted, #f8fafc)",
              border: "1px solid var(--gy-border, #e2e8f0)",
              fontSize: "0.875rem",
            }}
          >
            Currently selected route: <strong>{active}</strong>
          </div>
        </main>
      </div>
    );
  },
};

export const WithAvatarsAndBadges: Story = {
  render: function Render() {
    const [active, setActive] = useState("dm-1");

    return (
      <div
        style={{
          height: "600px",
          width: "780px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-surface, #ffffff)",
        }}
      >
        <Sidebar
          variant="bordered"
          activeVariant="subtle"
          colorScheme="org-admin"
          header={
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <Badge dot ping variant="success" size="sm">
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "0.375rem",
                    background: "#059669",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                >
                  O
                </div>
              </Badge>
              <div className="gy-sidebar-text">
                <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Office Team Chat</span>
                <span style={{ fontSize: "0.6875rem", color: "#059669", fontWeight: 600 }}>18 Online</span>
              </div>
            </div>
          }
          footer={
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%" }}>
              <Avatar
                size="md"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
                name="Marcus Vance"
                role="org-admin"
                status="in_meeting"
              />
              <div className="gy-sidebar-text" style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 600, fontSize: "0.8125rem" }}>Marcus Vance</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <Badge variant="org-admin" content="ADMIN" size="xs" />
                  <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>In Meeting</span>
                </div>
              </div>
            </div>
          }
        >
          <SidebarGroup title="DIRECT MESSAGES">
            <SidebarItem
              id="dm-1"
              active={active === "dm-1"}
              onClick={() => setActive("dm-1")}
              icon={
                <Avatar
                  size="xs"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80"
                  name="Elena Rostova"
                  status="online"
                />
              }
              label="Elena Rostova"
              badge={<Badge content={3} variant="danger" size="xs" />}
            />
            <SidebarItem
              id="dm-2"
              active={active === "dm-2"}
              onClick={() => setActive("dm-2")}
              icon={
                <Avatar
                  size="xs"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  name="Aria Chen"
                  status="away"
                />
              }
              label="Aria Chen"
            />
            <SidebarItem
              id="dm-3"
              active={active === "dm-3"}
              onClick={() => setActive("dm-3")}
              icon={
                <Avatar
                  size="xs"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80"
                  name="David Sterling"
                  status="busy"
                />
              }
              label="David Sterling"
            />
          </SidebarGroup>

          <SidebarDivider />

          <SidebarGroup title="LIVE ROOM HUDDLES">
            <SidebarItem
              id="room-eng"
              active={active === "room-eng"}
              onClick={() => setActive("room-eng")}
              icon={<NotificationIcon />}
              label="Engineering Voice"
              badge={<Badge dot ping variant="success" size="sm" />}
            />
            <SidebarItem
              id="room-general"
              active={active === "room-general"}
              onClick={() => setActive("room-general")}
              icon={<MessageSquareIcon />}
              label="All-Hands Stage"
              badge={<Badge variant="neutral" content="42" size="xs" />}
            />
          </SidebarGroup>
        </Sidebar>

        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Sidebar with Avatars & Badges</h3>
          <p style={{ color: "var(--gy-text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
            Demonstrates deep composition pairing the Galyan Sidebar with both the Avatar component (for teammate avatars & status indicators) and the Badge component (for live pings and notification counts).
          </p>
        </main>
      </div>
    );
  },
};

export const CompoundComponentComposition: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("overview");

    return (
      <div
        style={{
          height: "560px",
          width: "740px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-surface, #ffffff)",
        }}
      >
        <Sidebar variant="floating" activeVariant="glow" colorScheme="owner">
          <SidebarHeader>
            <SidebarLogo>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "0.5rem",
                  background: "#7c3aed",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                }}
              >
                C
              </div>
            </SidebarLogo>
            <SidebarText>
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Compound API</span>
              <span style={{ fontSize: "0.6875rem", color: "#7c3aed" }}>Full JSX Control</span>
            </SidebarText>
          </SidebarHeader>

          <SidebarBody>
            <SidebarGroup title="PLATFORM">
              <SidebarItem
                id="overview"
                active={selected === "overview"}
                onClick={() => setSelected("overview")}
                label="System Overview"
                icon={<HomeIcon />}
              />
              <SidebarItem
                id="analytics"
                active={selected === "analytics"}
                onClick={() => setSelected("analytics")}
                label="Metrics & Analytics"
                icon={<AnalyticsIcon />}
                badge="Hot"
                badgeColor="danger"
              />
            </SidebarGroup>

            <SidebarDivider />

            <SidebarGroup title="SETTINGS">
              <SidebarItem
                id="team"
                active={selected === "team"}
                onClick={() => setSelected("team")}
                label="Team & Permissions"
                icon={<UsersIcon />}
              />
              <SidebarItem
                id="config"
                active={selected === "config"}
                onClick={() => setSelected("config")}
                label="Configuration"
                icon={<SettingsIcon />}
              />
            </SidebarGroup>
          </SidebarBody>

          <SidebarFooter>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%" }}>
              <Avatar size="sm" name="Admin Owner" role="organization" />
              <SidebarText>
                <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Enterprise Tenant</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Active plan</span>
              </SidebarText>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main style={{ flex: 1, padding: "2rem" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Compound Component Pattern</h3>
          <p style={{ color: "var(--gy-text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
            Use &lt;SidebarHeader&gt;, &lt;SidebarBody&gt;, &lt;SidebarGroup&gt;, &lt;SidebarItem&gt;, &lt;SidebarDivider&gt;, and &lt;SidebarFooter&gt; for complete JSX compositional control over the layout.
          </p>
        </main>
      </div>
    );
  },
};

export const RightPositionSidebar: Story = {
  render: function Render() {
    const [active, setActive] = useState("participants");

    const rightPanelItems: SidebarItemData[] = [
      {
        id: "participants",
        label: "Voice Participants",
        icon: <UsersIcon />,
        badge: "8",
        badgeColor: "success",
        group: "CALL INFO",
      },
      {
        id: "chat",
        label: "Room Messages",
        icon: <MessageSquareIcon />,
        badge: "3",
        badgeColor: "primary",
        group: "CALL INFO",
      },
      {
        id: "shared-files",
        label: "Meeting Attachments",
        icon: <DocumentIcon />,
        group: "RESOURCES",
      },
      {
        id: "call-settings",
        label: "Audio & Video Devices",
        icon: <SettingsIcon />,
        group: "RESOURCES",
      },
    ];

    return (
      <div
        style={{
          height: "560px",
          width: "780px",
          display: "flex",
          border: "1px solid var(--gy-border, #e2e8f0)",
          borderRadius: "1rem",
          overflow: "hidden",
          background: "var(--gy-surface, #ffffff)",
        }}
      >
        <main style={{ flex: 1, padding: "2rem", background: "var(--gy-background-muted, #f8fafc)" }}>
          <h3 style={{ margin: "0 0 0.5rem" }}>Main Application Workspace</h3>
          <p style={{ color: "var(--gy-text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
            The sidebar below is positioned on the right (<code>position=&quot;right&quot;</code>), ideal for conference side-panels, inspector drawers, or activity feeds.
          </p>
        </main>

        <Sidebar
          position="right"
          collapsible
          variant="default"
          activeVariant="line"
          colorScheme="developer"
          header={
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Room Activity</span>
            </div>
          }
          items={rightPanelItems}
          activeItemId={active}
          onItemClick={setActive}
        />
      </div>
    );
  },
};

export const ActiveVariantsComparison: Story = {
  render: () => {
    const variants: Array<{ id: "pill" | "line" | "subtle" | "glow"; name: string; desc: string }> = [
      { id: "pill", name: "Pill Style", desc: "Solid filled background pill with rounded corners" },
      { id: "line", name: "Line Indicator", desc: "Subtle indicator bar along the leading edge" },
      { id: "subtle", name: "Subtle Fill", desc: "Soft tinted background with colored icon" },
      { id: "glow", name: "Glow Accent", desc: "Luminous primary glow shadow effect" },
    ];

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 1200 }}>
        {variants.map((v) => (
          <div
            key={v.id}
            style={{
              border: "1px solid var(--gy-border, #e2e8f0)",
              borderRadius: "0.75rem",
              overflow: "hidden",
              height: 380,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--gy-border, #e2e8f0)", background: "var(--gy-surface-muted, #f8fafc)" }}>
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>{v.name}</span>
              <span style={{ display: "block", fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>{v.desc}</span>
            </div>
            <div style={{ flex: 1, display: "flex" }}>
              <Sidebar
                collapsible={false}
                variant="default"
                activeVariant={v.id}
                items={[
                  { id: "dash", label: "Dashboard (Active)", icon: <HomeIcon /> },
                  { id: "projects", label: "Projects", icon: <ProjectsIcon /> },
                  { id: "users", label: "Members", icon: <UsersIcon /> },
                ]}
                activeItemId="dash"
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
