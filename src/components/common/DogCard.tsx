import { useFadeNavigate } from '@/hooks';
import MaleIcon from '@/assets/images/gender/male.svg?react';
import FemaleIcon from '@/assets/images/gender/female.svg?react';

interface DogCardProps {
    id: number;
    dogNm: string;
    sexNm: string;
    kindNm: string;
    neuterYn: string;
    profileImg: string;
    age: number;
    temperament: string;
    size: string;
    comment?: string;
    isComment?: boolean; // comment가 true일 때만 강아지 소개 표시
    edit?: boolean; // 수정 버튼 표시 여부
}

export default function DogCard({
    id,
    dogNm,
    sexNm,
    kindNm,
    neuterYn,
    profileImg,
    age,
    temperament,
    size,
    isComment = false,
    comment = '',
    edit = false,
}: DogCardProps) {
    const navigate = useFadeNavigate();

    // 사이즈 변환 함수
    const convertSizeToKorean = (size: string) => {
        switch (size.toUpperCase()) {
            case 'SMALL':
                return '소형견';
            case 'MEDIUM':
                return '중형견';
            case 'LARGE':
                return '대형견';
            default:
                return size;
        }
    };

    return (
        <div className="flex flex-col border px-6 py-4 rounded-lg shadow-md bg-gray-100 relative">
            <div className="flex items-center gap-4">
                {/* 프로필 이미지 */}
                <img
                    src={profileImg}
                    alt={dogNm}
                    className="w-[72px] h-[72px] rounded-full border border-gray-200 object-cover"
                />
                <div>
                    <div className="flex items-center mb-2">
                        <h2 className="text-body-l font-extrabold flex items-center">
                            {dogNm}{' '}
                        </h2>
                        <span className="text-sm">
                            {sexNm == '암컷' ? (
                                <FemaleIcon className="w-6 h-6 p-[2px]" />
                            ) : (
                                <MaleIcon className="w-6 h-6 p-[2px]" />
                            )}
                        </span>
                        <span className="text-label-m font-semibold text-gray-400 ml-2">
                            {kindNm}
                        </span>
                    </div>
                    <div className="text-label-m font-bold text-point-500 flex gap-1.5 flex-wrap">
                        <p className="px-2 py-1 bg-white rounded-[30px]">
                            {temperament}
                        </p>
                        <p className="px-2 py-1 bg-white rounded-[30px]">
                            {convertSizeToKorean(size)}
                        </p>
                        <p className="px-2 py-1 bg-white rounded-[30px]">
                            {age}살
                        </p>
                        <p className="px-2 py-1 bg-white rounded-[30px]">
                            {neuterYn === '중성' ? '중성화 완료' : ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* isComment true일 때만 멍멍이 소개 영역 표시 */}
            {/* true인 경우 : 돌봄 디테일 페이지 , false인 경우 : 부탁 상세조회 페이지 */}
            {isComment && (
                <div className="flex flex-col gap-2 mt-4">
                    <p className="text-label-m font-regular text-gray-400">
                        멍멍이 소개
                    </p>
                    <textarea
                        className="pointer-events-none rounded-lg text-label-l border-gray-200 p-3 w-full"
                        value={comment}
                        readOnly
                    ></textarea>
                </div>
            )}

            {/* 수정 버튼 */}
            {edit && (
                <button
                    className="mt-4 text-sm text-blue-500 absolute right-6 top-0"
                    onClick={() => navigate(`/dog-edit/${id}`)}
                >
                    수정
                </button>
            )}
        </div>
    );
}
