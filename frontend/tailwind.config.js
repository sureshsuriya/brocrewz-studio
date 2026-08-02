/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        premium: {
          black: '#0a0a0a',
          dark: '#141414',
          gold: '#d4af37',
          goldLight: '#f3e5ab',
          silver: '#c0c0c0',
          silverDark: '#a9a9a9'
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
        'black-gold': 'linear-gradient(135deg, #0a0a0a 0%, #141414 50%, #2a2208 100%)',
      }
    },
  },
  plugins: [],
}
