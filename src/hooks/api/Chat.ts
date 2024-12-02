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
    await http.get<ChatRoomListApiResponse>('/api/v1/match');

/**
 * POST	ChatRoom	Create
 * 채팅방을 생성합니다.
 */
export const createChatRoom = async ({
    entrustedEmail,
    caregiverEmail,
}: ChatRoomCreateApiRequest): Promise<ChatRoomCreateApiResponse> =>
    await http.post<ChatRoomCreateApiResponse, ChatRoomCreateApiRequest>(
        '/api/v1/match',
        { entrustedEmail, caregiverEmail },
    );

/**
 * GET	ChatMessageList
 * 채팅 상세 내역을 가져옵니다.
 */
export const getChatMessageList = async ({
    chatRoomId,
    pageSize,
    startPage,
    lastFetchTimestamp,
}: ChatMessageListApiRequest): Promise<ChatMessageListApiResponse> =>
    await http.get<ChatMessageListApiResponse, ChatMessageListApiRequest>(
        '/api/v1/chat/message',
        { chatRoomId, pageSize, startPage, lastFetchTimestamp },
    );
