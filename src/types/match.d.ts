import { BaseApiResponse } from './baseResponse';

interface IMatch {
    id: number;
    accountId: string;
    email: string;
    nickname: string;
    recommendationCount: number;
    careCompletionCount: number;
    profileImg: string;
    region: string;
}

// GET MatchList
interface MatchListApiRequest {
    userId?: number;
    page?: number;
    size?: number;
}
interface MatchListApiResponse extends BaseApiResponse {
    data: {
        matchResults: IMatch[];
        totalPages: number;
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
