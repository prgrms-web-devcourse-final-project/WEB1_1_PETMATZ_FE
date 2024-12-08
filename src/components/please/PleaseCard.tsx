import { formatDateWithTime } from '@/utils';

// SVG
import CalendarIcon from '@/assets/images/sos/calender.svg?react';
import DogIcon from '@/assets/images/sos/dog.svg?react';
import { useFadeNavigate } from '@/hooks';
import { IPleaseItem } from '@/types/please';
import { PROGRESS_TYPE } from '@/constants/please';

interface SOSCardProps {
    item: IPleaseItem;
    activeTab: 'DOL' | 'MAL';
    userId: number;
}

export default function PleaseCard({ item, activeTab, userId }: SOSCardProps) {
    const navigate = useFadeNavigate();
    const otherInfo = item.petMissionUsers.find(
        (user) => user.roleType !== activeTab && user.userId !== userId,
    )!;

    return (
        <div
            className={`flex items-center py-[10px] px-[24px] gap-[16px] text-gray-900 cursor-pointer ${item.status === 'AFT' ? 'bg-gray-200' : ''} ${item.status === 'INP' ? 'bg-blue-100' : ''} ${item.status === 'BEF' ? 'bg-yellow-100' : ''}`}
            onClick={() => navigate(`/please/${item.missionId}`)}
        >
            <img
                className="w-[65px] h-[65px] rounded-full border-1 border-gray-200"
                src={otherInfo.userProfileURL}
                alt={`${otherInfo.userNickname}의 사진`}
            />
            <div className="flex-1 flex flex-col gap-[8px]">
                <div className="flex items-center justify-between">
                    <span className="text-body-l font-extrabold">
                        {otherInfo.userNickname}
                    </span>
                    <span
                        className={`text-label-s font-semibold py-[4.5px] px-[12.5px] rounded-lg ${item.status === 'AFT' ? 'bg-gray-500 text-white' : ''} ${item.status === 'INP' ? 'bg-blue-500 text-white' : ''} ${item.status === 'BEF' ? 'bg-yellow-400 text-white' : ''}`}
                    >
                        {PROGRESS_TYPE[item.status]}
                    </span>
                </div>
                <div className="flex items-center gap-[4px]">
                    <CalendarIcon className="w-[20px] h-[20px] text-gray-500" />
                    <div className="flex flex-col text-label-m text-gray-500 font-extrabold">
                        <span>
                            {formatDateWithTime(item.petMissionStarted)}
                        </span>
                        <span>{formatDateWithTime(item.petMissionEnd)}</span>
                    </div>
                </div>
            </div>
            {item.petInfo.length > 0 ? (
                <div className="flex flex-col gap-[4px] w-[65px] h-[85px]">
                    <div className="flex items-center justify-center gap-[4px] text-label-m">
                        <DogIcon className="w-[14px] h-[14px]" />
                        <span>{item.petInfo.length}</span>
                    </div>
                    <img
                        className="w-[65px] h-[65px] border-1 border-gray-200 rounded-lg object-cover object-center"
                        src={item.petInfo[0].imgURL}
                        alt={`${item.petInfo[0].petId}의 사진`}
                    />
                </div>
            ) : (
                <div className="w-[65px] h-[85px] rounded-lg" />
            )}
        </div>
    );
}
