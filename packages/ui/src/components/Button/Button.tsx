import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";

export const buttonVariants = cva(
  "focus-ring relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-md border font-sans text-[13px] font-semibold tracking-[-.005em] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] disabled:cursor-not-allowed disabled:border-border-subtle disabled:text-subtle",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-sunken",
        secondary:
          "border-border-default bg-surface-card text-strong shadow-xs hover:bg-surface-hover active:bg-surface-pressed disabled:bg-surface-sunken disabled:shadow-none",
        ghost:
          "border-transparent bg-transparent text-body hover:bg-surface-hover active:bg-surface-pressed disabled:bg-transparent",
        danger:
          "border-transparent bg-danger-solid text-white hover:brightness-95 active:brightness-90 disabled:bg-surface-sunken",
      },
      size: {
        sm: "h-[30px] gap-1.5 px-[10px] text-[13px]",
        md: "h-9 gap-2 px-[14px] text-sm",
        lg: "h-11 gap-2 px-[18px] text-[15px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const ICON_SIZE = { sm: 14, md: 16, lg: 18 } as const;
const CONTENT_GAP = { sm: "gap-1.5", md: "gap-2", lg: "gap-2" } as const;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  /** Lucide icon name rendered before the label. */
  iconLeft?: string;
  /** Lucide icon name rendered after the label. */
  iconRight?: string;
  /** Shows a spinner, sets `aria-busy`, and blocks clicks while keeping the button's width. */
  loading?: boolean;
  /** Render the child element (e.g. a link) in place of a `<button>`, via Radix Slot. */
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "md",
      fullWidth,
      iconLeft,
      iconRight,
      loading = false,
      asChild = false,
      disabled,
      type = "button",
      children,
      ...rest
    },
    ref,
  ) => {
    const iconSize = ICON_SIZE[size ?? "md"];

    if (asChild) {
      return (
        <Slot
          ref={ref}
          aria-disabled={disabled || loading || undefined}
          aria-busy={loading || undefined}
          className={cn(buttonVariants({ variant, size, fullWidth }), className)}
          {...rest}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...rest}
      >
        {loading && (
          <Icon
            name="loader-circle"
            size={iconSize}
            className="absolute animate-spin"
            aria-hidden
          />
        )}
        <span className={cn("inline-flex items-center", CONTENT_GAP[size ?? "md"], loading && "invisible")}>
          {iconLeft && <Icon name={iconLeft} size={iconSize} />}
          {children}
          {iconRight && <Icon name={iconRight} size={iconSize} />}
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";
