import * as React from "react";
import { cn } from "../../lib/cn";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange?: (id: string) => void;
  /** @default "underline" */
  variant?: "underline" | "pill";
  className?: string;
}

/**
 * Full WAI-ARIA tabs pattern: roving tabindex, automatic activation on
 * ArrowLeft/ArrowRight (wrapping) and Home/End. Pair with `TabsPanel`.
 */
export function Tabs({ items, value, onValueChange, variant = "underline", className }: TabsProps) {
  const tabRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const pill = variant === "pill";

  const activate = (id: string) => {
    onValueChange?.(id);
    tabRefs.current[id]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = items.findIndex((item) => item.id === value);
    if (index === -1) return;

    let nextIndex: number | null = null;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % items.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const nextItem = items[nextIndex];
    if (nextItem) activate(nextItem.id);
  };

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex",
        pill ? "w-fit gap-0.5 rounded-md bg-surface-sunken p-[3px]" : "gap-5 border-b border-border-subtle",
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[item.id] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onValueChange?.(item.id)}
            className={cn(
              "focus-ring inline-flex items-center gap-1.5 whitespace-nowrap font-sans font-semibold",
              pill
                ? cn(
                    "h-7 rounded-sm px-3 text-body-sm",
                    selected ? "bg-surface-card text-strong shadow-sm" : "bg-transparent text-muted",
                  )
                : cn(
                    "-mb-px h-10 border-b-2 text-ui",
                    selected ? "border-accent text-strong" : "border-transparent text-muted",
                  ),
            )}
          >
            {item.label}
            {item.count != null && (
              <span
                className={cn(
                  "rounded-[var(--radius-pill)] px-1.5 py-0.5 text-overline font-semibold leading-none",
                  selected ? "bg-accent-soft text-accent-text" : "bg-neutral-bg text-muted",
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** This panel's own tab id. */
  value: string;
  /** The currently-selected tab id, from the `Tabs` the panel belongs to. */
  activeValue: string;
}

export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, activeValue, children, hidden, ...rest }, ref) => {
    const active = value === activeValue;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
        hidden={hidden ?? !active}
        tabIndex={0}
        {...rest}
      >
        {active ? children : null}
      </div>
    );
  },
);
TabsPanel.displayName = "TabsPanel";
