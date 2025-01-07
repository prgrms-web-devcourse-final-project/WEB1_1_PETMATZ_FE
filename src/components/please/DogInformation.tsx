import { DogCard } from '@/components/common';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DogInformation.css';
import { formatDate, formatTime } from '@/utils';
import { MissionInfo } from '@/types/please';
import { useRecommendation } from '@/hooks/please';
import Thumb from '@/assets/images/thumb_up.svg?react';

interface DogInfoProps {
    missionInfo: MissionInfo;
    status: 'BEF' | 'INP' | 'AFT';
    userId?: number;
}

export default function DogInformation({
    missionInfo,
    status,
    userId,
}: DogInfoProps) {
    const { isRecommended, handleRecommend } = useRecommendation();

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: 'dog-slider',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    const dogs = missionInfo.petMissionPetInfos.map((pet) => ({
        id: parseInt(pet.petName, 10),
        dogNm: pet.petName,
        sexNm: pet.gender === 'FEMALE' ? '암컷' : '수컷',
        kindNm: pet.breed,
        neuterYn: pet.neuterYn,
        profileImg: pet.imgURL, // 기본 이미지
        age: pet.age,
        temperament: pet.temperament,
        size: pet.size,
    }));

    const getInputClassName = () => {
        return `input-outline ${status === 'INP' ? 'border-point-300' : ''} flex-1 mr-2 sm:!px-4 px-3`;
    };

    const onRecommendCaregiver = () => {
        if (missionInfo.receiverId) {
            handleRecommend(missionInfo.receiverId);
        }
    };

    return (
        <main className="p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="space-y-4">
                <h1 className="sm:text-title-s text-body-l font-extrabold text-gray-800 sm:pt-8 pt-1 pb-1">
                    <p>우리가 도와줄 멍멍이는</p>
                </h1>
                <div className="slider-container !px-0">
                    {dogs.length === 1 ? (
                        <DogCard {...dogs[0]} />
                    ) : (
                        // 여러 마리일 때는 슬라이더 사용
                        <Slider {...settings}>
                            {dogs.map((dog) => (
                                <div key={dog.id} className="px-2">
                                    <DogCard {...dog} />
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>

                <div className="space-y-4 !mt-8">
                    <div className="flex gap-5 items-center">
                        <p className="text-label-m text-gray-500">돌봄이</p>
                        <p className="text-body-m font-semibold text-gray-900 ml-2">
                            {missionInfo.receiverName}
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <p className="text-label-m text-gray-500">맡김이</p>
                        <p className="text-body-m font-semibold text-gray-900 ml-2">
                            {missionInfo.careName}
                        </p>
                    </div>
                </div>

                {status === 'AFT' && userId === missionInfo.careId && (
                    <div className="flex items-center justify-center gap-2 mt-4 p-4 bg-point-50 rounded-lg">
                        <p className="text-body-m text-point-500">
                            {missionInfo.receiverName} 돌봄이를 추천해주세요!
                        </p>
                        <button
                            onClick={onRecommendCaregiver}
                            className={`p-2 rounded-full transition-colors duration-300 ${
                                isRecommended
                                    ? 'bg-point-600 text-white'
                                    : 'bg-white text-gray-500 border border-gray-300'
                            }`}
                        >
                            <Thumb size={24} />
                        </button>
                    </div>
                )}

                {status === 'INP' && (
                    <div
                        className={`rounded-lg p-4 mt-6 ${
                            status === 'INP' ? 'bg-point-50' : 'bg-gray-100'
                        }`}
                    >
                        <p
                            className={`text-body-s font-semibold ${
                                status === 'INP'
                                    ? 'text-point-500'
                                    : 'text-gray-500'
                            }`}
                        >
                            현재 돌봄이 진행중입니다
                        </p>
                    </div>
                )}

                <div className="space-y-2 mt-6">
                    <div>
                        <p className="text-label-m text-gray-500 mb-2">
                            돌봄 시작일
                        </p>
                        <div className="flex items-center">
                            <input
                                id="startDate"
                                className={getInputClassName()}
                                value={formatDate(missionInfo.receiverStart)}
                                readOnly
                            />
                            <input
                                id="startTime"
                                className={`input-outline ${status === 'INP' ? 'border-point-300' : ''} text-gray-400 md:!w-[135px] w-[105px] sm:!px-4 px-3`}
                                value={formatTime(missionInfo.receiverStart)}
                                readOnly
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
                                className={getInputClassName()}
                                value={formatDate(missionInfo.receiverEnd)}
                                readOnly
                            />
                            <input
                                id="startTime"
                                className={`input-outline ${status === 'INP' ? 'border-point-300' : ''} text-gray-400 md:!w-[135px] w-[105px] sm:!px-4 px-3`}
                                value={formatTime(missionInfo.receiverEnd)}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                {status === 'BEF' && (
                    <div className="flex justify-center">
                        <button className="text-label-m text-gray-600 border-b border-b-gray-600 w-fit my-4">
                            멍멍이의 부탁 삭제
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

// 커스텀 화살표 컴포넌트
const SampleNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow next-arrow`}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow prev-arrow`}
            onClick={onClick}
        />
    );
};
