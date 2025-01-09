import DogFoot from '@/assets/images/intro/dogFoot.svg?react';
import { RankingItem, RankingResponse } from '@/types/home';
import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';

interface HomeRankingProps {
    rankingData: RankingResponse | undefined;
}

export default function HomeRanking({ rankingData }: HomeRankingProps) {
    const navigate = useFadeNavigate();

    const handleMatchBtn = useCallback(() => {
        navigate('/match');
    }, [navigate]);

    if (!rankingData?.ok || !rankingData?.data) {
        return <div>데이터를 가져올 수 없습니다.</div>;
    }
    const rankDatas: RankingItem[] = rankingData.data;

    if (!rankDatas || rankDatas.length === 0) {
        return <div>랭킹 데이터가 없습니다.</div>;
    }

    return (
        <div className="w-full h-auto bg-gray-50 rounded-2xl">
            {/* 상단 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-body-xl font-extrabold text-gray-800">
                    돌봄이 랭킹
                </h2>
            </div>

            <div className="flex flex-col gap-4 w-full h-[216px] rounded-2xl bg-white px-6 py-[18px]">
                <div className="flex justify-between items-center">
                    <p className="flex justify-between items-center w-full text-label-m font-extrabold text-gray-700 bg-point-50 px-[18px] py-3 rounded-full cursor-pointer rounded-bl-2xl">
                        우리동네 돌봄이 랭킹
                    </p>
                </div>
                {/* 랭킹 목록 */}
                <div className="flex flex-col gap-3 w-full h-[123px]">
                    {rankDatas
                        .slice(0, 5)
                        .map((rank: RankingItem, index: number) => (
                            <div
                                key={rank.userId}
                                className="flex justify-between items-center"
                            >
                                {/* 랭킹 순위 */}
                                <div className="flex h-[15px] items-center">
                                    <span
                                        className={`w-[15px] h-[15px] flex justify-center items-center rounded-full text-detail font-extrabold ${
                                            index === 0
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        {index + 1}
                                    </span>
                                    <p
                                        className={`ml-2 text-label-m font-extrabold ${
                                            index === 0
                                                ? 'text-blue-500'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {rank.nickname}
                                    </p>
                                </div>
                                {/* 추천 수 */}

                                <p className="w-14 text-label-s font-semibold text-gray-400">
                                    추천수 {rank.recommendationCount}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
            <button
                onClick={handleMatchBtn}
                className="flex justify-between items-center w-full h-[83px] bg-point-50 rounded-2xl mt-6 px-6 py-[18px]"
            >
                <div>
                    <p className="bg-white w-fit px-2 py-1 rounded-[30px] text-label-s font-semibold mb-2 text-gray-900">
                        우리동네 돌봄이 만나기
                    </p>
                    <p className="text-label-l font-extrabold text-gray-700">
                        댕댕이를 위한 돌봄이를 찾으러 가요!
                    </p>
                </div>
                <DogFoot className="w-[42px] h-[37px]" />
            </button>
        </div>
    );
}
