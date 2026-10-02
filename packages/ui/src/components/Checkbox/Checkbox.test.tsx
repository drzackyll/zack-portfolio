import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles via label click and calls onCheckedChange", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Email me a reminder" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByLabelText("Email me a reminder"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("works as an uncontrolled component via defaultChecked", async () => {
    render(<Checkbox label="Remember me" defaultChecked />);
    expect(screen.getByLabelText("Remember me")).toBeChecked();
  });

  it("sets the indeterminate DOM property", () => {
    render(<Checkbox label="Select all" indeterminate />);
    expect(screen.getByLabelText("Select all")).toHaveProperty("indeterminate", true);
  });

  it("associates the description via aria-describedby", () => {
    render(<Checkbox label="Email me a reminder" description="24 hours before the session" />);
    const input = screen.getByLabelText("Email me a reminder");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent("24 hours before the session");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" checked readOnly />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
