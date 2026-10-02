import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  args: { label: "Email me a reminder" },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Select all" },
};

export const WithDescription: Story = {
  args: { description: "24 hours before the session" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Playground: Story = {};
