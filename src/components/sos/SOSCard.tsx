import { formatDateWithDay } from '@/utils';
import { ISOSListItem } from '@/types/Sos';
import { PAYMENT_TYPE } from '@/constants/sos';

// SVG
import CalendarIcon from '@/assets/images/sos/calender.svg?react';
import FemaleIcon from '@/assets/images/sos/gender-female.svg?react';
import MaleIcon from '@/assets/images/sos/gender-male.svg?react';
import DogIcon from '@/assets/images/sos/dog.svg?react';
import { useFadeNavigate } from '@/hooks';

interface SOSCardProps {
    item: ISOSListItem;
}

export default function SOSCard({ item }: SOSCardProps) {
    const navigate = useFadeNavigate();
    const [startDate, symbol, endDate] = formatDateWithDay(
        item.startDate,
        item.endDate,
    );

    return (
        <div
            className="flex items-center py-[10px] px-[24px] gap-[16px] hover:bg-point-50 active:bg-point-50 cursor-pointer"
            onClick={() => navigate(`/sos/${item.id}`)}
        >
            <div className="flex-1 h-full flex flex-col gap-[8px]">
                <div className="text-label-m text-gray-200 font-extrabold">
                    <span className="py-[4px] px-[8px] bg-point-300 rounded-full">
                        {item.authorRegion}
                    </span>
                </div>
                {/* 날짜 */}
                <div className="flex items-center gap-[8px] text-gray-900">
                    <CalendarIcon className="w-[18px] h-[18px]" />
                    <div className="flex items-center gap-[4px] text-body-m font-semibold">
                        {startDate ? <span>{startDate}</span> : null}
                        {symbol ? <span>{symbol}</span> : null}
                        {endDate ? <span>{endDate}</span> : null}
                    </div>
                </div>
                {/* 내용 */}
                <div className="text-label-m font-semibold text-gray-400 line-clamp-2">
                    {item.comment}
                </div>
                <div className="text-label-m font-extrabold text-gray-500">
                    <span className="py-[2px] px-[8px] bg-gray-300 rounded-full">
                        {`${item.price ? `${item.price} / ` : ''}${PAYMENT_TYPE[item.paymentType]}`}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-[4px]">
                <div className="flex items-center text-label-m justify-between">
                    <div className="flex items-center">
                        <span>{item.pets[0].dogNm}</span>
                        {item.pets[0].sexNm === 'FEMALE' ? (
                            <FemaleIcon className="w-[14px] h-[14px]" />
                        ) : (
                            <MaleIcon className="w-[14px] h-[14px]" />
                        )}
                    </div>
                    <div className="flex items-center">
                        <DogIcon className="w-[14px] h-[14px]" />
                        <span>{item.pets.length}</span>
                    </div>
                </div>
                <img
                    className="w-[80px] h-[80px] border-1 border-gray-200 rounded-lg object-cover object-center"
                    src={item.pets[0].profileImg}
                    alt={`${item.pets[0].dogNm}의 사진`}
                />
            </div>
        </div>
    );
}
