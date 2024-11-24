export default function buttonPlugin({ addComponents }) {
    addComponents({
        '.btn-solid': {
            '@apply inline-flex items-center justify-center text-body-l font-extrabold text-center rounded-lg':
                '',
            '@apply text-white bg-point-500 border-none active:bg-point-600 focus:outline-none':
                '',
            '@apply active:scale-95 hover:bg-point-600 disabled:bg-gray-200 disabled:text-gray-400':
                '',
            '@apply transition-all duration-200 ease-in-out max-w-[600px] min-w-[104px] w-full py-[14px] px-[24px] h-[52px]':
                '',
        },
        '.btn-outline': {
            '@apply inline-flex items-center justify-center text-body-l font-extrabold text-center rounded-lg':
                '',
            '@apply border-2 bg-white text-point-600 border-point-500 active:scale-95 active:border-point-600 hover:border-point-600 active:bg-point-200 hover:bg-point-200':
                '',
            '@apply disabled:text-point-200 disabled:border-point-200 disabled:pointer-events-none':
                '',
            '@apply transition-all duration-200 ease-in-out max-w-[600px] min-w-[104px] w-full py-[14px] px-[24px] h-[52px]':
                '',
        },
        '.btn-lg': {
            '@apply w-auto': '',
        },
        '.btn-md': {
            '@apply w-auto text-body-m min-w-[100px] h-[44px] py-[12px]': '',
        },
        '.btn-sm': {
            '@apply w-auto text-body-s min-w-[81px] h-[34px] py-[8px] px-[16px]':
                '',
        },
        '.btn-extra-sm': {
            '@apply w-auto text-label-m min-w-[69px] h-[31px] py-[8px] px-[12px]':
                '',
        },
    });
}
