import { useTitleStore } from '@/stores';
import { HomeHelpDog, HomeLike } from '@/components/home';
import { HomeRanking } from '@/components/home';
import { HomeSOS } from '@/components/home';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { mainTopRanking } from '@/hooks/api/home';
import { getLikedUserList } from '@/hooks/api/user';
import { mainPageMission } from '@/hooks/api/home';
import { RankingResponse, MainPageMissionResponse } from '@/types/home';
import { LikedUserListApiResponse } from '@/types/user';
import { Loading } from '@/components/common';
export default function Home() {
    const { setTitle } = useTitleStore();

    useEffect(() => {
        setTitle('HOME');
    }, []);

    // Fetch all required data
    const { data: rankingData, isLoading: isRankingLoading } = useQuery<
        RankingResponse,
        Error
    >({
        queryKey: ['rankingData'],
        queryFn: mainTopRanking,
    });

    const { data: likedListData, isLoading: isLikedListLoading } = useQuery<
        LikedUserListApiResponse,
        Error
    >({
        queryKey: ['likedList'],
        queryFn: getLikedUserList,
    });

    const { data: missionData, isLoading: isMissionLoading } = useQuery<
        MainPageMissionResponse,
        Error
    >({
        queryKey: ['missionData'],
        queryFn: mainPageMission,
    });

    // Combine loading states
    const isLoading =
        isRankingLoading || isLikedListLoading || isMissionLoading;

    if (isLoading) {
        return (
            <div className="h-full w-full flex justify-center items-center bg-white">
                <Loading />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 h-screen flex flex-col gap-14 overflow-y-auto p-6">
            {missionData && <HomeHelpDog missionData={missionData} />}
            {likedListData && <HomeLike likedListData={likedListData} />}
            {rankingData && <HomeRanking rankingData={rankingData} />}
            <HomeSOS />
        </div>
    );
}
