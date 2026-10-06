import * as React from "react";
import { Field } from "../Field/Field";
import { cn } from "../../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** Shows "n / maxLength" under the field. Requires `maxLength`. */
  showCount?: boolean;
  /** Set true once the form has been submitted, so the error gets `role="alert"` and is announced. */
  errorAnnounced?: boolean;
  wrapperClassName?: string;
}

/** Multi-line text input matching Input's chrome; vertical resize only. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      showCount = false,
      errorAnnounced = false,
      id,
      required,
      rows = 3,
      maxLength,
      value,
      defaultValue,
      onChange,
      className,
      wrapperClassName,
      ...rest
    },
    ref,
  ) => {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const descriptionId = `${fieldId}-description`;
    const hasMessage = Boolean(error ?? hint);
    const [uncontrolledLength, setUncontrolledLength] = React.useState(String(defaultValue ?? "").length);
    const length = value != null ? String(value).length : uncontrolledLength;

    return (
      <Field
        label={label}
        hint={hint}
        error={error}
        htmlFor={fieldId}
        required={required}
        descriptionId={hasMessage ? descriptionId : undefined}
      >
        <div
          className={cn(
            "rounded-md border bg-surface-card shadow-[var(--shadow-inset)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] has-[textarea:disabled]:bg-surface-sunken has-[textarea:disabled]:shadow-none",
            error
              ? "border-danger-solid focus-within:shadow-[0_0_0_3px_var(--danger-bg)]"
              : "border-border-input focus-within:border-border-focus focus-within:shadow-[0_0_0_3px_var(--focus-halo)]",
            wrapperClassName,
          )}
        >
          <textarea
            ref={ref}
            id={fieldId}
            rows={rows}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            required={required}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={hasMessage ? descriptionId : undefined}
            onChange={(event) => {
              setUncontrolledLength(event.target.value.length);
              onChange?.(event);
            }}
            className={cn(
              "block min-h-9 w-full resize-y border-0 bg-transparent px-3 py-2 font-sans text-ui text-strong outline-none placeholder:text-subtle disabled:text-subtle",
              className,
            )}
            {...rest}
          />
        </div>
        {showCount && maxLength != null && (
          <div aria-hidden="true" className="-mt-0.5 self-end font-sans text-caption text-muted">
            {length} / {maxLength}
          </div>
        )}
        {error && errorAnnounced && (
          <span role="alert" className="sr-only">
            {error}
          </span>
        )}
      </Field>
    );
  },
);
Textarea.displayName = "Textarea";
