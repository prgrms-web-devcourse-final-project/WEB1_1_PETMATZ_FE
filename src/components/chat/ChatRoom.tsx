import { useFadeNavigate } from '@/hooks';
import { useChatStore } from '@/stores';
import { IChatRoom } from '@/types/chat';
import { getDefaultProfileImg, utcToCustomDateTime } from '@/utils';
import { useState } from 'react';

interface ChatRoomProps {
    chatRoom: IChatRoom;
    swipedRoom: number | null;
    setSwipedRoom: (chatRoomId: number | null) => void;
}

export default function ChatRoom({
    chatRoom,
    swipedRoom,
    setSwipedRoom,
}: ChatRoomProps) {
    const [startX, setStartX] = useState<number | null>(null);
    const [dragDistance, setDragDistance] = useState<number>(0); // 드래그 거리 추적
    const navigate = useFadeNavigate();

    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setDragDistance(0); // 드래그 거리 초기화
    };

    const handleDragMove = (
        e: React.TouchEvent | React.MouseEvent,
        roomId: number,
    ) => {
        if (startX === null) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const diff = startX - clientX;

        setDragDistance(diff); // 드래그 거리 업데이트

        if (diff > 50) {
            // 왼쪽으로 50px 이상 드래그
            setSwipedRoom(roomId);
        } else if (diff < -50) {
            // 오른쪽으로 50px 이상 드래그
            setSwipedRoom(null);
        }
    };

    const handleDragEnd = () => {
        setStartX(null); // 드래그 종료
    };

    const handleClick = () => {
        if (Math.abs(dragDistance) < 10) {
            // 드래그 거리 10px 미만일 때만 클릭 동작 수행
            navigate(`/chat/${chatRoom.chatRoomId}`);
        }
    };

    return (
        <div
            key={chatRoom.chatRoomId}
            className="relative flex items-center w-full overflow-hidden hover:bg-point-50 active:bg-point-50 min-h-[72px]"
            onTouchStart={(e) => handleDragStart(e)}
            onTouchMove={(e) => handleDragMove(e, chatRoom.chatRoomId)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e)}
            onMouseMove={(e) => handleDragMove(e, chatRoom.chatRoomId)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd} // 마우스가 벗어날 때도 드래그 종료
            onClick={handleClick} // 클릭 이벤트 처리
        >
            {/* 나가기 버튼 */}
            <button
                className={`absolute right-0 top-0 bottom-0 w-20 rounded-tl-2xl h-[71px] rounded-bl-2xl bg-warning-300 hover:bg-warning-400 active:bg-warning-400 text-white font-bold transition-transform ${
                    swipedRoom === chatRoom.chatRoomId
                        ? 'translate-x-0'
                        : 'translate-x-full'
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    console.log(`채팅방 ${chatRoom.chatRoomId} 나가기`);
                }}
            >
                나가기
            </button>

            {/* 채팅방 항목 */}
            <div className="flex items-center py-[10px] px-[24px] gap-[10px] cursor-pointer w-full min-w-[360px]">
                <img
                    className="w-[52px] h-[52px] border-[0.5px] border-gray-200 rounded-full"
                    src={getDefaultProfileImg(
                        chatRoom.other.profileURL || 'profile1',
                    )}
                />
                <div className="flex flex-col flex-1 truncate">
                    <span className="text-body-s font-extrabold text-point-900">
                        {chatRoom.other.userName}
                    </span>
                    <span className="text-label-m text-gray-500 truncate">
                        {chatRoom.lastMessage}
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-[4px]">
                    <span className="text-gray-500 text-label-s">
                        {utcToCustomDateTime(chatRoom.lastMessageTimestamp)}
                    </span>
                    {chatRoom.unreadCount ? (
                        <span className="w-[16px] h-[16px] flex items-center text-gray-100 text-label-s font-extrabold justify-center p-[2px] rounded-full bg-point-300">
                            {chatRoom.unreadCount}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
