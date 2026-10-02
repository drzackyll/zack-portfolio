import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Toast, ToastProvider, useToast } from "./Toast";

describe("Toast", () => {
  it("is role=status for non-danger tones and role=alert for danger", () => {
    render(
      <>
        <Toast title="Availability saved" tone="success" />
        <Toast title="Something went wrong" tone="danger" />
      </>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("Availability saved");
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("auto-dismisses after `duration`", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast title="Booking cancelled" onClose={onClose} duration={5000} />);
    vi.advanceTimersByTime(5000);
    expect(onClose).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it("pauses the auto-dismiss timer while hovered, then resumes on mouse leave", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast title="Booking cancelled" onClose={onClose} duration={5000} />);
    const toast = screen.getByRole("status");

    fireEvent.mouseEnter(toast);
    vi.advanceTimersByTime(10000);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    vi.advanceTimersByTime(5000);
    expect(onClose).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it("an Undo action is reachable and clickable", () => {
    const onUndo = vi.fn();
    render(<Toast title="Booking cancelled" action={{ label: "Undo", onClick: onUndo }} />);
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onUndo).toHaveBeenCalledOnce();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Toast title="Booking cancelled" description="Dr. Lena Park has been notified." action={{ label: "Undo", onClick: () => {} }} onClose={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("ToastProvider / useToast", () => {
  function Demo() {
    const { toast } = useToast();
    return (
      <button onClick={() => toast({ title: "Availability saved", tone: "success" })}>Save</button>
    );
  }

  beforeEach(() => {
    document.body.innerHTML = "";
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("enqueues a toast into a role=region live container", async () => {
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("region", { name: "Notifications" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Availability saved");
  });
});
