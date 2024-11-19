/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            borderWidth: {
                1: '1px',
            },
            colors: {
                point: {
                    100: '#E4E0FF',
                    200: '#C9C1FF',
                    300: '#AEA1FF',
                    400: '#9382FF',
                    500: '#7863FF',
                    600: '#604FCC',
                    700: '#483B99',
                    800: '#302866',
                    900: '#181433',
                },
                gray: {
                    100: '#F7F8FA',
                    200: '#EAEBED',
                    300: '#CACDD2',
                    400: '#9FA4A8',
                    500: '#73787E',
                    600: '#474C52',
                    700: '#27282C',
                    800: '#121316',
                    900: '#0A0B0D',
                },
                danger: {
                    100: '#FFD8DE',
                    200: '#FFB2BD',
                    300: '#FF657C',
                    400: '#FF3E5B',
                    500: '#992537',
                    600: '#330C12',
                },
                warning: {
                    100: '#FFD8DE',
                    200: '#FFB2BD',
                    300: '#FF657C',
                    400: '#FF3E5B',
                    500: '#992537',
                    600: '#330C12',
                },
                success: {
                    100: '#E7FFE3',
                    200: '#CFFFC6',
                    300: '#B6FFAA',
                    400: '#86FF71',
                    500: '#36662D',
                    600: '#1B3317',
                },
                info: {
                    100: '#E7FFE3',
                    200: '#CFFFC6',
                    300: '#B6FFAA',
                    400: '#86FF71',
                    500: '#36662D',
                    600: '#1B3317',
                },
            },
            fontFamily: {
                suit: ['SUIT', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('daisyui'),
        require('tailwindcss'),
        require('autoprefixer'),
    ],
};
