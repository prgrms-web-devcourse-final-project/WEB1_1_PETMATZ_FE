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
        preferredSizes?: ('SMALL' | 'MEDIUM' | 'LARGE')[];
        preferredSize?: ('SMALL' | 'MEDIUM' | 'LARGE')[];
        gender: string;
        introduction: string;
        isRegistered: boolean;
        recommendationCount: number;
        careCompletionCount: number;
        isCareAvailable: boolean;
        mbti: string;
        region: string;
        myHeartUser?: boolean;
    };
}

//	POST like user profile
interface LikeApiRequest {
    heartedId: number;
}
interface LikeApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

interface LikedUser {
    myId: number;
    heartedId: number;
    nickname: string;
    profileImg: string;
    careAvailable: boolean;
    preferredSizes: ('SMALL' | 'MEDIUM' | 'LARGE')[];
}

//	GET liked user list
interface LikedUserListApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
        heartedUsers: LikedUser[];
    };
}

// POST Edit MyProfile informations
interface EditMyProfileRequest {
    nickname: string;
    preferredSizes: ('SMALL' | 'MEDIUM' | 'LARGE')[];
    introduction: string;
    careAvailable: boolean;
    profileImg: string;
}

interface EditMyProfileResponse extends BaseApiResponse {
    data: {
        responseCode: string; // 응답 코드 (예: "SU")
        message: string; // 응답 메시지 (예: "Success.")
        resultImgURL: string;
    };
}

export type {
    IUser,
    LikedUser,
    ProfileApiQueryString,
    ProfileApiResponse,
    EditMyProfileRequest,
    EditMyProfileResponse,
    LikeApiRequest,
    LikeApiResponse,
    LikedUserListApiResponse,
};
