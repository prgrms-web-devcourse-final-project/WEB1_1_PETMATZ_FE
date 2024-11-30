import { BaseApiResponse } from './baseResponse';

interface IChatUser {
    _id: number;
    email: string;
    nickname: string;
    profileImgUrl: string;
}

interface IChatRoom {
    _id: number;
    lastMessage: string | 'first';
    unreadCount: number;
    lastMessageTimestamp: string;
    other: IChatUser;
}

interface IChatMessage {
    senderId: string;
    receiverId: string;
    msg: string;
    msg_type: 'MSG' | 'PLZ' | 'END';
    msgTimestamp: string;
    readStatus: boolean;
}

//	POST create ChatRoom
interface ChatRoomCreateApiRequest {
    entrustedEmail: string;
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
    chatRoomId: number;
    pageSize?: number;
    startPage?: number;
    lastTimeStamp?: string;
}
interface ChatMessageListApiResponse extends BaseApiResponse {
    data: {
        result: {
            _id: number;
            messages: IChatMessage[];
            other: IChatUser;
            pageNumber: number;
            totalPages: number;
            totalElements: number;
        };
    };
}

export type {
    IChatUser,
    IChatRoom,
    IChatMessage,
    ChatRoomListApiResponse,
    ChatRoomCreateApiRequest,
    ChatRoomCreateApiResponse,
    ChatMessageListApiRequest,
    ChatMessageListApiResponse,
};
