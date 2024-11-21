import { ChatRoom, ChatRoomSkeleton } from '@/components/chat';
import useUserStore from '@/stores/useUserStore';
import { IChatRoomInfo } from '@/types/chat';
import { useEffect, useState } from 'react';

export default function Chat() {
    const { user, setUser } = useUserStore();
    const [dummy, setDummy] = useState<IChatRoomInfo[] | null>(null);

    useEffect(() => {
        setUser({
            id: 'my_unique_user_id',
            nickname: '내닉네임',
            profileImgUrl: 'https://www.lorempixel.com/955/874',
        });

        fetch('/data/chatRoom.json')
            .then((res) => res.json())
            .then((res) => setDummy(res));
    }, []);

    return (
        <div>
            <h2>채팅</h2>
            <div>
                {user && dummy && (
                    <div className="flex flex-col">
                        {dummy.map((chatRoom, idx) => (
                            <ChatRoom key={idx} data={chatRoom} user={user} />
                        ))}
                    </div>
                )}
                <div className="flex flex-col">
                    <ChatRoomSkeleton />
                    <ChatRoomSkeleton />
                    <ChatRoomSkeleton />
                </div>
            </div>
        </div>
    );
}
