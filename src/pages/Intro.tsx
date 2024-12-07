import { useEffect, useState } from 'react';
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

    // 로컬 스토리지에서 슬라이더 상태를 불러오기
    useEffect(() => {
        const savedSlide = localStorage.getItem('lastSlide');
        if (savedSlide) {
            setCurrentSlide(Number(savedSlide));
        }
    }, []);

    // 사용자가 3번째 슬라이더에 도달했을 때 로컬 스토리지에 저장
    useEffect(() => {
        if (currentSlide === totalSlides - 1) {
            localStorage.setItem('lastSlide', String(totalSlides - 1));
        }
    }, [currentSlide]);

    const handleKakaoLogin = () => {
        // 백엔드 카카오 로그인 링크로 리다이렉트
        window.location.href = '/oauth2/authorization/kakao';
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between overflow-hidden">
            <header className="h-14 w-full flex items-center justify-center">
                <Logo className="text-black" />
            </header>
            <div className="flex justify-center items-center mb-4">
                <SliderSection setCurrentSlide={setCurrentSlide} />
            </div>
            <section className="w-full max-w-[600px] px-6 py-2.5">
                {currentSlide < totalSlides - 1 ? (
                    <button
                        className="btn-solid"
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
                    <div className="flex flex-col gap-3 relative">
                        <div className="flex flex-row gap-2.5">
                            <button
                                onClick={() => navigate('/signup')}
                                className="w-[280px] absolute top-[-50px] left-1/2 -translate-x-1/2 text-point-400 transition-colors active:text-point-600 hover:text-point-600 text-label-l sm:text-body-l font-semibold flex justify-center items-center gap-2 py-1"
                            >
                                아직 회원이 아니신가요? <ArrowRight />
                            </button>
                            <button
                                className="btn-outline gap-3"
                                onClick={() => navigate('/login')}
                            >
                                <AtSign />
                                이메일
                            </button>
                            <button
                                onClick={handleKakaoLogin}
                                className="btn-solid text-black gap-3"
                                style={{ backgroundColor: '#FFDD00' }}
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
