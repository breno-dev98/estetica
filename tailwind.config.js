/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        lightBackground: '#faf5ff',
        primary: '#581c87',
        secondary: '#c084fc',
        neutral: '#7c7280',
      },
    },
    
  },
  plugins: [],
}