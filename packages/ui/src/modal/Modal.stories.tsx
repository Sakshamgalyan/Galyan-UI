import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  type ModalPosition,
  type ModalSize,
  type ModalVariant,
} from "./Modal";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { Dropdown, type DropdownOption } from "../dropdown/Dropdown";
import { Checkbox } from "../checkbox/Checkbox";
import { RadioGroup, type RadioOption } from "../radiogroup/RadioGroup";
import { Toggle } from "../toggle/Toggle";
import { Chip } from "../chips/Chips";
import { ProgressBar } from "../progressbar/ProgressBar";
import { Card } from "../card/Card";
import { Typography } from "../typography/Typography";
import { Tabs, type TabItem } from "../tab/Tabs";
import { Banner } from "../banner/Banner";
import { Stepper, type Step } from "../stepper/Stepper";
import { FileUpload } from "../fileupload/FileUpload";
import { Tooltip } from "../tooltip/Tooltip";
import {
  DatePicker,
  type DatePickerValue,
} from "../datepicker/DatePicker";
import { TimePicker } from "../timepicker/TimePicker";

const ShieldAlertIcon = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const TrashIcon = () => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const CheckCircleIcon = () => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const KeyIcon = () => (
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
    <path d="M21 2l-2 2m-1.5 1.5L14 9l-3 3-2-2-4 4 2 2 2-2 3 3 5.5-5.5" />
    <circle cx="7.5" cy="16.5" r="3.5" />
  </svg>
);

const RocketIcon = () => (
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
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const LayersIcon = () => (
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
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const SlidersIcon = () => (
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

const UploadCloudIcon = () => (
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
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    <polyline points="16 16 12 12 8 16" />
  </svg>
);

const meta: Meta<typeof Modal> = {
  title: "Galyan UI/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant: {
      control: "select",
      options: ["default", "sidebar", "compact", "fullscreen", "glassmorphic"],
    },
    position: { control: "inline-radio", options: ["center", "top"] },
    title: { control: "text" },
    subtitle: { control: "text" },
    confirmText: { control: "text" },
    cancelText: { control: "text" },
    showCloseButton: { control: "boolean" },
    closable: { control: "boolean" },
    preventBackdropClose: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = ({
  variant = "default",
  size = "md",
  position = "center",
  icon,
}: {
  variant?: ModalVariant;
  size?: ModalSize;
  position?: ModalPosition;
  icon?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open {variant} modal {icon ? "with Icon" : ""}
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        icon={icon}
        title="Confirm Action"
        subtitle="This action requires security verification."
        size={size}
        variant={variant}
        position={position}
        cancelText="Cancel"
        confirmText="Confirm & Proceed"
        onConfirm={() => setOpen(false)}
      >
        <p style={{ margin: 0, color: "var(--gy-text-muted)" }}>
          Are you sure you want to proceed? This will permanently update the
          security policy across all linked environments.
        </p>
      </Modal>
    </>
  );
};

export const Default: Story = { render: () => <ModalDemo /> };

export const WithHeaderIcon: Story = {
  render: () => <ModalDemo icon={<ShieldAlertIcon />} />,
};

/* ── Story: Modal with Multiple Galyan UI Components ── */
export const WithMultipleComponents: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [serviceName, setServiceName] = useState("api-gateway-service");
    const [environment, setEnvironment] = useState("production");
    const [description, setDescription] = useState(
      "High-throughput edge proxy routing microservice traffic with rate limiting.",
    );
    const [visibility, setVisibility] = useState("team");
    const [selectedTags, setSelectedTags] = useState<string[]>([
      "TypeScript",
      "React 19",
      "Docker",
    ]);
    const [edgeCaching, setEdgeCaching] = useState(true);
    const [ddosProtection, setDdosProtection] = useState(true);
    const [notifySlack, setNotifySlack] = useState(true);
    const [requireApproval, setRequireApproval] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const environmentOptions: DropdownOption[] = [
      {
        value: "production",
        label: "Production Cluster (us-east-1)",
        description: "Zero-downtime multi-AZ deployment with 99.99% SLA",
      },
      {
        value: "staging",
        label: "Staging Mirror (us-west-2)",
        description: "Pre-release testing environment with production parity",
      },
      {
        value: "development",
        label: "Development Sandbox (eu-central-1)",
        description: "Ephemeral branch environment for continuous testing",
      },
    ];

    const visibilityOptions: RadioOption[] = [
      { value: "public", label: "Public API Gateway (Internet-facing)" },
      { value: "team", label: "Internal Team (VPC Mesh & VPN Only)" },
      {
        value: "private",
        label: "Restricted (Admin & Invited Service Accounts)",
      },
    ];

    const availableTags = [
      "TypeScript",
      "React 19",
      "Docker",
      "Tailwind CSS",
      "GraphQL",
      "Redis Cache",
      "PostgreSQL",
      "Vite",
    ];

    const toggleTag = (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    };

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setOpen(false);
      }, 1000);
    };

    return (
      <div style={{ textAlign: "center" }}>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setOpen(true)}
          style={{ gap: "0.5rem" }}
        >
          <RocketIcon /> Open Modal with Multiple Components
        </Button>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          size="lg"
          icon={<RocketIcon />}
          title="Configure Cloud Service"
          subtitle="Provision runtime infrastructure, security parameters, and automated deployment policies."
          cancelText="Cancel"
          confirmText="Deploy Service"
          isConfirmLoading={isLoading}
          onConfirm={handleConfirm}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              paddingTop: "0.25rem",
            }}
          >
            {/* Banner Component */}
            <Banner
              variant="info"
              bannerStyle="subtle"
              title="Global Edge Network Active"
              description="Deployments automatically replicate across 3 edge locations with SSL certificates."
            />

            {/* Typography & Core Form Fields */}
            <div>
              <Typography
                variant="h6"
                weight="semibold"
                style={{ marginBottom: "0.75rem" }}
              >
                Service Identification
              </Typography>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <Input
                  label="Service Identifier"
                  placeholder="e.g. auth-worker"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  helperText="Unique identifier within your organization cluster."
                />
                <Dropdown
                  label="Deployment Environment"
                  options={environmentOptions}
                  value={environment}
                  onChange={(val) => setEnvironment(val)}
                  placeholder="Select environment"
                />
              </div>
            </div>

            {/* Textarea Component */}
            <div>
              <Textarea
                label="Description & Release Notes"
                placeholder="Describe service purpose and key architecture highlights..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                helperText="Optional documentation visible in service registry."
              />
            </div>

            {/* Chips Component */}
            <div>
              <Typography
                variant="label"
                weight="medium"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                Technology Stack Tags (Click to toggle)
              </Typography>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <Chip
                      key={tag}
                      clickable
                      selected={isSelected}
                      variant={isSelected ? "solid" : "soft"}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Chip>
                  );
                })}
              </div>
            </div>

            {/* RadioGroup Component */}
            <div
              style={{
                borderTop: "1px solid var(--gy-border, #e2e8f0)",
                paddingTop: "1rem",
              }}
            >
              <Typography
                variant="h6"
                weight="semibold"
                style={{ marginBottom: "0.5rem" }}
              >
                Network & Access Policy
              </Typography>
              <RadioGroup
                name="service-visibility"
                options={visibilityOptions}
                value={visibility}
                onChange={(val) => setVisibility(val)}
                orientation="vertical"
              />
            </div>

            {/* Toggle Switches */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                borderTop: "1px solid var(--gy-border, #e2e8f0)",
                paddingTop: "1rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Toggle
                  label="Enable Global Edge Caching"
                  checked={edgeCaching}
                  withIcon
                  onChange={(e) => setEdgeCaching(e.target.checked)}
                />
                <Tooltip content="Replicates assets across 300+ edge PoPs for sub-50ms latency" />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Toggle
                  label="Enable DDoS Mitigation Shield"
                  checked={ddosProtection}
                  withIcon
                  onChange={(e) => setDdosProtection(e.target.checked)}
                />
                <Tooltip content="Autonomous Layer 7 inspection with zero packet drop penalty" />
              </div>
            </div>

            {/* Checkbox Component */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                borderTop: "1px solid var(--gy-border, #e2e8f0)",
                paddingTop: "1rem",
              }}
            >
              <Typography
                variant="label"
                weight="medium"
                style={{ fontSize: "0.875rem" }}
              >
                Governance & CI/CD Hooks
              </Typography>
              <Checkbox
                label="Send build and incident alerts to #devops Slack channel"
                checked={notifySlack}
                onChange={(e) => setNotifySlack(e.target.checked)}
              />
              <Checkbox
                label="Require peer review approval before applying migrations"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
              />
            </div>

            {/* ProgressBar Component */}
            <div
              style={{
                borderTop: "1px solid var(--gy-border, #e2e8f0)",
                paddingTop: "1rem",
              }}
            >
              <ProgressBar
                progress={68}
                variant="primary"
                label="Cluster Resource Allocation (6.8GB / 10GB)"
                showValue
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

/* ── Story: Multi-Step Setup Wizard in Modal ── */
export const MultiStepWizardModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [orgName, setOrgName] = useState("Acme Labs Inc.");
    const [region, setRegion] = useState("us-east");
    const [enforce2FA, setEnforce2FA] = useState(true);
    const [sessionTimeout, setSessionTimeout] = useState("1h");
    const [allowGuestUsers, setAllowGuestUsers] = useState(false);

    const steps: Step[] = [
      { id: "step-1", label: "Team Profile", description: "Identity & domain" },
      { id: "step-2", label: "Security & Policy", description: "Access rules" },
      { id: "step-3", label: "Review & Deploy", description: "Confirmation" },
    ];

    const regionOptions: DropdownOption[] = [
      { value: "us-east", label: "US East (N. Virginia)" },
      { value: "eu-west", label: "Europe West (Ireland)" },
      { value: "ap-south", label: "Asia Pacific (Mumbai)" },
    ];

    const timeoutOptions: RadioOption[] = [
      { value: "15m", label: "15 Minutes (High Security)" },
      { value: "1h", label: "1 Hour (Recommended)" },
      { value: "12h", label: "12 Hours (Standard Working Day)" },
    ];

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setOpen(false);
        setCurrentStep(0);
      }
    };

    const handlePrev = () => {
      if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    };

    return (
      <div style={{ textAlign: "center" }}>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setOpen(true)}
          style={{ gap: "0.5rem" }}
        >
          <LayersIcon /> Open Multi-Step Wizard Modal
        </Button>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          size="lg"
          icon={<LayersIcon />}
          title="Workspace Setup Wizard"
          subtitle="Complete the guided steps to provision your collaborative workspace."
          footer={
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                Previous Step
              </Button>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Button variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  {currentStep === steps.length - 1
                    ? "Complete Setup"
                    : "Next Step"}
                </Button>
              </div>
            </div>
          }
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Stepper Component */}
            <Stepper
              steps={steps}
              activeStep={currentStep}
              onStepClick={(idx) => setCurrentStep(idx)}
            />

            {currentStep === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Typography variant="h6" weight="semibold">
                  Step 1: Organization Details
                </Typography>
                <Input
                  label="Organization Name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Samantrix Labs"
                />
                <Dropdown
                  label="Primary Datacenter Region"
                  options={regionOptions}
                  value={region}
                  onChange={(val) => setRegion(val)}
                />
                <Card variant="outlined" padding="sm">
                  <Typography
                    variant="small"
                    style={{ color: "var(--gy-text-muted)" }}
                  >
                    💡 Tip: Selecting a region closest to your core team
                    minimizes latency for build runners and API testing tools.
                  </Typography>
                </Card>
              </div>
            )}

            {currentStep === 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <Typography variant="h6" weight="semibold">
                  Step 2: Security & Authentication Controls
                </Typography>
                <Toggle
                  label="Enforce Mandatory 2-Factor Authentication (2FA)"
                  checked={enforce2FA}
                  withIcon
                  onChange={(e) => setEnforce2FA(e.target.checked)}
                />
                <div>
                  <Typography
                    variant="label"
                    weight="medium"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    Session Inactivity Timeout
                  </Typography>
                  <RadioGroup
                    name="wizard-session-timeout"
                    options={timeoutOptions}
                    value={sessionTimeout}
                    onChange={(val) => setSessionTimeout(val)}
                  />
                </div>
                <Checkbox
                  label="Allow guest collaborators on specific sandboxes"
                  checked={allowGuestUsers}
                  onChange={(e) => setAllowGuestUsers(e.target.checked)}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <Banner
                  variant="success"
                  bannerStyle="subtle"
                  title="Validation Passed"
                  description="DNS health checks and encryption certificates have verified successfully."
                />

                <Card variant="outlined" padding="md">
                  <Typography
                    variant="h6"
                    weight="semibold"
                    style={{ marginBottom: "0.75rem" }}
                  >
                    Configuration Summary
                  </Typography>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.75rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--gy-text-muted)" }}>
                        Organization:
                      </span>{" "}
                      <strong>{orgName}</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--gy-text-muted)" }}>
                        Region:
                      </span>{" "}
                      <Chip size="sm" variant="outline">
                        {region}
                      </Chip>
                    </div>
                    <div>
                      <span style={{ color: "var(--gy-text-muted)" }}>
                        2FA Enforced:
                      </span>{" "}
                      <Chip
                        size="sm"
                        variant={enforce2FA ? "success" : "neutral"}
                      >
                        {enforce2FA ? "Enabled" : "Disabled"}
                      </Chip>
                    </div>
                    <div>
                      <span style={{ color: "var(--gy-text-muted)" }}>
                        Session Timeout:
                      </span>{" "}
                      <strong>{sessionTimeout}</strong>
                    </div>
                  </div>
                </Card>

                <ProgressBar
                  progress={100}
                  variant="success"
                  label="Setup Readiness (Ready to launch)"
                  showValue
                />
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  },
};

/* ── Story: Tabbed Settings Dialog in Modal ── */
export const TabbedSettingsModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
    const [projectName, setProjectName] = useState("samantrix-ui-platform");
    const [projectDesc, setProjectDesc] = useState(
      "Comprehensive multi-tenant design system with storybook integration.",
    );
    const [autoWebp, setAutoWebp] = useState(true);
    const [autoCompress, setAutoCompress] = useState(true);

    const tabItems: TabItem[] = [
      { id: "general", label: "General Information" },
      { id: "files", label: "Asset Storage" },
      { id: "quotas", label: "Resource Quotas" },
    ];

    return (
      <div style={{ textAlign: "center" }}>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setOpen(true)}
          style={{ gap: "0.5rem" }}
        >
          <SlidersIcon /> Open Tabbed Settings Modal
        </Button>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          size="xl"
          icon={<SlidersIcon />}
          title="Project Administration"
          subtitle="Configure project properties, media storage pipeline, and compute quotas."
          cancelText="Close"
          confirmText="Save Changes"
          onConfirm={() => setOpen(false)}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Tabs Component */}
            <Tabs
              items={tabItems}
              activeTab={activeTab}
              onTabChange={(id) => setActiveTab(id)}
              variant="classic"
            />

            {/* Tab 1: General */}
            {activeTab === "general" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Input
                  label="Project Display Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <Textarea
                  label="Project Overview"
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  rows={3}
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Chip variant="soft">Production</Chip>
                  <Chip variant="soft">Public Repo</Chip>
                  <Chip variant="soft">Automated CI</Chip>
                </div>
              </div>
            )}

            {/* Tab 2: Files & Upload */}
            {activeTab === "files" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Banner
                  variant="neutral"
                  bannerStyle="subtle"
                  title="Storage Guidelines"
                  description="Supported formats: SVG, PNG, JPG, and WebP up to 50MB."
                />
                <FileUpload
                  label="Drop brand logos and asset files here"
                  helperText="Drag & drop files or click to browse"
                  multiple
                />
                <Checkbox
                  label="Automatically generate modern WebP variations"
                  checked={autoWebp}
                  onChange={(e) => setAutoWebp(e.target.checked)}
                />
                <Checkbox
                  label="Losslessly compress images before caching on CDN"
                  checked={autoCompress}
                  onChange={(e) => setAutoCompress(e.target.checked)}
                />
              </div>
            )}

            {/* Tab 3: Resource Quotas */}
            {activeTab === "quotas" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <Card variant="outlined" padding="md">
                  <Typography
                    variant="h6"
                    weight="semibold"
                    style={{ marginBottom: "1rem" }}
                  >
                    Current Cluster Consumption
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <ProgressBar
                      progress={72}
                      variant="primary"
                      label="Compute CPU (7.2 / 10 Cores)"
                      showValue
                    />
                    <ProgressBar
                      progress={54}
                      variant="indigo"
                      label="Memory RAM (8.6 / 16 GB)"
                      showValue
                    />
                    <ProgressBar
                      progress={88}
                      variant="warning"
                      label="Monthly CDN Bandwidth (880GB / 1TB)"
                      showValue
                    />
                  </div>
                </Card>

                <Banner
                  variant="warning"
                  title="Approaching Bandwidth Limit"
                  description="Your bandwidth has exceeded 85%. Consider scaling your allocation to prevent speed throttling."
                />
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  },
};

/* ── Story: Asset Upload and Metadata Modal ── */
export const AssetUploadModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [assetTitle, setAssetTitle] = useState("Hero Banner Light");
    const [category, setCategory] = useState("marketing");
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(100);

    const categoryOptions: DropdownOption[] = [
      { value: "marketing", label: "Marketing & Landing Pages" },
      { value: "icons", label: "UI System Icons" },
      { value: "documentation", label: "Documentation Screenshots" },
    ];

    const handleUpload = () => {
      setIsUploading(true);
      setProgress(20);
      setTimeout(() => setProgress(65), 400);
      setTimeout(() => {
        setProgress(100);
        setIsUploading(false);
        setOpen(false);
      }, 900);
    };

    return (
      <div style={{ textAlign: "center" }}>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setOpen(true)}
          style={{ gap: "0.5rem" }}
        >
          <UploadCloudIcon /> Open Media Upload Modal
        </Button>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          size="md"
          icon={<UploadCloudIcon />}
          title="Upload Digital Assets"
          subtitle="Ingest images and media into the centralized CDN repository."
          cancelText="Cancel"
          confirmText="Upload & Save"
          isConfirmLoading={isUploading}
          onConfirm={handleUpload}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Banner
              variant="info"
              title="Automatic Asset Optimization"
              description="High-resolution assets will be served in responsive widths."
            />

            <FileUpload
              label="Select media files to upload"
              helperText="PNG, SVG, JPG, WebP up to 25MB"
            />

            <Input
              label="Asset Label"
              value={assetTitle}
              onChange={(e) => setAssetTitle(e.target.value)}
            />

            <Dropdown
              label="Target Category"
              options={categoryOptions}
              value={category}
              onChange={(val) => setCategory(val)}
            />

            <div style={{ display: "flex", gap: "0.375rem" }}>
              <Chip size="sm" variant="outline">
                PNG
              </Chip>
              <Chip size="sm" variant="outline">
                2.4 MB
              </Chip>
              <Chip size="sm" variant="success">
                Virus Free
              </Chip>
            </div>

            <ProgressBar
              progress={progress}
              variant="primary"
              label="Upload Progress"
              showValue
            />
          </div>
        </Modal>
      </div>
    );
  },
};

export const PromptFormModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [keyName, setKeyName] = useState("");

    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Generate API Key
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          icon={<KeyIcon />}
          title="Create New API Key"
          subtitle="Generate a secret key to authenticate SDK requests."
          cancelText="Cancel"
          confirmText="Generate Secret Key"
          onConfirm={() => {
            alert(`Key Generated for: ${keyName || "Default Key"}`);
            setOpen(false);
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              label="Key Identifier"
              placeholder="e.g. Production Backend Worker"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              helperText="A descriptive name to identify where this token is used."
            />
          </div>
        </Modal>
      </>
    );
  },
};

export const DeleteConfirmationWithIcon: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          Delete Repository
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          icon={
            <div style={{ color: "#ef4444" }}>
              <TrashIcon />
            </div>
          }
          title="Delete Project Repository"
          subtitle="Permanently remove project files, git history, and secrets."
          cancelText="Cancel"
          confirmText="Yes, Delete Repository"
          onConfirm={() => setOpen(false)}
        >
          <p style={{ margin: 0, color: "var(--gy-text-muted)" }}>
            This action cannot be undone. All deployments, active domains, and
            collaborator permissions will be permanently purged.
          </p>
        </Modal>
      </>
    );
  },
};

export const SuccessConfirmationWithIcon: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Deploy Successful Modal
        </Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          icon={
            <div style={{ color: "#16a34a" }}>
              <CheckCircleIcon />
            </div>
          }
          title="Deployment Complete"
          subtitle="Version 2.4.0 is now live in production."
          confirmText="View Dashboard"
          onConfirm={() => setOpen(false)}
        >
          <p style={{ margin: 0, color: "var(--gy-text-muted)" }}>
            The build finished in 42s with zero warnings. Edge caching and SSL
            certificates have been successfully configured.
          </p>
        </Modal>
      </>
    );
  },
};

export const Sidebar: Story = { render: () => <ModalDemo variant="sidebar" /> };

export const Compact: Story = {
  render: () => (
    <ModalDemo variant="compact" size="sm" icon={<ShieldAlertIcon />} />
  ),
};

export const Fullscreen: Story = {
  render: () => <ModalDemo variant="fullscreen" />,
};

export const TopPosition: Story = {
  render: () => <ModalDemo position="top" icon={<ShieldAlertIcon />} />,
};

/* ── Story: Schedule Meeting Modal with DatePicker & TimePicker ── */
export const ScheduleMeetingModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("Product Architecture Review");
    const [room, setRoom] = useState("zoom");
    const [date, setDate] = useState<DatePickerValue>(new Date());
    const [startTime, setStartTime] = useState("10:00 AM");
    const [endTime, setEndTime] = useState("11:00 AM");
    const [sendInvites, setSendInvites] = useState(true);
    const [recordSession, setRecordSession] = useState(true);
    const [attendees, setAttendees] = useState([
      "Sarah (Tech Lead)",
      "Alex (Frontend)",
      "Maria (Design)",
    ]);

    const roomOptions: DropdownOption[] = [
      {
        value: "zoom",
        label: "Zoom Video Bridge",
        description: "Auto-generates meeting link & passkey",
      },
      {
        value: "meet",
        label: "Google Meet",
        description: "Integrated calendar room with captions",
      },
      {
        value: "conf-a",
        label: "Conference Room Alpha (Floor 4)",
        description: "Physical room with 4K screen & audio bar",
      },
    ];

    return (
      <div style={{ textAlign: "center" }}>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setOpen(true)}
          style={{ gap: "0.5rem" }}
        >
          Schedule Meeting Modal
        </Button>

        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          size="lg"
          title="Schedule Team Session"
          subtitle="Coordinate meeting dates, time windows, and attendee invitations."
          cancelText="Cancel"
          confirmText="Send Invites & Confirm"
          onConfirm={() => {
            alert(
              `Session booked: "${title}" on ${date instanceof Date ? date.toLocaleDateString() : date ? String(date) : ""} from ${startTime} to ${endTime}`,
            );
            setOpen(false);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              paddingTop: "0.25rem",
            }}
          >
            <Input
              label="Session Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q3 Sprint Planning"
            />

            <Dropdown
              label="Meeting Platform / Location"
              options={roomOptions}
              value={room}
              onChange={setRoom}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr",
                gap: "1rem",
              }}
            >
              <DatePicker label="Date" value={date} onChange={setDate} />
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(str) => setStartTime(str)}
                minuteStep={15}
              />
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(str) => setEndTime(str)}
                minuteStep={15}
              />
            </div>

            <div>
              <Typography
                variant="label"
                weight="medium"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                Participants & Collaborators
              </Typography>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {attendees.map((attendee) => (
                  <Chip
                    key={attendee}
                    removable
                    onRemove={() =>
                      setAttendees(attendees.filter((a) => a !== attendee))
                    }
                    variant="soft"
                  >
                    {attendee}
                  </Chip>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                borderTop: "1px solid var(--gy-border, #e2e8f0)",
                paddingTop: "1rem",
              }}
            >
              <Toggle
                label="Record Session to Cloud"
                checked={recordSession}
                withIcon
                onChange={(e) => setRecordSession(e.target.checked)}
              />
              <Checkbox
                label="Send calendar invite (.ics) via email"
                checked={sendInvites}
                onChange={(e) => setSendInvites(e.target.checked)}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};
