import { BaseApiResponse } from './baseResponse';

interface IMatch {
    id: number;
    nickname: string;
    recommendationCount: number;
    careCompletionCount: number;
    profileImg: string;
}

// GET MatchList
interface MatchListApiRequest {
    userId: number;
    page?: number;
    size?: number;
}
interface MatchListApiResponse extends BaseApiResponse {
    data: {
        result: {
            matchResults: IMatch[];
            totalPages: number;
        };
    };
}

// POST	MatchFail
interface MatchFailApiRequest {
    userId: number;
    targetUserId: number;
}

export type {
    IMatch,
    MatchListApiRequest,
    MatchListApiResponse,
    MatchFailApiRequest,
};
