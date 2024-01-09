
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "380px",
        // => @media (min-width: 480px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {

        primary: "rgb(76, 64, 237)",
        "blue-purple": "#4C40ED",
        'primary': 'rgb(76, 64, 237)',
        'secondary': 'rgb(244, 236, 255)',
        'background': 'rgb(242, 242, 242)'
      },
    },
  },
  plugins: [require("daisyui")],
};

