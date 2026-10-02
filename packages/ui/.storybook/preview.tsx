import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    backgrounds: {
      disable: true,
    },
    layout: "centered",
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
    (Story) => (
      <div style={{ background: "var(--bg-canvas)", color: "var(--text-body)", padding: 24, minHeight: 80, fontFamily: "var(--font-sans)" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
