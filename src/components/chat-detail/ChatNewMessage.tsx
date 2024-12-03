// SVG
import ArrowBottomIcon from '@/assets/images/arrow/arrowBottom.svg?react';

interface NewMessageProps {
    onClick: () => void;
}

export default function NewMessage({ onClick }: NewMessageProps) {
    return (
        <div
            className="flex items-center justify-center gap-[4px] w-[110px] mx-auto bg-point-50 hover:bg-point-100 active:bg-point-100 text-point-500 hover:text-point-600 active:text-point-600 py-[8px] px-[16px] text-body-s font-extrabold rounded-full cursor-pointer"
            onClick={onClick}
        >
            <span>새 메시지</span>
            <ArrowBottomIcon className="w-[18px] h-[18px] text-gray-400" />
        </div>
    );
}
