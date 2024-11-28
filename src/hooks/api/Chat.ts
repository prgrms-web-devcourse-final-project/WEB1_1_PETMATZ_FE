import {
    ChatMessageListApiResponse,
    ChatMessageListApiRequest,
    ChatRoomCreateApiResponse,
    ChatRoomCreateApiRequest,
    ChatRoomListApiResponse,
} from '@/types/chat';
import { http } from './base';

/**
 * GET	ChatRoomList
 * 채팅방 리스트와 정보를 가져옵니다.
 */
export const getChatRoomList = async (): Promise<ChatRoomListApiResponse> =>
    await http.get<ChatRoomListApiResponse>('/match');

/**
 * POST	ChatRoom	Create
 * 채팅방을 생성합니다.
 */
export const createChatRoom = async ({
    entrustedEmail,
}: ChatRoomCreateApiRequest): Promise<ChatRoomCreateApiResponse> =>
    await http.post<ChatRoomCreateApiResponse, ChatRoomCreateApiRequest>(
        '/match',
        { entrustedEmail },
    );

/**
 * GET	ChatMessageList
 * 채팅 상세 내역을 가져옵니다.
 */
export const getChatMessageList = async ({
    chatRoomId,
    pageSize,
    startPage,
    lastTimeStamp,
}: ChatMessageListApiRequest): Promise<ChatMessageListApiResponse> =>
    await http.get<ChatMessageListApiResponse, ChatMessageListApiRequest>(
        '/chat/message',
        { chatRoomId, pageSize, startPage, lastTimeStamp },
    );
