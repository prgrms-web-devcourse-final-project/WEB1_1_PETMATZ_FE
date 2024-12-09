import { http } from './base';
import { MainPageMissionResponse, RankingResponse } from '@/types/home'; // 응답 타입 가져오기

// 당일 미션 가져오기
export const mainPageMission = async (): Promise<MainPageMissionResponse> => {
    return await http.get<MainPageMissionResponse>('/api/v1/main');
};

export const mainTopRanking = async (): Promise<RankingResponse> => {
    return await http.get<RankingResponse>('/api/top-rankings');
};
