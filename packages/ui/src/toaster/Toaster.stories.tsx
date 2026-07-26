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
          color: "#64748b",
          fontSize: "0.875rem",
          maxWidth: 420,
          textAlign: "center",
        }}
      >
        Trigger notifications. All toasts have uniform width and clear all
        button when multiple exist. Default position is bottom-right.
      </p>

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
            toast({
              title: "Changes saved",
              description: "Your profile has been updated successfully.",
              variant: "success",
            })
          }
        >
          Success Toast
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            toast({
              title: "Connection error",
              description: "Could not reach server. Please try again.",
              variant: "error",
            })
          }
        >
          Error Toast
        </Button>

        <Button
          variant="warning"
          onClick={() =>
            toast({
              title: "Storage warning",
              description: "You are using 92% of your available storage space.",
              variant: "warning",
            })
          }
        >
          Warning Toast
        </Button>

        <Button
          variant="primary"
          onClick={() =>
            toast({
              title: "System update available",
              description: "Version 2.4.0 is ready to install.",
              variant: "info",
            })
          }
        >
          Info Toast
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: "Item deleted",
              description: "The report was moved to trash.",
              variant: "info",
              actions: (
                <Button
                  size="xs"
                  variant="secondary"
                  onClick={() => alert("Undo clicked")}
                >
                  Undo
                </Button>
              ),
            })
          }
        >
          Toast with Action
        </Button>

        <Button variant="danger-soft" onClick={() => dismissAll()}>
          Clear All
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

export const BottomLeft: Story = {
  args: { position: "bottom-left" },
  render: (args) => <ToasterDemo position={args.position} />,
};

export const TopRight: Story = {
  args: { position: "top-right" },
  render: (args) => <ToasterDemo position={args.position} />,
};
