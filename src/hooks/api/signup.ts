import {
    CheckVerificationCodeApiRequest,
    CheckVerificationCodeApiResponse,
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

/**
 * POSTT	Check VerificationCode
 * 인증코드를 검증합니다.
 */
export const postCheckVerificationCode = async ({
    accountId,
    certificationNumber,
}: CheckVerificationCodeApiRequest): Promise<CheckVerificationCodeApiResponse> =>
    await http.post<
        CheckVerificationCodeApiResponse,
        CheckVerificationCodeApiRequest
    >('/api/auth/check-certification', {
        accountId,
        certificationNumber,
    });
