import { useFadeNavigate } from '@/hooks';

// SVG
import ArrowLeftIcon from '@/assets/images/arrow/arrowLeft.svg?react';
import MenuBugerIcon from '@/assets/images/common/menuBuger.svg?react';
import FoodBowlIcon from '@/assets/images/chat/foodBowl.svg?react';
import { useChatStore } from '@/stores';
import { getDefaultProfileImg } from '@/utils';

export default function ChatDetailTitle() {
    const { curRoomInfo } = useChatStore();
    const navigate = useFadeNavigate();

    return (
        <>
            <header className="flex px-[24px] py-[10px] items-center gap-[10px] h-[60px] bg-white">
                {curRoomInfo ? (
                    <>
                        <ArrowLeftIcon
                            onClick={() => navigate(-1)}
                            className="text-point-900 w-[24px] h-[24px] cursor-pointer"
                        />
                        <div className="flex-1 flex items-center gap-[12px]">
                            <img
                                className="w-[36px] h-[36px] rounded-full border-[0.5px] border-gray-200"
                                src={getDefaultProfileImg(
                                    curRoomInfo.other.profileURL || 'profile1',
                                )}
                                alt={`${curRoomInfo.other.userName}님의 프로필 이미지`}
                            />
                            <span className="text-point-900 text-label-l font-extrabold">
                                {curRoomInfo.other.userName}
                            </span>
                        </div>
                        <MenuBugerIcon className="text-point-900 w-[24px] h-[24px]" />
                    </>
                ) : (
                    <>
                        <ArrowLeftIcon
                            onClick={() => navigate(-1)}
                            className="text-point-900 w-[24px] h-[24px] cursor-pointer animate-pulse"
                        />
                        <div className="flex-1 flex items-center gap-[12px]">
                            <div className="w-[36px] h-[36px] rounded-full bg-gray-300 animate-pulse border-[0.5px] border-gray-200" />
                            <div className="h-[18px] w-[80px] rounded-2xl animate-pulse bg-gray-300" />
                        </div>
                        <MenuBugerIcon className="text-point-900 w-[24px] h-[24px] animate-pulse" />
                    </>
                )}
            </header>
            <article className="flex px-[24px] py-[12px] gap-[8px] items-center bg-point-50">
                <FoodBowlIcon className="w-[32px] h-[32px]" />
                <span className="flex-1 text-gray-800 text-label-m font-semibold">
                    댕댕이를 위한 부탁을 등록해요!
                </span>
                <button className="btn-solid btn-extra-sm">부탁 등록</button>
            </article>
            <article className="flex flex-col items-center py-[16px] text-point-400 text-label-s font-extrabold">
                <span>
                    무리한 부탁이나 뾰족한 말투는 멍멍이도 싫어할 거에요. 🐾
                </span>
                <span>즐겁고 따뜻한 대화를 만들어주세요!</span>
            </article>
        </>
    );
}
