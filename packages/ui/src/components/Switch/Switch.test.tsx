import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("is a role=switch with aria-checked reflecting state", () => {
    render(<Switch label="Bookable" defaultChecked />);
    expect(screen.getByRole("switch", { name: "Bookable" })).toHaveAttribute("aria-checked", "true");
  });

  it("toggles on click", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Bookable" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles via keyboard (Space) since it's a native button", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="Bookable" onCheckedChange={onCheckedChange} />);
    screen.getByRole("switch").focus();
    await userEvent.keyboard(" ");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Switch label="On" defaultChecked />
        <Switch label="Off" />
        <Switch label="Disabled" disabled />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
