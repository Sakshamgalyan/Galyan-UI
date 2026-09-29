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
      ],
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
      error: (err) => `Upload failed: ${err instanceof Error ? err.message : String(err)}`,
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
        Trigger modern notifications with promise chaining, convenient helper
        methods, action buttons, and uniform responsive widths.
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

        <Button
          variant="primary"
          onClick={() =>
            toast.primary("Starred repo", {
              description: "You added galyan/ui to your favorites.",
            })
          }
        >
          toast.primary()
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            toast.secondary("Session renewed", {
              description: "Your session token has been refreshed.",
            })
          }
        >
          toast.secondary()
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            toast.neutral("Link copied", {
              description: "Shareable link was copied to clipboard.",
            })
          }
        >
          toast.neutral()
        </Button>

        <Button
          variant="glassmorphic"
          onClick={() =>
            toast.glassmorphic("Cloud connected", {
              description: "Real-time sync established over WebSocket.",
            })
          }
        >
          toast.glassmorphic()
        </Button>

        <Button
          variant="solid"
          onClick={() =>
            toast.solid("Deployment live", {
              variant: "success",
              description: "v1.4.2 is now receiving production traffic.",
            })
          }
        >
          toast.solid()
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            toast.outline("Storage threshold", {
              variant: "warning",
              description: "Disk usage exceeded 85% on node-04.",
            })
          }
        >
          toast.outline()
        </Button>

        <Button
          variant="ghost"
          onClick={() =>
            toast.minimal("Quick note saved", {
              description: "Autosaved 2 seconds ago.",
            })
          }
        >
          toast.minimal()
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

export const AllVariantsShowcase: Story = {
  render: () => {
    function VariantsInner() {
      const { toast, dismissAll } = useToast();

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: 640,
          }}
        >
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 600 }}>
              Semantic Status Variants
            </h4>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button
                size="sm"
                variant="success"
                onClick={() =>
                  toast.success("Success Toast", {
                    description: "Operation completed smoothly.",
                  })
                }
              >
                Success
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() =>
                  toast.error("Error Toast", {
                    description: "Something went wrong.",
                  })
                }
              >
                Error
              </Button>
              <Button
                size="sm"
                variant="warning"
                onClick={() =>
                  toast.warning("Warning Toast", {
                    description: "Please review before continuing.",
                  })
                }
              >
                Warning
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() =>
                  toast.info("Info Toast", {
                    description: "Helpful tip or informational message.",
                  })
                }
              >
                Info
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() =>
                  toast.primary("Primary Toast", {
                    description: "High-priority brand notification.",
                  })
                }
              >
                Primary
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  toast.secondary("Secondary Toast", {
                    description: "Low-key secondary status.",
                  })
                }
              >
                Secondary
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  toast.neutral("Neutral Toast", {
                    description: "Clean general purpose notification.",
                  })
                }
              >
                Neutral
              </Button>
            </div>
          </div>

          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontWeight: 600 }}>
              Visual Style Variants
            </h4>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button
                size="sm"
                variant="glassmorphic"
                onClick={() =>
                  toast.glassmorphic("Glassmorphic Toast", {
                    description:
                      "Frosted blur glass backdrop with luminous edge.",
                  })
                }
              >
                Glassmorphic
              </Button>
              <Button
                size="sm"
                variant="solid"
                onClick={() =>
                  toast.solid("Solid Toast", {
                    variant: "success",
                    description: "Bold full-bleed saturated background.",
                  })
                }
              >
                Solid (Success)
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() =>
                  toast.solid("Solid Danger", {
                    variant: "error",
                    description: "High impact critical notice.",
                  })
                }
              >
                Solid (Danger)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  toast.outline("Outline Toast", {
                    variant: "primary",
                    description:
                      "Crisp colored border without tinted background.",
                  })
                }
              >
                Outline
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  toast.minimal("Minimal Toast", {
                    description: "Ultra clean card without accent bar.",
                  })
                }
              >
                Minimal
              </Button>
            </div>
          </div>

          <div style={{ paddingTop: "0.5rem" }}>
            <Button size="sm" variant="danger-soft" onClick={dismissAll}>
              Clear All
            </Button>
          </div>
        </div>
      );
    }

    return (
      <ToasterProvider position="bottom-right">
        <VariantsInner />
      </ToasterProvider>
    );
  },
};

export const GlassmorphicToastShowcase: Story = {
  render: () => {
    function GlassInner() {
      const { toast } = useToast();

      return (
        <div
          style={{
            padding: "2.5rem",
            background:
              "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            borderRadius: "1rem",
            color: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h4 style={{ margin: 0, fontWeight: 700 }}>
            Glassmorphic Toast Theme
          </h4>
          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: "0.875rem",
              textAlign: "center",
              maxWidth: 380,
            }}
          >
            Click to trigger frosted glass toasts that look stunning over
            vibrant or photo backgrounds.
          </p>
          <Button
            variant="glassmorphic"
            onClick={() =>
              toast.glassmorphic("Glassmorphic Notification", {
                description: "Blur frosted glass card with glowing highlights.",
              })
            }
          >
            Trigger Glassmorphic Toast
          </Button>
        </div>
      );
    }

    return (
      <ToasterProvider position="bottom-right">
        <GlassInner />
      </ToasterProvider>
    );
  },
};
