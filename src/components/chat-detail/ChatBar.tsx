import SendIcon from '@/assets/images/send.svg?react';

export default function ChatBar() {
    return (
        <div className="p-4">
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="메시지 입력" />
                <button className="btn p-0">
                    <SendIcon className="w-5 h-5" />
                </button>
            </label>
        </div>
    );
}
