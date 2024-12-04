import { BaseApiResponse } from './baseResponse';

interface IUser {
    id: number;
    accountId: string;
    nickname: string;
    isRegistered: boolean;
    region: string;
}

//	GET profile informations
interface ProfileApiQueryString {
    userId: string;
}
interface ProfileApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
        id: number;
        accountId: string;
        nickname: string;
        profileImg: string;
        role: string;
        preferredSizes?: ('SMALL' | 'MEDIUM' | 'LARGE')[];
        preferredSize?: ('SMALL' | 'MEDIUM' | 'LARGE')[];
        gender: string;
        introduction: string;
        isRegistered: boolean;
        recommendationCount: number;
        careCompletionCount: number;
        isCareAvailable: boolean;
        mbti: string;
        region: string;
        myHeartUser?: boolean;
    };
}

//	POST like user profile
interface LikeApiRequest {
    heartedId: number;
}
interface LikeApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

export type {
    IUser,
    ProfileApiQueryString,
    ProfileApiResponse,
    LikeApiRequest,
    LikeApiResponse,
};
