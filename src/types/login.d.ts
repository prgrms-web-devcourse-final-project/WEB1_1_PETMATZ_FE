import { BaseApiResponse } from './baseResponse';

//	POST login
interface LoginApiRequest {
    accountId: string;
    password: string;
}
interface LoginApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
        id: number;
        accountId: string;
        nickname: string;
        loginRole: string;
        loginType: string;
        role: string;
        preferredSize: ('SMALL' | 'MEDIUM' | 'LARGE')[];
        gender: string;
        isRegistered: boolean;
        recommendationCount: number;
        careCompletionCount: number;
        isCareAvailable: boolean;
        mbti: string;
        region: string;
    };
}

export type { LoginApiRequest, LoginApiResponse };
