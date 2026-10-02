import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("is hidden from assistive tech by default", () => {
    const { container } = render(<Icon name="check" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
  });

  it("exposes an accessible name when `label` is passed", () => {
    render(<Icon name="check" label="Success" />);
    expect(screen.getByRole("img", { name: "Success" })).toBeInTheDocument();
  });

  it("resolves kebab-case names to the matching Lucide icon", () => {
    const { container } = render(<Icon name="chevron-down" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Icon name="check" label="Success" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
