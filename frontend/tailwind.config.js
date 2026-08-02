/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        surface: "#14141A",
        "glass-card": "rgba(255,255,255,0.06)",
        "primary-gold": "#D4AF37",
        "secondary-gold": "#F4C542",
        silver: "#C9CDD4",
        "primary-text": "#F8F9FA",
        "secondary-text": "#9CA3AF",
        "accent-blue": "#4F8CFF"
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
