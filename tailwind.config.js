/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-white": "#f3f3f7",
            },
            fontFamily: {
                lexend: ["'Lexend'", "serif"],
            },
            screens: {
                macbook: "896px",
                mobile: "228px",
            },
        },
    },
    plugins: [],
};
