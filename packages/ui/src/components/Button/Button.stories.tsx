import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    children: "Save changes",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: { iconLeft: "plus", children: "Add booking" },
};

export const Loading: Story = {
  args: { loading: true, children: "Saving" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Save changes" },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div className="w-80">
      <Button {...args} />
    </div>
  ),
};

export const Playground: Story = {
  args: {},
};
