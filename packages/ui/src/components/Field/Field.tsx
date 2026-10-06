import * as React from "react";
import { cn } from "../../lib/cn";

export interface FieldProps {
  label?: string;
  hint?: string;
  /** Replaces `hint` and renders in the danger color. */
  error?: string;
  htmlFor?: string;
  /** id applied to the hint/error text so the control can point `aria-describedby` at it. */
  descriptionId?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Field({
  label,
  hint,
  error,
  htmlFor,
  descriptionId,
  required,
  className,
  children,
}: FieldProps) {
  const message = error ?? hint;

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="font-sans text-body-sm font-semibold text-strong">
          {label}
          {required && <span className="text-danger-fg"> *</span>}
        </label>
      )}
      {children}
      {message && (
        <div
          id={descriptionId}
          className={cn("font-sans text-caption", error ? "text-danger-fg" : "text-muted")}
        >
          {message}
        </div>
      )}
    </div>
  );
}
