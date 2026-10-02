import fs from "node:fs";
import path from "node:path";

export interface RampStep {
  step: string;
  hex: string;
}

let cachedCss: string | null = null;

function readColorsCss(): string {
  if (cachedCss) return cachedCss;
  // Plain fs path join (not require.resolve) — require.resolve gets rewritten
  // to a numeric webpack module id when this module is bundled for the server.
  const cssPath = path.join(process.cwd(), "node_modules/@zyne/ui/src/tokens/colors.css");
  cachedCss = fs.readFileSync(cssPath, "utf8");
  return cachedCss;
}

/** Reads a primitive color ramp (e.g. "plum") straight from @zyne/ui's token source at build time. */
export function getColorRamp(prefix: string): RampStep[] {
  const css = readColorsCss();
  const pattern = new RegExp(`--${prefix}-(\\d+):(#[0-9A-Fa-f]{6})`, "g");
  return [...css.matchAll(pattern)].map(([, step, hex]) => ({ step, hex }));
}
