import Foot from '@/assets/images/foot-m.svg?react';
import CryingDog from '@/assets/images/delete-account/cryingDog.svg?react';
import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';

export default function PageNotFound() {
    const navigate = useFadeNavigate();

    const handleCheckBtn = useCallback(() => {
        navigate(-1);
    }, []);

    return (
        <div className="h-screen bg-white flex flex-col justify-between overflow-hidden">
            <section className="flex-1 flex flex-col justify-center items-center">
                <Foot className="mb-2" />
                <h2 className="text-gray-800 text-title-s font-extrabold">
                    Page Not Found
                </h2>
                <div className="text-gray-500 text-body-m text-center mb-2">
                    <p>페이지를 찾을 수 없어요!</p>
                </div>
                <CryingDog />
            </section>
            <div className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <button onClick={handleCheckBtn} className="btn-outline">
                    돌아가기
                </button>
            </div>
        </div>
    );
}
