import * as React from "react";
import { cva } from "class-variance-authority";
import { Field } from "../Field/Field";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";

const wrapperVariants = cva(
  "flex items-center gap-2 rounded-md border bg-surface-card px-3 shadow-[var(--shadow-inset)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] has-[input:disabled]:bg-surface-sunken has-[input:disabled]:shadow-none",
  {
    variants: {
      size: {
        sm: "h-[30px]",
        md: "h-9",
        lg: "h-11",
      },
      error: {
        true: "border-danger-solid focus-within:shadow-[0_0_0_3px_var(--danger-bg)]",
        false: "border-border-input focus-within:border-border-focus focus-within:shadow-[0_0_0_3px_var(--focus-halo)]",
      },
    },
    defaultVariants: { size: "md", error: false },
  },
);

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  /** Leading Lucide icon. */
  icon?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Set true once the form has been submitted, so the error gets `role="alert"` and is announced. */
  errorAnnounced?: boolean;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      icon,
      size = "md",
      id,
      required,
      className,
      wrapperClassName,
      errorAnnounced = false,
      ...rest
    },
    ref,
  ) => {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const descriptionId = `${fieldId}-description`;
    const hasMessage = Boolean(error ?? hint);

    return (
      <Field
        label={label}
        hint={hint}
        error={error}
        htmlFor={fieldId}
        required={required}
        descriptionId={hasMessage ? descriptionId : undefined}
      >
        <div className={cn(wrapperVariants({ size, error: Boolean(error) }), wrapperClassName)}>
          {icon && <Icon name={icon} size={16} className="text-muted" />}
          <input
            ref={ref}
            id={fieldId}
            required={required}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={hasMessage ? descriptionId : undefined}
            className={cn(
              "h-full min-w-0 flex-1 border-0 bg-transparent font-sans text-sm leading-5 text-strong outline-none placeholder:text-subtle disabled:text-subtle",
              className,
            )}
            {...rest}
          />
        </div>
        {error && errorAnnounced && (
          <span role="alert" className="sr-only">
            {error}
          </span>
        )}
      </Field>
    );
  },
);
Input.displayName = "Input";
