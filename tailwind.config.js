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
                    50: '#EEF0FF',
                    100: '#E6E9FF',
                    200: '#CDD4FF',
                    300: '#B4BEFF',
                    400: '#9BA8FF',
                    500: '#7486FF',
                    600: '#5266EC',
                    700: '#2A378B',
                    800: '#283168',
                    900: '#1A1D33',
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
                dim: '#242629',
                bgColor: '#EEF0FF',
            },
            fontFamily: {
                suit: ['SUIT Variable', 'sans-serif'],
            },
            fontSize: {
                'title-l': ['32px', { lineHeight: '150%' }],
                'title-m': ['28px', { lineHeight: '150%' }],
                'title-s': ['24px', { lineHeight: '150%' }],
                'body-xl': ['22px', { lineHeight: '150%' }],
                'body-l': ['18px', { lineHeight: '125%' }],
                'body-m': ['16px', { lineHeight: '125%' }],
                'body-s': ['14px', { lineHeight: '125%' }],
                'label-l': ['14px', { lineHeight: '125%' }],
                'label-m': ['12px', { lineHeight: '125%' }],
                'label-s': ['10px', { lineHeight: '125%' }],
                detail: ['8px', { lineHeight: '125%' }],
            },
            fontWeight: {
                extrabold: 800, // ExtraBold
                semibold: 600, // SemiBold
                normal: 400, // Regular
                extralight: 200, // ExtraLight
            },
        },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('./plugins/buttonPlugin'),
        require('./plugins/inputPlugin'),
    ],
};
