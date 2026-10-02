import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "pst", label: "Pacific Time" },
  { value: "est", label: "Eastern Time" },
];

describe("Select", () => {
  it("renders a native select associated with its label", () => {
    render(<Select label="Time zone" options={options} />);
    expect(screen.getByLabelText("Time zone").tagName).toBe("SELECT");
  });

  it("calls onChange with the selected value", async () => {
    const onChange = vi.fn();
    render(<Select label="Time zone" options={options} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText("Time zone"), "est");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders a disabled placeholder option", () => {
    render(<Select label="Time zone" options={options} placeholder="Choose a time zone" />);
    expect(screen.getByRole("option", { name: "Choose a time zone" })).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Select label="Time zone" options={options} />
        <Select label="Error" options={options} error="Pick a time zone" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
