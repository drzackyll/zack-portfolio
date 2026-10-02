import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its text content", () => {
    render(<Badge tone="success">Confirmed</Badge>);
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
  });

  it("renders a dot alongside the text, never color alone", () => {
    render(<Badge tone="danger" dot>Cancelled</Badge>);
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("has no axe violations across tones and variants", async () => {
    const { container } = render(
      <>
        <Badge tone="neutral">Neutral</Badge>
        <Badge tone="accent" variant="solid">
          Accent
        </Badge>
        <Badge tone="success" dot>
          Confirmed
        </Badge>
        <Badge tone="warning">Needs approval</Badge>
        <Badge tone="danger" variant="solid">
          Cancelled
        </Badge>
        <Badge tone="info">Info</Badge>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
