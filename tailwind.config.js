/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "marine-blue": "var(--v)",
        "light-gray": "hsl(206, 94%, 87%)",
        white: "hsl(0, 0%, 100%)",
        "purplish-blue": "hsl(243, 100%, 62%)",
        "strawberry-red": "hsl(354, 84%, 57%)",
      },
    },
    fontFamily: {
      custom: ["ubuntu-mono", "Ubuntu", "sans-serif"],
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(marine-blue|light-gray|white|purplish-blue|strawberry-red)/,
    },
  ],
};
