import {
    ChatBottom,
    ChatDetailTitle,
    LeftBubble,
    RightBubble,
} from '@/components/chat-detail';
import { useChatStore } from '@/stores';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function ChatDetail() {
    const { chatRoomId } = useParams();
    const {
        selectedUserEmail,
        curRoomInfo,
        messageList,
        fetchChatMessageList,
        unSubFromChatRoom,
    } = useChatStore();
    const isFirstFetch = useRef(true);

    const pageRef = useRef(1);
    const { user } = useUserStore();

    // 메시지 가져오기 및 소켓 연결
    useEffect(() => {
        if (chatRoomId && selectedUserEmail && isFirstFetch.current) {
            // 첫 페이지 메시지 가져오기
            fetchChatMessageList(selectedUserEmail, Number(chatRoomId));
            isFirstFetch.current = false;
        }

        return () => {
            // 페이지 언마운트 시 솤멧 연결&구독 해제
            unSubFromChatRoom();
        };
    }, [chatRoomId, selectedUserEmail]);

    // useEffect(() => {
    //     console.log(curRoomInfo);
    //     console.log(selectedUserEmail);
    // }, [curRoomInfo]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-gray-100">
            <ChatDetailTitle />
            <main className="flex flex-col h-full overflow-y-auto px-[24px] py-[16px] gap-[16px]">
                {messageList.length > 0 && curRoomInfo
                    ? messageList.map((message, idx) =>
                          message.senderId !== user?.accountId ? (
                              <LeftBubble
                                  key={idx}
                                  other={curRoomInfo.other}
                                  message={message}
                              />
                          ) : (
                              <RightBubble
                                  key={idx}
                                  other={curRoomInfo.other}
                                  message={message}
                              />
                          ),
                      )
                    : null}
            </main>
            <ChatBottom />
        </div>
    );
}
