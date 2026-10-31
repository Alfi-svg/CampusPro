import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          main: "#080D1A",
          secondary: "#101A30",
        },
        glass: {
          surface: "rgba(255, 255, 255, 0.06)",
          surfaceHover: "rgba(255, 255, 255, 0.09)",
          surfaceActive: "rgba(255, 255, 255, 0.12)",
          border: "rgba(255, 255, 255, 0.12)",
          borderHover: "rgba(255, 255, 255, 0.2)",
        },
        primary: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
          light: "#818CF8",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          hover: "#0891B2",
          light: "#22D3EE",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        critical: "#EF4444",
        textMain: "#F8FAFC",
        textSecondary: "#94A3B8",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glassGlow: "0 0 25px -5px rgba(99, 102, 241, 0.25)",
        cyanGlow: "0 0 25px -5px rgba(6, 182, 212, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
