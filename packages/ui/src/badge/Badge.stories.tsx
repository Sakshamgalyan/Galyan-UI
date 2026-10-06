import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Avatar } from "../avatar/Avatar";

const BellIcon = () => (
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
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const MailIcon = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MessageSquareIcon = () => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: "Galyan UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "neutral",
        "glass",
        "developer",
        "organization",
        "org-admin",
        "org-member",
      ],
      description: "Visual color and role style preset",
      table: {
        type: {
          summary:
            "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'glass' | 'developer' | 'organization' | 'org-admin' | 'org-member'",
        },
        defaultValue: { summary: "'primary'" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size scale of the badge",
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    placement: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left", "inline"],
      description: "Placement relative to children, or standalone inline",
      table: {
        type: { summary: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'" },
      },
    },
    content: {
      control: "text",
      description: "Content displayed inside badge (number, symbol, or short label)",
    },
    max: {
      control: "number",
      description: "Maximum threshold before capping numeric counter with '+'",
      table: {
        defaultValue: { summary: "99" },
      },
    },
    dot: {
      control: "boolean",
      description: "Render as a compact status dot without text content",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    ping: {
      control: "boolean",
      description: "Render an animated pulsing radar ping ring",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showZero: {
      control: "boolean",
      description: "Render badge when numeric content is 0",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    invisible: {
      control: "boolean",
      description: "Force hide the badge",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "8",
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <Badge variant="primary" content="Primary" />
      <Badge variant="secondary" content="Secondary" />
      <Badge variant="success" content="Success" />
      <Badge variant="warning" content="Warning" />
      <Badge variant="danger" content="Danger" />
      <Badge variant="info" content="Info" />
      <Badge variant="neutral" content="Neutral" />
      <div
        style={{
          padding: "0.5rem 0.75rem",
          borderRadius: "0.5rem",
          background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
        }}
      >
        <Badge variant="glass" content="Glass" />
      </div>
    </div>
  ),
};

export const RoleVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
          Samantrix Role Badges
        </h4>
        <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
          Coordinated with platform user tiers and organizational permissions.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
          <Badge variant="developer" content="DEVELOPER" size="sm" />
          <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Developer Console</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
          <Badge variant="org-admin" content="ORG ADMIN" size="sm" />
          <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Admin Workspace</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
          <Badge variant="org-member" content="ORG MEMBER" size="sm" />
          <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Digital Workplace</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
          <Badge variant="organization" content="ORGANIZATION" size="sm" />
          <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Enterprise Tenant</span>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge size="xs" variant="primary" content="4" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>xs (16px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge size="sm" variant="primary" content="12" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>sm (20px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge size="md" variant="primary" content="24" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>md (24px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge size="lg" variant="primary" content="99+" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>lg (28px)</span>
      </div>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
      <Badge content="1" variant="danger" placement="top-right">
        <Avatar name="Top Right" size="lg" />
      </Badge>
      <Badge content="2" variant="warning" placement="top-left">
        <Avatar name="Top Left" size="lg" />
      </Badge>
      <Badge content="3" variant="success" placement="bottom-right">
        <Avatar name="Bottom Right" size="lg" />
      </Badge>
      <Badge content="4" variant="info" placement="bottom-left">
        <Avatar name="Bottom Left" size="lg" />
      </Badge>
    </div>
  ),
};

export const BadgesOverAvatars: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
      <Badge content="5" variant="danger" size="sm">
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80"
          name="Elena Rostova"
          size="lg"
        />
      </Badge>

      <Badge content="99+" variant="primary" size="sm">
        <Avatar
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
          name="Marcus Vance"
          size="lg"
        />
      </Badge>

      <Badge dot variant="success" size="sm">
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
          name="Aria Chen"
          size="lg"
        />
      </Badge>

      <Badge dot ping variant="danger" size="sm">
        <Avatar
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80"
          name="David Sterling"
          size="lg"
        />
      </Badge>

      <Badge content="DEV" variant="developer" size="xs">
        <Avatar name="Siddharth Patel" size="lg" role="developer" />
      </Badge>
    </div>
  ),
};

export const BadgesOverIcons: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
      <Badge content="3" variant="danger" size="sm">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "0.5rem",
            border: "1px solid var(--gy-border, #e2e8f0)",
            background: "var(--gy-surface, #ffffff)",
            color: "var(--gy-text, #1e293b)",
            cursor: "pointer",
          }}
          aria-label="Notifications"
        >
          <BellIcon />
        </button>
      </Badge>

      <Badge content="12" variant="primary" size="sm">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "0.5rem",
            border: "1px solid var(--gy-border, #e2e8f0)",
            background: "var(--gy-surface, #ffffff)",
            color: "var(--gy-text, #1e293b)",
            cursor: "pointer",
          }}
          aria-label="Messages"
        >
          <MailIcon />
        </button>
      </Badge>

      <Badge dot variant="success" size="sm">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "0.5rem",
            border: "1px solid var(--gy-border, #e2e8f0)",
            background: "var(--gy-surface, #ffffff)",
            color: "var(--gy-text, #1e293b)",
            cursor: "pointer",
          }}
          aria-label="Live Chat"
        >
          <MessageSquareIcon />
        </button>
      </Badge>

      <Badge dot ping variant="danger" size="sm">
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "0.5rem",
            border: "1px solid var(--gy-border, #e2e8f0)",
            background: "var(--gy-surface, #ffffff)",
            color: "var(--gy-text, #1e293b)",
            cursor: "pointer",
          }}
          aria-label="Urgent Broadcast"
        >
          <BellIcon />
        </button>
      </Badge>
    </div>
  ),
};

export const DotBadges: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Badge dot variant="success" size="sm" />
        <span style={{ fontSize: "0.8125rem" }}>Available</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Badge dot variant="warning" size="sm" />
        <span style={{ fontSize: "0.8125rem" }}>Away</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Badge dot variant="danger" size="sm" />
        <span style={{ fontSize: "0.8125rem" }}>Offline</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Badge dot variant="info" size="sm" />
        <span style={{ fontSize: "0.8125rem" }}>Connecting</span>
      </div>
    </div>
  ),
};

export const PingAnimation: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Badge dot ping variant="success" size="md" />
        <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Live Proximity Audio</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Badge dot ping variant="danger" size="md" />
        <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Meeting Recording</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Badge dot ping variant="developer" size="md" />
        <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Realtime Telemetry Feed</span>
      </div>
    </div>
  ),
};

export const NumericCaps: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge content={42} max={99} variant="primary" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Under Cap (42)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge content={120} max={99} variant="danger" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Max 99 (120 - 99+)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge content={15} max={9} variant="warning" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Max 9 (15 - 9+)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
        <Badge content={0} showZero variant="secondary" />
        <span style={{ fontSize: "0.6875rem", color: "var(--gy-text-muted)" }}>Show Zero (0)</span>
      </div>
    </div>
  ),
};

export const GlassBadges: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        padding: "1.5rem 2rem",
        borderRadius: "1rem",
        background: "linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #312e81 100%)",
      }}
    >
      <Badge variant="glass" content="Live Desk" size="sm" />
      <Badge variant="glass" content="18 Active Rooms" size="sm" />
      <Badge variant="glass" dot ping size="sm" />
      <Badge variant="glass" content="99+" size="sm">
        <Avatar name="VR" size="md" variant="glass" />
      </Badge>
    </div>
  ),
};
