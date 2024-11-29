import ArrowRight from '@/assets/images/intro/arrowRight.svg?react';
import Profile1 from '@/assets/images/profile/profile1.svg?react';

import { useFadeNavigate } from '@/hooks';

export default function HomeRanking() {
    const navigate = useFadeNavigate();

    // 랭킹 데이터
    const rankingData = [
        {
            rank: 1,
            nickname: '강쥐사랑',
            score: 120,
            profileImage: '',
        },
        {
            rank: 2,
            nickname: '강남짱',
            score: 57,
            profileImage: '',
        },
        {
            rank: 3,
            nickname: '포메주인',
            score: 31,
            profileImage: '',
        },
    ];

    return (
        <div className="bg-white w-full p-6 h-auto py-6">
            {/* 상단 텍스트 */}
            <p className="text-body-l font-extrabold leading-7 mb-2">
                우리 동네 인기 돌봄이 TOP 랭킹
                <br />
                <button
                    onClick={() => {
                        navigate('/ranking');
                    }}
                >
                    <span className="text-body-s text-gray-500 font-bold flex gap-1 items-center mt-2">
                        인기있는 돌봄이를 확인해보세요!{' '}
                        <ArrowRight className="text-gray-500" />
                    </span>
                </button>
            </p>

            {/* 지역 표시 */}
            <div className="text-right">
                <span className="inline-block border-2 border-point-400 text-gray-600 text-label-m font-extrabold px-3 py-1 rounded-full">
                    강남구
                </span>
            </div>

            {/* 랭킹 카드 */}
            <div className="flex justify-between items-end">
                {/* 2등 */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 border-4 border-blue-400 rounded-full flex items-center justify-center mb-2">
                        {rankingData[1].profileImage ? (
                            <img
                                src={rankingData[1].profileImage}
                                alt={`${rankingData[1].nickname} 프로필`}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <Profile1 />
                        )}
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
                    <div className="w-26 h-26 border-4 border-blue-400 rounded-full flex items-center justify-center mb-2">
                        {rankingData[0].profileImage ? (
                            <img
                                src={rankingData[0].profileImage}
                                alt={`${rankingData[0].nickname} 프로필`}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <Profile1 />
                        )}
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
                    <div className="w-20 h-20 border-4 border-blue-400 rounded-full flex items-center justify-center mb-2">
                        {rankingData[2].profileImage ? (
                            <img
                                src={rankingData[2].profileImage}
                                alt={`${rankingData[2].nickname} 프로필`}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <Profile1 />
                        )}
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
    );
}
