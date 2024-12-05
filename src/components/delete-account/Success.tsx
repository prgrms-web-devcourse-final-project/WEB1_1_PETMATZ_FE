import Logo from '@/assets/images/header/logo.svg?react';
import CryingDog from '@/assets/images/delete-account/cryingDog.svg?react';

export default function Success() {
    return (
        <div className="h-screen bg-white flex flex-col justify-between overflow-hidden">
            <header className="h-14 w-full flex items-center justify-center">
                <Logo />
            </header>
            <section className="bg-white flex-1 flex flex-col justify-center items-center mb-16">
                <CryingDog className="mb-8 z-10" />
                <p className="text-body-s font-semibold text-gray-400 mb-2">
                    회원 탈퇴 완료
                </p>
                <div className="text-black text-body-xl font-extrabold text-center">
                    <p>꼭 다시 볼 수 있기를</p>
                    <p>바래요 멍멍!</p>
                </div>
            </section>
        </div>
    );
}
