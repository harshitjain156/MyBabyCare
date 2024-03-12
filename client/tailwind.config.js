/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: '#9c89b8',
        'primary-dark': '#725b8f', // Darker shade of primary color
        secondary: '#ff9acc',
        'secondary-dark': '#e285b3', // Darker shade of secondary color
        tertiary: '#f0e6ef',
        'tertiary-dark': '#d3c7d4',
        success: '#219653',
        danger: '#D34053',
        warning: '#FFA70B',
      },
    },
    variants: {
      extend: {
        backgroundColor: ['hover', 'focus'],
        textColor: ['hover', 'focus'], 
        borderColor: ['hover', 'focus'], 
      },
    },
  },
  plugins: [],
}

