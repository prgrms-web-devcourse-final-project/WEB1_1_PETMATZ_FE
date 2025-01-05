import {
    ImageToS3Params,
    ImageUploadErrorApiRequest,
    ImageUploadErrorApiResponse,
} from '@/types/imageUpload';
import { http, httpForImage } from './base';
import {
    CheckVerificationCodeApiRequest,
    CheckVerificationCodeApiResponse,
    EmailVerificationCodeApiRequest,
    EmailVerificationCodeApiResponse,
    SignupApiRequest,
    SignupApiResponse,
} from '@/types/signup';
import { BaseApiResponse } from '@/types/baseResponse';
import {
    LoginApiRequest,
    LoginApiResponse,
    NewPasswordApiRequest,
    PasswordApiResponse,
    TemporaryPasswordApiRequest,
} from '@/types/user';

/**
 * POST Logout
 * 로그아웃 요청을 합니다.
 */
export const postLogout = async (): Promise<BaseApiResponse> =>
    await http.post<BaseApiResponse>('/api/auth/logout');

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

/**
 * POST	Send temporary password
 * 해당 이메일로 임시 비밀번호를 보냅니다.
 */
export const postTemporaryPassword = async ({
    accountId,
}: TemporaryPasswordApiRequest): Promise<PasswordApiResponse> =>
    await http.post<PasswordApiResponse, TemporaryPasswordApiRequest>(
        '/api/auth/send-repassword',
        {
            accountId,
        },
    );

/**
 * POST	Send new password
 * 비밀번호를 변경합니다.
 */
export const postNewPassword = async ({
    currentPassword,
    newPassword,
}: NewPasswordApiRequest): Promise<PasswordApiResponse> =>
    await http.post<PasswordApiResponse, NewPasswordApiRequest>(
        '/api/auth/repassword',
        {
            currentPassword,
            newPassword,
        },
    );

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

/**
 * PUT	S3 이미지 업로드 및 실패 처리
 * props로 받은 presigned url로 s3 이미지 업로드를 수행하고,
 * 업로드 실패시에 백엔드로 실패를 알리는 api 요청을 자동 수행
 * s3 업로드에 성공하면 최종적으로 함수는 true를 반환
 * s3 업로드에 실패하면 최종적으로 함수는 false를 반환
 */
export const putImageToS3 = async ({
    id,
    imgURL,
    img,
    type,
}: ImageToS3Params): Promise<boolean> => {
    const result = await httpForImage.put<BaseApiResponse, File>(imgURL, img);
    console.log('이미지 업로드 result : ', result);
    if (result.ok) {
        return true;
    } else {
        const UUID = id;
        const ImgType = type;
        await deleteImageUploadError({ UUID, ImgType }).then((response) => {
            console.log(response);
        });
        return false;
    }
};

/**
 * DELETE	Failed to upload image on s3
 * s3 이미지 업로드 실패를 백엔드 서버에 알립니다.
 */
const deleteImageUploadError = async ({
    UUID,
    ImgType,
}: ImageUploadErrorApiRequest): Promise<ImageUploadErrorApiResponse> =>
    await http.delete<ImageUploadErrorApiResponse, ImageUploadErrorApiRequest>(
        '/api/v1/image/error',
        {
            UUID,
            ImgType,
        },
    );
