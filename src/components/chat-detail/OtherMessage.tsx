import { IChatUserInfo, IMessage } from '@/types/chat';

interface OtherMessageProps {
    message: IMessage;
    user: IChatUserInfo;
}

export default function OtherMessage({ message, user }: OtherMessageProps) {
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-14 rounded-full">
                    <img
                        alt={`${user.nickname}님의 프로필 이미지`}
                        src={user.profileImgUrl || ''}
                    />
                </div>
            </div>
            <div className="chat-header text-base">
                {user.nickname}
                <time className="ml-2 text-xs opacity-50">
                    {message.msgTimestamp}
                </time>
            </div>
            <div className="chat-bubble text-sm">{message.msg}</div>
            <div className="chat-footer opacity-50 text-xs">
                {message.readStatus ? '읽음' : '안읽음'}
            </div>
        </div>
    );
}
