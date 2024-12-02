import { useFadeNavigate } from '@/hooks';
import Profile1 from '@/assets/images/profile/profile1.svg?react';
import MaleIcon from '@/assets/images/gender/male.svg?react';
import FemaleIcon from '@/assets/images/gender/female.svg?react';
import { useDogInfo } from '@/hooks/useDogInfo';

interface DogCardProps {
    id: number;
    edit?: boolean;
    comment?: boolean;
}

export default function DogCard({
    id,
    edit = false,
    comment = false,
}: DogCardProps) {
    const { dogInfo, loading, error } = useDogInfo(id); // 커스텀 훅 사용
    const navigate = useFadeNavigate();

    // 사이즈 변환 함수
    const convertSizeToKorean = (size: string) => {
        switch (size) {
            case 'SMALL':
                return '소형견';
            case 'MIDDLE':
                return '중형견';
            case 'LARGE':
                return '대형견';
            default:
                return size;
        }
    };

    if (loading || !dogInfo || error) {
        // 로딩 중이거나 강아지 정보가 없는 경우 로딩 상태 표시
        return (
            <div className="flex flex-col border p-4 rounded-lg shadow-md bg-white relative animate-pulse">
                <div className="flex items-center gap-4">
                    <div className="w-[72px] h-[72px] bg-gray-300 rounded-full"></div>
                    <div className="flex flex-col gap-2">
                        <div className="h-5 bg-gray-300 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                </div>
                {comment && (
                    <div className="mt-4">
                        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                )}
            </div>
        );
    }

    // if (error) {
    //     // 에러가 발생한 경우 에러 메시지 표시
    //     return <div>정보를 불러올 수 없습니다.</div>;
    // }

    return (
        <div className="flex flex-col border p-4 rounded-lg shadow-md bg-white relative">
            <div className="flex items-center gap-4">
                <Profile1 className="w-[72px] h-[72px]" />
                <div>
                    <h2 className="text-body-l font-bold flex items-center mb-1">
                        {dogInfo.dogNm}{' '}
                        <span className="text-sm">
                            {dogInfo.sexNm === '암컷' ? (
                                <FemaleIcon className="w-6 h-6 text-warning-300" />
                            ) : (
                                <MaleIcon className="w-6 h-6 text-blue-500" />
                            )}
                        </span>
                        <span className="text-label-m font-semibold text-gray-400 ml-1">
                            {dogInfo.kindNm}
                        </span>
                    </h2>
                    <div className="text-label-m font-bold text-point-500">
                        <p>
                            #{convertSizeToKorean(dogInfo.size)} #{dogInfo.age}
                            살 #{dogInfo.neuterYn} #{dogInfo.temperament}
                        </p>
                    </div>
                </div>
            </div>

            {comment && (
                <div className="flex flex-col gap-2 mt-4">
                    <p className="text-label-m font-regular text-gray-500">
                        멍멍이 소개
                    </p>
                    <textarea
                        className="pointer-events-none rounded-lg text-label-l border-gray-200 p-3 w-full"
                        value={dogInfo.comment}
                        readOnly
                    ></textarea>
                </div>
            )}
            {edit && (
                <button
                    className="mt-4 text-sm text-blue-500 absolute right-6 top-0"
                    onClick={() => navigate('/dog-edit')}
                >
                    수정
                </button>
            )}
        </div>
    );
}
