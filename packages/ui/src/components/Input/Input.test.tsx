import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("associates the label via htmlFor/id", () => {
    render(<Input label="Full name" />);
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  });

  it("calls onChange with the new value", async () => {
    const onChange = vi.fn();
    render(<Input label="Full name" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Full name"), "Lena");
    expect(onChange).toHaveBeenCalled();
  });

  it("sets aria-invalid and aria-describedby when there is an error", () => {
    render(<Input label="Email" error="Enter a valid email address" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent("Enter a valid email address");
  });

  it("only gives the error role=alert once errorAnnounced is set", () => {
    const { rerender } = render(<Input label="Email" error="Enter a valid email address" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    rerender(<Input label="Email" error="Enter a valid email address" errorAnnounced />);
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Input label="Full name" hint="As it appears on your ID" />
        <Input label="Email" error="Enter a valid email address" />
        <Input label="Disabled" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
