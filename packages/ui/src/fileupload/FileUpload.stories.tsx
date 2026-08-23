import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

/**
 * Drag-and-drop file upload zone with real-time progress bars, upload completion indicators, size validation, and retry handlers.
 */
const meta: Meta<typeof FileUpload> = {
  title: "Galyan UI/FileUpload",
  component: FileUpload,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 540, padding: "1rem" }}>
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
    simulateUpload: { control: "boolean" },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Click or drag files to upload",
    helperText: "PNG, JPG, PDF up to 10MB (Drop files to see animated upload)",
    maxSize: 10 * 1024 * 1024,
    multiple: true,
    simulateUpload: true,
  },
};

export const AvatarPhotoUpload: Story = {
  args: {
    multiple: false,
    accept: "image/png, image/jpeg, image/webp",
    label: "Upload Profile Picture",
    helperText: "JPEG, PNG, or WebP up to 2MB",
    maxSize: 2 * 1024 * 1024,
  },
};

export const LiveUploadingProgress: Story = {
  args: {
    multiple: true,
    label: "Document Processing Queue",
    helperText: "Showing active upload progress and completed items",
    uploadedFiles: [
      {
        name: "high_res_banner_asset.png",
        size: 1024 * 4300,
        status: "uploading",
        progress: 74,
      },
      {
        name: "server_access_logs.tar.gz",
        size: 1024 * 18500,
        status: "uploading",
        progress: 32,
      },
      {
        name: "quarterly_financial_report.pdf",
        size: 1024 * 520,
        status: "completed",
      },
      {
        name: "corrupted_archive_data.bin",
        size: 1024 * 12000,
        status: "error",
      },
    ],
    onRetryFile: (file, idx) =>
      alert(`Retrying upload for ${file.name} at index ${idx}`),
  },
};

export const UploadedDocuments: Story = {
  args: {
    multiple: true,
    label: "Uploaded Attachments",
    helperText: "Clean file list with truncated long names and size badges",
    uploadedFiles: [
      {
        name: "SAKSHAM_RESUME_YOP_2025 (3).pdf",
        size: 1024 * 120,
        status: "completed",
      },
      {
        name: "beautiful-mountains-landscape.jpg",
        size: 1024 * 2100,
        status: "completed",
      },
      {
        name: "snowy-mountain-peak-starry-galaxy-majestic-sunset-view.png",
        size: 1024 * 5800,
        status: "completed",
      },
    ],
  },
};

export const MultipleFilesConstraint: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    label: "Upload up to 3 attachments",
    helperText: "Max 3 files, up to 10MB each",
    maxSize: 10 * 1024 * 1024,
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    label: "Upload is currently disabled",
    helperText: "You do not have write access to this bucket.",
  },
};
