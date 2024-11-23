import { BaseApiResponse } from './baseResponse';

interface Match {
    id: string;
    nickname: string;
    introduction: string;
    recommendationCount: number;
    careCompletionCount: number;
    profileImg?: string;
    latitude: number;
    longitude: number;
}

interface MatchListApiResponse extends BaseApiResponse {
    data: Match[];
}

export type { Match, MatchListApiResponse };
