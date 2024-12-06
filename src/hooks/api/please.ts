import {
    CreatePleaseApiRequest,
    CreatePleaseApiResponse,
    PetMissionInfoResponse,
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

/**
 * 특정 멍멍이 미션의 상세 정보를 조회합니다.
 * @param petMissionId 조회할 멍멍이 미션의 ID
 * @returns 멍멍이 미션 상세 정보
 */
export const getPetMissionInfo = async (
    petMissionId: string,
): Promise<PetMissionInfoResponse> =>
    await http.get<PetMissionInfoResponse>(
        `/api/v1/pet/mission/Info?petMissionId=${petMissionId}`,
    );
