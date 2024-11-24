import Logo from '@/assets/images/header/logo.svg?react';
import SmallDog from '@/assets/images/login/smallDog.svg?react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Success() {
    return (
        <div className="h-screen bg-white flex flex-col justify-between overflow-hidden">
            <header className="sm:h-24 h-14 w-full flex items-center justify-center">
                <Logo />
            </header>
            <section className="bg-white flex-1 flex flex-col justify-center items-center mb-16">
                <DotLottieReact
                    src="https://lottie.host/e4ad48bc-09f4-4f46-af93-f81f16209fc7/YjELnsaSRT.lottie"
                    autoplay
                    style={{
                        position: 'absolute',
                    }}
                />
                <SmallDog className="mb-8" />
                <p className="text-body-s font-semibold text-gray-400 mb-2">
                    로그인 완료
                </p>
                <div className="text-black text-body-xl font-extrabold text-center">
                    <p>
                        <span className="text-point-500">{'정향'}</span>님,
                    </p>
                    <p>환영해요 멍멍!</p>
                </div>
            </section>
        </div>
    );
}
