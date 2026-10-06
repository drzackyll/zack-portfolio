import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconButton } from "../IconButton/IconButton";
import { cn } from "../../lib/cn";

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  /** Right-aligned actions, primary last. */
  footer?: React.ReactNode;
  /** Max width in px. @default 480 */
  width?: number;
  /** Disables scrim-click dismissal. Esc still closes the dialog. */
  destructive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Builds on Radix Dialog: focus trap, initial focus, body-scroll lock and
 * "focus returns to the trigger on close" are all handled by the primitive.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  footer,
  width = 480,
  destructive = false,
  children,
  className,
}: DialogProps) {
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (open) lastFocusedRef.current = document.activeElement as HTMLElement | null;
  }, [open]);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose?.();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-testid="dialog-scrim"
          className="fixed inset-0 z-[var(--z-dialog)] bg-[var(--overlay-scrim)]"
        />
        <DialogPrimitive.Content
          aria-modal="true"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            lastFocusedRef.current?.focus();
          }}
          onPointerDownOutside={(event) => {
            if (destructive) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (destructive) event.preventDefault();
          }}
          style={{ maxWidth: width }}
          className={cn(
            "fixed left-1/2 top-1/2 z-[var(--z-dialog)] flex max-h-[calc(100%-48px)] w-[calc(100%-48px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-surface-raised shadow-lg focus:outline-none",
            className,
          )}
        >
          <div className="flex items-start gap-3 px-6 pb-0 pt-5">
            <div className="min-w-0 flex-1">
              <DialogPrimitive.Title className="font-sans text-heading-md font-semibold leading-6 tracking-[-.01em] text-strong">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="mt-1 font-sans text-ui text-muted">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close asChild>
              <IconButton icon="x" label="Close" size="sm" />
            </DialogPrimitive.Close>
          </div>
          {children && <div className="overflow-auto px-6 py-4">{children}</div>}
          {footer && <div className="flex justify-end gap-2 px-5 pb-5 pt-3">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
