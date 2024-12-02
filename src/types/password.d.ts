import { BaseApiResponse } from './baseResponse';

//	POST temporary password
interface TemporaryPasswordApiRequest {
    accountId: string;
}
interface PasswordApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

export type { TemporaryPasswordApiRequest, PasswordApiResponse };
