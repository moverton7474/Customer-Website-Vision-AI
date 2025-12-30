import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Visionary AI Brand Colors
        visionary: {
          // Primary dark backgrounds
          dark: '#1a1a2e',
          darker: '#16162a',
          darkest: '#0f0f1a',
          // Gold accent colors
          gold: '#c9a962',
          'gold-light': '#d4bc7a',
          'gold-dark': '#b8944d',
          'gold-muted': '#a08a50',
          // Teal accent (from UI)
          teal: '#4A90A4',
          'teal-light': '#5ba3b8',
          // Text colors
          'text-primary': '#ffffff',
          'text-secondary': '#a0a0b0',
          'text-muted': '#6b6b7b',
          // Surface colors
          surface: '#1e1e32',
          'surface-elevated': '#252540',
          border: '#2a2a45',
          'border-light': '#3a3a55',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'visionary-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #16162a 50%, #0f0f1a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #c9a962 0%, #d4bc7a 50%, #b8944d 100%)',
      },
    },
  },
  plugins: [],
}

export default config
