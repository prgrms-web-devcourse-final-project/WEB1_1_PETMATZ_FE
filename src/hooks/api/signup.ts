import {
    EmailVerificationCodeApiRequest,
    EmailVerificationCodeApiResponse,
} from '@/types/signup';
import { http } from './base';

/**
 * POSTT	Send VerificationCode to Email
 * 해당 이메일로 인증코드를 보냅니다.
 */
export const postEmailVerificationCode = async ({
    accountId,
}: EmailVerificationCodeApiRequest): Promise<EmailVerificationCodeApiResponse> =>
    await http.post<
        EmailVerificationCodeApiResponse,
        EmailVerificationCodeApiRequest
    >('/api/auth/email-certification', {
        accountId,
    });
