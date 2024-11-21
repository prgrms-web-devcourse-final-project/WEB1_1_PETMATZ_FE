import {
    ChatBar,
    ChatTopbar,
    DateViewer,
    MyMessage,
    OtherMessage,
    PostGuid,
} from '@/components/chat-detail';
import useUserStore from '@/stores/useUserStore';
import { IChatRoom, IMessage } from '@/types/chat';
import { getOtherUserForChat, groupMessagesByDate } from '@/utils/chat';
import { useEffect, useMemo, useState } from 'react';

export default function ChatDetail() {
    const [data, setData] = useState<IChatRoom | null>(null);
    const [messages, setMessages] = useState<IMessage[] | null>(null);
    const { user, setUser } = useUserStore();

    const groupedMessages = useMemo(
        () => groupMessagesByDate(messages),
        [messages],
    );
    const otherUser = useMemo(() => {
        return getOtherUserForChat(data, user?.id);
    }, [data, user]);

    useEffect(() => {
        setUser({
            id: 'my_unique_user_id',
            nickname: '내닉네임',
            profileImgUrl: 'https://dummyimage.com/492x260',
        });

        fetch('/data/chat.json')
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setMessages(res.messages);
            });
    }, []);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <ChatTopbar user={otherUser} />
            <PostGuid />
            <div className="flex-1 flex flex-col overflow-y-auto px-4">
                <div className="flex flex-col items-center text-xs py-4">
                    <span>우리 앱은 따뜻한 도움을 나누는 공간이에요.🐾</span>
                    <span>
                        너무 무리한 부탁이나 뾰족한 말투는 멍멍이도 싫어할
                        거에요.
                    </span>
                    <span>즐겁고 따뜻한 대화를 만들어주세요!</span>
                </div>
                {groupedMessages?.map((message, idx) => {
                    if ('date' in message) {
                        return (
                            <DateViewer
                                key={`${message.date}-${idx}`}
                                date={message.date}
                            />
                        );
                    }

                    const isMyMesage = message.senderId === user?.id;

                    return isMyMesage ? (
                        <MyMessage key={message.id} message={message} />
                    ) : (
                        <OtherMessage
                            key={message.id}
                            message={message}
                            user={otherUser}
                        />
                    );
                })}
            </div>
            <ChatBar />
        </div>
    );
}
