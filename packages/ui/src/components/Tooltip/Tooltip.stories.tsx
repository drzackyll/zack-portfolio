import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  args: { content: "Reschedule", placement: "top" },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const OnButton: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};

export const OnIconButton: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <IconButton icon="refresh-cw" label="Reschedule" />
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: { placement: "bottom" },
  render: OnButton.render,
};

export const Playground: Story = {
  render: OnButton.render,
};
