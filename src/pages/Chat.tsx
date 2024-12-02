import { ChatRoom, NonChatRoom } from '@/components/chat';
import { useChatStore, useTitleStore, useUserStore } from '@/stores';
import { useEffect, useState } from 'react';

export default function Chat() {
    const [swipedRoom, setSwipedRoom] = useState<number | null>(null);

    const { setTitle } = useTitleStore();
    const { chatRoomList, fetchChatRoomList, unSubFromChatRoomList } =
        useChatStore();

    useEffect(() => {
        fetchChatRoomList();
        setTitle('채팅');

        return () => {
            unSubFromChatRoomList();
        };
    }, []);

    return (
        <main className="flex flex-col h-full overflow-hidden bg-gray-100">
            <div className="flex flex-col h-full overflow-y-auto">
                {chatRoomList.length > 0 ? (
                    chatRoomList.map((chatRoom) => (
                        <ChatRoom
                            key={chatRoom.chatRoomId}
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
