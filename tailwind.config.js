/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./app/**/*.{js,jsx,ts,tsx}"],
  theme:{
    extend:{
      colors:{ obsidian:"#050505", champagne:"#d6b77a", platinum:"#dfe5e8" },
      fontFamily:{ display:["Georgia","Times New Roman","serif"], sans:["Inter","ui-sans-serif","system-ui"] }
    }
  },
  plugins:[]
};