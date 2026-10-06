import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Display/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  args: { name: "Dr. Maya Okafor", size: 32, tone: "secondary" },
  argTypes: {
    tone: { control: "select", options: ["secondary", "accent", "neutral"] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {[24, 28, 32, 44, 48].map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} tone="secondary" />
      <Avatar {...args} tone="accent" />
      <Avatar {...args} tone="neutral" />
    </div>
  ),
};

export const BrokenPhoto: Story = {
  args: { src: "/does-not-exist.jpg", size: 44 },
};

export const BesideName: Story = {
  render: (args) => (
    <div className="flex items-center gap-2.5">
      <Avatar {...args} decorative />
      <span className="font-sans text-ui font-semibold text-strong">{args.name}</span>
    </div>
  ),
};
