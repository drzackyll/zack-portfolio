import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Display/Tag",
  component: Tag,
  args: { children: "Video call" },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: "video" },
};

export const Toggle: Story = {
  render: (args) => {
    function Demo() {
      const [selected, setSelected] = React.useState(false);
      return (
        <Tag {...args} selected={selected} onClick={() => setSelected((s) => !s)} />
      );
    }
    return <Demo />;
  },
};

export const Selected: Story = {
  args: { selected: true, onClick: () => {} },
};

export const Removable: Story = {
  args: { onRemove: () => {} },
};

export const Playground: Story = {};
