import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";

// Thursday 8 October 2026
const TODAY = new Date(2026, 9, 8);
const weekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

describe("Calendar", () => {
  it("renders a grid labelled by the month heading", () => {
    render(<Calendar today={TODAY} />);
    expect(screen.getByRole("grid", { name: "October 2026" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Mon");
  });

  it("starts weeks on Sunday when asked", () => {
    render(<Calendar today={TODAY} weekStartsOn={0} />);
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent("Sun");
  });

  it("labels days descriptively and marks today", () => {
    render(<Calendar today={TODAY} getDayDescription={() => "4 times available"} isDateDisabled={weekend} />);
    const today = screen.getByRole("button", { name: "Thursday, October 8, today, 4 times available" });
    expect(today).toHaveAttribute("aria-current", "date");
    expect(screen.getByRole("button", { name: "Saturday, October 10, unavailable" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("selects an enabled day and ignores disabled ones", async () => {
    const onChange = vi.fn();
    render(<Calendar today={TODAY} isDateDisabled={weekend} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Saturday, October 10, unavailable" }));
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Friday, October 9" }));
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 9, 9));
  });

  it("marks the selected day's cell", () => {
    render(<Calendar today={TODAY} value={new Date(2026, 9, 14)} />);
    const button = screen.getByRole("button", { name: "Wednesday, October 14" });
    expect(button.closest("td")).toHaveAttribute("aria-selected", "true");
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("uses a roving tabindex with arrow, Home/End and PageUp/PageDown keys", async () => {
    render(<Calendar today={TODAY} isDateDisabled={weekend} />);
    const today = screen.getByRole("button", { name: /October 8, today/ });
    expect(today).toHaveAttribute("tabindex", "0");
    expect(screen.getAllByRole("button").filter((b) => b.tabIndex === 0)).toHaveLength(3); // today + 2 month buttons

    today.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: /October 9/ })).toHaveFocus();
    // Disabled days stay focusable so keyboard users can move past them.
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: /October 10, unavailable/ })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: /October 17/ })).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("button", { name: /Monday, October 12/ })).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("button", { name: /Sunday, October 18/ })).toHaveFocus();
    await userEvent.keyboard("{PageDown}");
    expect(screen.getByRole("grid", { name: "November 2026" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /November 18/ })).toHaveFocus();
  });

  it("keeps focus and navigation within min and max", async () => {
    render(<Calendar today={TODAY} min={new Date(2026, 9, 5)} max={new Date(2026, 9, 30)} />);
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Sunday, October 4, unavailable" })).toHaveAttribute("aria-disabled", "true");
    screen.getByRole("button", { name: /October 8, today/ }).focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(screen.getByRole("button", { name: "Monday, October 5" })).toHaveFocus();
  });

  it("changes month with the header buttons", async () => {
    render(<Calendar today={TODAY} />);
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("grid", { name: "November 2026" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sunday, November 1" })).toHaveAttribute("tabindex", "0");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Calendar today={TODAY} value={new Date(2026, 9, 14)} isDateDisabled={weekend} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
