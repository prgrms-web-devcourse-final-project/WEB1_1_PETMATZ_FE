import { DogCard } from '../common';
import RequestListAccordion from './RequestListAccordion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DogInformation.css';
import { MissionInfo } from '@/types/please';

interface RequestListProps {
    missionInfo: MissionInfo;
    status: string;
    userId?: number;
}

export default function RequestList({
    missionInfo,
    status,
    userId,
}: RequestListProps) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: 'dog-slider',
        // 커스텀 화살표 설정
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

    return (
        <main className="p-4 flex flex-col flex-1 overflow-hidden">
            <div className="flex flex-col flex-1">
                <h1 className="sm:text-title-s text-body-l font-extrabold text-gray-800 sm:pt-8 pt-1 pb-5">
                    <p>멍멍이와 함께</p>
                    <p>미션을 시작해볼까요?</p>
                </h1>
                <div className="flex flex-col">
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
                    <RequestListAccordion
                        petMissionAskInfos={missionInfo.petMissionAskInfos}
                        status={status}
                        userId={userId}
                        receiverId={missionInfo.receiverId}
                    />
                </div>
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
