import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("is not in the accessibility tree until hovered", async () => {
    render(
      <Tooltip content="Reschedule">
        <Button>Open</Button>
      </Tooltip>,
    );
    expect(screen.queryByText("Reschedule")).not.toBeInTheDocument();
    await userEvent.hover(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByText("Reschedule")).toBeInTheDocument();
  });

  it("the trigger gets aria-describedby pointing at the tooltip once open", async () => {
    render(
      <Tooltip content="Reschedule">
        <Button>Open</Button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    await userEvent.hover(trigger);
    const tooltip = await screen.findByText("Reschedule");
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id);
  });

  it("has no axe violations when open", async () => {
    const { container } = render(
      <Tooltip content="Reschedule">
        <Button>Open</Button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button", { name: "Open" }));
    await screen.findByText("Reschedule");
    expect(await axe(container)).toHaveNoViolations();
  });
});
