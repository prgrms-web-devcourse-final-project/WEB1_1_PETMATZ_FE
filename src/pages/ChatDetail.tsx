import {
    ChatBottom,
    ChatDetailTitle,
    LeftBubble,
    RightBubble,
} from '@/components/chat-detail';
import { useChatStore } from '@/stores';
import useUserStore from '@/stores/useUserStore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ChatDetail() {
    const { chatRoomId } = useParams();
    const { user } = useUserStore();
    const {
        isNewMsg,
        setIsNewMsg,
        morePage,
        setMorePage,
        curRoomInfo,
        messageList,
        fetchChatMessageList,
        unSubFromChatRoom,
        markMsgAsRead,
        connectedClient,
    } = useChatStore();
    const isFirstFetch = useRef(true);
    // 무한 스크롤 trigger Ref
    const scrollTriggerRef = useRef<HTMLDivElement | null>(null);
    // 읽음 처리 trigger Ref
    const readTriggerRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const previousScrollHeight = useRef<number | null>(null);
    const [page, setPage] = useState(1);
    const [isScroll, setIsScroll] = useState(false);

    // 메시지 로드 및 읽음 처리 초기화
    useEffect(() => {
        if (chatRoomId && user && isFirstFetch.current) {
            fetchChatMessageList(Number(chatRoomId), page, undefined); // 첫 페이지 메시지 가져오기
            isFirstFetch.current = false;
            setPage((prev) => prev + 1);

            markMsgAsRead(Number(chatRoomId), user.accountId);
        }

        const handleBeforeUnload = () => unSubFromChatRoom();

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            unSubFromChatRoom();
            window.removeEventListener('beforeunload', handleBeforeUnload);
            setMorePage(true);
        };
    }, [chatRoomId, user]);

    // 스크롤 이동 처리
    useEffect(() => {
        if (
            scrollContainerRef.current &&
            readTriggerRef.current &&
            messageList.length > 0 &&
            !isScroll &&
            isNewMsg
        ) {
            const targetPosition =
                readTriggerRef.current.offsetTop +
                readTriggerRef.current.offsetHeight;

            setIsScroll(true);
            scrollContainerRef.current.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
            setIsScroll(false);
        }
    }, [messageList, isNewMsg]);

    // 읽음 처리 트리거
    useEffect(() => {
        const handleIntersect: IntersectionObserverCallback = (entries) => {
            const entry = entries[0];
            if (
                entry.isIntersecting &&
                user &&
                isNewMsg &&
                connectedClient?.connected
            ) {
                markMsgAsRead(Number(chatRoomId), user.accountId);
                setIsNewMsg(false);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        if (readTriggerRef.current) {
            observer.observe(readTriggerRef.current);
        }

        return () => {
            if (readTriggerRef.current)
                observer.unobserve(readTriggerRef.current);
            observer.disconnect();
        };
    }, [chatRoomId, user, isNewMsg, connectedClient]);

    // 무한 스크롤 처리
    useEffect(() => {
        const handleIntersect: IntersectionObserverCallback = async (
            entries,
        ) => {
            const entry = entries[0];
            if (
                entry.isIntersecting &&
                chatRoomId &&
                user &&
                morePage &&
                scrollContainerRef.current
            ) {
                // 스크롤 높이 저장
                previousScrollHeight.current =
                    scrollContainerRef.current.scrollHeight;

                await fetchChatMessageList(Number(chatRoomId), page);

                // 페이지 증가
                setPage((prev) => prev + 1);

                // 스크롤 위치 복원
                if (previousScrollHeight.current) {
                    const newScrollHeight =
                        scrollContainerRef.current.scrollHeight;
                    const heightDiff =
                        newScrollHeight - previousScrollHeight.current;

                    scrollContainerRef.current.scrollTop += heightDiff;
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        if (scrollTriggerRef.current) {
            observer.observe(scrollTriggerRef.current);
        }

        return () => {
            if (scrollTriggerRef.current)
                observer.unobserve(scrollTriggerRef.current);
            observer.disconnect();
        };
    }, [chatRoomId, user, morePage, page]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-gray-100">
            <ChatDetailTitle />
            <main
                ref={scrollContainerRef}
                className="flex flex-col h-full overflow-y-auto px-[24px] py-[16px] gap-[16px]"
            >
                <div ref={scrollTriggerRef} className="h-[0.5px]" />
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
                <div className="h-[0.5px]" ref={readTriggerRef} />
            </main>
            <ChatBottom />
        </div>
    );
}
