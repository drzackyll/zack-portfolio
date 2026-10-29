import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Display/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  args: { name: "calendar", size: 16 },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 text-strong">
      <Icon {...args} size={14} />
      <Icon {...args} size={16} />
      <Icon {...args} size={20} />
      <Icon {...args} size={24} />
    </div>
  ),
};

export const Common: Story = {
  render: (args) => (
    <div className="grid grid-cols-6 gap-4 text-strong">
      {[
        "search",
        "plus",
        "x",
        "check",
        "chevron-down",
        "arrow-up-right",
        "calendar",
        "link",
        "archive",
        "ellipsis",
        "circle-alert",
        "refresh-cw",
      ].map((name) => (
        <Icon key={name} {...args} name={name} size={20} />
      ))}
    </div>
  ),
};

export const Labelled: Story = {
  render: (args) => (
    <span className="inline-flex items-center gap-2 text-danger-fg">
      <Icon {...args} name="circle-alert" size={20} label="Error" />
      <span className="font-sans text-ui">Payment failed</span>
    </span>
  ),
};
