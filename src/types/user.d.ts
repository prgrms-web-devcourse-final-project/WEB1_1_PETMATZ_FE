import { BaseApiResponse } from './baseResponse';

/**
 * Login form input type
 */
interface LoginInputs {
    /** User's email address */
    accountId: string;
    /** User's password */
    password: string;
}

//	POST login
interface LoginApiRequest {
    accountId: string;
    password: string;
}
interface LoginApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
        id: number;
        accountId: string;
        nickname: string;
        loginRole: string;
        loginType: string;
        role: string;
        preferredSize: ('SMALL' | 'MEDIUM' | 'LARGE')[];
        gender: string;
        isRegistered: boolean;
        recommendationCount: number;
        careCompletionCount: number;
        isCareAvailable: boolean;
        mbti: string;
        region: string;
    };
}

/**
 * ForgotPassword form input type
 */
interface ForgotPasswordInputs {
    /** User's email address */
    email: string;
}

/**
 * ChangePassword form input type
 */
interface ChangePasswordInputs {
    /** User's current password */
    currentPassword: string;
    /** User's new password */
    newPassword: string;
    /** User's confirm password */
    confirmPassword: string;
}

//	POST temporary password
interface TemporaryPasswordApiRequest {
    accountId: string;
}
//	POST new password
interface NewPasswordApiRequest {
    currentPassword: string;
    newPassword: string;
}
interface PasswordApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

/**
 * Delete account form input type
 */
interface DeleteAccountInputs {
    /** User's password */
    password: string;
}

//	POST delete account
interface DeleteAccountApiRequest {
    password: string;
}
interface DeleteAccountApiResponse extends BaseApiResponse {
    data: {
        responseCode: string;
        message: string;
    };
}

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
    LoginInputs,
    LoginApiRequest,
    LoginApiResponse,
    ForgotPasswordInputs,
    ChangePasswordInputs,
    TemporaryPasswordApiRequest,
    NewPasswordApiRequest,
    PasswordApiResponse,
    DeleteAccountInputs,
    DeleteAccountApiRequest,
    DeleteAccountApiResponse,
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
