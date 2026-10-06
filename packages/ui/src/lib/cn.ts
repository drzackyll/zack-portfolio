import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register the Zyne type scale (theme.css `--text-*`) as font sizes. Otherwise
// tailwind-merge reads e.g. `text-ui` as a colour and drops it next to `text-strong`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-lg",
            "display-md",
            "display-sm",
            "heading-lg",
            "heading-md",
            "heading-sm",
            "ui",
            "mono",
            "body-lg",
            "body-md",
            "body-sm",
            "caption",
            "overline",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
