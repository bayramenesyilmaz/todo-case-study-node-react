/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  safelist: [
    // Border colors
    "border-yellow-500",
    "border-blue-500",
    "border-green-500",
    "border-red-500",
    "border-indigo-500",
    // Text colors
    "text-yellow-600",
    "text-blue-600",
    "text-green-600",
    "text-red-600",
    "text-indigo-600",
    // Dark mode text colors
    "dark:text-yellow-400",
    "dark:text-blue-400",
    "dark:text-green-400",
    "dark:text-red-400",
    "dark:text-indigo-400",
    // Background colors
    "bg-yellow-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-red-100",
    "bg-indigo-100",
    // Dark mode background colors
    "dark:bg-yellow-900",
    "dark:bg-blue-900",
    "dark:bg-green-900",
    "dark:bg-red-900",
    "dark:bg-indigo-900",
  ],
  plugins: [],
};
