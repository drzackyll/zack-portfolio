import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tabs, TabsPanel, type TabItem } from "./Tabs";

const items: TabItem[] = [
  { id: "upcoming", label: "Upcoming", count: 3 },
  { id: "pending", label: "Needs approval", count: 1 },
  { id: "past", label: "Past" },
];

function Demo({ variant }: { variant?: "underline" | "pill" }) {
  const [value, setValue] = React.useState("upcoming");
  return (
    <div className="w-[420px]">
      <Tabs items={items} value={value} onValueChange={setValue} variant={variant} />
      <div className="pt-4 text-sm text-body">
        <TabsPanel value="upcoming" activeValue={value}>
          3 upcoming bookings.
        </TabsPanel>
        <TabsPanel value="pending" activeValue={value}>
          1 booking needs approval.
        </TabsPanel>
        <TabsPanel value="past" activeValue={value}>
          No past bookings yet.
        </TabsPanel>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Display/Tabs",
};
export default meta;

type Story = StoryObj;

export const Underline: Story = {
  render: () => <Demo variant="underline" />,
};

export const Pill: Story = {
  render: () => <Demo variant="pill" />,
};

export const Playground: Story = {
  render: () => <Demo variant="underline" />,
};
