import { http } from './base';
import { LocationParams } from '@/types/location';

/**
 * 위치 정보를 업데이트하는 API 호출
 * @param latitude 위도
 * @param longitude 경도
 * @returns LocationParams
 */

export const postLocation = async ({
    latitude,
    longitude,
}: LocationParams): Promise<LocationParams> =>
    await http.post<LocationParams, LocationParams>(
        '/api/auth/update-location',
        {
            latitude,
            longitude,
        },
    );
