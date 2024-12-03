import { BaseApiResponse } from './baseResponse';

//	POST delete account
interface DeleteAccountApiRequest {
    password: string;
}
interface DeleteAccountApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

export type { DeleteAccountApiRequest, DeleteAccountApiResponse };
