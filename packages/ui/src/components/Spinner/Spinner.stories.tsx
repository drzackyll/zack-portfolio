import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  args: { size: 16, label: "Loading" },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 text-muted">
      <Spinner {...args} size={14} />
      <Spinner {...args} size={16} />
      <Spinner {...args} size={20} />
      <Spinner {...args} size={32} />
    </div>
  ),
};

export const OnAccent: Story = {
  render: (args) => (
    <div className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-on-accent">
      <Spinner {...args} decorative />
      <span className="font-sans text-ui font-semibold">Saving</span>
    </div>
  ),
};
