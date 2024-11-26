import { BaseApiResponse } from './baseResponse';

interface IChatUser {
    _id: string;
    email: string;
    nickname: string;
    profileImgUrl: string;
}

interface IChatRoom {
    _id: string;
    lastMessage: string | 'first';
    unreadCount: number;
    lastMessageTimestamp: string;
    other: IChatUser;
}

interface IChatMessage {
    senderId: string;
    receiverId: string;
    msg: string;
    msg_type: 'msg' | 'plz';
    msgTimestamp: string;
    readStatus: boolean;
}

//	POST create ChatRoom
interface ChatRoomCreateApiRequest {
    entrustedEmail: string;
}
interface ChatRoomCreateApiResponse extends BaseApiResponse {
    data: {
        result: string;
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
    chatRoomId: string;
    pageSize?: number;
    startPage?: number;
}
interface ChatMessageListApiResponse extends BaseApiResponse {
    data: {
        result: {
            _id: string;
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
