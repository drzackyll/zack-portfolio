import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("associates the label with the control via htmlFor", () => {
    render(
      <Field label="Email" htmlFor="email">
        <input id="email" />
      </Field>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows the required marker visually without changing the label text", () => {
    render(
      <Field label="Email" htmlFor="email" required>
        <input id="email" />
      </Field>,
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders error instead of hint, in the danger color", () => {
    render(
      <Field label="Email" hint="We'll never share this" error="Enter a valid email address">
        <input />
      </Field>,
    );
    expect(screen.getByText("Enter a valid email address")).toHaveClass("text-danger-fg");
    expect(screen.queryByText("We'll never share this")).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Field label="Email" htmlFor="email" hint="Hint text">
        <input id="email" />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
