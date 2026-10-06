import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Menu/Menu",
  component: Menu,
  parameters: { layout: "centered" },
  args: {
    label: "Booking actions",
    trigger: <IconButton icon="ellipsis" label="More actions" />,
    items: [
      { label: "Reschedule", icon: "calendar" },
      { label: "Copy link", icon: "link", shortcut: "⌘L" },
      { label: "Archive", icon: "archive", disabled: true },
      { type: "separator" },
      { label: "Cancel booking", icon: "x", danger: true },
    ],
  },
  argTypes: {
    align: { control: "select", options: ["start", "end"] },
    placement: { control: "select", options: ["bottom", "top"] },
    trigger: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="flex h-64 items-start justify-center">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const ButtonTrigger: Story = {
  args: {
    trigger: (
      <Button variant="secondary" iconRight="chevron-down">
        Actions
      </Button>
    ),
  },
};

export const AlignEnd: Story = {
  args: { align: "end", defaultOpen: true },
};
