import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';
import aspectRatio from '@tailwindcss/aspect-ratio';


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    }
  },
  plugins: [
    typography,
    forms,
    containerQueries,
    aspectRatio
  ]
};
export default config;
