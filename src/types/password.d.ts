import { BaseApiResponse } from './baseResponse';

//	POST temporary password
interface TemporaryPasswordApiRequest {
    accountId: string;
}
//	POST new password
interface NewPasswordApiRequest {
    currentPassword: string;
    newPassword: string;
}
interface PasswordApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

export type {
    TemporaryPasswordApiRequest,
    NewPasswordApiRequest,
    PasswordApiResponse,
};
