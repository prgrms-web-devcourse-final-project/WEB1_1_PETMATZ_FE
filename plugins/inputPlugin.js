export default function inputPlugin({ addComponents }) {
    addComponents({
        // Solid Input 스타일
        '.input-solid': {
            '@apply w-full h-[48px] py-[12px] px-[24px] border-1 border-gray-100 focus:outline-none rounded-lg text-body-m font-semibold':
                '',
            '@apply bg-gray-100 text-gray-900 placeholder:text-gray-400 focus:caret-point-500':
                '',
            '@apply disabled:placeholder:text-gray-200': '',
            '@apply disabled:placeholder:bg-gray-200': '',
        },
        // Outline Input 스타일
        '.input-outline': {
            '@apply w-full h-[48px] py-[12px] px-[24px] border-1 bg-inherit border-gray-200 focus:outline-none rounded-lg text-body-m font-semibold':
                '',
            '@apply text-gray-900 placeholder:text-gray-400 focus:caret-point-500':
                '',
            '@apply disabled:border-none disabled:placeholder:text-transparent':
                '',
            '@apply focus:border-point-300': '',
        },
        // Error 스타일
        '.input-warning': {
            '@apply border-warning-400': '',
        },
        // Success 스타일
        '.input-success': {
            '@apply border-success-400': '',
        },
    });
}
