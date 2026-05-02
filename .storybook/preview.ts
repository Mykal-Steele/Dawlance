import type { Preview } from "@storybook/react";
import "../app/globals.css";
import "./fonts.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "neutral", value: "#F8F9FA" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
    layout: "centered",
  },
};

export default preview;
