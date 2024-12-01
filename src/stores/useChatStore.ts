import { useFadeNavigate } from '@/hooks';
import {
    createChatRoom,
    getChatMessageList,
    getChatRoomList,
} from '@/hooks/api/chat';
import { IChatMessage, IChatRoom, IPub } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

interface ChatStore {
    // 상태
    chatRoomList: IChatRoom[];
    messageList: IChatMessage[];
    curRoomInfo: Pick<IChatRoom, 'chatRoomId' | 'other'> | null;
    connectedClient: Client | null;
    firstFetchedTimestamp: string | null;
    selectedUserEmail: string | null;
    setSelectedUserEmail: (email: string) => void;

    // 채팅방 생성
    createChatRoom: (
        caregiverEmail: string,
        entrustedEmail: string,
    ) => Promise<void>;

    // 채팅방 리스트
    fetchChatRoomList: () => Promise<void>;
    subToChatRoomList: () => void;
    unSubFromChatRoomList: () => void;

    // 특정 채팅방
    fetchChatMessageList: (
        receiverEmail: string,
        chatRoomId: number,
        page?: number,
    ) => Promise<void>;
    subToChatRoom: (chatRoomId: number) => void;
    unSubFromChatRoom: () => void;

    // 메세지 전송
    sendMsg: (
        chatRoomId: number,
        msg: string,
        msg_type: 'MSG' | 'PLG' | 'END',
        senderId: string,
        receiverId: string,
    ) => void;
    markMsgAsRead: (chatRoomId: number, senderId: string) => void;
}

const STOMP_CONNECT_URL = import.meta.env.VITE_STOMP_CONNECT_URL as string;

const useChatStore = create<ChatStore>((set, get) => ({
    chatRoomList: [],
    messageList: [],
    curRoomInfo: null,
    connectedClient: null,
    firstFetchedTimestamp: null,
    selectedUserEmail: null,

    // 선택된 유저 설정
    setSelectedUserEmail: (email) => {
        set({ selectedUserEmail: email });
    },

    // 채팅방 생성
    createChatRoom: async (caregiverEmail, entrustedEmail) => {
        const { ok } = await createChatRoom({
            caregiverEmail,
            entrustedEmail,
        });
        // const navigate = useFadeNavigate();

        if (!ok) {
            console.error('채팅방 생성에 실패했습니다.');
            return;
        }

        // navigate(`/chat/${data.result}`);
    },

    // 채팅방 리스트 가져오기
    fetchChatRoomList: async () => {
        const { ok, data } = await getChatRoomList();

        if (!ok) {
            console.error('채팅방 리스트 가져오기에 실패했습니다.');
        }

        set({ chatRoomList: data.result });

        // 모든 채팅방 구독
        get().subToChatRoomList();
    },

    // 모든 채팅방 구독
    subToChatRoomList: () => {
        let client = get().connectedClient;

        if (client) {
            client.deactivate();
            set({ connectedClient: null });
        }

        const socket = new SockJS(STOMP_CONNECT_URL);
        client = new Client({ webSocketFactory: () => socket });

        client.onConnect = () => {
            console.log('소켓 연결 성공');
            const chatRoomList = get().chatRoomList;
            chatRoomList.forEach((room) => {
                client.subscribe(
                    `/topic/chat/${room.chatRoomId}`,
                    (message) => {
                        const newMsg: IChatMessage = JSON.parse(message.body);

                        set((state) => ({
                            chatRoomList: state.chatRoomList.map((chatRoom) =>
                                chatRoom.chatRoomId === room.chatRoomId
                                    ? {
                                          ...chatRoom,
                                          lastMessage: newMsg.msg,
                                          unreadCount: chatRoom.unreadCount + 1,
                                      }
                                    : chatRoom,
                            ),
                        }));
                    },
                );
            });
        };

        client.activate();
        set({ connectedClient: client });
    },

    // 모든 채팅방 구독 해제
    unSubFromChatRoomList: () => {
        const client = get().connectedClient;
        client?.deactivate();
        set({ connectedClient: null });
    },

    // 특정 채팅방 메시지 가져오기(상세 페이지)
    fetchChatMessageList: async (receiverEmail, chatRoomId, page) => {
        const { firstFetchedTimestamp } = get();
        const { ok, data } = await getChatMessageList({
            chatRoomId,
            receiverEmail,
            pageSize: 15,
            startPage: page || 1,
            lastTimeStamp: firstFetchedTimestamp || undefined,
        });

        if (!ok) {
            console.error('메시지 가져오기에 실패했습니다.');
            return;
        }

        console.log(data.result.chatMessage);

        set((state) => ({
            messageList: [...data.result.chatMessage, ...state.messageList],
            curRoomInfo: {
                chatRoomId: data.result._id,
                other: data.result.other,
            },
            firstFetchedTimestamp:
                state.firstFetchedTimestamp ||
                (data.result.chatMessage.length > 0
                    ? data.result.chatMessage[
                          data.result.chatMessage.length - 1
                      ]?.msgTimestamp
                    : null),
        }));

        get().subToChatRoom(chatRoomId);
        console.log(get().messageList);
    },

    // 특정 채팅방 구독
    subToChatRoom: (chatRoomId) => {
        let client = get().connectedClient;

        if (client) {
            client.deactivate();
            set({ connectedClient: null });
        }

        const socket = new SockJS(STOMP_CONNECT_URL);
        client = new Client({ webSocketFactory: () => socket });

        client.onConnect = () => {
            console.log('소켓 연결 성공');
            // 메시지 수신 구독
            client.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
                const newMsg: IPub = JSON.parse(message.body);
                console.log(newMsg);
                set((state) => ({
                    messageList: [
                        ...state.messageList,
                        {
                            msgTimestamp: newMsg.msgTimestamp,
                            readStatus: newMsg.readStatus,
                            msg_type: newMsg.msg_type,
                            msg: newMsg.msg,
                            senderId: newMsg.senderEmail,
                            receiverId: newMsg.receiverEmail,
                        },
                    ],
                }));
            });

            // 읽음 처리 구독
            client.subscribe(`/topic/chat/${chatRoomId}/read`, (message) => {
                const readInfo = JSON.parse(message.body);

                console.log(readInfo);

                set((state) => ({
                    messageList: state.messageList.map((msg) =>
                        msg.receiverId === readInfo.senderId
                            ? { ...msg, readStatus: true }
                            : msg,
                    ),
                }));
            });
        };

        client.activate();
        set({ connectedClient: client });
    },

    // 특정 채팅방 구독 해제
    unSubFromChatRoom: () => {
        const client = get().connectedClient;
        if (client) client.deactivate();

        set({ curRoomInfo: null, connectedClient: null, messageList: [] });
    },

    // 메시지 전송
    sendMsg: (chatRoomId, msg, msg_type, senderId, receiverId) => {
        const client = get().connectedClient;

        if (client) {
            client.publish({
                destination: '/app/chat',
                body: JSON.stringify({
                    chatRoomId,
                    msg,
                    msg_type,
                    senderEmail: senderId,
                    receiverEmail: receiverId,
                }),
            });
        }
    },

    // 메시지 읽음 처리
    markMsgAsRead: (chatRoomId, senderId) => {
        const client = get().connectedClient;

        if (client) {
            client.publish({
                destination: `/app/chat/${chatRoomId}/read`,
                body: JSON.stringify({ chatRoomId, senderId }),
            });
        }
    },
}));

export default useChatStore;
