import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';
import Back from '@/assets/images/header/back.svg?react';
import Garbage from '@/assets/images/delete-account/garbage.svg?react';
import CryingDog from '@/assets/images/delete-account/cryingDog.svg?react';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
    const navigate = useFadeNavigate();

    const handleBackBtn = useCallback(() => {
        navigate('/profile');
    }, []);

    const handleDeleteAccountBtn = useCallback(() => {
        toast.info('성공적으로 탈퇴되었어요.');
        navigate('/');
    }, []);

    return (
        <div className="relative h-screen bg-white flex flex-col justify-between overflow-hidden">
            <header className="bg-white sm:h-24 h-14 w-full flex items-center justify-center">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    회원 탈퇴
                </h1>
            </header>
            <section className="bg-white flex-1 flex flex-col justify-center items-center">
                <Garbage className="mb-2" />
                <h2 className="text-gray-800 text-title-s font-extrabold">
                    회원 탈퇴
                </h2>
                <div className="text-gray-500 text-body-m text-center mb-2">
                    <p>멍멍이와 나누었던 소중한</p>
                    <p>추억들이 모두 사라져요.</p>
                </div>
                <CryingDog />
            </section>
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <button
                    onClick={handleBackBtn}
                    className="btn-outline absolute bottom-[103px] left-6 right-6 max-w-[552px] mx-auto w-auto"
                >
                    돌아가기
                </button>
                <button
                    onClick={handleDeleteAccountBtn}
                    className="btn-solid mb-8"
                >
                    탈퇴하기
                </button>
            </footer>
        </div>
    );
}
