/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#2D2F31",
        primary: '#500192',
        color_text: '#6A6F73'
      },
      fontFamily: {
        "nato": '"Noto Serif", serif',
        KhmerMoul: 'Moul',
        NotoSansKhmer: 'Noto Sans Khmer',
        playfair: ['"Playfair Display"', 'serif'],
      }

    },
     keyframes: {
      shimmer: {
        '100%' : {transform: 'translateX(100%)'}
      }
    }
  },
  plugins: [
    require('tailwindcss-animated'),
    require('@tailwindcss/typography'),

  ],
}