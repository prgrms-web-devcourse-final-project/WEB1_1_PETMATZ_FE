//	PUT s3 image upload function
interface ImageToS3ApiRequest {
    img: FormData;
}
interface ImageToS3Params extends ImageToS3ApiRequest {
    id: number;
    imgURL: string;
}

export type { ImageToS3Params, ImageToS3ApiRequest };
