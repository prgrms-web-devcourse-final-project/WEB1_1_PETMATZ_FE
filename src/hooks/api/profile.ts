import { ProfileApiQueryString, ProfileApiResponse } from '@/types/user';
import { http } from './base';

/**
 * GET	Profile informations
 * 나 또는 다른 사람의 개인 정보를 불러옵니다.
 */
export const getProfileInfo = async ({
    userId,
}: ProfileApiQueryString): Promise<ProfileApiResponse> =>
    await http.get<ProfileApiResponse>(
        `/api/auth/get-profile?userId=${userId}`,
    );
