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
        curRoomInfo,
        messageList,
        fetchChatMessageList,
        unSubFromChatRoom,
        subToChatRoom,
        markMsgAsRead,
        isLoading,
        hasMore,
    } = useChatStore();

    const observerRef = useRef<IntersectionObserver | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const pageRef = useRef(1);
    const { user } = useUserStore();

    // 메시지 가져오기 및 소켓 연결
    useEffect(() => {
        if (chatRoomId) {
            // 첫 페이지 메시지 가져오기
            fetchChatMessageList(Number(chatRoomId), pageRef.current);

            // 소켓 연결
            subToChatRoom(Number(chatRoomId));

            // 읽음 처리
            markMsgAsRead(Number(chatRoomId), user?.accountId || '');
        }

        return () => {
            // 페이지 언마운트 시 솤멧 연결&구독 해제
            unSubFromChatRoom();
        };
    }, [chatRoomId]);

    // 무한 스크롤 트리거
    useEffect(() => {
        if (!triggerRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const traget = entries[0];
                if (
                    traget.isIntersecting &&
                    hasMore &&
                    !isLoading &&
                    chatRoomId
                ) {
                    pageRef.current += 1;
                    fetchChatMessageList(Number(chatRoomId), pageRef.current);
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.1 },
        );

        observerRef.current.observe(triggerRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [triggerRef, hasMore, isLoading, messageList]);

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
