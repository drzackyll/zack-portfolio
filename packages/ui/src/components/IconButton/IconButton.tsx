import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";

const iconButtonVariants = cva(
  "focus-ring inline-flex items-center justify-center rounded-md border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] disabled:cursor-not-allowed disabled:opacity-45",
  {
    variants: {
      variant: {
        ghost: "border-transparent bg-transparent text-muted hover:bg-surface-hover hover:text-strong active:bg-surface-pressed",
        secondary: "border-border-default bg-surface-card text-body hover:bg-surface-hover active:bg-surface-pressed",
        primary: "border-transparent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active",
      },
      size: {
        sm: "h-[30px] w-[30px]",
        md: "h-9 w-9",
        lg: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

const ICON_SIZE = { sm: 14, md: 16, lg: 18 } as const;

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  /** Lucide icon name. */
  icon: string;
  /**
   * Accessible name. Required — this is the button's only content.
   * `title` is also set as a native-tooltip fallback, but for a visible
   * tooltip on hover/focus, pair this button with the `Tooltip` component.
   */
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, variant = "ghost", size = "md", type = "button", className, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...rest}
    >
      <Icon name={icon} size={ICON_SIZE[size ?? "md"]} />
    </button>
  ),
);
IconButton.displayName = "IconButton";
