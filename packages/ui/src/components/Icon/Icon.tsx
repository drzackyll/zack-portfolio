import * as React from "react";
import { icons, type LucideProps } from "lucide-react";

export interface IconProps extends Omit<LucideProps, "ref"> {
  /** Lucide icon name in kebab-case, e.g. "chevron-down", "refresh-cw". */
  name: string;
  /** Accessible name. Omit for purely decorative icons (the default). */
  label?: string;
}

function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, label, size = 16, color = "currentColor", ...rest }, ref) => {
    const LucideIcon = icons[toPascalCase(name) as keyof typeof icons];

    if (!LucideIcon) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`Icon: unknown icon name "${name}"`);
      }
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        size={size}
        color={color}
        aria-hidden={label ? undefined : true}
        role={label ? "img" : undefined}
        aria-label={label}
        {...rest}
      />
    );
  },
);
Icon.displayName = "Icon";
