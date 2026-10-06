import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces its label as a status", () => {
    render(<Spinner label="Loading times" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading times");
  });

  it("defaults the label to Loading", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("is hidden from assistive tech when decorative", () => {
    const { container } = render(<Spinner decorative />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
