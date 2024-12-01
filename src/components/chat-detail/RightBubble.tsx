import { IChatMessage, IChatUser } from '@/types/chat';
import { getDefaultProfileImg, utcToLocalDateTime } from '@/utils';

// SVG
import ArrowLeftIcon from '@/assets/images/arrow/arrowLeft.svg?react';
import { useFadeNavigate } from '@/hooks';

interface LeftBubbleProps {
    other: IChatUser;
    message: IChatMessage;
}

export default function RightBubble({ other, message }: LeftBubbleProps) {
    const navigate = useFadeNavigate();
    return (
        <>
            <div className="flex flex-col items-end gap-[4px]">
                <div className="flex items-end gap-[8px]">
                    <div className="max-w-[238px] py-[12px] px-[16px] bg-point-500 text-gray-100 text-label-l font-semibold rounded-t-2xl rounded-bl-2xl">
                        {message.msg}
                    </div>
                </div>
                <div className="flex items-center text-gray-500 text-label-s gap-[4px]">
                    <span>{utcToLocalDateTime(message.msgTimestamp)}</span>
                    <span>{message.readStatus ? '(읽음)' : '(안읽음)'}</span>
                </div>
            </div>
            {/* {message.msg_type === 'PLG' && (
                <div className="flex flex-col items-end gap-[4px]">
                    <div className="flex items-end gap-[8px]">
                        <div className="max-w-[238px] p-[16px] bg-violet-500 text-gray-100 text-label-l font-semibold rounded-t-2xl rounded-bl-2xl flex items-center gap-[10px]">
                            <div
                                onClick={() =>
                                    navigate(`/please/${message.msg}`)
                                }
                                className="flex items-center justify-center w-[24px] h-[24px] p-[5px] bg-violet-400 rounded-full cursor-pointer hover:bg-violet-600 active:bg-violet-600"
                            >
                                <ArrowLeftIcon className="text-violet-50" />
                            </div>
                            <img
                                className="w-[36px] h-[36px] rounded-full border-[0.5px] border-gray-200"
                                src={getDefaultProfileImg(
                                    other.profileURL || 'profile1',
                                )}
                                alt={`${other.userName}님의 프로필 사진`}
                            />
                            <div className="flex flex-col justify-center gap-[2px]">
                                <span className="text-gray-100 text-label-m font-extrabold">
                                    부탁 전송완료
                                </span>
                                <span className="text-detail text-violet-300">
                                    멍멍이 부탁을 전송했어요!
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-label-s gap-[4px]">
                        <span>{utcToLocalDateTime(message.msgTimestamp)}</span>
                        <span>
                            {message.readStatus ? '(읽음)' : '(안읽음)'}
                        </span>
                    </div>
                </div>
            )}
            {message.msg_type === 'END' && (
                <div className="flex flex-col items-end gap-[4px]">
                    <div className="flex items-end gap-[8px]">
                        <div className="max-w-[238px] p-[16px] bg-violet-500 text-gray-100 text-label-l font-semibold rounded-t-2xl rounded-bl-2xl flex items-center gap-[10px]">
                            <div
                                onClick={() =>
                                    navigate(`/please/${message.msg}`)
                                }
                                className="flex items-center justify-center w-[24px] h-[24px] p-[5px] bg-violet-400 rounded-full cursor-pointer hover:bg-violet-600 active:bg-violet-600"
                            >
                                <ArrowLeftIcon className="text-violet-50" />
                            </div>
                            <img
                                className="w-[36px] h-[36px] rounded-full border-[0.5px] border-gray-200"
                                src={getDefaultProfileImg(
                                    other.profileURL || 'profile1',
                                )}
                                alt={`${other.userName}님의 프로필 사진`}
                            />
                            <div className="flex flex-col justify-center gap-[2px]">
                                <span className="text-gray-100 text-label-m font-extrabold">
                                    돌봄완료
                                </span>
                                <span className="text-detail text-violet-300">
                                    멍멍이 돌봄이 완료되었어요!
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-label-s gap-[4px]">
                        <span>{utcToLocalDateTime(message.msgTimestamp)}</span>
                        <span>
                            {message.readStatus ? '(읽음)' : '(안읽음)'}
                        </span>
                    </div>
                </div>
            )} */}
        </>
    );
}
