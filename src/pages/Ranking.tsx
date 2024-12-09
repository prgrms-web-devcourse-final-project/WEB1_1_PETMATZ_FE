import { useFadeNavigate } from '@/hooks';
import Back from '@/assets/images/header/back.svg?react';
import Profile1 from '@/assets/images/profile/profile1.svg?react';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RankingItem, RankingResponse } from '@/types/home';
import { mainTopRanking } from '@/hooks/api/home';

export default function Ranking() {
    const navigate = useFadeNavigate();

    const { data, isLoading } = useQuery<RankingResponse, Error>({
        queryKey: ['rankingData'],
        queryFn: mainTopRanking,
    });

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleProfileClick = (userId: number) => {
        navigate(`/profile/${userId}`);
    };

    if (!data?.ok || !data?.data) {
        return <div>데이터를 가져올 수 없습니다.</div>;
    }
    const rankingData: RankingItem[] = data.data;

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (!rankingData || rankingData.length === 0) {
        return <div>랭킹 데이터가 없습니다.</div>;
    }

    return (
        <div className="bg-point-50 min-h-screen w-full flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow h-16 w-full flex items-center justify-center sticky top-0 z-50">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-4 cursor-pointer"
                />
                <h1 className="text-point-900 text-xl font-bold">
                    우리동네 돌봄이 TOP 10
                </h1>
            </header>

            {/* Main Content */}
            <div className="flex-grow overflow-y-auto">
                {/* TOP 3 Section */}
                <section className="py-5 round">
                    <div className="flex justify-around items-end h-48">
                        {/* Second Place */}
                        <div className="flex flex-col items-center">
                            <div
                                onClick={() =>
                                    handleProfileClick(rankingData[1].userId)
                                }
                                className="w-20 h-20 border-4 border-gray-400 rounded-full flex items-center justify-center mb-2 bg-white shadow"
                            >
                                {rankingData[1].profileImage ? (
                                    <img
                                        src={rankingData[1].profileImage}
                                        alt={
                                            rankingData[1].nickname ??
                                            '프로필 이미지'
                                        }
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <Profile1 />
                                )}
                            </div>
                            <span className="text-gray-700 text-base font-medium">
                                {rankingData[1].nickname}
                            </span>
                            <p className="text-sm font-semibold text-gray-500">
                                추천수 {rankingData[1].recommendationCount}
                            </p>
                        </div>

                        {/* First Place */}
                        <div className="flex flex-col items-center">
                            <div
                                onClick={() =>
                                    handleProfileClick(rankingData[0].userId)
                                }
                                className="w-24 h-24 border-4 border-yellow-300 rounded-full flex items-center justify-center mb-2 bg-white shadow-lg"
                            >
                                {rankingData[0].profileImage ? (
                                    <img
                                        src={rankingData[0].profileImage}
                                        alt={
                                            rankingData[0].nickname ??
                                            '프로필 이미지'
                                        }
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <Profile1 />
                                )}
                            </div>
                            <span className="text-point-900 text-lg font-bold">
                                {rankingData[0].nickname}
                            </span>
                            <p className="text-sm font-semibold text-gray-500">
                                추천수 {rankingData[0].recommendationCount}
                            </p>
                        </div>

                        {/* Third Place */}
                        <div className="flex flex-col items-center">
                            <div
                                onClick={() =>
                                    handleProfileClick(rankingData[2].userId)
                                }
                                className="w-20 h-20 border-4 border-yellow-700 rounded-full flex items-center justify-center mb-2 bg-white shadow"
                            >
                                {rankingData[2].profileImage ? (
                                    <img
                                        src={rankingData[2].profileImage}
                                        alt={
                                            rankingData[2].nickname ??
                                            '프로필 이미지'
                                        }
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <Profile1 />
                                )}
                            </div>
                            <span className="text-gray-700 text-base font-medium">
                                {rankingData[2].nickname}
                            </span>
                            <p className="text-sm font-semibold text-gray-500">
                                추천수 {rankingData[2].recommendationCount}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Ranking List */}
                <section className="bg-white rounded-t-lg mt-6 px-4 py-6 flex flex-col space-y-6 overflow-y-scroll">
                    {rankingData.slice(3).map((item) => (
                        <div
                            key={item.rank}
                            className="flex justify-between items-center bg-point-50 py-5 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleProfileClick(item.userId)} // 클릭 이벤트 추가
                        >
                            <span className="text-gray-800 text-label-l font-extrabold">
                                {item.rank}. {item.nickname}
                            </span>
                            <span className="text-gray-400 text-sm font-bold">
                                추천수 {item.recommendationCount}
                            </span>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
