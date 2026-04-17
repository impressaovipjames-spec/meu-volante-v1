/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mega: "#209869",
        lotofacil: "#930089",
        quina: "#260085",
        dupla: "#a61324",
        dia: "#cb852b",
        dark: {
          900: "#0a0a0a",
          800: "#121212",
          700: "#1e1e1e",
          600: "#2d2d2d",
        }
      },
    },
  },
  plugins: [],
}
