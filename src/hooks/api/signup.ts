import {
    CheckVerificationCodeApiRequest,
    CheckVerificationCodeApiResponse,
    EmailVerificationCodeApiRequest,
    EmailVerificationCodeApiResponse,
    SignupApiRequest,
    SignupApiResponse,
} from '@/types/signup';
import { http } from './base';

/**
 * POST	Send VerificationCode to Email
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
 * POST	Check VerificationCode
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

/**
 * POST	Signup
 * 회원가입을 요청합니다.
 */
export const postSignup = async ({
    accountId,
    password,
    certificationNumber,
    nickname,
    gender,
    preferredSizes,
    introduction,
    isCareAvailable,
    mbti,
    latitude,
    longitude,
    profileImg,
}: SignupApiRequest): Promise<SignupApiResponse> =>
    await http.post<SignupApiResponse, SignupApiRequest>('/api/auth/sign-up', {
        accountId,
        password,
        certificationNumber,
        nickname,
        gender,
        preferredSizes,
        introduction,
        isCareAvailable,
        mbti,
        latitude,
        longitude,
        profileImg,
    });
