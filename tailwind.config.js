/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#1E40AF',
          dark: '#1E3A8A',
        },
        background: {
          light: '#F9FAFB',
          dark: '#111827',
        },
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          light: '#F9FAFB',
        },
      },
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
