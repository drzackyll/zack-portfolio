import * as React from "react";
import { cva } from "class-variance-authority";
import { Field } from "../Field/Field";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";

const wrapperVariants = cva(
  "relative rounded-md border bg-surface-card shadow-[var(--shadow-inset)] transition-[border-color,box-shadow] duration-[var(--duration-fast)] has-[select:disabled]:bg-surface-sunken has-[select:disabled]:shadow-none",
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

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  options: Array<SelectOption | string>;
  placeholder?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, options, placeholder, size = "md", id, required, className, ...rest }, ref) => {
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
        <div className={wrapperVariants({ size, error: Boolean(error) })}>
          <select
            ref={ref}
            id={fieldId}
            required={required}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={hasMessage ? descriptionId : undefined}
            defaultValue={rest.defaultValue ?? (placeholder ? "" : undefined)}
            className={cn(
              "h-full w-full appearance-none bg-transparent px-3 pr-9 font-sans text-sm leading-5 text-strong outline-none disabled:cursor-not-allowed disabled:text-subtle",
              className,
            )}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) =>
              typeof option === "string" ? (
                <option key={option} value={option}>
                  {option}
                </option>
              ) : (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ),
            )}
          </select>
          <Icon
            name="chevron-down"
            size={16}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </Field>
    );
  },
);
Select.displayName = "Select";
