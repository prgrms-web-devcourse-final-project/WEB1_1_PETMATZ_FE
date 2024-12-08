import { useFadeNavigate } from '@/hooks';

// SVG
import PuppyWithBowlIcon from '@/assets/images/chat/puppyWithBowl.svg?react';

export default function NonPlease() {
    const navigate = useFadeNavigate();

    return (
        <div className="flex flex-col justify-center items-center gap-[8px] bg-point-50 flex-1">
            <PuppyWithBowlIcon className="w-[67px] h-[90px]" />
            <div className="flex flex-col justify-center items-center gap-[4px]">
                <span className="text-body-s font-extrabold text-gray-900 text-center">
                    멍멍이와 추억이 아직 없어요.
                </span>
                <span className="text-label-s text-gray-500 text-center">
                    매칭받기와 부탁하기로 멍멍이를 돌보거나 맡겨봐요!
                </span>
            </div>
            <div className="flex items-center justify-center gap-[8px]">
                <button
                    className="btn-extra-sm transition-all duration-200 ease-in-out active:scale-95 inline-flex items-center font-extrabold justify-center text-center rounded-lg bg-white text-point-500 hover:text-point-600 hover:bg-gray-300 active:bg-gray-300 active:border-none active:text-point-600"
                    onClick={() => navigate('/match')}
                >
                    매칭받기
                </button>
                <button
                    className="btn-solid btn-extra-sm"
                    onClick={() => navigate('/sos')}
                >
                    부탁하기
                </button>
            </div>
        </div>
    );
}
