import { ChatRoom, NonChatRoom } from '@/components/chat';
import { useTitleStore } from '@/stores';
import { IChatRoom } from '@/types/chat';
import { useEffect, useState } from 'react';

export default function Chat() {
    const [swipedRoom, setSwipedRoom] = useState<string | null>(null);
    const { setTitle } = useTitleStore();

    // const {
    //     fetchChatRoomList,
    //     subToChatRoomList,
    //     unSubFromChatRoomList,
    //     chatRoomList,
    // } = useChatStore();

    // // 채팅방 리스트 가져오기 및 소켓 연결
    // useEffect(() => {
    //     // 채팅방 리스트 가져오기
    //     fetchChatRoomList();

    //     // 모든 채팅방 소켓 연결
    //     subToChatRoomList();

    //     return () => {
    //         // 페이지 언마운트 시 소켓 연결&구독 해제
    //         unSubFromChatRoomList();
    //     };
    // }, []);

    useEffect(() => {
        setTitle('채팅');
    }, []);

    const chatRoomList: IChatRoom[] = [
        {
            _id: '0c14e135-52fe-4a86-8242-9c74b9e84bfa',
            lastMessage: 'Short affect live.',
            unreadCount: 8,
            lastMessageTimestamp: '2024-11-25T20:14:39.421239',
            other: {
                _id: '0d36fdcc-20a8-4b83-accb-bc1e1c4b7552',
                email: 'contreraslauren@gmail.com',
                nickname: 'Terri',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: 'f586ed73-e45d-4af5-8a5a-b1151aac363a',
            lastMessage: 'Or ahead just million case tell ability go.',
            unreadCount: 9,
            lastMessageTimestamp: '2024-11-25T22:34:39.422640',
            other: {
                _id: '3d11f267-532c-4bab-a5de-2f16113e9b7a',
                email: 'dfrench@jensen-vargas.com',
                nickname: 'Carlos',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: 'a66ffaae-8819-4da0-a165-547fbc6baeb2',
            lastMessage: 'Spend baby inside into join spend toward.',
            unreadCount: 6,
            lastMessageTimestamp: '2024-11-25T19:38:39.423098',
            other: {
                _id: '62590438-2113-4c36-8412-98748cf0f1d6',
                email: 'hessthomas@gmail.com',
                nickname: 'Susan',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '35c572e6-e439-46f4-8ac8-7f14748e3ba7',
            lastMessage: 'During education cup.',
            unreadCount: 8,
            lastMessageTimestamp: '2024-11-26T01:07:39.423760',
            other: {
                _id: '73d8d196-457d-4d7c-929a-9aa0f9aa348c',
                email: 'wthomas@morales-hayes.com',
                nickname: 'Dean',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '8788a42c-c5da-41e5-92be-1bcde5cf4c6f',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 9,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '1',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '2',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '3',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '4',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '5',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '6',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '7',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '8',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '9',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '10',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '11',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '12',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '13',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
        {
            _id: '14',
            lastMessage: 'Several across name deep pass enter.',
            unreadCount: 0,
            lastMessageTimestamp: '2024-11-25T20:05:39.424460',
            other: {
                _id: '38575ec7-615d-4559-85e9-3f6bd58c3e00',
                email: 'allisoncarpenter@wall-allison.org',
                nickname: 'Robert',
                profileImgUrl: 'profile1',
            },
        },
    ];

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
