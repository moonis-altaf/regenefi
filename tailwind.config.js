/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'reginify-navy': {
          DEFAULT: '#1E2F4D',
          '50': '#F0F4F9',
          '100': '#E1E9F3',
          '200': '#C3D3E7',
          '300': '#A5BDDB',
          '400': '#87A7CF',
          '500': '#6991C3',
          '600': '#4B7BB7',
          '700': '#3D649B',
          '800': '#2F4D7F',
          '900': '#1E2F4D',
          '950': '#162238'
        },
        'reginify-gold': {
          DEFAULT: '#C19B76',
          '50': '#FAF7F4',
          '100': '#F5EFE9',
          '200': '#EBDFD3',
          '300': '#E1CFBD',
          '400': '#D7BFA7',
          '500': '#CDAF91',
          '600': '#C19B76',
          '700': '#B3835A',
          '800': '#996B42',
          '900': '#7F5836',
          '950': '#654529'
        },
        'reginify-cream': {
          DEFAULT: '#FDF8F3',
          '50': '#FFFFFF',
          '100': '#FDF8F3',
          '200': '#F9EBE0',
          '300': '#F5DECD',
          '400': '#F1D1BA',
          '500': '#EDC4A7',
          '600': '#E9B794',
          '700': '#E5AA81',
          '800': '#E19D6E',
          '900': '#DD905B'
        },
        'reginify-navy-light': '#1d2761',
        'reginify-navy-dark': '#0b0f2a',
        'reginify-sand': '#d4b794',
        'reginify-white': '#FFFFFF',
        'reginify-light': '#F8F9FA',
      },
      keyframes: {
        initialDrop: {
          '0%': { transform: 'translateY(-100vh)' },
          '70%': { transform: 'translateY(0)' },
          '85%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' }
        },
        ripple: {
          '0%': { 
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(4)',
            opacity: '0'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        dropletFall: {
          '0%': { 
            transform: 'translateY(-10px) scale(1)',
            opacity: '0.6'
          },
          '100%': { 
            transform: 'translateY(30px) scale(0)',
            opacity: '0'
          }
        }
      },
      animation: {
        'initial-drop': 'initialDrop 1.5s ease-in-out',
        'ripple': 'ripple 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'droplet-fall': 'dropletFall 2s ease-in-out infinite'
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        garet: ['GARET', 'sans-serif'],
        'garet-book': ['GARET-BOOK', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
