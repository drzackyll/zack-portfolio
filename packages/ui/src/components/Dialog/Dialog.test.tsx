import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../Button/Button";
import { Dialog } from "./Dialog";

function Harness({ destructive = false, onCloseSpy }: { destructive?: boolean; onCloseSpy?: () => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        Open dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          onCloseSpy?.();
        }}
        title="Cancel this booking?"
        description="Dr. Lena Park will be emailed and the slot will reopen."
        destructive={destructive}
        footer={<Button>Cancel booking</Button>}
      >
        Body content
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  it("has role=dialog, aria-modal and aria-labelledby pointing at the title", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(document.getElementById(labelledBy as string)).toHaveTextContent("Cancel this booking?");
  });

  it("moves focus into the dialog when opened", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  });

  it("Esc closes the dialog and calls onClose", async () => {
    const onCloseSpy = vi.fn();
    render(<Harness onCloseSpy={onCloseSpy} />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(onCloseSpy).toHaveBeenCalled();
  });

  it("returns focus to the trigger after closing", async () => {
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Open dialog" });
    await userEvent.click(trigger);
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("scrim click closes the dialog by default", async () => {
    const onCloseSpy = vi.fn();
    render(<Harness onCloseSpy={onCloseSpy} />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    await screen.findByRole("dialog");
    fireEvent.pointerDown(screen.getByTestId("dialog-scrim"));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("scrim click does NOT close a destructive dialog, but Esc still does", async () => {
    render(<Harness destructive />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    await screen.findByRole("dialog");
    fireEvent.pointerDown(screen.getByTestId("dialog-scrim"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("has no axe violations", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    await screen.findByRole("dialog");
    expect(await axe(document.body)).toHaveNoViolations();
  });
});
