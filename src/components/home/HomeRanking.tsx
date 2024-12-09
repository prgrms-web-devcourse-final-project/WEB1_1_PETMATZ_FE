import ArrowRight from '@/assets/images/arrow/arrowRight.svg?react';
import DogFoot from '@/assets/images/intro/dogFoot.svg?react';
import { RankingItem, RankingResponse } from '@/types/home';
import Slider from 'react-slick';
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

    const handleRankBtn = useCallback(() => {
        navigate('/ranking');
    }, [navigate]);

    const sliderSettings = {
        vertical: true, // 세로 슬라이드
        autoplay: true, // 자동 재생
        autoplaySpeed: 3000, // 3초마다 슬라이드
        infinite: true, // 무한 반복
        slidesToShow: 4, // 한 번에 보여질 슬라이드 개수
        slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 개수
        arrows: false, // 화살표 비활성화
        dots: false, // 아래 점 표시 비활성화
    };
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

            <div className="w-full h-16 rounded-2xl bg-white px-6 mb-4 overflow-hidden">
                <Slider {...sliderSettings}>
                    {rankDatas.map((rank) => (
                        <div key={rank.userId} className="w-full h-[15px]">
                            <div className="flex w-full justify-between">
                                <p className="text-label-m font-extrabold text-gray-900">
                                    {rank.nickname}
                                </p>
                                <p className="text-label-s font-semibold text-gray-400">
                                    추천수 {rank.recommendationCount}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="flex flex-col gap-4 w-full h-[216px] rounded-2xl bg-white px-6 py-[18px]">
                <button
                    onClick={handleRankBtn}
                    className="flex justify-between items-center"
                >
                    <p className="flex justify-between items-center w-full text-label-m font-extrabold text-gray-700 bg-point-50 px-[18px] py-3 rounded-full cursor-pointer rounded-bl-2xl">
                        우리동네 돌봄이 랭킹 보러가기
                        <ArrowRight className="w-3 h-3" />
                    </p>
                </button>
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
