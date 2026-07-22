import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px"
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: '#00ff99',
          hover: '#00e187',
        },

        accent_hover: {
          DEFAULT: '#00e187'
        },
        
        dark_accent: {
          DEFAULT: '#04754d',
          hover: '#00e187',
        }
      }
    }
  },
  darkMode: "class",
  plugins: [],
};
export default config;
