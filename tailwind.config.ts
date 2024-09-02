import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    screens: {
      /**
       * 커스텀 스크린 코드
       */
      mobile: {
        max: "767px",
      },
      tablet: {
        max: "1023px",
      },
      mobileToTablet: {
        min: "768px",
        max: "1023px",
      },
      pc: {
        min: "1024px",
      },
      "pc-xl": {
        min: "1920px",
      },
    },
    fontFamily: {
      segoe: "Segoe UI",
      euljiro: "euljiro",
    },
    extend: {
      colors: {
        igPrimaryText: "#000000",
        igPrimaryTextDark: "#F5F5F5",

        igSecondaryText: "#737373",
        igSecondaryTextDark: "#A8A8A8",

        igLink: "#00376B",
        igLinkDark: "#385898",

        igPrimaryButton: "#0095F6",

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

        igStrokePrism: "#FFFFFF",
        igStrokePrismDark: "#0F1419",

        igBannerBackground: "#FFFFFF",
        igBannerBackgroundDark: "#262626",

        igToggleBackgroundOnPrism: "#dbdfe4",
        igToggleBackgroundOnPrismDark: "#F8F9F9",

        igHighlightBackground: "#EFEFEF",
        igHighlightBackgroundDark: "#262626",

        igTertiaryIcon: "#737373",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
