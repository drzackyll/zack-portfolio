import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Display/Badge",
  component: Badge,
  args: { children: "Confirmed", tone: "success" },
  argTypes: {
    tone: { control: "select", options: ["neutral", "accent", "success", "warning", "danger", "info"] },
    variant: { control: "select", options: ["soft", "solid"] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Badge {...args} tone="neutral">
        Neutral
      </Badge>
      <Badge {...args} tone="accent">
        Accent
      </Badge>
      <Badge {...args} tone="success">
        Confirmed
      </Badge>
      <Badge {...args} tone="warning">
        Needs approval
      </Badge>
      <Badge {...args} tone="danger">
        Cancelled
      </Badge>
      <Badge {...args} tone="info">
        Info
      </Badge>
    </div>
  ),
};

export const Solid: Story = {
  args: { variant: "solid" },
};

export const WithDot: Story = {
  args: { dot: true },
};

export const Playground: Story = {};
