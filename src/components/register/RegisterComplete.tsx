import { useFadeNavigate } from '@/hooks';
import { RegisterCompleteProps } from '@/types/register';
import SmallDog from '@/assets/images/register/registerDog1.svg?react';
import MiddleDog from '@/assets/images/register/registerDog2.svg?react';
import LargeDog from '@/assets/images/register/registerDog3.svg?react';

// 종성 존재 여부 확인 함수
const hasEndConsonant = (str: string) => {
    const lastChar = str.charAt(str.length - 1);
    return (lastChar.charCodeAt(0) - 0xac00) % 28 > 0;
};

export default function RegisterComplete({ getValue }: RegisterCompleteProps) {
    const navigate = useFadeNavigate();

    const handleRegisterAnotherDog = () => {
        navigate('/register', { replace: true }); // 새 등록 페이지로 이동
        window.location.reload(); // 상태 초기화
    };

    // 조사 결정
    const particle = hasEndConsonant(getValue().petName) ? '이는' : '는';

    return (
        <div className="flex flex-col justify-between h-screen text-center w-full">
            {/* 상단 영역 */}
            <div className="flex flex-1 flex-col justify-center text-center px-4">
                <div className="flex justify-center">
                    {getValue().size === 'LARGE' && <LargeDog />}
                    {getValue().size === 'MEDIUM' && <MiddleDog />}
                    {getValue().size === 'SMALL' && <SmallDog />}
                </div>
                <p className="text-body-s font-semibold text-gray-400 mt-8 mb-2">
                    등록 완료
                </p>
                <h2 className="text-body-xl font-extrabold mb-4">
                    <span className="text-point-500">{getValue().petName}</span>
                    {particle}{' '}
                    <span className="text-point-500">
                        {getValue().temperament}
                    </span>
                    {<br />}
                    반가워 멍!
                </h2>
            </div>

            {/* 하단 버튼 영역 */}
            <div className="flex flex-col w-full py-4 items-center">
                <button
                    className="btn-outline w-full text-point-500"
                    onClick={handleRegisterAnotherDog}
                >
                    다른 멍멍이 등록하기
                </button>
                <button
                    className="btn-solid bg-point-500 w-full mt-2.5 text-white"
                    onClick={() => navigate('/home')}
                >
                    완료하기
                </button>
            </div>
        </div>
    );
}
