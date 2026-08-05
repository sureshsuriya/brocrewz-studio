/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "glass-card": "var(--color-glass-card)",
        "primary-gold": "var(--color-primary-gold)",
        "secondary-gold": "var(--color-secondary-gold)",
        silver: "var(--color-silver)",
        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",
        "accent-blue": "var(--color-accent-blue)"
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        "pulse-glow": {
          '0%, 100%': { opacity: 1, boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)" },
          '50%': { opacity: .5, boxShadow: "0 0 5px rgba(212, 175, 55, 0.2)" },
        }
      }
    },
  },
  plugins: [],
}
