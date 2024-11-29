import { http } from './base';
import { LoginApiRequest, LoginApiResponse } from '@/types/login';

/**
 * POST	Login
 * 로그인 요청을 보내서 성공시, 회원정보를 받아옵니다.
 */
export const postLogin = async ({
    accountId,
    password,
}: LoginApiRequest): Promise<LoginApiResponse> =>
    await http.post<LoginApiResponse, LoginApiRequest>('/api/auth/sign-in', {
        accountId,
        password,
    });
