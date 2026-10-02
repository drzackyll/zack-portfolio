import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const options = [
  { value: "pst", label: "Pacific Time (US & Canada)" },
  { value: "est", label: "Eastern Time (US & Canada)" },
  { value: "gmt", label: "London" },
];

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  args: { label: "Time zone", options },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: { placeholder: "Choose a time zone" },
};

export const WithError: Story = {
  args: { error: "Pick a time zone" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Playground: Story = {};
