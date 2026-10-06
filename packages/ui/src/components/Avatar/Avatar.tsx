import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const avatarVariants = cva(
  "inline-flex flex-none select-none items-center justify-center overflow-hidden rounded-full font-sans font-semibold leading-none",
  {
    variants: {
      tone: {
        secondary: "bg-secondary-soft text-secondary-text",
        accent: "bg-accent-soft text-accent-text",
        neutral: "bg-neutral-bg text-neutral-fg",
      },
    },
    defaultVariants: { tone: "secondary" },
  },
);

const TITLE = /^(dr|mr|mrs|ms|mx)\.?$/i;

/** First letters of the first two words of `name`, skipping titles like "Dr.". */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => word && !TITLE.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Full name — used for initials and the accessible label. */
  name?: string;
  /** Overrides the initials derived from `name`. */
  initials?: string;
  /** Photo URL; falls back to initials if it fails to load. */
  src?: string;
  /** Diameter in px. Common: 24, 28, 32, 44, 48. @default 32 */
  size?: number;
  /** @default "secondary" */
  tone?: "secondary" | "accent" | "neutral";
  /** Hide from assistive tech — set when the name is already visible next to it. */
  decorative?: boolean;
}

/** Round person marker: photo when `src` loads, otherwise initials. */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name = "", initials, src, size = 32, tone = "secondary", decorative = false, className, style, ...rest }, ref) => {
    const [broken, setBroken] = React.useState(false);

    React.useEffect(() => setBroken(false), [src]);

    return (
      <span
        ref={ref}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : name}
        aria-hidden={decorative || undefined}
        className={cn(avatarVariants({ tone }), className)}
        // Size and initials font scale with the diameter, so they can't be fixed utilities.
        style={{ width: size, height: size, fontSize: Math.round(size * 0.38), ...style }}
        {...rest}
      >
        {src && !broken ? (
          <img src={src} alt="" onError={() => setBroken(true)} className="h-full w-full object-cover" />
        ) : (
          initials ?? initialsOf(name)
        )}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";
