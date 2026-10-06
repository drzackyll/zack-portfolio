import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Avatar, initialsOf } from "./Avatar";

describe("Avatar", () => {
  it("derives initials from the name, skipping titles", () => {
    expect(initialsOf("Dr. Maya Okafor")).toBe("MO");
    expect(initialsOf("ada lovelace byron")).toBe("AL");
    expect(initialsOf("Cher")).toBe("C");
  });

  it("is an image labelled with the full name", () => {
    render(<Avatar name="Maya Okafor" />);
    const avatar = screen.getByRole("img", { name: "Maya Okafor" });
    expect(avatar).toHaveTextContent("MO");
  });

  it("uses explicit initials when given", () => {
    render(<Avatar name="Maya Okafor" initials="MK" />);
    expect(screen.getByRole("img", { name: "Maya Okafor" })).toHaveTextContent("MK");
  });

  it("falls back to initials when the photo fails to load", () => {
    const { container } = render(<Avatar name="Maya Okafor" src="/missing.jpg" />);
    const photo = container.querySelector("img")!;
    expect(screen.getByRole("img", { name: "Maya Okafor" })).not.toHaveTextContent("MO");
    fireEvent.error(photo);
    expect(screen.getByRole("img", { name: "Maya Okafor" })).toHaveTextContent("MO");
  });

  it("is hidden from assistive tech when decorative", () => {
    const { container } = render(<Avatar name="Maya Okafor" decorative />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Avatar name="Maya Okafor" />
        <Avatar name="Maya Okafor" tone="accent" />
        <Avatar name="Maya Okafor" decorative />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
