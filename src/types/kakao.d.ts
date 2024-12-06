import { BaseApiResponse } from './baseResponse';

// //	POST Signup
interface KakaoSignupApiRequest {
    nickname: string;
    gender: string;
    preferredSizes: string[];
    introduction: string;
    isCareAvailable: boolean;
    mbti: string;
    latitude: string;
    longitude: string;
    profileImg: string;
}
interface KakaoSignupApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
        id?: number;
        imgURL?: string;
    };
}

export type { KakaoSignupApiRequest, KakaoSignupApiResponse };
