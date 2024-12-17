/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css}",
    "./public/index.html"
  ],
  darkMode: 'class', // Permet de gérer le thème sombre
  theme: {
    extend: {
      // Vous pouvez étendre le thème par défaut ici
    },
  },
  plugins: [],
}