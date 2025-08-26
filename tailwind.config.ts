import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["'Libertinus Sans'", "sans-serif"], // 👈 default
        libertinus: ["'Libertinus Sans'", "sans-serif"], // still keep a custom key
      },
     keyframes: {
  zoomInOut: {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
  },
},
animation: {
  zoomInOut: "zoomInOut 20s ease-in-out infinite",
},

    },
  },
  plugins: [],
};

export default config;
