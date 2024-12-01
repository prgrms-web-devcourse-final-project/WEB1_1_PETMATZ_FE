import { BaseApiResponse } from './baseResponse';

interface IChatUser {
    userId: number;
    userEmail: string;
    userName: string;
    profileURL: string | null;
}

interface IChatRoom {
    chatRoomId: number;
    lastMessage: string | 'first';
    unreadCount: number;
    lastMessageTimestamp: string;
    other: IChatUser;
}

interface IChatMessage {
    senderId: string;
    receiverId: string;
    msg: string;
    msg_type: 'MSG' | 'PLG' | 'END';
    msgTimestamp: string;
    readStatus: boolean;
}

interface IPub {
    msg: string;
    msg_type: 'MSG' | 'PLG' | 'END';
    readStatus: boolean;
    receiverEmail: string;
    senderEmail: string;
    msgTimestamp: string;
}

//	POST create ChatRoom
interface ChatRoomCreateApiRequest {
    entrustedEmail: string;
    caregiverEmail: string;
}
interface ChatRoomCreateApiResponse extends BaseApiResponse {
    data: {
        result: number;
    };
}

//	GET	ChatRoomList
interface ChatRoomListApiResponse extends BaseApiResponse {
    data: {
        result: IChatRoom[];
    };
}

//	GET	MessageList
interface ChatMessageListApiRequest {
    receiverEmail: string;
    chatRoomId: number;
    pageSize?: number;
    startPage?: number;
    lastTimeStamp?: string;
}
interface ChatMessageListApiResponse extends BaseApiResponse {
    data: {
        result: {
            _id: number;
            chatMessage: IChatMessage[];
            other: IChatUser;
            pageNumber: number;
            totalPages: number;
            totalElements: number;
        };
    };
}

export type {
    IPub,
    IChatUser,
    IChatRoom,
    IChatMessage,
    ChatRoomListApiResponse,
    ChatRoomCreateApiRequest,
    ChatRoomCreateApiResponse,
    ChatMessageListApiRequest,
    ChatMessageListApiResponse,
};
