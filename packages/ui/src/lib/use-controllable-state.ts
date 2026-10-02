import * as React from "react";

/**
 * Mirrors Radix's useControllableState: a value is "controlled" once `value`
 * is not undefined, and the hook otherwise falls back to internal state
 * seeded from `defaultValue`. Used by components that accept both patterns
 * (Switch, Checkbox, Tabs, RadioGroup).
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = (isControlled ? value : uncontrolled) as T;

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setValue];
}
