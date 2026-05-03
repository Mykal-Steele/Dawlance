import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2A7BFF",
          50: "#E6F0FF",
          100: "#CCE1FF",
          200: "#99C3FF",
          300: "#66A5FF",
          400: "#3387FF",
          500: "#2A7BFF",
          600: "#0062E6",
          700: "#004AB3",
          800: "#003280",
          900: "#001A4D",
        },
        secondary: {
          DEFAULT: "#6DD3B0",
          50: "#F0FBF7",
          100: "#E1F7EF",
          200: "#C3EFDF",
          300: "#A5E7CF",
          400: "#87DFBF",
          500: "#6DD3B0",
          600: "#4AC299",
          700: "#3AA17A",
          800: "#2A7A5B",
          900: "#1A533C",
        },
        tertiary: {
          DEFAULT: "#FF8C42",
          50: "#FFF4ED",
          100: "#FFE9DB",
          200: "#FFD3B7",
          300: "#FFBD93",
          400: "#FFA76F",
          500: "#FF8C42",
          600: "#FF6B0A",
          700: "#D15400",
          800: "#993D00",
          900: "#612700",
        },
        neutral: {
          DEFAULT: "#F8F9FA",
          50: "#FFFFFF",
          100: "#F8F9FA",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#6C757D",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
        text: {
          DEFAULT: "#3D4852",
          light: "#6C757D",
          lighter: "#ADB5BD",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "system-ui", "sans-serif"],
        headline: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        input: "8px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.12)",
        button: "0 2px 4px rgba(42, 123, 255, 0.2)",
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
    },
  },
  plugins: [],
};

export default config;

