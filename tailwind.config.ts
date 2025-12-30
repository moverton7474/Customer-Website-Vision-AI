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
        'visionary-dark': '#1a1a2e',
        'visionary-darker': '#16162a',
        'visionary-gold': '#c9a962',
        'visionary-gold-light': '#d4bc7a',
        'visionary-teal': '#4A90A4',
      },
    },
  },
  plugins: [],
}
export default config
