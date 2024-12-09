import {
    MatchFailApiRequest,
    MatchListApiRequest,
    MatchListApiResponse,
} from '@/types/match';
import { http } from './base';
import { BaseApiResponse } from '@/types/baseResponse';

/**
 * GET MatchList
 * 매칭 리스트를 가져옵니다.
 */
export const getMatchList = async ({
    page,
    size,
}: MatchListApiRequest): Promise<MatchListApiResponse> =>
    await http.get<MatchListApiResponse, MatchListApiRequest>(
        '/api/match/showmetz',
        { page, size },
    );

/**
 * POST	MatchFail
 * 상대 유저에 대한 매칭 거부의사를 POST 합니다.
 */
export const postMatchFail = async ({
    userId,
    targetUserId,
}: MatchFailApiRequest): Promise<BaseApiResponse> =>
    await http.post<BaseApiResponse, MatchFailApiRequest>(
        '/api/match/matchfail',
        {
            userId,
            targetUserId,
        },
    );
