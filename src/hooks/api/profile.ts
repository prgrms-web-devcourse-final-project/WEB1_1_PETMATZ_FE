import { ProfileApiQueryString, ProfileApiResponse } from '@/types/user';
import { http } from './base';

/**
 * GET	Profile informations
 * 다른 사용자의 프로필 정보를 불러옵니다.
 */
export const getProfileInfo = async ({
    userId,
}: ProfileApiQueryString): Promise<ProfileApiResponse> =>
    await http.get<ProfileApiResponse, ProfileApiQueryString>(
        '/api/auth/get-otherprofile',
        { userId },
    );

/**
 * GET	MyProfile	informations
 * 나의 프로필 정보를 불러옵니다.
 */
export const getMyProfileInfo = async (): Promise<ProfileApiResponse> =>
    await http.get<ProfileApiResponse>('/api/auth/get-myprofile');
