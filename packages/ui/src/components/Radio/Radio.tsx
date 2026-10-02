import * as React from "react";
import { cn } from "../../lib/cn";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  legend: string;
  className?: string;
  children?: React.ReactNode;
}

export function RadioGroup({ name, value, onValueChange, legend, className, children }: RadioGroupProps) {
  const context = React.useMemo(() => ({ name, value, onValueChange }), [name, value, onValueChange]);
  return (
    <fieldset className={cn("flex flex-col gap-2.5 border-0 p-0", className)}>
      <legend className="mb-1 font-sans text-[13px] font-semibold leading-[18px] text-strong">{legend}</legend>
      <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
    </fieldset>
  );
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean;
  name?: string;
  value: string;
  label?: string;
  description?: string;
  /** Called with this radio's value when it becomes selected. */
  onChange?: (value: string) => void;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ checked, name, value, label, description, disabled, onChange, className, id, ...rest }, ref) => {
    const group = React.useContext(RadioGroupContext);
    const resolvedName = name ?? group?.name;
    const resolvedChecked = checked ?? (group ? group.value === value : undefined);

    const handleChange = () => {
      onChange?.(value);
      group?.onValueChange?.(value);
    };

    const autoId = React.useId();
    const inputId = id ?? autoId;
    const descriptionId = description ? `${inputId}-description` : undefined;

    return (
      <div className={cn("inline-flex items-start gap-2.5", className)}>
        <span className="relative mt-0.5 flex-none">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            name={resolvedName}
            value={value}
            checked={resolvedChecked}
            disabled={disabled}
            aria-describedby={descriptionId}
            onChange={handleChange}
            className={cn("peer absolute h-4 w-4 opacity-0", disabled ? "cursor-not-allowed" : "cursor-pointer")}
            {...rest}
          />
          <span
            aria-hidden
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border bg-surface-card transition-colors duration-[var(--duration-fast)] peer-focus-visible:shadow-[var(--focus-ring)]",
              resolvedChecked ? "border-accent" : "border-border-input",
              disabled && "opacity-50",
            )}
          >
            {resolvedChecked && <span className="h-2 w-2 rounded-full bg-accent" />}
          </span>
        </span>
        {(label || description) && (
          <span className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "font-sans text-sm font-medium leading-5",
                  disabled ? "cursor-not-allowed text-subtle" : "cursor-pointer text-strong",
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span id={descriptionId} className="font-sans text-[13px] leading-[18px] text-muted">
                {description}
              </span>
            )}
          </span>
        )}
      </div>
    );
  },
);
Radio.displayName = "Radio";
