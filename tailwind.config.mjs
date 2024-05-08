/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      blur: {
        "5xl": "100px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "bg-color": "var(--bg-color)",
        "ring-color": "var(--ring-color)",
        "text-color": "var(--text-color)",
        "text-opacity": "var(--text-opacity)",
        "emphasis-color": "var(--emphasis-color)",
        "emphasis-text-color": "var(--emphasis-text-color)",
        "hover-bg-color": "var(--hover-bg-color)",
      },
    },
  },
  plugins: [],
};
