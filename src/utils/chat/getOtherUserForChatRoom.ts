import { IChatUserInfo } from '@/types/chat';

const getOtherUserForChatRoom = (
    participants: IChatUserInfo[],
    userId: string,
): IChatUserInfo | null => {
    const otherUser = participants.find(
        (participant) => participant.id !== userId,
    );

    return otherUser || null;
};

export default getOtherUserForChatRoom;
