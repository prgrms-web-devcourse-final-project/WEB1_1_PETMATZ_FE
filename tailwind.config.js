/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            borderWidth: {
                1: '1px',
            },
            colors: {
                primary: '#CBB4F5',
                secondary: '#8C4DDB',
            },
        },
    },
    plugins: [
        require('daisyui'),
        require('tailwindcss'),
        require('autoprefixer'),
    ],
};
