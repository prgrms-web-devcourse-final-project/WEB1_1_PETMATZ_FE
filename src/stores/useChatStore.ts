import { getChatMessageList, getChatRoomList } from '@/hooks/api/chat';
import { IChatMessage, IChatRoom } from '@/types/chat';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';
import useUserStore from './useUserStore';

interface ChatStore {
    // 상태
    chatRoomList: IChatRoom[];
    messageList: IChatMessage[];
    curRoomInfo: Pick<IChatRoom, 'chatRoomId' | 'other'> | null;
    connectedClient: Client | null;
    firstFetchedTimestamp: string | null;
    subscriptionId: string | null;

    isNewMsg: boolean;
    setIsNewMsg: (state: boolean) => void;

    morePage: boolean;
    setMorePage: (state: boolean) => void;

    // 채팅방 리스트
    fetchChatRoomList: () => Promise<void>;
    subToChatRoomList: () => void;
    unSubFromChatRoomList: () => void;

    // 특정 채팅방
    fetchChatMessageList: (
        chatRoomId: number,
        page?: number,
        lastFetchTimeStamp?: string,
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
    isNewMsg: true,
    chatRoomList: [],
    messageList: [],
    curRoomInfo: null,
    connectedClient: null,
    firstFetchedTimestamp: null,
    morePage: true,
    subscriptionId: null,

    setIsNewMsg: (state) => {
        set({ isNewMsg: state });
    },

    // 다음 페칭 페이지 상태 초기화
    setMorePage: (state: boolean) => {
        set({ morePage: state });
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
                        if (newMsg.msg_type) {
                            set((state) => ({
                                chatRoomList: state.chatRoomList.map(
                                    (chatRoom) =>
                                        chatRoom.chatRoomId === room.chatRoomId
                                            ? {
                                                  ...chatRoom,
                                                  lastMessage: newMsg.msg,
                                                  unreadCount:
                                                      chatRoom.unreadCount + 1,
                                              }
                                            : chatRoom,
                                ),
                            }));
                        }
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
    fetchChatMessageList: async (chatRoomId, page) => {
        const { firstFetchedTimestamp } = get();

        const fetchTimestamp = new Date().toISOString().replace('Z', '');

        if (!get().firstFetchedTimestamp) {
            set({ firstFetchedTimestamp: fetchTimestamp });
        }

        const { ok, data } = await getChatMessageList({
            chatRoomId,
            pageSize: 15,
            startPage: page || 1,
            lastFetchTimestamp: firstFetchedTimestamp || fetchTimestamp,
        });

        if (!ok) {
            console.error('메시지 가져오기에 실패했습니다.');
            return;
        }

        const reversed = data.result.chatMessage.reverse();

        set((state) => ({
            messageList: [...reversed, ...state.messageList],
            curRoomInfo: {
                chatRoomId: data.result._id,
                other: data.result.other,
            },
            morePage: reversed.length < 15 ? false : true,
        }));

        get().subToChatRoom(chatRoomId);
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
            const subscription = client.subscribe(
                `/topic/chat/${chatRoomId}`,
                (message) => {
                    const newMsg = JSON.parse(message.body);

                    if (newMsg.msg_type) {
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
                            isNewMsg: true,
                        }));
                    } else {
                        set((state) => ({
                            messageList: state.messageList.map((msg) =>
                                msg.receiverId === newMsg.senderId
                                    ? { ...msg, readStatus: true }
                                    : msg,
                            ),
                        }));
                    }

                    set({ subscriptionId: subscription.id });
                },
            );

            const { user } = useUserStore.getState();
            if (user) {
                get().markMsgAsRead(chatRoomId, user.accountId);
                set({ isNewMsg: false });
            }
        };

        client.activate();
        set({ connectedClient: client });
    },

    // 특정 채팅방 구독 해제
    unSubFromChatRoom: () => {
        const client = get().connectedClient;
        const subscriptionId = get().subscriptionId;
        const curRoomInfo = get().curRoomInfo;

        if (client) {
            const { user } = useUserStore.getState();
            if (subscriptionId) client.unsubscribe(subscriptionId);
            if (curRoomInfo && user) {
                client.unsubscribe(
                    `/topic/chat/${curRoomInfo.chatRoomId}/${user.accountId}`,
                );
            }
            client.deactivate();
        }

        set({
            curRoomInfo: null,
            connectedClient: null,
            messageList: [],
            subscriptionId: null,
        });
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
