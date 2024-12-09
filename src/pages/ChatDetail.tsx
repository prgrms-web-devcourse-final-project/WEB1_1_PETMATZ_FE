import {
    ChatBottom,
    ChatDetailTitle,
    ChatNewMessage,
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
        resetTimestamp,
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

    const handleOnClickNewMessage = () => {
        if (scrollContainerRef.current && readTriggerRef.current) {
            const targetPosition =
                readTriggerRef.current.offsetTop +
                readTriggerRef.current.offsetHeight;

            scrollContainerRef.current.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    };

    // 메시지 로드 및 읽음 처리 초기화
    useEffect(() => {
        const initChat = async () => {
            if (!chatRoomId || !user || !isFirstFetch.current) return;

            isFirstFetch.current = false;

            // 1. 메시지 첫 페이지 가져오기
            await fetchChatMessageList(Number(chatRoomId), page);
            setPage((prev) => prev + 1);

            // 2. 스크롤 하단 이동
            if (scrollContainerRef.current && readTriggerRef.current) {
                setIsScroll(true);
                const targetPosition =
                    readTriggerRef.current.offsetTop +
                    readTriggerRef.current.offsetHeight;

                scrollContainerRef.current.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });

                setTimeout(() => setIsScroll(false), 300);
            }
        };

        if (isFirstFetch.current) {
            initChat();
        }

        const handleBeforeUnload = () => unSubFromChatRoom();
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            unSubFromChatRoom();
            window.removeEventListener('beforeunload', handleBeforeUnload);
            setMorePage(true);
            resetTimestamp();
        };
    }, [chatRoomId, user]);

    // 읽음 처리 트리거
    useEffect(() => {
        if (isFirstFetch.current || !messageList.length) return;

        const handleIntersect: IntersectionObserverCallback = (entries) => {
            const entry = entries[0];
            if (
                entry.isIntersecting &&
                user &&
                isNewMsg &&
                connectedClient?.connected &&
                !isScroll
            ) {
                markMsgAsRead(Number(chatRoomId), user.accountId);
                setIsNewMsg(false);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: scrollContainerRef.current,
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
    }, [chatRoomId, user, isNewMsg, connectedClient, isScroll]);

    // 메시지 목록 변경 시 하단 스크롤 이동
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        const scrollContainer = scrollContainerRef.current;

        const isNearBottom =
            scrollContainer.scrollTop + scrollContainer.clientHeight >=
            scrollContainer.scrollHeight * 0.8;

        if (isNearBottom) {
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messageList]);

    // 무한 스크롤 처리
    useEffect(() => {
        if (isFirstFetch.current || !messageList.length) return;

        const handleIntersect: IntersectionObserverCallback = async (
            entries,
        ) => {
            const entry = entries[0];

            if (
                entry.isIntersecting &&
                chatRoomId &&
                user &&
                morePage &&
                scrollContainerRef.current &&
                !isScroll
            ) {
                // 스크롤 높이 저장
                previousScrollHeight.current =
                    scrollContainerRef.current.scrollHeight;

                await fetchChatMessageList(Number(chatRoomId), page);

                // 페이지 증가
                setPage((prev) => prev + 1);

                // 스크롤 위치 복원
                if (
                    scrollContainerRef.current &&
                    previousScrollHeight.current !== null
                ) {
                    const newScrollHeight =
                        scrollContainerRef.current.scrollHeight;
                    const heightDiff =
                        newScrollHeight - previousScrollHeight.current;

                    scrollContainerRef.current.scrollTop += heightDiff;
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: scrollContainerRef.current,
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
    }, [chatRoomId, user, morePage, page, isScroll]);

    return (
        <div className="flex flex-col h-full overflow-hidden bg-gray-100">
            <ChatDetailTitle />
            <main
                ref={scrollContainerRef}
                className="relactive flex flex-col h-full overflow-y-auto px-[24px] py-[16px] gap-[16px]"
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
            {isNewMsg &&
                messageList.length > 0 &&
                messageList[messageList.length - 1].receiverId ===
                    user?.accountId && (
                    <div className="absolute bottom-[66px] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <ChatNewMessage onClick={handleOnClickNewMessage} />
                    </div>
                )}
            <ChatBottom />
        </div>
    );
}
