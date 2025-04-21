/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffd700',
          dark: '#d4af37',
          light: '#ffdf4f',
        },
        secondary: {
          DEFAULT: '#000000',
          dark: '#1a1a1a',
          light: '#2d2d2d',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e0e0e0',
        },
        accent: '#00ff9d',
        matrix: '#00ff41',
      },
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        code: ['"Source Code Pro"', 'monospace'],
      },
      animation: {
        'matrix-rain': 'matrixRain 2s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'matrix-pattern': 'url("/src/assets/images/matrix-bg.png")',
      },
    },
  },
  plugins: [],
} 