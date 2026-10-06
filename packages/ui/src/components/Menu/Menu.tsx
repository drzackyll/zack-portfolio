import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";

export interface MenuItem {
  id?: string;
  label: string;
  /** Lucide icon name. */
  icon?: string;
  onSelect?: () => void;
  /** Destructive styling (danger text, danger background when highlighted). */
  danger?: boolean;
  disabled?: boolean;
  /** Display-only shortcut hint, e.g. "⌘D". */
  shortcut?: string;
}

export interface MenuSeparator {
  type: "separator";
}

export interface MenuProps {
  /** A single button element — usually an IconButton or Button. It must forward its ref and props. */
  trigger: React.ReactElement;
  items: Array<MenuItem | MenuSeparator>;
  /** Accessible name for the menu. */
  label?: string;
  /** Horizontal edge to align with the trigger. @default "start" */
  align?: "start" | "end";
  /** @default "bottom" */
  placement?: "bottom" | "top";
  /** Minimum width in px. @default 200 */
  width?: number;
  /** Docs and thumbnails only. */
  defaultOpen?: boolean;
  className?: string;
}

function isSeparator(item: MenuItem | MenuSeparator): item is MenuSeparator {
  return "type" in item && item.type === "separator";
}

/**
 * Dropdown action menu (WAI-ARIA menu button), built on Radix DropdownMenu.
 * The trigger gets `aria-haspopup`/`aria-expanded`; ↑/↓/Home/End move,
 * type-ahead jumps, Esc closes and returns focus to the trigger, and an
 * outside click or Tab closes it.
 */
export function Menu({
  trigger,
  items,
  label,
  align = "start",
  placement = "bottom",
  width = 200,
  defaultOpen,
  className,
}: MenuProps) {
  return (
    <DropdownMenu.Root defaultOpen={defaultOpen} modal={false}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          aria-label={label}
          // Radix names the menu after its trigger; an explicit label should win.
          {...(label ? { "aria-labelledby": undefined } : {})}
          align={align}
          side={placement}
          sideOffset={4}
          style={{ minWidth: width }}
          className={cn(
            "z-[var(--z-dropdown)] rounded-md border border-border-subtle bg-surface-raised p-1 shadow-lg",
            className,
          )}
        >
          {items.map((item, index) =>
            isSeparator(item) ? (
              <DropdownMenu.Separator key={`separator-${index}`} className="mx-0 my-1 h-px bg-border-subtle" />
            ) : (
              <DropdownMenu.Item
                key={item.id ?? item.label}
                disabled={item.disabled}
                onSelect={item.onSelect}
                className={cn(
                  "group flex min-h-8 w-full cursor-pointer select-none items-center gap-2.5 rounded-sm px-2.5 font-sans text-ui font-medium outline-none",
                  "data-[disabled]:cursor-not-allowed data-[disabled]:text-subtle",
                  item.danger
                    ? "text-danger-fg data-[highlighted]:bg-danger-bg"
                    : "text-body data-[highlighted]:bg-surface-hover",
                )}
              >
                {item.icon && (
                  <Icon
                    name={item.icon}
                    size={16}
                    className={cn("flex-none", !item.danger && "text-muted group-data-[disabled]:text-subtle")}
                  />
                )}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && <span className="font-mono text-caption text-muted">{item.shortcut}</span>}
              </DropdownMenu.Item>
            ),
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
