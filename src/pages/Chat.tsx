import { ChatRoom, NonChatRoom } from '@/components/chat';
import { useChatStore, useTitleStore, useUserStore } from '@/stores';
import { useEffect, useState } from 'react';

export default function Chat() {
    const [swipedRoom, setSwipedRoom] = useState<number | null>(null);
    const { setTitle } = useTitleStore();
    const { user } = useUserStore();
    const [other, setOther] = useState<string>('');

    const {
        chatRoomList,
        fetchChatRoomList,
        unSubFromChatRoomList,
        createChatRoom,
    } = useChatStore();

    const onClickCreateChatRoomBtn = async () => {
        if (user) {
            if (other.trim() === '') return;

            await createChatRoom(user.accountId, other);
        }
    };

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
                <div className="flex flex-col items-center justify-center gap-[16px] p-4">
                    <input
                        className="input-outline"
                        value={other}
                        onChange={(e) => setOther(e.target.value)}
                        placeholder="상대방 email"
                    />
                    <button
                        className="btn-solid"
                        onClick={onClickCreateChatRoomBtn}
                    >
                        채팅방 생성
                    </button>
                </div>
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
