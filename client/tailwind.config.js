/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js}", "./public/index.html"],
   theme: {
      extend: {
         backgroundColor: {
            primary: "#f5f5f5",
            secondary1: "#1266dd",
            secondary2: "#f73859",
         },
      },
   },
   plugins: [],
};
