import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/cn";

export interface TooltipProps {
  /** Plain text only — never put essential information only in a tooltip. */
  content: React.ReactNode;
  /** @default "top" */
  placement?: "top" | "bottom";
  children: React.ReactElement;
  className?: string;
}

/**
 * Builds on Radix Tooltip: opens on hover/focus after a 300ms delay, Esc
 * dismisses, `aria-describedby` on the trigger is wired automatically.
 * Renders its own Provider so it works standalone; nesting Providers is
 * harmless if a consumer also wraps their app in one.
 */
export function Tooltip({ content, placement = "top", children, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={placement}
            sideOffset={6}
            className={cn(
              "z-[var(--z-tooltip)] rounded-sm bg-surface-inverse px-2 py-1.5 font-sans text-caption font-medium text-inverse shadow-md",
              className,
            )}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
