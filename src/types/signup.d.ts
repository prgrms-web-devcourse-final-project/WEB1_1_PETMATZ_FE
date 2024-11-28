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

export type {
    EmailVerificationCodeApiRequest,
    EmailVerificationCodeApiResponse,
};
