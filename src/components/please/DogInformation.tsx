import { DogCard } from '@/components/common';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DogInformation.css';
import { formatDate, formatTime } from '@/utils';
import { MissionInfo } from '@/types/please';
interface DogInfoProps {
    missionInfo: MissionInfo;
    status: string;
}

export default function DogInformation({ missionInfo, status }: DogInfoProps) {
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
        profileImg: pet.profileImg, // 기본 이미지
        age: pet.age,
        temperament: pet.temperament,
        size: pet.size,
    }));

    const getInputClassName = () => {
        return `input-outline ${status === 'INP' ? 'border-point-300' : ''} flex-1 mr-2 sm:!px-4 px-3`;
    };

    return (
        <main className="p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="space-y-4">
                <h1 className="sm:text-title-s text-body-l font-extrabold text-gray-800 sm:pt-8 pt-1 pb-1">
                    <p>우리가 도와줄 멍멍이는</p>
                </h1>
                <div className="slider-container">
                    {dogs.length === 1 ? (
                        // 한 마리일 때는 일반 div로 표시
                        <div className="px-2">
                            <DogCard {...dogs[0]} />
                        </div>
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

                {status === 'INP' && (
                    <div className="bg-point-50 rounded-lg p-4 mt-6">
                        <p className="text-point-500 text-body-s font-semibold">
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
