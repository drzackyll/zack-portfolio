import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

// Values mirror src/tokens (plum-600 accent, mist neutrals); the manager UI
// can't read CSS variables, so they're literals here.
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Zyne design system",
    brandUrl: "https://zack-adams.com/zyne",
    brandImage: "./zyne-wordmark.svg",
    brandTarget: "_self",

    colorPrimary: "#6E3A5E",
    colorSecondary: "#6E3A5E",

    appBg: "#F8F6F8",
    appContentBg: "#FFFFFF",
    appBorderColor: "#E5E0E5",
    appBorderRadius: 8,

    textColor: "#221C22",
    textMutedColor: "#675D67",

    barBg: "#FFFFFF",
    barSelectedColor: "#6E3A5E",
    barHoverColor: "#5A2F4D",

    fontBase: '"Hanken Grotesk", system-ui, -apple-system, sans-serif',
    fontCode: '"JetBrains Mono", ui-monospace, monospace',
  }),
});
