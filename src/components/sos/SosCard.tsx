// SVG
import CalendarIcon from '@/assets/images/sos/calender.svg?react';
import FemaleIcon from '@/assets/images/sos/gender-female.svg?react';
import MaleIcon from '@/assets/images/sos/gender-male.svg?react';
import DogIcon from '@/assets/images/sos/dog.svg?react';

export default function SosCard({}) {
    return (
        <div className="flex items-center py-[10px] px-[24px] gap-[16px] hover:bg-point-50 active:bg-point-50 cursor-pointer">
            <div className="flex-1 h-full flex flex-col gap-[8px]">
                <div className="text-label-m text-gray-200 font-extrabold">
                    <span className="py-[4px] px-[8px] bg-point-300 rounded-full">
                        서울특별시 동작구
                    </span>
                </div>
                {/* 날짜 */}
                <div className="flex items-center gap-[8px] text-gray-900">
                    <CalendarIcon className="w-[18px] h-[18px]" />
                    <div className="flex items-center gap-[4px] text-body-m font-semibold">
                        <span>11.23(목)</span>
                        <span>-</span>
                        <span>11.24(금)</span>
                    </div>
                </div>
                {/* 내용 */}
                <div className="text-label-m font-semibold text-gray-400 line-clamp-2">
                    여행때문에 집을 비워야 하는데 매츠가 너무 애기라서 방문돌봄
                    요청합니다. 짧은 산책 가능하구요
                    랄라라랄라라라라라라라라라라라라라란러니러댜ㅓㄹ니아ㅓ라ㅣ너라ㅣㅣㅏㅇ너라ㅣㄴ어리ㅏㅇ너ㅏㅣ런아ㅣ런아ㅣ런아ㅣ러ㅏㅣㄴㅇ러ㅏㅣㄴㅇ러ㅏㅣㄴㅇ러나ㅣ어리나어라ㅣㄴ러ㅏㅣ너라ㅣ너라ㅣㅇ너라ㅣㄴ어라ㅣㄴ엉라ㅓ라
                </div>
                <div className="text-label-m font-extrabold text-gray-500">
                    <span className="py-[2px] px-[8px] bg-gray-300 rounded-full">
                        5000 /시간
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-[4px]">
                <div className="flex items-center text-label-m justify-between">
                    <div className="flex items-center">
                        <span>매츠</span>
                        <FemaleIcon className="w-[14px] h-[14px]" />
                    </div>
                    <div className="flex items-center">
                        <DogIcon className="w-[14px] h-[14px]" />
                        <span>1</span>
                    </div>
                </div>
                <div className="w-[80px] h-[80px] bg-gray-300 rounded-lg object-cover object-center" />
            </div>
        </div>
    );
}
