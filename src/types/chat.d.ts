import { BaseApiResponse } from './baseResponse';

interface ISender {
    id: string;
    nickname: string;
    profileImgUrl: string;
}

interface IChatRoom {
    id: string;
    sender: ISender;
    message: string;
    unReadMessageCount: number;
    createdAt: string;
    updatedAt: string;
}

//	GET	ChatRoom
interface ChatRoomListApiResponse extends BaseApiResponse {
    ChatRooms: IChatRoom[];
}

export type { ISender, IChatRoom, ChatRoomListApiResponse };
