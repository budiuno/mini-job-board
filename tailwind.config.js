/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        // Primary color palette
        primary: {
          50: "#f0f9ff", // Lightest - for backgrounds
          100: "#e0f2fe", // Light
          200: "#bae6fd", //
          300: "#7dd3fc", //
          400: "#38bdf8", //
          500: "#0ea5e9", // Main primary color
          600: "#0284c7", // Dark
          700: "#0369a1", // Darker
          800: "#075985", //
          900: "#0c4a6e", // Darkest - for text
        },
        // Secondary color palette
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // Success, Warning, Error colors
        success: {
          500: "#10b981",
        },
        warning: {
          500: "#f59e0b",
        },
        error: {
          500: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};
