import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("is labelled by its Field label", () => {
    render(<Textarea label="Notes" />);
    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveAttribute("rows", "3");
  });

  it("points aria-describedby at the hint", () => {
    render(<Textarea label="Notes" hint="Shared with your host" />);
    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveAccessibleDescription("Shared with your host");
  });

  it("marks itself invalid and describes the error", () => {
    render(<Textarea label="Notes" error="Add a note" />);
    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Add a note");
  });

  it("updates the character count as the user types", async () => {
    const onChange = vi.fn();
    render(<Textarea label="Notes" maxLength={20} showCount onChange={onChange} />);
    expect(screen.getByText("0 / 20")).toBeInTheDocument();
    await userEvent.type(screen.getByRole("textbox", { name: "Notes" }), "Hello");
    expect(screen.getByText("5 / 20")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it("counts a controlled value", () => {
    render(<Textarea label="Notes" maxLength={20} showCount value="Hi there" onChange={() => {}} />);
    expect(screen.getByText("8 / 20")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Textarea label="Notes" hint="Optional" />
        <Textarea label="Reason" error="Add a reason" />
        <Textarea label="Disabled" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
