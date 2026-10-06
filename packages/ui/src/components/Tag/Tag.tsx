import * as React from "react";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";

interface TagSharedProps {
  /** Filter-on state (accent tint). */
  selected?: boolean;
  /** Leading Lucide icon. */
  icon?: string;
  /** Shows a trailing remove button. */
  onRemove?: () => void;
  /** Accessible label used for the remove button ("Remove {label}") when `children` isn't plain text. */
  label?: string;
  children?: React.ReactNode;
}

const baseClass =
  "inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-sm border font-sans text-body-sm font-medium";

function tagToneClass(selected: boolean | undefined) {
  return selected
    ? "border-accent-soft-border bg-accent-soft text-accent-text"
    : "border-border-default bg-surface-card text-body";
}

function removeButton(onRemove: () => void, label?: string, children?: React.ReactNode) {
  const accessibleLabel = label ?? (typeof children === "string" ? children : "tag");
  return (
    <button
      type="button"
      aria-label={`Remove ${accessibleLabel}`}
      onClick={(event) => {
        event.stopPropagation();
        onRemove();
      }}
      className="focus-ring -mr-1 flex h-5 w-5 flex-none items-center justify-center rounded-xs text-current hover:bg-surface-hover"
    >
      <Icon name="x" size={12} />
    </button>
  );
}

export interface TagButtonProps extends TagSharedProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Makes the tag a toggle button. */
  onClick: () => void;
}

export interface TagStaticProps extends TagSharedProps, React.HTMLAttributes<HTMLSpanElement> {
  onClick?: undefined;
}

export type TagProps = TagButtonProps | TagStaticProps;

export const Tag = React.forwardRef<HTMLButtonElement | HTMLSpanElement, TagProps>(
  ({ selected = false, icon, onClick, onRemove, label, children, className, ...rest }, ref) => {
    const content = (
      <>
        {icon && <Icon name={icon} size={14} />}
        {children}
        {onRemove && removeButton(onRemove, label, children)}
      </>
    );

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          aria-pressed={selected}
          onClick={onClick}
          className={cn(baseClass, "focus-ring cursor-pointer hover:bg-surface-hover", tagToneClass(selected), onRemove ? "pl-2.5 pr-1" : "px-2.5", className)}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(baseClass, tagToneClass(selected), onRemove ? "pl-2.5 pr-1" : "px-2.5", className)}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {content}
      </span>
    );
  },
);
Tag.displayName = "Tag";
