import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToasterProvider, useToast } from "./Toaster";
import type { ToastPosition } from "./Toaster";
import { Button } from "../button/Button";

interface ToasterStoryArgs {
  position: ToastPosition;
}

const meta: Meta<ToasterStoryArgs> = {
  title: "Galyan UI/Toaster",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "bottom-right",
        "bottom-left",
        "bottom-center",
        "top-right",
        "top-left",
        "top-center",
      ] as ToastPosition[],
      description: "Position of the toast container on the screen",
    },
  },
};

export default meta;

function ToasterDemoInner() {
  const { toast, dismissAll } = useToast();

  const handleAsyncAction = () => {
    const fakeAsyncJob = new Promise<{ id: string }>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve({ id: "DOC-9821" });
        } else {
          reject(new Error("Network connection dropped"));
        }
      }, 2000);
    });

    toast.promise(fakeAsyncJob, {
      loading: "Uploading and compiling assets...",
      success: (data) => `Compiled successfully! Build ID: ${data.id}`,
      error: (err) => `Upload failed: ${err.message}`,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}>
        Toaster Playground
      </h3>
      <p
        style={{
          margin: 0,
          color: "var(--gy-text-muted)",
          fontSize: "0.875rem",
          maxWidth: 460,
          textAlign: "center",
        }}
      >
        Trigger modern notifications with promise chaining, convenient helper methods,
        action buttons, and uniform responsive widths.
      </p>

      {/* Direct Methods */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="success"
          onClick={() =>
            toast.success("Changes saved", {
              description: "Your profile has been updated successfully.",
            })
          }
        >
          toast.success()
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            toast.error("Connection error", {
              description: "Could not reach server. Please try again.",
            })
          }
        >
          toast.error()
        </Button>

        <Button
          variant="warning"
          onClick={() =>
            toast.warning("Storage warning", {
              description: "You are using 92% of your available cloud quota.",
            })
          }
        >
          toast.warning()
        </Button>

        <Button
          variant="primary"
          onClick={() =>
            toast.info("System update available", {
              description: "Version 2.4.0 is ready to install.",
            })
          }
        >
          toast.info()
        </Button>
      </div>

      {/* Async Promise and Actions */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button variant="primary" onClick={handleAsyncAction}>
          toast.promise() (Simulated Async)
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            toast.info("Item moved to trash", {
              description: "The quarterly report was archived.",
              actions: (
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => alert("Undo archive clicked")}
                >
                  Undo Action
                </Button>
              ),
            })
          }
        >
          Toast with Action Button
        </Button>

        <Button variant="danger-soft" onClick={() => dismissAll()}>
          Clear All Toasts
        </Button>
      </div>
    </div>
  );
}

const ToasterDemo = ({ position }: { position?: ToastPosition }) => (
  <ToasterProvider position={position ?? "bottom-right"}>
    <ToasterDemoInner />
  </ToasterProvider>
);

type Story = StoryObj<ToasterStoryArgs>;

export const Default: Story = {
  args: {
    position: "bottom-right",
  },
  render: (args) => <ToasterDemo position={args.position} />,
};

export const TopRight: Story = {
  args: { position: "top-right" },
  render: (args) => <ToasterDemo position={args.position} />,
};

export const TopCenter: Story = {
  args: { position: "top-center" },
  render: (args) => <ToasterDemo position={args.position} />,
};

export const BottomLeft: Story = {
  args: { position: "bottom-left" },
  render: (args) => <ToasterDemo position={args.position} />,
};

export const BottomCenter: Story = {
  args: { position: "bottom-center" },
  render: (args) => <ToasterDemo position={args.position} />,
};
