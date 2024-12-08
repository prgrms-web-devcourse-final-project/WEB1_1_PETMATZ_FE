import { useFadeNavigate } from '@/hooks';
import { Dropdown } from '@/components/common';
import { useChatStore } from '@/stores';

// SVG
import ArrowLeftIcon from '@/assets/images/arrow/arrowLeft.svg?react';
import MenuBugerIcon from '@/assets/images/common/menuBuger.svg?react';
import FoodBowlIcon from '@/assets/images/chat/foodBowl.svg?react';
import ExitIcon from '@/assets/images/header/exit.svg?react';
import ReportIcon from '@/assets/images/chat/report.svg?react';
import { deleteChatRoom } from '@/hooks/api/Chat';

export default function ChatDetailTitle() {
    const { curRoomInfo } = useChatStore();
    const { unSubFromChatRoom } = useChatStore();
    const navigate = useFadeNavigate();

    // 채팅방 나가기
    const handleClickExit = async () => {
        if (!curRoomInfo) return;

        const { ok } = await deleteChatRoom({
            roomId: String(curRoomInfo?.chatRoomId),
        });

        if (!ok) {
            console.error('채팅방 삭제에 실패했습니다.');
            return;
        }

        unSubFromChatRoom();

        navigate('/chat');
    };

    return (
        <>
            <header className="flex px-[24px] py-[10px] items-center gap-[10px] h-[60px] bg-white">
                {curRoomInfo ? (
                    <>
                        <ArrowLeftIcon
                            onClick={() => navigate('/chat')}
                            className="text-point-900 w-[24px] h-[24px] cursor-pointer"
                        />
                        <div className="flex-1 flex items-center gap-[12px]">
                            <img
                                className="w-[36px] h-[36px] rounded-full border-[0.5px] border-gray-200"
                                src={curRoomInfo.other.profileURL || ''}
                                alt={`${curRoomInfo.other.userName}님의 프로필 이미지`}
                            />
                            <span className="text-point-900 text-label-l font-extrabold">
                                {curRoomInfo.other.userName}
                            </span>
                        </div>
                        <Dropdown
                            icon={
                                <MenuBugerIcon className="text-point-900 w-[24px] h-[24px] cursor-pointer" />
                            }
                        >
                            <li
                                className="flex items-center py-[10px] px-[14px] gap-[8px] hover:bg-point-50 active:bg-point-50 rounded-t-lg"
                                onClick={handleClickExit}
                            >
                                <ExitIcon className="w-[18px] h-[18px]" />
                                <span>방 나가기</span>
                            </li>
                            <li className="flex items-center py-[10px] px-[14px] gap-[8px] text-warning-400 hover:bg-warning-100 active:bg-warning-100 rounded-b-lg cursor-not-allowed">
                                <ReportIcon className="w-[18px] h-[18px]" />
                                <span>신고하기</span>
                            </li>
                        </Dropdown>
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
                <button
                    className="btn-solid btn-extra-sm"
                    onClick={() =>
                        navigate(
                            `/please/write?receiverId=${curRoomInfo?.other.userId}`,
                        )
                    }
                >
                    부탁 등록
                </button>
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
