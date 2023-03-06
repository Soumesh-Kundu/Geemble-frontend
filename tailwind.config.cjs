/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      "sm":"476px",
      "md":"768px",
      "lg":"1024px",
      "xl":"1280px",
      "2xl":"1536px"
    },
    extend: {
      backgroundColor:{
        "secondary":"#D9D9D9"
      },
      backgroundImage:{
        'nav-gradient':' linear-gradient(92.54deg,#1865c1 9.75%, #6094D3 60.29%, #7CA0CC 84.74%, #9ab4d3 112.93%);'
      }
    },
  },
  plugins: [],
}
