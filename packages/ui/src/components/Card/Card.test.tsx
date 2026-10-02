import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders a plain div by default", () => {
    const { container } = render(<Card title="Weekly hours">Content</Card>);
    expect(container.querySelector("div")?.tagName).toBe("DIV");
  });

  it("renders a real anchor when interactive with href, not a clickable div", () => {
    render(
      <Card interactive href="/events/1" title="Intro call">
        Details
      </Card>,
    );
    expect(screen.getByRole("link", { name: /Intro call/ })).toHaveAttribute("href", "/events/1");
  });

  it("renders a real button when interactive with onClick, not a clickable div", async () => {
    const onClick = vi.fn();
    render(
      <Card interactive onClick={onClick} title="Intro call">
        Details
      </Card>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Intro call/ }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders title, description, actions and footer", () => {
    render(
      <Card title="Weekly hours" description="Set your availability" actions={<span>A</span>} footer={<span>F</span>}>
        Body
      </Card>,
    );
    expect(screen.getByText("Weekly hours")).toBeInTheDocument();
    expect(screen.getByText("Set your availability")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("F")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Card variant="outlined" title="Outlined">
          Content
        </Card>
        <Card variant="elevated" title="Elevated">
          Content
        </Card>
        <Card interactive href="/x" title="Link card" />
        <Card interactive onClick={() => {}} title="Button card" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
