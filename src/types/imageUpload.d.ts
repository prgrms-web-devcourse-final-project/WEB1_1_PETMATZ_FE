//	PUT s3 image upload function
interface ImageToS3ApiRequest {
    img: FormData;
}
interface ImageToS3Params extends ImageToS3ApiRequest {
    id: number;
    imgURL: string;
    type: 'P' | 'H' | 'U';
}

//	Delete Failed to upload image on s3
interface ImageUploadErrorApiRequest {
    UUID: number;
    ImgType: 'P' | 'H' | 'U';
}
interface ImageUploadErrorApiResponse extends BaseApiResponse {
    data: {
        ok: string;
    };
}

export type {
    ImageToS3Params,
    ImageToS3ApiRequest,
    ImageUploadErrorApiRequest,
    ImageUploadErrorApiResponse,
};
