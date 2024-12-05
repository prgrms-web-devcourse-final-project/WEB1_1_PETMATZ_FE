import { ImageToS3ApiRequest, ImageToS3Params } from '@/types/imageUpload';
import { httpForImage } from './base';
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
}: ImageToS3Params): Promise<boolean> => {
    await httpForImage
        .put<BaseApiResponse, ImageToS3ApiRequest>(imgURL, { img })
        .then((response) => {
            if (response.ok) {
                return true;
            } else {
                // 업로드 실패의 경우
                return false;
            }
        });
    return false;
};
