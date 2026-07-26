import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

/**
 * Drag-and-drop file upload zone with file list, size validation, and uploaded file status badges.
 */
const meta: Meta<typeof FileUpload> = {
  title: "Galyan UI/FileUpload",
  component: FileUpload,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
    maxSize: { control: "number" },
    maxFiles: { control: "number" },
    accept: { control: "text" },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click or drag file to upload",
    helperText: "PNG, JPG, PDF up to 5MB",
    maxSize: 5 * 1024 * 1024,
  },
};

export const WithUploadedFiles: Story = {
  args: {
    multiple: true,
    label: "Upload additional documents",
    helperText: "Max 10MB per file",
    uploadedFiles: [
      { name: "invoice_july_2026.pdf", size: 1024 * 450, status: "completed" },
      { name: "profile_avatar.png", size: 1024 * 1200, status: "completed" },
      {
        name: "dataset_archive.zip",
        size: 1024 * 8500,
        status: "uploading",
        progress: 65,
      },
    ],
  },
};

export const UploadFailedWithRetry: Story = {
  args: {
    multiple: true,
    label: "Upload report documents",
    helperText: "Click Retry on failed items",
    uploadedFiles: [
      { name: "financial_summary.pdf", size: 1024 * 250, status: "completed" },
      { name: "large_dataset.csv", size: 1024 * 15000, status: "error" },
      {
        name: "contract_draft.docx",
        size: 1024 * 800,
        status: "uploading",
        progress: 35,
      },
    ],
    onRetryFile: (file, idx) =>
      alert(`Retrying upload for ${file.name} at index ${idx}`),
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    label: "Upload document attachments",
    helperText: "Upload up to 5 files (Max 10MB each)",
    maxSize: 10 * 1024 * 1024,
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    label: "Upload is disabled",
    helperText: "You do not have permission to upload files.",
  },
};
