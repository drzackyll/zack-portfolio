import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const cardVariants = cva(
  "flex min-w-0 flex-col rounded-lg text-left transition-[box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
  {
    variants: {
      variant: {
        outlined: "border border-border-subtle bg-surface-card shadow-xs",
        elevated: "border border-transparent bg-surface-raised shadow-md",
        sunken: "border border-transparent bg-surface-sunken",
      },
      interactive: {
        true: "focus-ring cursor-pointer hover:border-border-default hover:shadow-md",
        false: "",
      },
    },
    defaultVariants: { variant: "outlined", interactive: false },
  },
);

interface CardSlotsProps {
  title?: string;
  description?: string;
  /** Header-right slot, usually IconButtons. */
  actions?: React.ReactNode;
  /** Bottom bar, right-aligned, separated by a hairline. */
  footer?: React.ReactNode;
  /** @default 20 */
  padding?: number;
  children?: React.ReactNode;
}

function CardBody({ title, description, actions, footer, padding = 20, children }: CardSlotsProps) {
  const isHeaderLastBlock = !children && !footer;
  return (
    <>
      {(title || actions) && (
        <div
          className="flex items-start gap-3"
          style={{ padding: `${padding}px ${padding}px ${isHeaderLastBlock ? padding : 0}px` }}
        >
          <div className="min-w-0 flex-1">
            {title && <div className="font-sans text-heading-sm font-semibold text-strong">{title}</div>}
            {description && <div className="mt-0.5 text-[13px] leading-[18px] text-muted">{description}</div>}
          </div>
          {actions && <div className="flex flex-none gap-1">{actions}</div>}
        </div>
      )}
      {children && <div style={{ padding }}>{children}</div>}
      {footer && (
        <div
          className="flex justify-end gap-2 border-t border-border-subtle"
          style={{ padding: `12px ${padding}px` }}
        >
          {footer}
        </div>
      )}
    </>
  );
}

export interface CardProps extends CardSlotsProps, Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /** @default "outlined" */
  variant?: "outlined" | "elevated" | "sunken";
  /** Adds hover lift. Renders as `<a>` (with `href`) or `<button>` (with `onClick`) instead of a `<div>` — never a clickable div. */
  interactive?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    { variant, interactive = false, href, onClick, title, description, actions, footer, padding, className, children, ...rest },
    ref,
  ) => {
    const slots: CardSlotsProps = { title, description, actions, footer, padding, children };
    const classes = cn(cardVariants({ variant, interactive }), className);

    if (interactive && href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <CardBody {...slots} />
        </a>
      );
    }

    if (interactive && onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={onClick}
          className={classes}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          <CardBody {...slots} />
        </button>
      );
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={classes} {...rest}>
        <CardBody {...slots} />
      </div>
    );
  },
);
Card.displayName = "Card";
