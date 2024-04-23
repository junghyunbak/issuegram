import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    fontFamily: {
      segoe: "Segoe UI",
    },
    extend: {
      colors: {
        clickable: "#00376B",
        primaryText: "#000000",
        primaryTextDark: "#F5F5F5",
        secondaryText: "#737373",
        secondaryButton: "#262626",

        igLink: "#00376B",
        igLinkDark: "#E0F1FF",
        igSecondaryText: "#737373",
        igSecondaryTextDark: "#A8A8A8",
        igSecondaryButton: "#EFEFEF",
        igSecondaryButtonDark: "#363636",
        igSecondaryButtonHover: "#DBDBDB",
        igSecondaryButtonHoverDark: "#262626",
        igHoverOverlay: "rgb(0,0,0,0.05)",
        igHoverOverlayDark: "rgb(255,255,255,0.1)",
        igSeparator: "#DBDBDB",
        igSeparatorDark: "#262626",
        igElevatedSeparator: "#DBDBDB",
        igElevatedSeparatorDark: "#363636",
        igStroke: "#DBDBDB",
        igStrokeDark: "#555555",
        igTertiaryIcon: "#737373",
        igPrimaryButton: "#0095F6",
        igStrokePrism: "#FFFFFF",
        igStrokePrismDark: "#0F1419",
        igBannerBackground: "#FFFFFF",
        igBannerBackgroundDark: "#262626",
        igToggleBackgroundOnPrism: "#dbdfe4",
        igToggleBackgroundOnPrismDark: "#F8F9F9",
        igHighlightBackground: "#efefef",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
