import { ChatRoom, NonChatRoom } from '@/components/chat';
import { useChatStore, useTitleStore } from '@/stores';
import { useEffect, useState } from 'react';

export default function Chat() {
    const [swipedRoom, setSwipedRoom] = useState<number | null>(null);
    const { setTitle } = useTitleStore();

    const {
        fetchChatRoomList,
        subToChatRoomList,
        unSubFromChatRoomList,
        chatRoomList,
    } = useChatStore();

    // 채팅방 리스트 가져오기 및 소켓 연결
    useEffect(() => {
        // 채팅방 리스트 가져오기
        fetchChatRoomList();

        // 모든 채팅방 소켓 연결
        subToChatRoomList();

        return () => {
            // 페이지 언마운트 시 소켓 연결&구독 해제
            unSubFromChatRoomList();
        };
    }, []);

    useEffect(() => {
        setTitle('채팅');
    }, []);

    return (
        <main className="flex flex-col h-full overflow-hidden bg-gray-100">
            <div className="flex flex-col h-full overflow-y-auto">
                {chatRoomList.length > 0 ? (
                    chatRoomList.map((chatRoom) => (
                        <ChatRoom
                            key={chatRoom._id}
                            chatRoom={chatRoom}
                            swipedRoom={swipedRoom}
                            setSwipedRoom={setSwipedRoom}
                        />
                    ))
                ) : (
                    <NonChatRoom />
                )}
            </div>
        </main>
    );
}
