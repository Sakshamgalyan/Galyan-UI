import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./Avatar";

const SAMPLE_AVATAR_1 =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80";
const SAMPLE_AVATAR_2 =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80";
const SAMPLE_AVATAR_3 =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80";
const SAMPLE_AVATAR_4 =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80";
const SAMPLE_AVATAR_5 =
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80";

const meta: Meta<typeof Avatar> = {
  title: "Galyan UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Size preset for the avatar container",
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    shape: {
      control: "select",
      options: ["circle", "rounded", "square"],
      description: "Border radius shape preset",
      table: {
        type: { summary: "'circle' | 'rounded' | 'square'" },
        defaultValue: { summary: "'circle'" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "ring", "glass"],
      description: "Visual style variant",
      table: {
        type: { summary: "'default' | 'bordered' | 'ring' | 'glass'" },
        defaultValue: { summary: "'default'" },
      },
    },
    status: {
      control: "select",
      options: ["online", "away", "busy", "in_meeting", "dnd", "offline"],
      description: "Live digital workplace presence status indicator",
      table: {
        type: {
          summary: "'online' | 'away' | 'busy' | 'in_meeting' | 'dnd' | 'offline'",
        },
      },
    },
    statusPosition: {
      control: "select",
      options: ["bottom-right", "top-right", "bottom-left", "top-left"],
      description: "Positioning of the presence indicator dot",
      table: {
        type: { summary: "'bottom-right' | 'top-right' | 'bottom-left' | 'top-left'" },
        defaultValue: { summary: "'bottom-right'" },
      },
    },
    role: {
      control: "select",
      options: ["developer", "org-admin", "org-member", "organization"],
      description: "Samantrix role ring accent",
      table: {
        type: { summary: "'developer' | 'organization' | 'org-admin' | 'org-member'" },
      },
    },
    glow: {
      control: "boolean",
      description: "Subtle primary ring and elevation glow shadow",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    interactive: {
      control: "boolean",
      description: "Cursor pointer, hover scale 1.05 and active feedback",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    name: {
      control: "text",
      description: "User full name for automatic fallback initials extraction",
    },
    src: {
      control: "text",
      description: "Image URL for the avatar",
    },
    alt: {
      control: "text",
      description: "Alternative text for accessibility",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: SAMPLE_AVATAR_1,
    name: "Elena Rostova",
    size: "md",
    status: "online",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="xs" src={SAMPLE_AVATAR_1} name="Elena Rostova" status="online" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>xs (20px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="sm" src={SAMPLE_AVATAR_2} name="Marcus Vance" status="online" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>sm (28px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="md" src={SAMPLE_AVATAR_3} name="Aria Chen" status="away" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>md (36px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_4} name="David Sterling" status="busy" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>lg (44px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="xl" src={SAMPLE_AVATAR_5} name="Siddharth Patel" status="in_meeting" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>xl (56px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="2xl" src={SAMPLE_AVATAR_1} name="Elena Rostova" status="online" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>2xl (72px)</span>
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" shape="circle" src={SAMPLE_AVATAR_1} name="Circle Shape" status="online" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Circle</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" shape="rounded" src={SAMPLE_AVATAR_2} name="Rounded Shape" status="busy" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Rounded</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" shape="square" src={SAMPLE_AVATAR_3} name="Square Shape" status="away" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Square</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" variant="default" src={SAMPLE_AVATAR_1} name="Default" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Default</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" variant="bordered" src={SAMPLE_AVATAR_2} name="Bordered" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Bordered</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" variant="ring" src={SAMPLE_AVATAR_3} name="Primary Ring" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Ring</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem",
          borderRadius: "0.75rem",
          background: "linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)",
        }}
      >
        <Avatar size="lg" variant="glass" name="GK" />
        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Glass</span>
      </div>
    </div>
  ),
};

export const PresenceStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_1} name="Online" status="online" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#10b981" }}>Online</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_2} name="Away" status="away" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#f59e0b" }}>Away</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_3} name="Busy" status="busy" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#ef4444" }}>Busy</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_4} name="In Meeting" status="in_meeting" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#8b5cf6" }}>In Meeting</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_5} name="DND" status="dnd" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#dc2626" }}>DND</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_1} name="Offline" status="offline" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8" }}>Offline</span>
      </div>
    </div>
  ),
};

export const StatusPositions: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_1} status="online" statusPosition="bottom-right" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Bottom Right</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_2} status="online" statusPosition="top-right" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Top Right</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_3} status="online" statusPosition="bottom-left" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Bottom Left</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_4} status="online" statusPosition="top-left" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Top Left</span>
      </div>
    </div>
  ),
};

export const FallbackAndInitials: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" name="Saksham Galyan" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Full Name: "SG"</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" name="Antigravity" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Single Name: "AN"</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar size="lg" src="https://broken-image-link-test.jpg" name="Fallback On Error" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Broken Image</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Avatar
          size="lg"
          fallback={
            <svg
              width="20"
              height="20"
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
          }
        />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Custom Icon</span>
      </div>
    </div>
  ),
};

export const RoleRings: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_1} role="developer" status="online" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#0284c7" }}>Developer</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_2} role="org-admin" status="busy" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#059669" }}>Org Admin</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_3} role="org-member" status="away" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>Org Member</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar size="lg" src={SAMPLE_AVATAR_4} role="organization" status="in_meeting" />
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#7c3aed" }}>Organization</span>
      </div>
    </div>
  ),
};

export const AvatarGroups: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <span style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Normal Spacing (Default):
        </span>
        <AvatarGroup max={4} size="md">
          <Avatar src={SAMPLE_AVATAR_1} name="Elena Rostova" status="online" />
          <Avatar src={SAMPLE_AVATAR_2} name="Marcus Vance" status="away" />
          <Avatar src={SAMPLE_AVATAR_3} name="Aria Chen" status="busy" />
          <Avatar src={SAMPLE_AVATAR_4} name="David Sterling" status="in_meeting" />
          <Avatar src={SAMPLE_AVATAR_5} name="Siddharth Patel" status="online" />
          <Avatar name="Sarah Jenkins" />
          <Avatar name="Liam Thorne" />
        </AvatarGroup>
      </div>

      <div>
        <span style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Tight Spacing (Overlap - Small):
        </span>
        <AvatarGroup max={3} size="sm" spacing="tight">
          <Avatar src={SAMPLE_AVATAR_1} name="User 1" />
          <Avatar src={SAMPLE_AVATAR_2} name="User 2" />
          <Avatar src={SAMPLE_AVATAR_3} name="User 3" />
          <Avatar src={SAMPLE_AVATAR_4} name="User 4" />
          <Avatar src={SAMPLE_AVATAR_5} name="User 5" />
        </AvatarGroup>
      </div>

      <div>
        <span style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Relaxed Spacing (Large):
        </span>
        <AvatarGroup max={5} size="lg" spacing="relaxed">
          <Avatar src={SAMPLE_AVATAR_1} name="Elena Rostova" status="online" />
          <Avatar src={SAMPLE_AVATAR_2} name="Marcus Vance" status="busy" />
          <Avatar src={SAMPLE_AVATAR_3} name="Aria Chen" status="away" />
          <Avatar src={SAMPLE_AVATAR_4} name="David Sterling" status="offline" />
          <Avatar src={SAMPLE_AVATAR_5} name="Siddharth Patel" status="in_meeting" />
          <Avatar name="Team Lead" />
        </AvatarGroup>
      </div>
    </div>
  ),
};

export const DigitalWorkplaceRoster: Story = {
  render: () => {
    const teamMembers = [
      {
        name: "Elena Rostova",
        title: "Principal Graphics Architect",
        role: "developer" as const,
        status: "online" as const,
        statusLabel: "At desk (3D Office)",
        avatar: SAMPLE_AVATAR_1,
      },
      {
        name: "Marcus Vance",
        title: "Engineering Director",
        role: "org-admin" as const,
        status: "in_meeting" as const,
        statusLabel: "In Boardroom A",
        avatar: SAMPLE_AVATAR_2,
      },
      {
        name: "Aria Chen",
        title: "Product Design Lead",
        role: "org-member" as const,
        status: "busy" as const,
        statusLabel: "Focusing — Do Not Disturb",
        avatar: SAMPLE_AVATAR_3,
      },
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          width: 380,
          padding: "1.25rem",
          borderRadius: "0.875rem",
          background: "var(--gy-surface, #ffffff)",
          border: "1px solid var(--gy-border, #e2e8f0)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--gy-text)" }}>
          Active Floor Room: Design Studio
        </span>
        {teamMembers.map((m) => (
          <div
            key={m.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              padding: "0.625rem",
              borderRadius: "0.5rem",
              transition: "background 0.15s ease",
            }}
          >
            <Avatar size="md" src={m.avatar} name={m.name} role={m.role} status={m.status} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gy-text)" }}>
                  {m.name}
                </span>
              </div>
              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
                {m.title}
              </span>
              <span style={{ display: "block", fontSize: "0.6875rem", color: "var(--gy-text-subtle, #94a3b8)" }}>
                {m.statusLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

const BellIcon = () => (
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
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MailIcon = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
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

export const GlowAndInteractive: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar src={SAMPLE_AVATAR_1} name="Elena Rostova" size="md" glow interactive />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Image + Glow</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar name="Alex Vance" size="md" variant="glass" glow interactive status="online" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Glass + Status</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar name="Gordan Freeman" size="md" variant="default" glow interactive />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Default + Glow</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar src={SAMPLE_AVATAR_2} size="lg" glow interactive status="away" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Large + Away</span>
      </div>
    </div>
  ),
};

export const IconFallback: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar fallback={<BellIcon />} size="md" variant="default" interactive />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Bell Icon</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar fallback={<MailIcon />} size="md" variant="glass" interactive />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Mail Icon</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <Avatar fallback={<ShieldIcon />} size="md" variant="default" glow interactive status="busy" statusPosition="top-right" />
        <span style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>Shield + Status</span>
      </div>
    </div>
  ),
};

export const HeaderProfileAvatar: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1.5rem",
        borderRadius: "1rem",
        background: "var(--gy-surface, #ffffff)",
        border: "1px solid var(--gy-border, #e2e8f0)",
      }}
    >
      <Avatar
        src={SAMPLE_AVATAR_1}
        name="Elena Rostova"
        size="md"
        variant="glass"
        status="online"
        glow
        interactive
        aria-label="Account menu"
      />
      <div>
        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gy-text)" }}>
          Elena Rostova
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Interactive header profile trigger with glow
        </div>
      </div>
    </div>
  ),
};

