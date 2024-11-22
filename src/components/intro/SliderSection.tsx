import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderSection.css';
import MiddleDog from '@/assets/images/intro/middleDog.svg?react';
import SmallDog from '@/assets/images/intro/smallDog.svg?react';
import LargeDog from '@/assets/images/intro/largeDog.svg?react';
import SlideContent from './SlideContent';

interface SliderSectionProps {
    setCurrentSlide: (index: number) => void;
}

export default function SliderSection({ setCurrentSlide }: SliderSectionProps) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index: number) => setCurrentSlide(index),
    };

    return (
        <section className="w-full max-w-[600px] flex-1 overflow-hidden mt-16 sm:mt-32 ">
            <Slider {...settings}>
                <SlideContent
                    image={<MiddleDog className="w-52 h-60 mr-4 sm:w-64" />}
                    title={
                        <span>
                            우리 멍멍이를
                            <br /> 돌봐줄{' '}
                            <span className="text-point-500">특별한 이웃</span>
                            찾기
                        </span>
                    }
                    description={
                        <>
                            가까운 곳에서 우리 멍멍이를 위해 준비된 <br />
                            따뜻한 손길, 지금 바로 찾아보세요!
                        </>
                    }
                />
                <SlideContent
                    image={<SmallDog className="w-52 h-60 sm:w-64" />}
                    title={
                        <span>
                            멍멍!{' '}
                            <span className="text-point-500">걱정마세요</span>,
                            <br />
                            오늘도 신나게 놀았어요
                        </span>
                    }
                    description={
                        <>
                            산책부터 놀이까지, 원하는 활동을
                            <br /> 부탁하고 사진과 기록으로 꼼꼼히 확인해요!
                        </>
                    }
                />
                <SlideContent
                    image={<LargeDog className="w-52 h-60 sm:w-64" />}
                    title={
                        <span>
                            멍멍이의 돌봄,
                            <br /> 이제는 서로{' '}
                            <span className="text-point-500">함께해요</span>
                        </span>
                    }
                    description={
                        <>
                            우리 동네 반려인과 함께 돌보고,
                            <br /> 새로운 멍멍이와 특별한 순간을 만들어요!
                        </>
                    }
                />
            </Slider>
        </section>
    );
}
