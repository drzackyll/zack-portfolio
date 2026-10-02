import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { Toast, ToastProvider, useToast } from "./Toast";

const meta: Meta = {
  title: "Overlays/Toast",
};
export default meta;

type Story = StoryObj;

function TriggerDemo({ tone, action }: { tone?: "neutral" | "success" | "warning" | "danger"; action?: boolean }) {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          tone,
          title: tone === "danger" ? "Something went wrong" : "Booking cancelled",
          description: tone === "danger" ? "Please try again." : "Dr. Lena Park has been notified.",
          action: action ? { label: "Undo", onClick: () => {} } : undefined,
        })
      }
    >
      Show toast
    </Button>
  );
}

function withProvider(node: React.ReactNode) {
  return <ToastProvider>{node}</ToastProvider>;
}

export const Neutral: Story = {
  render: () => withProvider(<TriggerDemo tone="neutral" />),
};

export const Success: Story = {
  render: () => withProvider(<TriggerDemo tone="success" />),
};

export const Warning: Story = {
  render: () => withProvider(<TriggerDemo tone="warning" />),
};

export const Danger: Story = {
  render: () => withProvider(<TriggerDemo tone="danger" />),
};

export const WithUndo: Story = {
  render: () => withProvider(<TriggerDemo tone="neutral" action />),
};

export const Static: Story = {
  render: () => (
    <Toast
      tone="success"
      title="Availability saved"
      description="Your weekly hours are now live."
      onClose={() => {}}
    />
  ),
};
