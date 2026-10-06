import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "../IconButton/IconButton";
import { Menu, type MenuItem, type MenuSeparator } from "./Menu";

function renderMenu(overrides: Partial<Record<"onReschedule" | "onCancel", () => void>> = {}) {
  const items: Array<MenuItem | MenuSeparator> = [
    { label: "Reschedule", icon: "calendar", onSelect: overrides.onReschedule },
    { label: "Copy link", icon: "link", shortcut: "⌘L" },
    { label: "Archive", icon: "archive", disabled: true },
    { type: "separator" },
    { label: "Cancel booking", icon: "x", danger: true, onSelect: overrides.onCancel },
  ];
  return render(<Menu label="Booking actions" trigger={<IconButton icon="ellipsis" label="More actions" />} items={items} />);
}

describe("Menu", () => {
  it("wires the trigger as a menu button", () => {
    renderMenu();
    const trigger = screen.getByRole("button", { name: "More actions" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a labelled menu and runs onSelect for the chosen item", async () => {
    const onReschedule = vi.fn();
    renderMenu({ onReschedule });
    await userEvent.click(screen.getByRole("button", { name: "More actions" }));
    expect(await screen.findByRole("menu", { name: "Booking actions" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("menuitem", { name: "Reschedule" }));
    expect(onReschedule).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens from the keyboard and skips disabled items", async () => {
    const onCancel = vi.fn();
    renderMenu({ onCancel });
    screen.getByRole("button", { name: "More actions" }).focus();
    await userEvent.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Cancel booking" })).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: /^Copy link/ })).toHaveFocus();
    await userEvent.keyboard("{End}{Enter}");
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    renderMenu();
    const trigger = screen.getByRole("button", { name: "More actions" });
    await userEvent.click(trigger);
    await screen.findByRole("menu");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("marks disabled items", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "More actions" }));
    expect(await screen.findByRole("menuitem", { name: "Archive" })).toHaveAttribute("aria-disabled", "true");
  });

  it("has no axe violations when open", async () => {
    renderMenu();
    await userEvent.click(screen.getByRole("button", { name: "More actions" }));
    await screen.findByRole("menu");
    // The bare test page has no landmarks, so the region rule only flags the harness.
    expect(await axe(document.body, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });
});
