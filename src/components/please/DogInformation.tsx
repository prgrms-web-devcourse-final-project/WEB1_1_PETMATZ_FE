import { DogCard } from '@/components/common';

interface DogInfoProps {
    dogId?: string; // 필요하다면 개별 멍멍이 ID 추가
}

export default function DogInformation({ dogId }: DogInfoProps) {
    // 추후 useEffect와 특정 멍멍이 ID로 데이터를 불러오는 로직 추가

    return (
        <main className="p-4 overflow-y-auto h-full">
            <h1 className="text-title-s font-extrabold text-gray-800 pt-8 pb-4">
                <p>우리가</p>
                <p>도와줄 멍멍이는</p>
            </h1>
            <div className="space-y-3">
                {/* 강아지가 늘어난다면..? 3마리이상...? 스크롤뷰 필요할수도 */}
                <DogCard
                    id={5}
                    dogNm="예삐"
                    sexNm="암컷"
                    kindNm="페키니즈"
                    neuterYn="중성"
                    profileImg="https://example.com/uploads/profile.png"
                    age={7}
                    temperament="ENTP"
                    size="SMALL"
                    comment={false}
                    edit={false}
                />
            </div>
            <div className="space-y-4 mt-6">
                <div className="flex gap-5 items-center">
                    <p className="text-label-m text-gray-500 ">돌봄이</p>
                    <p className="text-body-m font-semibold text-gray-900 ml-2">
                        솜이누나
                    </p>
                </div>
                <div className="flex gap-5 items-center">
                    <p className="text-label-m text-gray-500 ">맡김이</p>
                    <p className="text-body-m font-semibold text-gray-900 ml-2">
                        절미방딩이
                    </p>
                </div>
            </div>
            <div className="space-y-2 mt-6">
                <div>
                    <p className="text-label-m text-gray-500 mb-2">
                        돌봄 시작일
                    </p>
                    <div className="flex items-center">
                        <input
                            id="startDate"
                            className="input-outline flex-1 mr-2  sm:!px-4 px-3"
                            value="2024년 11월 28일"
                            style={{ pointerEvents: 'none' }}
                        />
                        <input
                            id="startTime"
                            className="input-outline text-gray-400 md:!w-[135px] w-[105px] sm:!px-4 px-3"
                            value="오후 01:00"
                            style={{ pointerEvents: 'none' }}
                        />
                    </div>
                </div>
                <div>
                    <p className="text-label-m text-gray-500 mb-2">
                        돌봄 종료일
                    </p>
                    <div className="flex items-center">
                        <input
                            id="startDate"
                            className="input-outline flex-1 mr-2  sm:!px-4 px-3"
                            value="2024년 11월 29일"
                            style={{ pointerEvents: 'none' }}
                        />
                        <input
                            id="startTime"
                            className="input-outline text-gray-400 md:!w-[135px] w-[105px] sm:!px-4 px-3"
                            value="오후 03:00"
                            style={{ pointerEvents: 'none' }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
