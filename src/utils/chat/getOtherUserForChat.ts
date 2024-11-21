import { IChatRoom } from '@/types/chat';

const getOtherUserForChat = (chatRoom: IChatRoom | null, userId?: string) => {
    if (!chatRoom || !userId) return null;

    return chatRoom.entrusted.id === userId
        ? chatRoom.caregiver
        : chatRoom.entrusted;
};

export default getOtherUserForChat;
