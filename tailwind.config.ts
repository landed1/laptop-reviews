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
        'light-cream': '#f9f7f3',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        accent: 'hsl(var(--accent))',
        muted: 'hsl(var(--muted))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()]
} satisfies Config;

