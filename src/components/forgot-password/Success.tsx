import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';
import Check from '@/assets/images/forgot-password/check.svg?react';
import Dog from '@/assets/images/forgot-password/middleSizeDog.svg?react';

export default function Success() {
    const navigate = useFadeNavigate();

    const handleCheckBtn = useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <>
            <section className="flex-1 flex flex-col justify-center items-center">
                <Check className="mb-2" />
                <h2 className="text-gray-800 text-title-s font-extrabold">
                    전송 완료
                </h2>
                <div className="text-gray-500 text-body-m text-center mb-2">
                    <p>이메일로 보내드린 임시 비밀번호로</p>
                    <p>다시 로그인 해주세요!</p>
                </div>
                <Dog />
            </section>
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <button onClick={handleCheckBtn} className="btn-solid mb-8">
                    확인
                </button>
            </footer>
        </>
    );
}
