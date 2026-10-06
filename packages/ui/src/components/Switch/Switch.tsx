import * as React from "react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/use-controllable-state";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "role"> {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, label, disabled, onCheckedChange, className, id, ...rest }, ref) => {
    const [isChecked, setChecked] = useControllableState<boolean>({
      value: checked,
      defaultValue: defaultChecked,
      onChange: onCheckedChange,
    });
    const autoId = React.useId();
    const switchId = id ?? autoId;
    const labelId = label ? `${switchId}-label` : undefined;

    return (
      <label
        htmlFor={switchId}
        className={cn(
          "inline-flex items-center gap-2.5",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
      >
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-labelledby={labelId}
          disabled={disabled}
          onClick={() => setChecked(!isChecked)}
          className={cn(
            "focus-ring relative h-[18px] w-8 flex-none rounded-full border-0 p-0.5 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]",
            isChecked ? "bg-accent" : "bg-[var(--control-track-off)]",
            className,
          )}
          {...rest}
        >
          <span
            className={cn(
              "block h-3.5 w-3.5 rounded-full bg-surface-card shadow-[0_1px_2px_rgba(34,28,34,.25)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
              isChecked && "translate-x-3.5",
            )}
          />
        </button>
        {label && (
          <span id={labelId} className="font-sans text-ui font-medium text-strong">
            {label}
          </span>
        )}
      </label>
    );
  },
);
Switch.displayName = "Switch";
