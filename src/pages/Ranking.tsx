import { useFadeNavigate } from '@/hooks';
import Back from '@/assets/images/header/back.svg?react';
import Profile1 from '@/assets/images/profile/profile1.svg?react';
import { useCallback } from 'react';

export default function Ranking() {
    const navigate = useFadeNavigate();

    const handleBackBtn = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    const rankingData = [
        { rank: 1, nickname: '강쥐사랑', score: 120, profileImage: null },
        { rank: 2, nickname: '강남짱', score: 55, profileImage: null },
        { rank: 3, nickname: '포메주인', score: 31, profileImage: null },
        { rank: 4, nickname: '강남언니', score: 50 },
        { rank: 5, nickname: '가을맘', score: 42 },
        { rank: 6, nickname: '초코주인', score: 37 },
        { rank: 7, nickname: '미키', score: 31 },
        { rank: 8, nickname: '두부아빠', score: 27 },
        { rank: 9, nickname: '인절미', score: 20 },
        { rank: 10, nickname: '사랑해강쥐', score: 13 },
    ];

    return (
        <div className="bg-point-200 min-h-screen w-full flex flex-col overflow-y-auto ">
            <header className="bg-point-200 h-[56px] w-full flex items-center justify-center sticky top-0 z-50 shadow">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className=" text-point-900 text-body-l font-extrabold">
                    우리동네 돌봄이 TOP 10
                </h1>
            </header>

            {/* 컨텐츠 */}
            <div className="flex-grow overflow-y-auto">
                {/* TOP 3 랭킹 */}
                <div className="bg-point-200 py-6">
                    <div className="flex justify-around items-end h-44">
                        {/* 2등 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 border-4 border-point-400 rounded-full flex items-center justify-center mb-2">
                                <Profile1 />
                            </div>
                            <span className="text-body-s font-semibold">
                                {rankingData[1].nickname}
                            </span>
                            <p className="text-l font-bold text-gray-600">
                                {rankingData[1].score}
                            </p>
                        </div>

                        {/* 1등 */}
                        <div className="flex flex-col items-center">
                            <div className="w-26 h-26 border-4 border-point-400 rounded-full flex items-center justify-center mb-2">
                                <Profile1 />
                            </div>
                            <span className="text-body-s font-semibold">
                                {rankingData[0].nickname}
                            </span>
                            <p className="text-l font-bold text-gray-600">
                                {rankingData[0].score}
                            </p>
                        </div>

                        {/* 3등 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 border-4 border-point-400 rounded-full flex items-center justify-center mb-2">
                                <Profile1 />
                            </div>
                            <span className="text-body-s font-semibold">
                                {rankingData[2].nickname}
                            </span>
                            <p className="text-l font-bold text-gray-600">
                                {rankingData[2].score}
                            </p>
                        </div>
                    </div>
                </div>

                {/* TOP 리스트 */}
                <div className="bg-white rounded-t-lg px-6 mx-4 flex flex-col min-h-[calc(100vh-56px-224px)]">
                    {rankingData.slice(3).map((item) => (
                        <div
                            key={item.rank}
                            className="flex justify-between items-center border-b border-gray-200 py-8 last:border-none"
                        >
                            <span className="text-body-m font-medium text-gray-700">
                                {item.rank}. {item.nickname}
                            </span>
                            <span className="text-body-s font-bold text-gray-600">
                                추천수 {item.score}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
