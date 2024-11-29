import { BaseApiResponse } from './baseResponse';

interface LocationResponse extends BaseApiResponse {
    data: {
        latitude: number | null;
        longitude: number | null;
    };
}

export type { LocationResponse };
