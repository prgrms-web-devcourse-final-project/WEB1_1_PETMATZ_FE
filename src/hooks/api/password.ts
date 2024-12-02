import {
    NewPasswordApiRequest,
    PasswordApiResponse,
    TemporaryPasswordApiRequest,
} from '@/types/password';
import { http } from './base';

/**
 * POST	Send temporary password
 * 해당 이메일로 임시 비밀번호를 보냅니다.
 */
export const postTemporaryPassword = async ({
    accountId,
}: TemporaryPasswordApiRequest): Promise<PasswordApiResponse> =>
    await http.post<PasswordApiResponse, TemporaryPasswordApiRequest>(
        '/api/auth/send-repassword',
        {
            accountId,
        },
    );

/**
 * POST	Send new password
 * 비밀번호를 변경합니다.
 */
export const postNewPassword = async ({
    currentPassword,
    newPassword,
}: NewPasswordApiRequest): Promise<PasswordApiResponse> =>
    await http.post<PasswordApiResponse, NewPasswordApiRequest>(
        '/api/auth/repassword',
        {
            currentPassword,
            newPassword,
        },
    );
