import {
    ImageToS3Params,
    ImageUploadErrorApiRequest,
    ImageUploadErrorApiResponse,
} from '@/types/imageUpload';
import { http, httpForImage } from './base';
import { BaseApiResponse } from '@/types/baseResponse';

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
}: ImageToS3Params): Promise<boolean | void> => {
    await httpForImage
        .put<BaseApiResponse, File>(imgURL, img)
        .then(async (response) => {
            if (response.ok) {
                return true;
            } else {
                const UUID = id;
                const ImgType = type;
                await deleteImageUploadError({ UUID, ImgType });
                return false;
            }
        });
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
