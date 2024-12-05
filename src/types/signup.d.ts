import { BaseApiResponse } from './baseResponse';

//	POST Send VerificationCode to Email
interface EmailVerificationCodeApiRequest {
    accountId: string;
}
interface EmailVerificationCodeApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

//	POST Check VerificationCode
interface CheckVerificationCodeApiRequest {
    accountId: string;
    certificationNumber: string;
}
interface CheckVerificationCodeApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

// //	POST Signup
interface SignupApiRequest {
    accountId: string;
    password: string;
    certificationNumber: string;
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
interface SignupApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
        id?: number;
    };
}

export type {
    EmailVerificationCodeApiRequest,
    EmailVerificationCodeApiResponse,
    CheckVerificationCodeApiRequest,
    CheckVerificationCodeApiResponse,
    SignupApiRequest,
    SignupApiResponse,
};
