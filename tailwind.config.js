/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        coffee: {
          50: '#fdfbf7',
          100: '#f7f1e5',
          200: '#ecdec5',
          300: '#debe95',
          400: '#cb9b64',
          500: '#be7e3c',
          600: '#a3622e',
          700: '#7c4623',
          800: '#4a2813',
          900: '#2c160a',
          950: '#1a0c05',
        },
        earth: {
          50: '#fcfaf6',
          100: '#f5f0e8',
          200: '#ebe1d2',
          300: '#d9c7af',
          400: '#be9f79',
          500: '#a47c4e',
          600: '#8c633a',
          700: '#6d4b2d',
          800: '#553c26',
          900: '#432f20',
        },
        matcha: {
          100: '#eef5e5',
          300: '#bedba0',
          500: '#7fa850',
          700: '#51742a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(22, 101, 52, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 40px -10px rgba(5, 46, 22, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'glow-green': '0 0 25px rgba(34, 197, 94, 0.25)',
        'glow-coffee': '0 0 25px rgba(190, 126, 60, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        }
      }
    },
  },
  plugins: [],
}
