import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
  plugins: [nextui(
    {themes: {
      dark: {
        layout: {},
        colors: {
          background: "#1c1c22",
          foreground: "#ffffff",
          primary: {
            "DEFAULT" : "#00ff99",
          },
          focus: {
            "DEFAULT" : '#00e187',
          }
        },
      }
    }}
  )],
};
export default config;
