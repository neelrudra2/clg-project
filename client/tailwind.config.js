/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B21B6', // Deep violet
        secondary: '#7C3AED', // Lighter violet
        accent: '#9333EA',
        background: '#F8FAFC',
      },
    },
  },
  plugins: [],
};
