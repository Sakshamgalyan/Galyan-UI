import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { Chip } from "../chips/Chips";
import { Button } from "../button/Button";
import { Toggle } from "../toggle/Toggle";
import { Input } from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";

/* ── SVG Icons ───────────────────────────────────────────────────────────── */

const CreditCardIcon = () => (
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
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
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

const QuestionIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

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

const CodeIcon = () => (
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
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ZapIcon = () => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const SettingsIcon = () => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LockIcon = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SlidersIcon = () => (
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
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

/* ── Meta Configuration ─────────────────────────────────────────────────── */

/**
 * Collapsible panels for presenting hierarchical, grouped, or FAQ information.
 */
const meta: Meta<typeof Accordion> = {
  title: "Galyan UI/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: 620,
          maxWidth: "100%",
          padding: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size preset for spacing and font scale",
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "flush", "separated", "filled"],
      description: "Visual appearance style",
    },
    disabled: { control: "boolean", description: "Disable interactions" },
    defaultExpanded: {
      control: "boolean",
      description: "Initial expanded state",
    },
    expanded: { control: "boolean", description: "Controlled expanded state" },
    unmountOnExit: {
      control: "boolean",
      description: "Unmount panel children when collapsed",
    },
    expandIconPosition: {
      control: "inline-radio",
      options: ["left", "right"],
      description: "Position of the chevron expand icon",
    },
    allowMultiple: {
      control: "boolean",
      description: "Allow multiple items open simultaneously in group mode",
    },
    title: { control: "text", description: "Accordion header title" },
    subtitle: { control: "text", description: "Accordion header subtitle" },
    className: { control: "text", description: "Additional CSS classes" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ── 1. Playground ──────────────────────────────────────────────────────── */

export const Playground: Story = {
  args: {
    title: "Personal Information",
    subtitle: "Manage your name, email, and contact preferences",
    defaultExpanded: true,
    size: "md",
    variant: "default",
    expandIconPosition: "right",
    unmountOnExit: false,
    disabled: false,
  },
  render: (args) => (
    <Accordion {...args}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        <p style={{ margin: 0, color: "var(--gy-text-muted)" }}>
          Update your public profile details and communication settings below.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <strong style={{ fontSize: "0.8125rem", color: "var(--gy-text)" }}>Full Name</strong>
            <div style={{ color: "var(--gy-text-muted)", fontSize: "0.875rem", marginTop: 2 }}>Saksham Galyan</div>
          </div>
          <div>
            <strong style={{ fontSize: "0.8125rem", color: "var(--gy-text)" }}>Email Address</strong>
            <div style={{ color: "var(--gy-text-muted)", fontSize: "0.875rem", marginTop: 2 }}>saksham@samantrix.com</div>
          </div>
        </div>
      </div>
    </Accordion>
  ),
};

/* ── 2. Default ─────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    title: "Credit card",
    subtitle: "8 attributes",
    defaultExpanded: true,
    size: "md",
    variant: "default",
    expandIconPosition: "right",
  },
  render: (args) => (
    <Accordion {...args}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <p style={{ margin: 0 }}>
          Credit card information including card number, expiry date, CVV, and cardholder details.
        </p>
        <p style={{ margin: 0, fontWeight: 600 }}>
          Use the controls below to change the accordion properties!
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span>Card Number</span>
          <span>Expiry Date</span>
          <span>CVV</span>
          <span>Cardholder Name</span>
        </div>
      </div>
    </Accordion>
  ),
};

/* ── 3. Bordered ────────────────────────────────────────────────────────── */

export const Bordered: Story = {
  name: "Bordered",
  render: () => (
    <Accordion
      variant="bordered"
      items={[
        {
          id: "1",
          title: "How does the Brand × Role theme system work?",
          subtitle: "Multi-brand styling architecture",
          defaultExpanded: true,
          content:
            "Brands define the company palette (easyLife, metalixia, samantrix) while roles adjust surfaces and permission-based accents across all components seamlessly.",
        },
        {
          id: "2",
          title: "Can I provide custom primary colors?",
          subtitle: "Dynamic color ramp generator",
          content:
            "Yes! Pass brand='custom' and customTheme={{ primary: '#3b82f6' }} to dynamically derive a complete WCAG AAA accessible color ramp.",
        },
        {
          id: "3",
          title: "Is dark mode supported out of the box?",
          subtitle: "CSS custom properties support",
          content:
            "Yes, all components support light and dark modes seamlessly via CSS custom properties and dynamic data-theme attributes.",
        },
      ]}
    />
  ),
};

/* ── 4. Filled ──────────────────────────────────────────────────────────── */

export const Filled: Story = {
  name: "Filled",
  render: () => (
    <Accordion
      variant="filled"
      defaultExpandedIds={["email"]}
      items={[
        {
          id: "email",
          title: "Email Notifications",
          subtitle: "Daily digest, security alerts & reports",
          content:
            "Receive instant notifications for high-priority security events, weekly performance analytics summaries, and monthly billing invoices.",
        },
        {
          id: "push",
          title: "Push Notifications",
          subtitle: "Real-time browser & device alerts",
          content:
            "Get instant desktop notifications when workflow automation triggers finish or when critical transaction anomalies are detected.",
        },
        {
          id: "sms",
          title: "SMS & WhatsApp Alerts",
          subtitle: "Two-factor OTPs & urgent receipts",
          content:
            "Receive SMS verification codes for high-value transactions and direct WhatsApp updates for scheduled maintenance windows.",
        },
      ]}
    />
  ),
};

/* ── 5. With Icon ───────────────────────────────────────────────────────── */

export const WithIcon: Story = {
  name: "With Icon",
  render: () => (
    <Accordion
      variant="separated"
      defaultExpandedIds={["billing"]}
      items={[
        {
          id: "billing",
          icon: <CreditCardIcon />,
          title: "Billing & Subscription",
          subtitle: "Payment methods, invoices & receipts",
          content: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p style={{ margin: 0 }}>
                Manage payment methods, download invoices, and configure
                auto-renewal settings.
              </p>
              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}
              >
                <Chip size="sm" variant="success">
                  Visa •••• 4242
                </Chip>
                <Chip size="sm" variant="neutral">
                  Next invoice: Oct 1, 2026
                </Chip>
              </div>
            </div>
          ),
        },
        {
          id: "security",
          icon: <ShieldIcon />,
          title: "Security & Authentication",
          subtitle: "2FA, biometric keys & active sessions",
          content:
            "Protect your workspace with hardware security keys (FIDO2), authenticator apps, and enforce company-wide session expiration policies.",
        },
        {
          id: "api",
          icon: <CodeIcon />,
          title: "Developer API Keys",
          subtitle: "Samantrix, metalixia & easyLife apps",
          content:
            "Generate, rotate, and revoke REST API tokens and client secrets for production and sandbox environments.",
        },
        {
          id: "webhooks",
          icon: <ZapIcon />,
          title: "Webhooks & Automation",
          subtitle: "Real-time event subscriptions & retry queues",
          content:
            "Subscribe to payment.success, dispute.created, and order.settled webhooks with automatic exponential backoff retries.",
        },
      ]}
    />
  ),
};

/* ── 6. With Actions ────────────────────────────────────────────────────── */

export const WithActions: Story = {
  name: "With Actions",
  render: () => {
    const [pipelineActive, setPipelineActive] = useState(true);
    const [fraudGuardActive, setFraudGuardActive] = useState(true);

    return (
      <Accordion
        variant="separated"
        defaultExpandedIds={["pipeline"]}
        items={[
          {
            id: "pipeline",
            icon: <ZapIcon />,
            title: "CI/CD Auto-Deploy Pipeline",
            subtitle: "Triggered on push to main branch",
            actions: (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Chip
                  size="sm"
                  variant={pipelineActive ? "success" : "neutral"}
                >
                  {pipelineActive ? "Active" : "Paused"}
                </Chip>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => alert("Deployment triggered manually!")}
                >
                  Deploy Now
                </Button>
              </div>
            ),
            content: (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <p style={{ margin: 0 }}>
                  Automated test suites and production build container
                  deployment runs on every merge to <code>main</code>.
                </p>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--gy-text-muted)",
                  }}
                >
                  Last run: 12 minutes ago • <strong>Passed (0 errors)</strong>
                </div>
              </div>
            ),
          },
          {
            id: "fraud",
            icon: <ShieldIcon />,
            title: "Real-Time Fraud Guard",
            subtitle: "Machine learning velocity anomaly detection",
            actions: (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Toggle
                  size="sm"
                  checked={fraudGuardActive}
                  onChange={(e) => setFraudGuardActive(e.target.checked)}
                />
              </div>
            ),
            content: (
              <p style={{ margin: 0 }}>
                Evaluates every incoming transaction through 40+ risk signals
                including geolocation velocity, card fingerprinting, and
                behavioral biometrics.
              </p>
            ),
          },
          {
            id: "backups",
            icon: <SettingsIcon />,
            title: "Automated Daily Backups",
            subtitle: "AES-256 encrypted snapshot to S3 at 00:00 UTC",
            actions: (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Chip size="sm" variant="soft">
                  Scheduled
                </Chip>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => alert("Backup configuration opened")}
                >
                  Configure
                </Button>
              </div>
            ),
            content: (
              <p style={{ margin: 0 }}>
                Snapshots are retained for 90 days in compliance with ISO 27001
                and SOC 2 data retention standards.
              </p>
            ),
          },
        ]}
      />
    );
  },
};

/* ── 7. Controlled ──────────────────────────────────────────────────────── */

export const Controlled: Story = {
  name: "Controlled",
  render: () => {
    const [expandedIds, setExpandedIds] = useState<string[]>(["item-1"]);

    const allIds = ["item-1", "item-2", "item-3"];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Controls Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
            padding: "0.75rem 1rem",
            background: "var(--gy-surface-muted, #f8fafc)",
            border: "1px solid var(--gy-border, #e2e8f0)",
            borderRadius: "0.5rem",
          }}
        >
          <Button
            size="xs"
            variant="primary"
            onClick={() => setExpandedIds(allIds)}
          >
            Expand All
          </Button>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => setExpandedIds([])}
          >
            Collapse All
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() =>
              setExpandedIds((prev) =>
                prev.includes("item-1")
                  ? prev.filter((id) => id !== "item-1")
                  : [...prev, "item-1"],
              )
            }
          >
            Toggle Panel 1
          </Button>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.8125rem",
              color: "var(--gy-text-muted)",
            }}
          >
            Expanded:{" "}
            <strong>
              {expandedIds.length === 0 ? "None" : expandedIds.join(", ")}
            </strong>
          </span>
        </div>

        {/* Accordion with Controlled Props */}
        <Accordion
          variant="bordered"
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          items={[
            {
              id: "item-1",
              title: "Panel 1: Core Architecture",
              subtitle: "High-performance modular runtime",
              content:
                "Built with modern web standards, zero third-party UI dependencies, and full CSS custom property theming.",
            },
            {
              id: "item-2",
              title: "Panel 2: Security & Permissions",
              subtitle: "Role-based access controls (RBAC)",
              content:
                "Enforce granular read, write, and execute permissions across micro-frontends and API gateway layers.",
            },
            {
              id: "item-3",
              title: "Panel 3: Analytics & Telemetry",
              subtitle: "OpenTelemetry & Prometheus metrics",
              content:
                "Real-time distributed tracing, latency heatmaps, and error rate monitoring out of the box.",
            },
          ]}
        />
      </div>
    );
  },
};

/* ── 8. Allow Multiple ──────────────────────────────────────────────────── */

export const AllowMultiple: Story = {
  name: "Allow Multiple",
  render: () => {
    const [allowMultiple, setAllowMultiple] = useState(true);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
            background: "var(--gy-surface-muted, #f8fafc)",
            border: "1px solid var(--gy-border, #e2e8f0)",
            borderRadius: "0.5rem",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--gy-text)",
            }}
          >
            Accordion Mode:{" "}
            {allowMultiple ? "Multiple Panels Open" : "Single Panel Open"}
          </div>
          <Toggle
            size="sm"
            label="Allow Multiple"
            checked={allowMultiple}
            onChange={(e) => setAllowMultiple(e.target.checked)}
          />
        </div>

        <Accordion
          variant="separated"
          allowMultiple={allowMultiple}
          defaultExpandedIds={["acc-1"]}
          items={[
            {
              id: "acc-1",
              title: "1. Global Payment Gateways",
              subtitle: "Stripe, Adyen, Razorpay & PayPal",
              content:
                "Supports multi-currency settlement in 135+ currencies with intelligent smart routing to reduce cross-border decline rates.",
            },
            {
              id: "acc-2",
              title: "2. FX Optimization Engine",
              subtitle: "Automated real-time hedging",
              content:
                "Locks in institutional foreign exchange spot rates with zero markup to protect vendor payouts against currency volatility.",
            },
            {
              id: "acc-3",
              title: "3. Compliance & Tax Filing",
              subtitle: "Automated 1099-K & VAT calculations",
              content:
                "Automatically generate localized tax invoices and calculate digital sales tax across EU, US, and APAC jurisdictions.",
            },
          ]}
        />
      </div>
    );
  },
};

/* ── 9. Small Size ──────────────────────────────────────────────────────── */

export const SmallSize: Story = {
  name: "Small Size",
  render: () => (
    <Accordion
      size="sm"
      variant="bordered"
      defaultExpandedIds={["sm-1"]}
      items={[
        {
          id: "sm-1",
          title: "Database Cluster: prod-primary-01",
          subtitle: "PostgreSQL 16 • 8 vCPU • 32 GB RAM",
          content:
            "Health: 99.99% • Disk Usage: 42% (210 GB / 500 GB) • Active Connections: 128 / 500.",
        },
        {
          id: "sm-2",
          title: "Redis Cache: prod-cache-cluster",
          subtitle: "Cluster mode enabled • 3 nodes • 16 GB",
          content:
            "Hit Ratio: 98.4% • Memory: 4.8 GB used • Evictions: 0 • Latency: 0.42ms.",
        },
        {
          id: "sm-3",
          title: "Elasticsearch: prod-logs-indexer",
          subtitle: "6 shards • 2 replicas • 1.2 TB Indexed",
          content:
            "Cluster status: Green • Search throughput: 4,200 req/sec • Indexing lag: 12ms.",
        },
      ]}
    />
  ),
};

/* ── 10. Large Size ─────────────────────────────────────────────────────── */

export const LargeSize: Story = {
  name: "Large Size",
  render: () => (
    <Accordion
      size="lg"
      variant="separated"
      defaultExpandedIds={["lg-1"]}
      items={[
        {
          id: "lg-1",
          title: "Enterprise Multi-Tenant Infrastructure",
          subtitle:
            "Dedicated VPC, custom KMS keys, and isolated database schemas",
          content: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <p style={{ margin: 0, lineHeight: 1.6 }}>
                Every enterprise tenant receives a dedicated Virtual Private
                Cloud with custom AWS/GCP KMS key encryption, HIPAA/SOC 2
                compliance controls, and guaranteed 99.999% uptime SLA.
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <Chip size="md" variant="success">
                  ISO 27001 Certified
                </Chip>
                <Chip size="md" variant="soft">
                  SOC 2 Type II
                </Chip>
                <Chip size="md" variant="neutral">
                  HIPAA Ready
                </Chip>
              </div>
            </div>
          ),
        },
        {
          id: "lg-2",
          title: "24/7 Dedicated Solutions Engineer",
          subtitle:
            "15-minute emergency response SLA with direct Slack/Teams channel",
          content:
            "Gain direct access to senior cloud architects and engineering leads for real-time incidents, architecture reviews, and high-throughput scaling advice.",
        },
      ]}
    />
  ),
};

/* ── 11. Disabled ───────────────────────────────────────────────────────── */

export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <Accordion
      variant="separated"
      defaultExpandedIds={["active-1"]}
      items={[
        {
          id: "active-1",
          icon: <ZapIcon />,
          title: "Standard Feature: API Webhook Dispatcher",
          subtitle: "Available on your current Pro plan",
          content:
            "This section can be toggled normally. Send up to 100,000 webhook events per day with standard retry policies.",
        },
        {
          id: "locked-1",
          icon: <LockIcon />,
          title: "Enterprise Feature: Real-Time Fraud Quarantine",
          subtitle: "Requires Enterprise License",
          disabled: true,
          actions: (
            <Chip size="sm" variant="warning">
              Locked
            </Chip>
          ),
          content:
            "You need an enterprise license to view and configure this feature.",
        },
        {
          id: "locked-2",
          icon: <LockIcon />,
          title: "Enterprise Feature: Custom SAML SSO & SCIM",
          subtitle: "Requires Enterprise License",
          disabled: true,
          actions: (
            <Chip size="sm" variant="warning">
              Locked
            </Chip>
          ),
          content:
            "You need an enterprise license to configure Okta / Azure AD SCIM provisioning.",
        },
      ]}
    />
  ),
};

/* ── 12. Unmount On Exit ────────────────────────────────────────────────── */

function HeavyStatefulComponent() {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTicks((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        padding: "0.75rem",
        background: "var(--gy-surface-muted, #f8fafc)",
        borderRadius: "0.375rem",
        border: "1px dashed var(--gy-border, #cbd5e1)",
      }}
    >
      <div style={{ fontWeight: 600, color: "var(--gy-primary, #3b82f6)" }}>
        Component Active & Mounted in DOM
      </div>
      <div
        style={{
          fontSize: "0.8125rem",
          color: "var(--gy-text-muted)",
          marginTop: 4,
        }}
      >
        Live lifecycle timer: <strong>{ticks}s</strong> elapsed since mount.
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--gy-text-subtle)",
          marginTop: 4,
        }}
      >
        When collapsed, this DOM node and interval timer are completely
        unmounted and freed from memory.
      </div>
    </div>
  );
}

export const UnmountOnExit: Story = {
  name: "Unmount On Exit",
  render: () => (
    <Accordion
      variant="default"
      unmountOnExit={true}
      title="Performance-Optimized Panel (Unmount on Exit)"
      subtitle="Collapsing this panel unmounts inner components to free DOM memory"
      defaultExpanded={true}
    >
      <HeavyStatefulComponent />
    </Accordion>
  ),
};

/* ── 13. Complex Content ────────────────────────────────────────────────── */

export const ComplexContent: Story = {
  name: "Complex Content",
  render: () => {
    const [email, setEmail] = useState("admin@samantrix.com");
    const [webhookUrl, setWebhookUrl] = useState(
      "https://api.merchant.com/v1/webhooks",
    );
    const [twoFactor, setTwoFactor] = useState(true);
    const [auditLog, setAuditLog] = useState(true);

    return (
      <Accordion
        variant="separated"
        defaultExpandedIds={["config-form"]}
        items={[
          {
            id: "config-form",
            icon: <SlidersIcon />,
            title: "Security & Environment Settings",
            subtitle: "Manage API endpoints, authentication & audit policies",
            content: (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                  }}
                >
                  <Input
                    label="Admin Contact Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@domain.com"
                  />
                  <Input
                    label="Webhook Endpoint"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                    padding: "0.75rem",
                    background: "var(--gy-surface-muted, #f8fafc)",
                    borderRadius: "0.375rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "var(--gy-text)",
                        }}
                      >
                        Enforce Two-Factor Authentication
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--gy-text-muted)",
                        }}
                      >
                        Require hardware keys or TOTP for all team members
                      </div>
                    </div>
                    <Toggle
                      size="sm"
                      checked={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.checked)}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "var(--gy-text)",
                        }}
                      >
                        Immutable Audit Logging
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--gy-text-muted)",
                        }}
                      >
                        Stream tamper-proof audit trails to SIEM cluster
                      </div>
                    </div>
                    <Toggle
                      size="sm"
                      checked={auditLog}
                      onChange={(e) => setAuditLog(e.target.checked)}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button size="sm" variant="ghost">
                    Reset Defaults
                  </Button>
                  <Button size="sm" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </div>
            ),
          },
          {
            id: "metrics-table",
            icon: <ZapIcon />,
            title: "Live Traffic & Throughput Metrics",
            subtitle: "Global edge network performance stats",
            content: (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    fontSize: "0.8125rem",
                    borderCollapse: "collapse",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--gy-border, #e2e8f0)",
                        color: "var(--gy-text-muted)",
                      }}
                    >
                      <th style={{ padding: "0.5rem 0" }}>Region</th>
                      <th style={{ padding: "0.5rem 0" }}>Requests/sec</th>
                      <th style={{ padding: "0.5rem 0" }}>p99 Latency</th>
                      <th style={{ padding: "0.5rem 0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--gy-border, #f1f5f9)",
                      }}
                    >
                      <td style={{ padding: "0.5rem 0", fontWeight: 600 }}>
                        US-East (N. Virginia)
                      </td>
                      <td style={{ padding: "0.5rem 0" }}>14,280</td>
                      <td style={{ padding: "0.5rem 0" }}>18ms</td>
                      <td style={{ padding: "0.5rem 0" }}>
                        <Chip size="sm" variant="success">
                          Healthy
                        </Chip>
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--gy-border, #f1f5f9)",
                      }}
                    >
                      <td style={{ padding: "0.5rem 0", fontWeight: 600 }}>
                        EU-Central (Frankfurt)
                      </td>
                      <td style={{ padding: "0.5rem 0" }}>9,840</td>
                      <td style={{ padding: "0.5rem 0" }}>22ms</td>
                      <td style={{ padding: "0.5rem 0" }}>
                        <Chip size="sm" variant="success">
                          Healthy
                        </Chip>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "0.5rem 0", fontWeight: 600 }}>
                        AP-South (Mumbai)
                      </td>
                      <td style={{ padding: "0.5rem 0" }}>11,400</td>
                      <td style={{ padding: "0.5rem 0" }}>29ms</td>
                      <td style={{ padding: "0.5rem 0" }}>
                        <Chip size="sm" variant="success">
                          Healthy
                        </Chip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          },
        ]}
      />
    );
  },
};

/* ── 14. Custom Expand Icon ─────────────────────────────────────────────── */

export const CustomExpandIcon: Story = {
  name: "Custom Expand Icon",
  render: () => (
    <Accordion
      variant="separated"
      defaultExpandedIds={["plus-minus"]}
      items={[
        {
          id: "plus-minus",
          title: "Custom Plus / Minus Icon Toggle",
          subtitle: "Smoothly switches between plus and minus glyphs",
          expandIcon: (expanded) => (expanded ? <MinusIcon /> : <PlusIcon />),
          content:
            "You can pass a custom function to expandIcon that receives the current expanded state and returns any custom ReactNode.",
        },
        {
          id: "badge-icon",
          title: "Custom Text Pill State Indicator",
          subtitle: "Displays custom badge inside expand indicator",
          expandIcon: (expanded) => (
            <Chip size="sm" variant={expanded ? "solid" : "neutral"}>
              {expanded ? "Close" : "Open"}
            </Chip>
          ),
          content:
            "Custom expand icons can be badges, buttons, SVG animations, or any custom interactive element.",
        },
        {
          id: "settings-icon",
          title: "Custom Gear Indicator",
          subtitle: "Rotates gear on expansion",
          expandIcon: <SettingsIcon />,
          content:
            "You can pass static SVG icons which will automatically receive the 180-degree rotation transition when expanded.",
        },
      ]}
    />
  ),
};

/* ── 15. Expand Icon Left ───────────────────────────────────────────────── */

export const ExpandIconLeft: Story = {
  name: "Expand Icon Left",
  render: () => (
    <Accordion
      variant="bordered"
      expandIconPosition="left"
      defaultExpandedIds={["left-1"]}
      items={[
        {
          id: "left-1",
          title: "Left-Positioned Chevron: Personal Information",
          subtitle: "Expand chevron is placed before the title",
          content:
            "Placing the expand icon on the left aligns with native tree views and desktop file explorers.",
        },
        {
          id: "left-2",
          title: "Left-Positioned Chevron: Security Credentials",
          subtitle: "Manage API keys and SSH certificates",
          content:
            "Easily toggle items with the left-aligned expand indicator.",
        },
      ]}
    />
  ),
};

/* ── 16. Expand Icon Right ──────────────────────────────────────────────── */

export const ExpandIconRight: Story = {
  name: "Expand Icon Right",
  render: () => (
    <Accordion
      variant="bordered"
      expandIconPosition="right"
      defaultExpandedIds={["right-1"]}
      items={[
        {
          id: "right-1",
          title: "Right-Positioned Chevron: Billing History",
          subtitle: "Expand chevron is placed on the far right",
          content:
            "Right-aligned expand icon is the default pattern for cards, settings pages, and mobile interfaces.",
        },
        {
          id: "right-2",
          title: "Right-Positioned Chevron: Team Members",
          subtitle: "Invite and manage collaborator permissions",
          content:
            "Consistent right-aligned icons create clean vertical visual scanning across rows.",
        },
      ]}
    />
  ),
};

/* ── 17. Mixed Positions ────────────────────────────────────────────────── */

export const MixedPositions: Story = {
  name: "Mixed Positions",
  render: () => (
    <Accordion
      variant="separated"
      defaultExpandedIds={["mix-1"]}
      items={[
        {
          id: "mix-1",
          expandIconPosition: "left",
          icon: <ShieldIcon />,
          title: "Left Chevron with Leading Icon",
          subtitle: "Chevron is on the start, leading icon follows",
          content:
            "Individual accordion items can specify their own expandIconPosition prop independently of the group container.",
        },
        {
          id: "mix-2",
          expandIconPosition: "right",
          icon: <BellIcon />,
          title: "Right Chevron with Leading Icon",
          subtitle: "Chevron is on the end, title is in the center",
          content:
            "This item uses the right-side chevron position while sharing the same separated variant container.",
        },
        {
          id: "mix-3",
          expandIconPosition: "right",
          icon: <CreditCardIcon />,
          actions: (
            <Chip size="sm" variant="success">
              Auto-Pay Active
            </Chip>
          ),
          title: "Right Chevron with Actions & Icon",
          subtitle: "Combines leading icon, title, action pill, and chevron",
          content:
            "Rich headers with actions seamlessly arrange icons, text, chips, and chevrons.",
        },
      ]}
    />
  ),
};

/* ── 18. Rules Management ───────────────────────────────────────────────── */

export const RulesManagement: Story = {
  name: "Rules Management",
  render: () => {
    const [rules, setRules] = useState([
      {
        id: "rule-1",
        name: "High-Risk Transaction Flagging",
        category: "Fraud Prevention",
        status: "active",
        enabled: true,
        threshold: 85,
        action: "Quarantine & Send Alert",
        channel: "Slack #fraud-alerts",
        lastTriggered: "2 mins ago",
      },
      {
        id: "rule-2",
        name: "Velocity Threshold: >5 Transactions / Min",
        category: "Rate Limiting",
        status: "active",
        enabled: true,
        threshold: 5,
        action: "Temporary IP Block (15m)",
        channel: "Webhook to Cloudflare",
        lastTriggered: "14 mins ago",
      },
      {
        id: "rule-3",
        name: "Cross-Border Payout Currency Routing",
        category: "FX Optimization",
        status: "active",
        enabled: false,
        threshold: 10000,
        action: "Route via Local SEPA Rails",
        channel: "Adyen Settlement API",
        lastTriggered: "1 hour ago",
      },
      {
        id: "rule-4",
        name: "Automated Dispute Escalation",
        category: "Chargebacks",
        status: "paused",
        enabled: false,
        threshold: 500,
        action: "Create Jira Ticket & Collect Evidence",
        channel: "Jira / Zendesk",
        lastTriggered: "Yesterday",
      },
    ]);

    const handleToggleRule = (ruleId: string, enabled: boolean) => {
      setRules((prev) =>
        prev.map((r) =>
          r.id === ruleId
            ? { ...r, enabled, status: enabled ? "active" : "paused" }
            : r,
        ),
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1rem",
            background: "var(--gy-surface-muted, #f8fafc)",
            border: "1px solid var(--gy-border, #e2e8f0)",
            borderRadius: "0.5rem",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "0.9375rem",
                color: "var(--gy-text)",
              }}
            >
              Enterprise Business Rule Engine
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--gy-text-muted)" }}>
              {rules.filter((r) => r.enabled).length} of {rules.length}{" "}
              automated policies active
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => alert("Create New Rule Modal")}
          >
            + Create Rule
          </Button>
        </div>

        {/* Rules Accordion */}
        <Accordion
          variant="separated"
          defaultExpandedIds={["rule-1"]}
          items={rules.map((rule) => ({
            id: rule.id,
            icon:
              rule.category === "Fraud Prevention" ? (
                <ShieldIcon />
              ) : rule.category === "Rate Limiting" ? (
                <ZapIcon />
              ) : (
                <SlidersIcon />
              ),
            title: rule.name,
            subtitle: `${rule.category} • Last triggered ${rule.lastTriggered}`,
            actions: (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Chip size="sm" variant={rule.enabled ? "success" : "neutral"}>
                  {rule.enabled ? "Active" : "Paused"}
                </Chip>
                <Toggle
                  size="sm"
                  checked={rule.enabled}
                  onChange={(e) => handleToggleRule(rule.id, e.target.checked)}
                />
              </div>
            ),
            content: (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    background: "var(--gy-surface-muted, #f8fafc)",
                    borderRadius: "0.375rem",
                    border: "1px solid var(--gy-border, #e2e8f0)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--gy-text-subtle)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Risk Threshold
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--gy-text)",
                        marginTop: 2,
                      }}
                    >
                      Score &gt; {rule.threshold}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--gy-text-subtle)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Automated Action
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--gy-text)",
                        marginTop: 2,
                      }}
                    >
                      {rule.action}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--gy-text-subtle)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Dispatch Channel
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--gy-text)",
                        marginTop: 2,
                      }}
                    >
                      {rule.channel}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => alert(`Testing rule: ${rule.name}`)}
                  >
                    Test Rule Simulation
                  </Button>
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => alert(`Editing rule: ${rule.name}`)}
                  >
                    Edit Logic
                  </Button>
                </div>
              </div>
            ),
          }))}
        />
      </div>
    );
  },
};
