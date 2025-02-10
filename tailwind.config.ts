import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        fadeIn: "fadeIn 0.7s ease-in-out",
        zoomIn: "zoomIn 0.5s ease-in-out",
        glitch: "glitch 1s infinite alternate",
        glow: "glow 1.5s infinite alternate",
        pulseSlow: "pulseSlow 2s infinite",
        loadingGlitch: "loadingGlitch 1.5s infinite alternate",
        glitchText: "glitchText 1.2s infinite alternate",
        shakeError: "shakeError 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        zoomIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glitch: {
          "0%": { textShadow: "2px 2px 5px rgba(0, 255, 255, 0.5)" },
          "50%": { textShadow: "-2px -2px 5px rgba(255, 0, 255, 0.5)" },
          "100%": { textShadow: "2px -2px 5px rgba(0, 255, 255, 0.5)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(0, 191, 255, 0.7)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 191, 255, 1)" },
        },
        pulseSlow: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        loadingGlitch: {
          "0%": { textShadow: "2px 2px 8px rgba(255, 0, 0, 0.8)" },
          "50%": { textShadow: "-2px -2px 8px rgba(0, 255, 255, 0.8)" },
          "100%": { textShadow: "2px -2px 8px rgba(255, 0, 255, 0.8)" },
        },
        glitchText: {
          "0%": { transform: "skewX(0deg)" },
          "25%": { transform: "skewX(10deg)" },
          "50%": { transform: "skewX(-10deg)" },
          "75%": { transform: "skewX(5deg)" },
          "100%": { transform: "skewX(-5deg)" },
        },
        shakeError: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-3px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
