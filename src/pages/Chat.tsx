import { ChatRoom, NonChatRoom } from '@/components/chat';
import { Loading } from '@/components/common';
import { useChatStore, useTitleStore, useUserStore } from '@/stores';
import { useEffect, useState } from 'react';

export default function Chat() {
    const [swipedRoom, setSwipedRoom] = useState<number | null>(null);
    const { setTitle } = useTitleStore();
    const { chatRoomList, fetchChatRoomList, unSubFromChatRoomList } =
        useChatStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const dataFetching = async () => {
            setIsLoading(true);
            await fetchChatRoomList();
            setIsLoading(false);
        };

        setTitle('채팅');
        dataFetching();

        return () => {
            unSubFromChatRoomList();
        };
    }, []);

    return (
        <main className="flex flex-col h-full overflow-hidden bg-gray-100">
            <div className="flex flex-col h-full overflow-y-auto">
                {isLoading ? (
                    <Loading />
                ) : chatRoomList.length > 0 ? (
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
