/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily : {
        sans : 'Roboto , sans-serif'
      },

      backgroundImage : {
          app : 'url(/app-bg.png)'
      },
      colors : {
        ignite : {
          500 :'#129e57',
        },
        gray : {
          100 : '#e1e1e6',
          300 : '#808099',
          800 :  '#323238',
          600 :  '#202024',
          900 : "#121214"
        },
        yellow : {
          500 : '#f7D043',
          700 : '#e5cd30'
        }
      }
    },
  },
  plugins: [],
}
