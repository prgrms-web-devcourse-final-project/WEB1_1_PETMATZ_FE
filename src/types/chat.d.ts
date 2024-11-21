import { BaseApiResponse } from './baseResponse';

interface IChatUserInfo {
    id: string;
    nickname: string;
    profileImgUrl: string;
}

interface IChatRoomInfo {
    id: string;
    lastMessage: string;
    messageCount: number;
    lastMessageTimestamp: string;
    participants: IChatUserInfo[];
}

interface IMessage {
    id: string;
    senderId: string;
    receiverId: string;
    msg: string;
    msgTimestamp: string;
    readStatus: boolean;
}

interface IChatRoom {
    id: string;
    entrusted: IChatUserInfo;
    caregiver: IChat;
    messages: IMessage[];
}

//	GET	ChatRoom
interface ChatRoomListApiResponse extends BaseApiResponse {
    ChatRooms: IChatRoom[];
}

export type {
    IChatUserInfo,
    IChatRoomInfo,
    IChatRoom,
    IMessage,
    ChatRoomListApiResponse,
};
