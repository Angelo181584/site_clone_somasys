module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'green-soma': '#165C65',
        'blue-soma': '#29B0BC',
        'white-blue-soma': '#6DB1B9',
        'card-front': '#4A8385',
        'card-back': '#252725',
        teste: '#328381',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
