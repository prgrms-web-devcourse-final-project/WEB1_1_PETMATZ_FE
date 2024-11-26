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
    connectedSocketList: Map<string, Client>;
    curRoomInfo: Pick<IChatRoom, '_id' | 'other'> | null;

    // 채팅방 생성
    createChatRoom: (entrustedName: string) => Promise<void>;

    // 채팅방 리스트
    fetchChatRoomList: () => Promise<void>;
    unSubFromChatRoomList: () => void;

    // 특정 채팅방
    fetchChatMessageList: (chatRoomId: string) => Promise<void>;
    subToChatRoom: (chatRoomId: string) => void;
    unSubFromChatRoom: () => void;

    // 메세지 전송
    sendMsg: (chatRoomId: string, msg: string, msg_type: 'msg' | 'plz') => void;
}

const STOMP_CONNECT_URL = import.meta.env.VITE_STOMP_CONNECT_URL as string;
const STOMP_SUB_PATH = import.meta.env.VITE_STOMP_SUB_PATH as string;
const STOMP_PUB_PATH = import.meta.env.VITE_STOMP_PUB_PATH as string;

const useChatStore = create<ChatStore>((set, get) => ({
    chatRoomList: [],
    messageList: [],
    connectedSocketList: new Map(),
    curRoomInfo: null,

    // 채팅방 리스트 가져오기 및 소켓 연결
    fetchChatRoomList: async () => {
        const { ok, data } = await getChatRoomList();

        if (!ok) {
            console.error('채팅방 리스트 가져오기에 실패했습니다.');
            return;
        }

        set({ chatRoomList: data.result });

        const connectedSocketList = new Map();

        data.result.forEach((room) => {
            const socket = new SockJS(
                `${STOMP_CONNECT_URL}?roomId=${room._id}`,
            );
            const stompClient = new Client({ webSocketFactory: () => socket });

            stompClient.onConnect = () => {
                stompClient.subscribe(STOMP_SUB_PATH, (message) => {
                    const newMsg = JSON.parse(message.body);
                    set((state) => ({
                        chatRoomList: state.chatRoomList.map((chatRoom) =>
                            chatRoom._id === room._id
                                ? {
                                      ...chatRoom,
                                      lastMessage: newMsg.msg,
                                      messageCount: chatRoom.unreadCount + 1,
                                  }
                                : chatRoom,
                        ),
                    }));
                });
            };

            stompClient.activate();
            connectedSocketList.set(room._id, stompClient);
        });

        set({ connectedSocketList });
    },

    // 모든 채팅방 소켓 연결 해제
    unSubFromChatRoomList: () => {
        const connectedSocketList = get().connectedSocketList;
        connectedSocketList.forEach((client) => client.deactivate());
        set({ connectedSocketList: new Map() });
    },

    // 특정 채팅방 메시지 가져오기
    fetchChatMessageList: async (chatRoomId) => {
        const { ok, data } = await getChatMessageList({
            chatRoomId,
            pageSize: 15,
            startPage: 1,
        });

        if (!ok) {
            console.log('채팅방 메시지를 가져오는데 실패했습니다.');
            return;
        }

        set({
            messageList: data.result.messages,
            curRoomInfo: {
                _id: data.result._id,
                other: data.result.other,
            },
        });

        // 소켓 연결
        get().subToChatRoom(chatRoomId);
    },

    // 특정 채팅방 구독
    subToChatRoom: (chatRoomId) => {
        const connectedSocketList = get().connectedSocketList;

        // 소켓 연결 판단
        if (connectedSocketList.has(chatRoomId)) {
            console.log('이미 소켓이 연결되어 있습니다.');
            return;
        }

        const socket = new SockJS(`${STOMP_CONNECT_URL}?roomId=${chatRoomId}`);
        const stompClient = new Client({ webSocketFactory: () => socket });

        stompClient.onConnect = () => {
            stompClient.subscribe(STOMP_SUB_PATH, (message) => {
                const rawData = JSON.parse(message.body);
                const newMsg: IChatMessage = {
                    senderId: rawData.senderId,
                    receiverId: rawData.receiverId,
                    msg: rawData.msg,
                    msg_type: rawData.msg_type,
                    msgTimestamp: new Date().toISOString(),
                    readStatus: true,
                };
                set((state) => ({
                    messageList: [...state.messageList, newMsg],
                }));
            });
        };

        stompClient.activate();
        set(() => ({
            connectedSocketList: new Map([[chatRoomId, stompClient]]),
        }));
    },

    // 특정 채팅방 구독 해제
    unSubFromChatRoom: () => {
        const connectedSocketList = get().connectedSocketList;
        const roomId = get().curRoomInfo?._id;

        if (roomId && connectedSocketList.has(roomId)) {
            connectedSocketList.get(roomId)?.deactivate();
            connectedSocketList.delete(roomId);
        }

        set({ connectedSocketList, curRoomInfo: null });
    },

    // 메시지 전송
    sendMsg: (chatRoomId, msg, msg_type) => {
        const connectedSocketList = get().connectedSocketList;
        const stompClient = connectedSocketList.get(chatRoomId);

        if (stompClient) {
            stompClient.publish({
                destination: STOMP_PUB_PATH,
                body: JSON.stringify({ chatRoomId, msg, msg_type }),
            });
        }
    },

    // 채팅방 생성
    createChatRoom: async (entrustedEmail) => {
        const { ok, data } = await createChatRoom({ entrustedEmail });
        const navigate = useFadeNavigate();

        if (!ok) {
            console.log('채팅방 생성에 실패했습니다.');
            return;
        }

        navigate(`/chat/${data.result}`);
    },
}));

export default useChatStore;
