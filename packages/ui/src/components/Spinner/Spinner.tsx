import * as React from "react";
import { cn } from "../../lib/cn";

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Diameter in px. @default 16 */
  size?: number;
  /** Screen-reader text. @default "Loading" */
  label?: string;
  /** Hide from assistive tech, e.g. inside a Button that already sets `aria-busy`. */
  decorative?: boolean;
}

/**
 * Indeterminate loading indicator. Announces `label` via `role="status"`
 * unless `decorative`. Static under `prefers-reduced-motion`. Inherits
 * `currentColor`.
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 16, label = "Loading", decorative = false, className, ...rest }, ref) => (
    <span
      ref={ref}
      role={decorative ? undefined : "status"}
      aria-hidden={decorative || undefined}
      className={cn("relative inline-flex", className)}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="block animate-[spin_.8s_linear_infinite] motion-reduce:animate-none"
      >
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
        <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {!decorative && <span className="sr-only">{label}</span>}
    </span>
  ),
);
Spinner.displayName = "Spinner";
