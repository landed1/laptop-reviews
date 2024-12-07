import type { Config } from "tailwindcss";
import { nextui } from '@nextui-org/react'

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#232638',
        'accent-teal': '#0fa3b1',
        'highlight-red': '#f74554',
        'soft-blue': '#b5e2fa',
        'light-cream': '#f9f7f3'
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()]
} satisfies Config;