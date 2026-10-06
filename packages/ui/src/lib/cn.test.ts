import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("keeps a Zyne type-scale size alongside a text colour", () => {
    expect(cn("text-ui text-strong")).toBe("text-ui text-strong");
    expect(cn("text-body-sm", "text-muted")).toBe("text-body-sm text-muted");
    expect(cn("text-overline text-on-accent")).toBe("text-overline text-on-accent");
  });

  it("still lets a later size or colour override an earlier one", () => {
    expect(cn("text-body-sm", "text-ui")).toBe("text-ui");
    expect(cn("text-muted", "text-strong")).toBe("text-strong");
    expect(cn("text-sm", "text-caption")).toBe("text-caption");
  });
});
