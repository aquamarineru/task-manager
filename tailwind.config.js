/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Poppins: 'Poppins'
    },
    extend: {
      colors: {
        transporentBlack: 'rgba(0,0,0,0.85)',
        sunsetOrange: '#ff4f5a',
        graphit: '#1A2E35',
        gainboro: '#E1E1E1',
        greenTeal: '#22C55E',
        gray: '#6B7498'

      }
    },
    screens:{
      xs: '480px',
      sm: '768px',
      md: '1060px'
    },
    animation: {
      spin: 'spin 1s linear infinite',
      pulse: 'pulse 2s ease-in-out infinite',
      bounce: 'bounce 1s infinite',
      fadeIn: 'fadeIn 0.5s ease-in',
      fadeOut: 'fadeOut 0.5s ease-out',
    },

    keyframes: {
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
      pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
      },
      bounce: {
        '0%, 100%': { transform: 'translateY(-5%)' },
        '50%': { transform: 'translateY(0)' },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
    }
  },
  plugins: [],
}

