import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

const TODAY = new Date(2026, 9, 8);
const weekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

const meta: Meta<typeof Calendar> = {
  title: "Date/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  args: { today: TODAY, weekStartsOn: 1 },
  argTypes: {
    weekStartsOn: { control: "select", options: [0, 1] },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const [value, setValue] = React.useState<Date | null>(args.value ?? null);
    return <Calendar {...args} value={value} onChange={setValue} />;
  },
};
export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: { value: new Date(2026, 9, 14) },
};

export const BookableWeekdays: Story = {
  args: {
    isDateDisabled: weekend,
    getDayDescription: (date) => `${(date.getDate() % 4) + 1} times available`,
    min: TODAY,
  },
};

export const SundayStart: Story = {
  args: { weekStartsOn: 0 },
};
