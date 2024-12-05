import {
    CreatePleaseApiRequest,
    CreatePleaseApiResponse,
} from '@/types/please';
import { http } from './base';

/**
 * POST	Please	Create
 * 멍멍이 부탁을 등록합니다.
 */
export const createPlease = async ({
    receiverId,
    missionEnd,
    missionStarted,
    petId,
    petMissionAsk,
}: CreatePleaseApiRequest): Promise<CreatePleaseApiResponse> =>
    await http.post<CreatePleaseApiResponse, CreatePleaseApiRequest>(
        '/api/v1/pet/mission',
        { receiverId, missionEnd, missionStarted, petId, petMissionAsk },
    );
