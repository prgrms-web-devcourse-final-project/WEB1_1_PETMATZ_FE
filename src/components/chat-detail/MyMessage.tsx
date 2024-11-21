import { IMessage } from '@/types/chat';

interface MyMessageProps {
    message: IMessage;
}

export default function MyMessage({ message }: MyMessageProps) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble text-sm">{message.msg}</div>
            <div className="chat-footer opacity-50 text-xs">
                {message.msgTimestamp}
            </div>
        </div>
    );
}
