import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const badgeVariants = cva(
  "inline-flex h-5 items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-pill)] px-2 font-sans text-xs font-semibold",
  {
    variants: {
      tone: {
        neutral: "",
        accent: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
      },
      variant: {
        soft: "border",
        solid: "border border-transparent",
      },
    },
    compoundVariants: [
      { tone: "neutral", variant: "soft", class: "border-neutral-border bg-neutral-bg text-neutral-fg" },
      { tone: "neutral", variant: "solid", class: "bg-[var(--neutral-solid)] text-white" },
      { tone: "accent", variant: "soft", class: "border-accent-soft-border bg-accent-soft text-accent-text" },
      { tone: "accent", variant: "solid", class: "bg-accent text-on-accent" },
      { tone: "success", variant: "soft", class: "border-success-border bg-success-bg text-success-fg" },
      { tone: "success", variant: "solid", class: "bg-success-solid text-white" },
      { tone: "warning", variant: "soft", class: "border-warning-border bg-warning-bg text-warning-fg" },
      { tone: "warning", variant: "solid", class: "bg-warning-solid text-white" },
      { tone: "danger", variant: "soft", class: "border-danger-border bg-danger-bg text-danger-fg" },
      { tone: "danger", variant: "solid", class: "bg-danger-solid text-white" },
      { tone: "info", variant: "soft", class: "border-info-border bg-info-bg text-info-fg" },
      { tone: "info", variant: "solid", class: "bg-info-solid text-white" },
    ],
    defaultVariants: { tone: "neutral", variant: "soft" },
  },
);

const DOT_CLASS: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-[var(--neutral-solid)]",
  accent: "bg-accent",
  success: "bg-success-solid",
  warning: "bg-warning-solid",
  danger: "bg-danger-solid",
  info: "bg-info-solid",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = "neutral", variant = "soft", dot = false, className, children, ...rest }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ tone, variant }), className)} {...rest}>
      {dot && (
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 rounded-full", variant === "solid" ? "bg-white" : DOT_CLASS[tone ?? "neutral"])}
        />
      )}
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";
