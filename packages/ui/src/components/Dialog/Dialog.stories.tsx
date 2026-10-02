import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Overlays/Dialog",
};
export default meta;

type Story = StoryObj;

function Demo(props: { destructive?: boolean; withDescription?: boolean }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Cancel this booking?"
        description={props.withDescription === false ? undefined : "Dr. Lena Park will be emailed and the 2:00pm slot on Thursday will reopen."}
        destructive={props.destructive}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Keep booking
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Cancel booking
            </Button>
          </>
        }
      />
    </>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};

export const Destructive: Story = {
  render: () => <Demo destructive />,
};

export const WithoutDescription: Story = {
  render: () => <Demo withDescription={false} />,
};

export const Playground: Story = {
  render: () => <Demo />,
};
