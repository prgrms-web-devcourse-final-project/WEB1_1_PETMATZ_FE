import CryDog from '@/assets/images/dogs/dogCry.svg?react';
import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';

export default function HomeSOS() {
    const navigate = useFadeNavigate();

    const handleSOSBtn = useCallback(() => {
        navigate('/sos');
    }, [navigate]);

    return (
        <div className=" w-full h-auto">
            <div className="flex justify-between items-center  mb-[18px]">
                <h2 className="text-body-xl font-extrabold text-gray-800">
                    도와줘 멍멍
                </h2>
                <button
                    onClick={handleSOSBtn}
                    className="text-label-m font-semibold text-gray-400"
                >
                    더보기
                </button>
            </div>
            <div className="flex justify-between items-center px-6 py-[18px] bg-white rounded-2xl">
                <div>
                    <p className="text-body-l font-extrabold text-gray-900 mb-2">
                        우리 댕댕이를 {<br />}돌봐주세요!
                    </p>
                    <p className="text-label-m font-semibold text-gray-600 mb-[18px]">
                        갑자기 맡길 사람이 없다면?
                    </p>
                    <button
                        onClick={handleSOSBtn}
                        className="btn-solid h-[31px] w-[108px] text-label-m font-extrabold"
                    >
                        SOS 보내기
                    </button>
                </div>
                <CryDog className="w-[93px] h-[90px]" />
            </div>
        </div>
    );
}
