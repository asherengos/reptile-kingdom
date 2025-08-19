/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'reptile-green': '#2D5016',
        'desert-sand': '#F4E4BC',
        'jungle-dark': '#1A3D14',
        'swamp-moss': '#8B9A47',
        'coral-accent': '#FF6B6B'
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      screens: {
        'tablet': '768px',
        'tablet-lg': '1024px'
      }
    },
  },
  plugins: [],
}
