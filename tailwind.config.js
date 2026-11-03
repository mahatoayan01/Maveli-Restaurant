/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kerala: {
          50: '#f2f7f4',
          100: '#dfede6',
          200: '#c1dcd0',
          300: '#97c3b2',
          400: '#6ca491',
          500: '#4d8875',
          600: '#396c5d',
          700: '#2f574c',
          800: '#28463e',
          900: '#164E3D', /* Primary Kerala Deep Green */
          950: '#0d2c23',
        },
        gold: {
          50: '#fbf8eb',
          100: '#f5efcd',
          200: '#ecdba0',
          300: '#e1c26c',
          400: '#d8aa40',
          500: '#D99B26', /* Secondary Kasavu Brass Gold */
          600: '#be7b1b',
          700: '#975919',
          800: '#7c461b',
          900: '#693a1b',
        },
        terracotta: {
          50: '#fdf4f2',
          100: '#fce7e3',
          200: '#f9d2cb',
          300: '#f4b2a4',
          400: '#ec8673',
          500: '#D9532F', /* Accent Roasted Kerala Masala Red */
          600: '#c83f1d',
          700: '#a73216',
          800: '#8b2c17',
          900: '#732918',
        },
        cream: {
          50: '#ffffff',
          100: '#FDFBF7', /* Main Warm Ivory Background */
          200: '#F7F3EB', /* Card and Section Subtle Surface */
          300: '#EFE8DA', /* Border and Divider */
          400: '#DFD4BE',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(22, 78, 61, 0.08), 0 2px 6px -1px rgba(217, 155, 38, 0.06)',
        'warm-lg': '0 10px 30px -4px rgba(22, 78, 61, 0.12), 0 4px 12px -2px rgba(217, 155, 38, 0.08)',
        'gold-glow': '0 0 20px rgba(217, 155, 38, 0.35)',
      }
    },
  },
  plugins: [],
}

