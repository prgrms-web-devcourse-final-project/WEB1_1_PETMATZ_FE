import { BaseApiResponse } from './baseResponse';

interface IUser {
    id: number;
    accountId: string;
    nickname: string;
    isRegistered: boolean;
    region: string;
}

//	GET profile informations
interface ProfileApiQueryString {
    userId: string;
}
interface ProfileApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
        id: number;
        accountId: string;
        nickname: string;
        profileImg: string;
        role: string;
        preferredSizes: ('SMALL' | 'MEDIUM' | 'LARGE')[];
        gender: string;
        introduction: string;
        isRegistered: boolean;
        recommendationCount: number;
        careCompletionCount: number;
        isCareAvailable: boolean;
        mbti: string;
        region: string;
    };
}

// POST Edit MyProfile informations
interface EditMyProfileRequest {
    nickname: string;
    preferredSizes: ('SMALL' | 'MEDIUM' | 'LARGE')[];
    introduction: string;
    isCareAvailable: boolean;
    profileImg: string;
}

interface EditMyProfileResponse extends BaseApiResponse {
    responseCode: string; // 응답 코드 (예: "SU")
    message: string; // 응답 메시지 (예: "Success.")
}

export type {
    IUser,
    ProfileApiQueryString,
    ProfileApiResponse,
    EditMyProfileRequest,
    EditMyProfileResponse,
};
