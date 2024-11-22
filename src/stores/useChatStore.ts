import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

interface Message {
    roomId: string;
    senderId: string;
    message: string;
}

interface ChatRoom {
    id: string;
    name: string;
    lastMessage: Message | null;
    unreadCount: number;
}

interface ChatStore {
    messages: Record<string, Message[]>;
    chatRooms: ChatRoom[];
    stompClient: Client | null;
    connect: (roomId: string) => void;
    disconnect: () => void;
    subToRoom: (roomId: string) => void;
    sendMsg: (roomId: string, msg: Message) => void;
    updateRoom: (roomId: string, message: Message) => void;
    resetUnreadCount: (roomId: string) => void;
}

const STOMP_CONNECT_URL = import.meta.env.VITE_STOMP_CONNECT_URL as string;
const STOMP_SUB_PATH = import.meta.env.VITE_STOMP_SUB_PATH as string;

const useChatStore = create<ChatStore>((set, get) => ({
    messages: {},
    chatRooms: [],
    stompClient: null,

    // STOMP 연결
    connect: (roomId: string) => {
        const client = new Client({
            webSocketFactory: () =>
                new SockJS(`${STOMP_CONNECT_URL}/${roomId}`),
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
        });

        client.onConnect = () => {
            console.log('STOMP 연결 성공');

            // 모든 채팅방 구독
            const chatRooms = get().chatRooms;
            chatRooms.forEach((room) => {
                get().subToRoom(room.id);
            });
        };

        client.onStompError = (frame) => {
            console.error('STOMP 에러', frame);
        };

        client.activate();
        set({ stompClient: client });
    },

    // STOMP 연결 종료
    disconnect: () => {
        const client = get().stompClient;

        if (client) {
            client.deactivate();
            set({ stompClient: null });
        }
    },

    // 채팅방 Sub
    subToRoom: (roomId) => {
        const client = get().stompClient;

        if (client) {
            client.subscribe(
                `${STOMP_SUB_PATH}/${roomId}`,
                (message: IMessage) => {
                    const receivedMsg: Message = JSON.parse(message.body);
                    get().updateRoom(roomId, receivedMsg);
                },
            );
        }
    },

    // 메시지 전송
    sendMsg: (roomId, message) => {
        const client = get().stompClient;

        if (client && client.connected) {
            client.publish({
                destination: `${STOMP_SUB_PATH}/${roomId}`,
                body: JSON.stringify(message),
            });
        }
    },

    // 채팅방 상태 업데이트
    updateRoom: (roomId, message) => {
        set((state) => {
            const updatedRooms = state.chatRooms.map((room) =>
                room.id === roomId
                    ? {
                          ...room,
                          lastMessage: message,
                          unreadCount: room.unreadCount + 1,
                      }
                    : room,
            );

            return {
                chatRooms: updatedRooms,
                messages: {
                    ...state.messages,
                    [roomId]: [...(state.messages[roomId] || []), message],
                },
            };
        });
    },

    // 읽음 처리
    resetUnreadCount: (roomId) => {
        set((state) => ({
            chatRooms: state.chatRooms.map((room) =>
                room.id === roomId ? { ...room, unreadCount: 0 } : room,
            ),
        }));
    },
}));

export default useChatStore;
