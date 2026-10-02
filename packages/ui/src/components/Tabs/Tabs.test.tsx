import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { Tabs, TabsPanel, type TabItem } from "./Tabs";

const items: TabItem[] = [
  { id: "upcoming", label: "Upcoming", count: 3 },
  { id: "pending", label: "Needs approval", count: 1 },
  { id: "past", label: "Past" },
];

function Demo({ onValueChange }: { onValueChange?: (id: string) => void }) {
  const [value, setValue] = React.useState("upcoming");
  return (
    <>
      <Tabs
        items={items}
        value={value}
        onValueChange={(id) => {
          setValue(id);
          onValueChange?.(id);
        }}
      />
      <TabsPanel value="upcoming" activeValue={value}>
        Upcoming content
      </TabsPanel>
      <TabsPanel value="pending" activeValue={value}>
        Pending content
      </TabsPanel>
      <TabsPanel value="past" activeValue={value}>
        Past content
      </TabsPanel>
    </>
  );
}

describe("Tabs + TabsPanel", () => {
  it("clicking a tab calls onValueChange and selects it", async () => {
    const onValueChange = vi.fn();
    render(<Demo onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("tab", { name: /Needs approval/ }));
    expect(onValueChange).toHaveBeenCalledWith("pending");
    expect(screen.getByRole("tab", { name: /Needs approval/ })).toHaveAttribute("aria-selected", "true");
  });

  it("ArrowRight/ArrowLeft move focus and select, wrapping at the ends", async () => {
    render(<Demo />);
    screen.getByRole("tab", { name: /Upcoming/ }).focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Past" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Past" })).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /Upcoming/ })).toHaveFocus();
  });

  it("Home/End jump to the first/last tab", async () => {
    render(<Demo />);
    screen.getByRole("tab", { name: /Upcoming/ }).focus();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Past" })).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: /Upcoming/ })).toHaveFocus();
  });

  it("only the active panel is in the accessibility tree", () => {
    render(<Demo />);
    expect(screen.getByText("Upcoming content")).toBeVisible();
    expect(screen.queryByText("Pending content")).not.toBeInTheDocument();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Upcoming content");
  });

  it("uses roving tabindex: only the selected tab is tabbable", () => {
    render(<Demo />);
    expect(screen.getByRole("tab", { name: /Upcoming/ })).toHaveAttribute("tabIndex", "0");
    expect(screen.getByRole("tab", { name: /Needs approval/ })).toHaveAttribute("tabIndex", "-1");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Demo />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
