import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Actions/IconButton",
  component: IconButton,
  args: { icon: "refresh-cw", label: "Reschedule", variant: "ghost", size: "md" },
  argTypes: {
    variant: { control: "select", options: ["ghost", "secondary", "primary"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} variant="ghost" />
      <IconButton {...args} variant="secondary" />
      <IconButton {...args} variant="primary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} size="sm" />
      <IconButton {...args} size="md" />
      <IconButton {...args} size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Playground: Story = {};
