import MenuDotsIcon from '@/assets/images/menuDots.svg?react';
import { useFadeNavigate } from '@/hooks';
import { IChatRoomInfo, IChatUserInfo } from '@/types/chat';
import { getOtherUserForChatRoom, transDateForChatRoom } from '@/utils/chat';
import { Dropdown } from '@/components/common';

interface ChatRoomProps {
    data: IChatRoomInfo;
    user: IChatUserInfo;
}

export default function ChatRoom({ data, user }: ChatRoomProps) {
    const navigate = useFadeNavigate();
    const dropdownItems = [
        { label: '채팅방 나가기', onClick: () => console.log('채팅방 나가기') },
    ];

    const onClickHandler = () => {
        navigate(`/chat/${data.id}`);
    };

    const sender = getOtherUserForChatRoom(data.participants, user.id);

    return (
        <div
            onClick={onClickHandler}
            className="flex items-center gap-2 py-4 pl-4 pr-2 hover:bg-gray-200 cursor-pointer text-gray-900"
        >
            <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                    <img
                        className="w-12 h-12"
                        src={sender?.profileImgUrl || ''}
                        alt={`${sender?.nickname}님의 프로필 이미지`}
                    />
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-2 h-14 overflow-hidden">
                <div className="font-semibold text-sm">{sender?.nickname}</div>
                <div className="truncate text-xs text-gray-500">
                    {data.lastMessage}
                </div>
            </div>
            <div className="flex flex-col items-center h-14 py-2">
                <div className="text-xs flex-1 text-gray-500">
                    {transDateForChatRoom(data.lastMessageTimestamp)}
                </div>
                {data.messageCount > 0 && (
                    <div className="flex aspect-square p-[2px] items-center justify-center rounded-full bg-point-500 text-white text-[10px]">
                        {data.messageCount}
                    </div>
                )}
            </div>
            <Dropdown
                title={<MenuDotsIcon className="w-6 h-6 text-point-500 " />}
                items={dropdownItems}
            />
        </div>
    );
}
