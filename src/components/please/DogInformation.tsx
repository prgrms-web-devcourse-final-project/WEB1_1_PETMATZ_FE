import { DogCard } from '@/components/common';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DogInformation.css';

interface DogInfoProps {
    dogId?: string;
}

// 예시 데이터 - 실제로는 API나 props로 받아올 예정
const dogs = [
    {
        id: 5,
        dogNm: '예삐',
        sexNm: '암컷',
        kindNm: '페키니즈',
        neuterYn: '중성',
        profileImg: 'https://example.com/uploads/profile.png',
        age: 7,
        temperament: 'ENTP',
        size: 'SMALL',
    },
    {
        id: 6,
        dogNm: '몽이',
        sexNm: '수컷',
        kindNm: '말티즈',
        neuterYn: '중성',
        profileImg: 'https://example.com/uploads/profile2.png',
        age: 5,
        temperament: 'ISFP',
        size: 'SMALL',
    },
];

export default function DogInformation({ dogId }: DogInfoProps) {
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

    return (
        <main className="p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="space-y-4">
                <h1 className="sm:text-title-s text-body-l font-extrabold text-gray-800 sm:pt-8 pt-1 pb-1">
                    <p>우리가 도와줄 멍멍이는</p>
                </h1>
                <div className="slider-container">
                    <Slider {...settings}>
                        {dogs.map((dog) => (
                            <div key={dog.id} className="px-2">
                                <DogCard
                                    id={dog.id}
                                    dogNm={dog.dogNm}
                                    sexNm={dog.sexNm}
                                    kindNm={dog.kindNm}
                                    neuterYn={dog.neuterYn}
                                    profileImg={dog.profileImg}
                                    age={dog.age}
                                    temperament={dog.temperament}
                                    size={dog.size}
                                    comment={false}
                                    edit={false}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="space-y-4 !mt-8">
                    <div className="flex gap-5 items-center">
                        <p className="text-label-m text-gray-500">돌봄이</p>
                        <p className="text-body-m font-semibold text-gray-900 ml-2">
                            솜이누나
                        </p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <p className="text-label-m text-gray-500">맡김이</p>
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
                                className="input-outline flex-1 mr-2 sm:!px-4 px-3"
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
                                className="input-outline flex-1 mr-2 sm:!px-4 px-3"
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
                <div className="flex justify-center">
                    <p className="text-label-m text-gray-600 border border-b-gray-600 w-fit my-4">
                        멍멍이의 부탁 삭제
                    </p>
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
