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
      },
      fontFamily: {
        "nato": '"Noto Serif", serif',
        KhmerMoul: 'Moul',
        NotoSansKhmer: 'Noto Sans Khmer'

      }

    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}