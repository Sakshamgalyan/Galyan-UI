import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

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

const meta: Meta<typeof Modal> = {
  title: "Galyan UI/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    variant: {
      control: "select",
      options: ["default", "sidebar", "compact", "fullscreen"],
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
}: any) => {
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
          Are you sure you want to proceed? This will permanently update the security
          policy across all linked environments.
        </p>
      </Modal>
    </>
  );
};

export const Default: Story = { render: () => <ModalDemo /> };

export const WithHeaderIcon: Story = {
  render: () => <ModalDemo icon={<ShieldAlertIcon />} />,
};

export const PromptFormModal: Story = {
  render: () => {
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
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
  render: () => {
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
  render: () => {
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
