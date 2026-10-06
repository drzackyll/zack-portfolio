import * as React from "react";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/use-controllable-state";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "defaultChecked" | "onChange" | "type"> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  label?: string;
  description?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked, defaultChecked = false, indeterminate = false, label, description, disabled, onCheckedChange, className, id, ...rest },
    forwardedRef,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement);

    const [isChecked, setChecked] = useControllableState<boolean>({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onCheckedChange,
    });

    React.useLayoutEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const autoId = React.useId();
    const inputId = id ?? autoId;
    const descriptionId = description ? `${inputId}-description` : undefined;

    return (
      <div className={cn("inline-flex items-start gap-2.5 py-0.5", className)}>
        <span className="relative mt-0.5 flex-none">
          <input
            ref={innerRef}
            type="checkbox"
            id={inputId}
            checked={isChecked}
            disabled={disabled}
            aria-describedby={descriptionId}
            onChange={(event) => setChecked(event.target.checked)}
            className={cn("peer absolute h-4 w-4 opacity-0", disabled ? "cursor-not-allowed" : "cursor-pointer")}
            {...rest}
          />
          <span
            aria-hidden
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-xs border transition-colors duration-[var(--duration-fast)] peer-focus-visible:shadow-[var(--focus-ring)]",
              isChecked || indeterminate ? "border-accent bg-accent" : "border-border-input bg-surface-card",
              disabled && "opacity-50",
            )}
          >
            {(isChecked || indeterminate) && (
              <Icon name={indeterminate ? "minus" : "check"} size={12} className="text-on-accent" />
            )}
          </span>
        </span>
        {(label || description) && (
          <span className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "font-sans text-ui font-medium",
                  disabled ? "cursor-not-allowed text-subtle" : "cursor-pointer text-strong",
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span id={descriptionId} className="font-sans text-body-sm text-muted">
                {description}
              </span>
            )}
          </span>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
