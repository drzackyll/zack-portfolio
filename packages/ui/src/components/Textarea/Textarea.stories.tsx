import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  args: {
    label: "Notes for your host",
    placeholder: "Anything they should know before the session",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "Only your host can see this." },
};

export const WithCount: Story = {
  args: { maxLength: 200, showCount: true, defaultValue: "Running ten minutes late." },
};

export const Error: Story = {
  args: { error: "Add a reason for cancelling.", required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Booking is locked." },
};
