import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders as a static span when there is no onClick", () => {
    const { container } = render(<Tag>Video call</Tag>);
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(container.querySelector("button[aria-pressed]")).not.toBeInTheDocument();
  });

  it("renders as a real toggle button with aria-pressed when onClick is given", async () => {
    const onClick = vi.fn();
    render(
      <Tag onClick={onClick} selected={false}>
        Video call
      </Tag>,
    );
    const button = screen.getByRole("button", { name: "Video call", pressed: false });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("gives the remove button an accessible 'Remove {label}' name", async () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Video call</Tag>);
    const removeBtn = screen.getByRole("button", { name: "Remove Video call" });
    await userEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <>
        <Tag>Static</Tag>
        <Tag onClick={() => {}}>Toggle</Tag>
        <Tag onClick={() => {}} selected>
          Selected toggle
        </Tag>
        <Tag onRemove={() => {}}>Removable</Tag>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
