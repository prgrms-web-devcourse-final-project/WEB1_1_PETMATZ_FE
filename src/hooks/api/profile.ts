import {
    LikeApiRequest,
    LikeApiResponse,
    ProfileApiQueryString,
    ProfileApiResponse,
} from '@/types/user';
import {
    ProfileApiQueryString,
    ProfileApiResponse,
    EditMyProfileRequest,
    EditMyProfileResponse,
} from '@/types/user';
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

/**
 * POST	Like profile
 * 돌봄이 찜하기
 */
export const postLikeProfile = async ({
    heartedId,
}: LikeApiRequest): Promise<LikeApiResponse> =>
    await http.post<LikeApiResponse, LikeApiRequest>('/api/auth/hearting', {
        heartedId,
    });

/**
 * POST Edit MyProfile informations
 * 나의 프로필 정보를 수정합니다.
 */
export const editMyProfileInfo = async (
    data: EditMyProfileRequest,
): Promise<EditMyProfileResponse> =>
    await http.post<EditMyProfileResponse, EditMyProfileRequest>(
        '/api/auth/edit-myprofile',
        data,
    );
