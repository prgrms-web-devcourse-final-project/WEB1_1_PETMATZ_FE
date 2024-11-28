import { useFadeNavigate } from '@/hooks';
import {
    createChatRoom,
    getChatMessageList,
    getChatRoomList,
} from '@/hooks/api/Chat';
import { IChatMessage, IChatRoom } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

interface ChatStore {
    // 상태
    chatRoomList: IChatRoom[];
    messageList: IChatMessage[];
    curRoomInfo: Pick<IChatRoom, '_id' | 'other'> | null;
    connectedClient: Client | null;
    isLoading: boolean;
    hasMore: boolean;
    firstFetchedTimestamp: string | null;

    // 채팅방 생성
    createChatRoom: (entrustedEmail: string) => Promise<void>;

    // 채팅방 리스트
    fetchChatRoomList: () => Promise<void>;
    subToChatRoomList: () => void;
    unSubFromChatRoomList: () => void;

    // 특정 채팅방
    fetchChatMessageList: (chatRoomId: string, page: number) => Promise<void>;
    subToChatRoom: (chatRoomId: string) => void;
    unSubFromChatRoom: () => void;

    // 메세지 전송
    sendMsg: (
        chatRoomId: string,
        msg: string,
        msg_type: 'msg' | 'plz',
        senderId: string,
        reciverId: string,
    ) => void;
    markMsgAsRead: (chatRoomId: string, senderId: string) => void;
}

const STOMP_CONNECT_URL = import.meta.env.VITE_STOMP_CONNECT_URL as string;

const useChatStore = create<ChatStore>((set, get) => ({
    chatRoomList: [],
    messageList: [],
    curRoomInfo: null,
    connectedClient: null,
    isLoading: false,
    hasMore: true,
    firstFetchedTimestamp: null,

    // 채팅방 생성
    createChatRoom: async (entrustedEmail) => {
        const { ok, data } = await createChatRoom({ entrustedEmail });
        const navigate = useFadeNavigate();

        if (!ok) {
            console.error('채팅방 생성에 실패했습니다.');
            return;
        }

        navigate(`/chat/${data.result}`);
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
            const chatRoomList = get().chatRoomList;
            chatRoomList.forEach((room) => {
                client.subscribe(`/topic/chat/${room._id}`, (message) => {
                    const newMsg: IChatMessage = JSON.parse(message.body);

                    set((state) => ({
                        chatRoomList: state.chatRoomList.map((chatRoom) =>
                            chatRoom._id === room._id
                                ? {
                                      ...chatRoom,
                                      lastMessage: newMsg.msg,
                                      unreadCount: chatRoom.unreadCount + 1,
                                  }
                                : chatRoom,
                        ),
                    }));
                });
            });
        };

        client.activate();
        set({ connectedClient: client, chatRoomList: [] });
    },

    // 모든 채팅방 구독 해제
    unSubFromChatRoomList: () => {
        const client = get().connectedClient;
        client?.deactivate();
        set({ connectedClient: null });
    },

    // 특정 채팅방 메시지 가져오기(상세 페이지)
    fetchChatMessageList: async (chatRoomId, page) => {
        const { isLoading, hasMore, firstFetchedTimestamp } = get();
        if (isLoading || !hasMore) return;

        set({ isLoading: true });

        const { ok, data } = await getChatMessageList({
            chatRoomId,
            pageSize: 15,
            startPage: page,
            lastTimeStamp: firstFetchedTimestamp || undefined,
        });

        if (!ok) {
            console.error('메시지 가져오기에 실패했습니다.');
            set({ isLoading: false });
            return;
        }

        set((state) => {
            const newMsg = [...data.result.messages, ...state.messageList];

            const firstFetchedTimestamp =
                state.firstFetchedTimestamp || data.result.messages.length > 0
                    ? data.result.messages[data.result.messages.length - 1]
                          ?.msgTimestamp
                    : null;

            const hasMore = page < data.result.totalPages;

            return {
                messageList: newMsg,
                curRoomInfo: {
                    _id: data.result._id,
                    other: data.result.other,
                },
                isLoading: false,
                hasMore,
                firstFetchedTimestamp,
            };
        });
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
            // 메시지 수신 구독
            client.subscribe(`topic/chat/${chatRoomId}`, (message) => {
                const newMsg: IChatMessage = JSON.parse(message.body);

                set((state) => ({
                    messageList: [
                        ...state.messageList,
                        {
                            ...newMsg,
                            msgTimestamp: new Date().toISOString(),
                            readStatus: false,
                        },
                    ],
                }));
            });

            // 읽음 처리 구독
            client.subscribe(`topic/chat/${chatRoomId}/read`, (message) => {
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

            client.activate();
            set({ connectedClient: client });
        };
    },

    // 특정 채팅방 구독 해제
    unSubFromChatRoom: () => {
        const client = get().connectedClient;
        if (client) client.deactivate();

        set({ curRoomInfo: null, connectedClient: null, messageList: [] });
    },

    // 메시지 전송
    sendMsg: (chatRoomId, msg, msg_type, senderId, reciverId) => {
        const client = get().connectedClient;

        if (client) {
            client.publish({
                destination: '/app/chat',
                body: JSON.stringify({
                    chatRoomId,
                    msg,
                    msg_type,
                    senderId,
                    reciverId,
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
