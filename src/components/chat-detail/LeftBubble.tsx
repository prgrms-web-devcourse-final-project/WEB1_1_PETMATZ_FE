import { useFadeNavigate } from '@/hooks';
import { IChatMessage, IChatUser } from '@/types/chat';
import { utcToLocalDateTime } from '@/utils';

// SVG
import ArrowRightIcon from '@/assets/images/arrow/arrowRight.svg?react';

interface LeftBubbleProps {
    other: IChatUser;
    message: IChatMessage;
}

export default function LeftBubble({ other, message }: LeftBubbleProps) {
    const navigate = useFadeNavigate();
    return (
        <>
            {message.msg_type === 'MSG' && (
                <div className="flex flex-col gap-[4px]">
                    <div className="flex items-end gap-[8px]">
                        <img
                            className="w-[28px] h-[28px] rounded-full border-[0.5px] border-gray-200"
                            src={other.profileURL || ''}
                        />
                        <div className="max-w-[238px] py-[12px] px-[16px] bg-gray-200 text-gray-900 text-label-l font-semibold rounded-t-2xl rounded-br-2xl break-words">
                            {message.msg}
                        </div>
                    </div>
                    <div className="flex items-center pl-[36px] text-gray-500 text-label-s gap-[4px]">
                        <span>{utcToLocalDateTime(message.msgTimestamp)}</span>
                        <span>
                            {message.readStatus ? '(읽음)' : '(안읽음)'}
                        </span>
                    </div>
                </div>
            )}
            {message.msg_type === 'PLG' && (
                <div className="flex flex-col gap-[4px]">
                    <div className="flex items-end gap-[8px]">
                        <img
                            className="w-[28px] h-[28px] rounded-full border-[0.5px] border-gray-200"
                            src={other.profileURL || ''}
                        />
                        <div className="max-w-[238px] p-[16px] bg-gray-200 text-gray-100 text-label-l font-semibold rounded-t-2xl rounded-br-2xl flex items-center gap-[10px]">
                            <div className="flex flex-col justify-center gap-[2px]">
                                <span className="text-gray-900 text-label-m font-extrabold">
                                    부탁 전송완료
                                </span>
                                <span className="text-detail text-gray-500">
                                    멍멍이 부탁을 전송했어요!
                                </span>
                            </div>
                            <img
                                className="w-[36px] h-[36px] rounded-full border-[0.5px] border-gray-200"
                                src={other.profileURL || ''}
                                alt={`${other.userName}님의 프로필 사진`}
                            />
                            <div
                                onClick={() =>
                                    navigate(`/please/${message.msg}`)
                                }
                                className="flex items-center justify-center w-[24px] h-[24px] p-[5px] bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 active:bg-gray-400"
                            >
                                <ArrowRightIcon className="text-gray-50" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-label-s gap-[4px] pl-[36px]">
                        <span>{utcToLocalDateTime(message.msgTimestamp)}</span>
                        <span>
                            {message.readStatus ? '(읽음)' : '(안읽음)'}
                        </span>
                    </div>
                </div>
            )}
            {message.msg_type === 'END' && (
                <div className="flex flex-col gap-[4px]">
                    <div className="flex items-end gap-[8px]">
                        <img
                            className="w-[28px] h-[28px] rounded-full border-[0.5px] border-gray-200"
                            src={other.profileURL || ''}
                        />
                        <div className="max-w-[238px] p-[16px] bg-gray-200 text-gray-100 text-label-l font-semibold rounded-t-2xl rounded-br-2xl flex items-center gap-[10px]">
                            <div className="flex flex-col justify-center gap-[2px]">
                                <span className="text-gray-900 text-label-m font-extrabold">
                                    돌봄완료
                                </span>
                                <span className="text-detail text-gray-500">
                                    멍멍이 돌봄이 완료되었어요!
                                </span>
                            </div>
                            <img
                                className="w-[36px] h-[36px] rounded-full border-[0.5px] border-gray-200"
                                src={other.profileURL || ''}
                                alt={`${other.userName}님의 프로필 사진`}
                            />
                            <div
                                onClick={() =>
                                    navigate(`/please/${message.msg}`)
                                }
                                className="flex items-center justify-center w-[24px] h-[24px] p-[5px] bg-gray-400 rounded-full cursor-pointer hover:bg-gray-400 active:bg-gray-400"
                            >
                                <ArrowRightIcon className="text-gray-50" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-label-s gap-[4px] pl-[36px]">
                        <span>{utcToLocalDateTime(message.msgTimestamp)}</span>
                        <span>
                            {message.readStatus ? '(읽음)' : '(안읽음)'}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
