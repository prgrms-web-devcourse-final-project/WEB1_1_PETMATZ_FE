import { useState } from 'react';
import Logo from '@/assets/images/header/logo.svg?react';
import KakaoLogo from '@/assets/images/intro/kakaoLogo.svg?react';
import AtSign from '@/assets/images/intro/atSign.svg?react';
import ArrowRight from '@/assets/images/intro/arrowRight.svg?react';
import { SliderSection } from '@/components/intro';
import { useFadeNavigate } from '@/hooks';

export default function Intro() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;
    const navigate = useFadeNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between overflow-hidden">
            {/* Header */}
            <header className="sm:h-24 h-14 w-full flex items-center justify-center">
                <Logo className="text-black h-10 sm:w-80 " />
            </header>

            {/* Slider Section */}
            <div className="flex justify-center items-center">
                <SliderSection setCurrentSlide={setCurrentSlide} />
            </div>

            {/* Footer */}
            <section className="w-full max-w-[600px] px-6 py-2.5">
                {currentSlide < totalSlides - 1 ? (
                    <button
                        className="w-full text-body-l font-extrabold text-white py-3 mb-8 rounded-lg bg-point-500 active:bg-point-600"
                        onClick={() =>
                            (
                                document.querySelector(
                                    '.slick-next',
                                ) as HTMLButtonElement
                            )?.click()
                        }
                    >
                        다음
                    </button>
                ) : (
                    <div className="flex flex-col gap-3 mb-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-point-400 active:text-point-600 text-label-l sm:text-body-l font-semibold flex justify-center items-center gap-1 mb-2"
                        >
                            아직 회원이 아니신가요? <ArrowRight />
                        </button>

                        <div className="flex flex-row gap-2.5">
                            <button
                                className="w-full flex justify-center items-center gap-3 text-point-600 text-body-l font-extrabold py-3.5 px-6 rounded-lg border-2 border-point-500 active:bg-point-200"
                                onClick={() => navigate('/login')}
                            >
                                <AtSign />
                                이메일
                            </button>
                            <button
                                className="w-full text-black gap-3 rounded-lg text-body-l py-3.5 px-6 font-extrabold flex justify-center items-center"
                                style={{ backgroundColor: '#FFDD00' }}
                                onClick={() => navigate('/login')} //카카오 url 이동
                            >
                                <KakaoLogo />
                                카카오
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
