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
        <div className="w-full h-auto">
            <div className="flex flex-col justify-between gap-[18px] ">
                <h2 className="text-body-xl font-extrabold text-gray-800 ">
                    돌봄이 랭킹
                </h2>
                <div className="w-full h-16 bg-white rounded-2xl px-6 py-[18px]">
                    {' '}
                    실시간 랭킹
                </div>
                <div className="w-full h-[216px] px-6 py-[18px] rounded-2xl bg-white">
                    <div>
                        <p className="flex justify-between text-label-m font-extrabold text-gray-700 px-[18px] py-3 bg-point-50 rounded-full rounded-bl-lg mb-[18px]">
                            우리동네 돌봄이 랭킹 보러가기
                            <ArrowRight className="w-3.5 h-3.5" />
                        </p>
                    </div>
                    <div className="w-full h-[123px]">랭킹목록</div>
                </div>
            </div>
            <div className="flex w-full h-[83px] rounded-2xl px-6 py-[18px] bg-point-50 mt-6">
                <div className="flex flex-col gap-2">
                    <p className="w-fit text-label-s font-semibold text-gray-900 px-2 py-1 bg-white rounded-[30px]">
                        우리동네 돌봄이 만나기
                    </p>
                    <p className="text-label-l font-extrabold text-gray-700">
                        댕댕이를 위한 돌봄이를 찾으로 가요!
                    </p>
                </div>
                <div>발바닥</div>
            </div>
        </div>
    );
}
