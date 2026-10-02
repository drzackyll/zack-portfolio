import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Display/Card",
  component: Card,
  args: {
    title: "Weekly hours",
    description: "Set your availability for new bookings",
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Outlined: Story = {
  args: { variant: "outlined", children: "Card content goes here." },
};

export const Elevated: Story = {
  args: { variant: "elevated", children: "Card content goes here." },
};

export const Sunken: Story = {
  args: { variant: "sunken", children: "Card content goes here." },
};

export const WithActionsAndFooter: Story = {
  args: {
    actions: <IconButton icon="ellipsis" label="More options" size="sm" />,
    footer: (
      <>
        <Button variant="secondary" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save changes</Button>
      </>
    ),
    children: <Badge tone="accent">Draft</Badge>,
  },
};

export const InteractiveLink: Story = {
  args: { interactive: true, href: "#", title: "Intro call", description: "30 min · Video call" },
};

export const InteractiveButton: Story = {
  args: { interactive: true, onClick: () => {}, title: "Intro call", description: "30 min · Video call" },
};

export const Playground: Story = {
  args: { children: "Card content goes here." },
};
