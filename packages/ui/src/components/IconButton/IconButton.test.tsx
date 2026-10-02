import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("uses label as the accessible name", () => {
    render(<IconButton icon="x" label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<IconButton icon="x" label="Close" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled natively when disabled", () => {
    render(<IconButton icon="x" label="Close" disabled />);
    expect(screen.getByRole("button", { name: "Close" })).toBeDisabled();
  });

  it("has no axe violations across variants", async () => {
    const { container } = render(
      <>
        <IconButton icon="x" label="Close" variant="ghost" />
        <IconButton icon="refresh-cw" label="Reschedule" variant="secondary" />
        <IconButton icon="check" label="Approve" variant="primary" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
