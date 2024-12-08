import { useChatStore, useUserStore } from '@/stores';
import React, { useState } from 'react';

// SVG
import SendIcon from '@/assets/images/chat/send.svg?react';

export default function ChatBottom() {
    const { curRoomInfo, sendMsg } = useChatStore();
    const { user } = useUserStore();
    const [message, setMessage] = useState<string>('');

    const handleOnSend = () => {
        if (!message.trim()) return;

        if (curRoomInfo && user) {
            sendMsg(
                curRoomInfo.chatRoomId,
                message,
                'MSG',
                user.accountId,
                curRoomInfo.other.userEmail,
            );

            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (message.trim()) {
                handleOnSend();
            }
        }
    };

    return (
        <div className="flex items-center py-[8px] px-[24px] gap-[10px] bg-white">
            {curRoomInfo ? (
                <img
                    className="w-[32px] h-[32px] rounded-full border-[0.5px] border-gray-200"
                    src={curRoomInfo.other.profileURL || ''}
                />
            ) : (
                <div className="w-[32px] h-[32px] bg-gray-300 rounded-full animate-pulse border-[0.5px] border-gray-200" />
            )}
            <div className="relative flex items-center w-full gap-[10px]">
                <input
                    className="input-solid py-[7px] pl-[16px] text-label-l pr-[44px] font-semibold disabled:text-gray-300"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메세지를 입력해주세요."
                />
                <SendIcon
                    onClick={handleOnSend}
                    className={`w-[18px] h-[18px] absolute right-[16px] transition-all duration-200 ease-in-out cursor-pointer active:scale-95  ${message.trim() ? 'text-point-500 active:text-point-600 hover:text-point-600' : 'text-gray-300 cursor-not-allowed'} placeholder:text-label-l placeholder:text-gray-300`}
                />
            </div>
        </div>
    );
}
