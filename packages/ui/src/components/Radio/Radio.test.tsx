import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./Radio";

describe("RadioGroup", () => {
  it("renders a fieldset/legend and selects the option matching value", () => {
    render(
      <RadioGroup name="buffer" value="10" legend="Buffer between sessions">
        <Radio value="none" label="None" />
        <Radio value="10" label="10 minutes" />
        <Radio value="15" label="15 minutes" />
      </RadioGroup>,
    );
    expect(screen.getByRole("group", { name: "Buffer between sessions" })).toBeInTheDocument();
    expect(screen.getByLabelText("10 minutes")).toBeChecked();
    expect(screen.getByLabelText("None")).not.toBeChecked();
  });

  it("calls onValueChange when a different option is picked", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup name="buffer" value="none" onValueChange={onValueChange} legend="Buffer">
        <Radio value="none" label="None" />
        <Radio value="10" label="10 minutes" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByLabelText("10 minutes"));
    expect(onValueChange).toHaveBeenCalledWith("10");
  });

  it("supports arrow-key navigation between options natively", async () => {
    render(
      <RadioGroup name="buffer" value="none" legend="Buffer">
        <Radio value="none" label="None" />
        <Radio value="10" label="10 minutes" />
      </RadioGroup>,
    );
    screen.getByLabelText("None").focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByLabelText("10 minutes")).toHaveFocus();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <RadioGroup name="buffer" value="none" legend="Buffer between sessions">
        <Radio value="none" label="None" />
        <Radio value="10" label="10 minutes" description="A short gap" />
      </RadioGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
