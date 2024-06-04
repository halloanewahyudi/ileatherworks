/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center:true,
      padding:'2rem'
    },
    extend: {
      colors:{
        'brand': {
          '50': '#eefffd',
          '100': '#c5fffc',
          '200': '#8bfff9',
          '300': '#4afef6',
          '400': '#15ece9',
          '500': '#00d0d0',
          '600': '#00a5a8',
          '700': '#008b90',
          '800': '#066469',
          '900': '#0a5457',
          '950': '#003035',
      },
      
      }
    },
  },
  plugins: [],
}

