import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Radio, RadioGroup } from "./Radio";

const meta: Meta<typeof RadioGroup> = {
  title: "Forms/Radio",
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

function Controlled() {
  const [value, setValue] = React.useState("10");
  return (
    <RadioGroup name="buffer" value={value} onValueChange={setValue} legend="Buffer between sessions">
      <Radio value="none" label="None" />
      <Radio value="10" label="10 minutes" />
      <Radio value="15" label="15 minutes" description="Recommended for back-to-back calls" />
    </RadioGroup>
  );
}

export const Default: Story = {
  render: () => <Controlled />,
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup name="buffer-disabled" value="none" legend="Buffer between sessions">
      <Radio value="none" label="None" />
      <Radio value="10" label="10 minutes" disabled />
    </RadioGroup>
  ),
};

export const Playground: Story = {
  render: () => <Controlled />,
};
