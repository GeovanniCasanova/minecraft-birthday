// tailwind.config.js - versión corregida para v4
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          'minecraft-grass': '#8BC34A',
          'minecraft-dirt': '#795548', 
          'minecraft-water': '#2196F3',
          'minecraft-stone': '#9E9E9E',
          'minecraft-wood': '#8D6E63',
          'minecraft-emerald': '#4CAF50',
        }
      },
    },
  }