import { PostItemProps } from '@/types/Sos';
import { utcToLocalDateTime } from '@/utils';
import MaleIcon from '@/assets/images/sos/gender-male.svg?react';
import FemaleIcon from '@/assets/images/sos/gender-female.svg?react';
import CalenderIcon from '@/assets/images/sos/calender.svg?react';
import MoneyIcon from '@/assets/images/sos/money-bag.svg?react';
import PencilIcon from '@/assets/images/sos/pencil.svg?react';

export default function PostItem({ post, onClick }: PostItemProps) {
    const {
        title,
        comment,
        // user,
        dog,
        startDate,
        endDate,
        wantPrice,
        wantPriceType,
        createdAt,
    } = post;

    return (
        <div
            className="border rounded-lg p-4 mb-4 shadow-sm cursor-pointer"
            onClick={onClick} // 클릭 핸들러 추가(디테일 페이지로 이동)
        >
            {/* 멍멍이 정보 */}
            <div className="text-sm text-gray-600 mb-2 flex gap-2 items-center">
                <div>
                    <img
                        src={dog.img}
                        alt="멍멍이 사진"
                        className="w-10 h-10 rounded-xl"
                    />
                </div>
                <p className="text-lg ml-2 flex gap-1 h-min items-center">
                    <span>{dog.name}</span>{' '}
                    {dog.gender === 'male' ? (
                        <MaleIcon className="w-5 h-5 -mt-[2px]" />
                    ) : (
                        <FemaleIcon className="w-5 h-5 -mt-[2px]" />
                    )}
                </p>
            </div>
            <hr className="my-2" />
            {/* 제목 및 기간 */}
            <h3 className="font-bold text-lg">{title}</h3>
            {/* 내용 */}
            <p className="text-sm text-gray-700">{comment}</p>
            {/* 돌봄 정보 */}
            <div className="bg-gray-200 px-2 py-1 rounded-lg mt-3">
                <p className="text- text-gray-600 flex gap-1">
                    🐶 소중한 우리 아이 돌봄 부탁드려요 💕
                </p>
                <p className="text-sm text-gray-600 flex gap-1 my-1 mt-1">
                    <CalenderIcon className="w-5 h-5" />
                    돌봄 시작일 {startDate}
                </p>
                <p className="text-sm text-gray-600 flex gap-1 my-1">
                    <CalenderIcon className="w-5 h-5" />
                    돌봄 종료일 {endDate}
                </p>
                <p className="text-sm text-gray-600 flex gap-1 my-1">
                    <MoneyIcon className="w-5 h-5" />
                    희망 금액 {wantPrice.toLocaleString()}원 /{' '}
                    {wantPriceType === 'hour' ? '시간' : '일'}
                </p>
            </div>
            <p className="text-sm text-gray-600 flex justify-end gap-1 mt-2">
                <PencilIcon className="w-5 h-5" />
                {utcToLocalDateTime(createdAt)}
            </p>
        </div>
    );
}
