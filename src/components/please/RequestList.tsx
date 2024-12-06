import { DogCard } from '../common';
import RequestListAccordion from './RequestListAccordion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DogInformation.css';

interface RequestListProps {
    dogId?: string;
}

// 요청은 상단 페이지에서 불러올 예정
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

export default function RequestList({ dogId }: RequestListProps) {
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

    return (
        <main className="flex flex-col flex-1 overflow-hidden">
            <div className="flex flex-col flex-1">
                <h1 className="sm:text-title-s text-body-l font-extrabold text-gray-800 sm:pt-8 pt-5 pb-4 px-6">
                    <p>멍멍이와 함께</p>
                    <p>미션을 시작해볼까요?</p>
                </h1>
                <div className="flex flex-col px-6">
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

                    <RequestListAccordion />
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
