import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./Field";

const meta: Meta<typeof Field> = {
  title: "Forms/Field",
  component: Field,
  args: {
    label: "Email",
    hint: "We'll send booking confirmations here.",
  },
};
export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: (args) => (
    <Field {...args} htmlFor="field-default">
      <input
        id="field-default"
        className="h-9 rounded-md border border-border-input px-3 text-sm text-strong shadow-[var(--shadow-inset)]"
      />
    </Field>
  ),
};

export const Required: Story = {
  args: { required: true },
  render: Default.render,
};

export const WithError: Story = {
  args: { error: "Enter a valid email address", hint: undefined },
  render: Default.render,
};

export const Playground: Story = {
  render: Default.render,
};
