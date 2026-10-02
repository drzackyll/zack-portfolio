import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  args: { label: "Full name", placeholder: "Jane Appleseed" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { label: "Email", icon: "mail", placeholder: "jane@example.com" },
};

export const WithHint: Story = {
  args: { hint: "As it appears on your ID" },
};

export const WithError: Story = {
  args: { error: "Enter a valid email address", label: "Email" },
};

export const Disabled: Story = {
  args: { disabled: true, value: "Jane Appleseed" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
};

export const Playground: Story = {};
