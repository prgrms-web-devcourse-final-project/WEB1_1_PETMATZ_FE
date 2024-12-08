import {
    CreatePleaseApiRequest,
    CreatePleaseApiResponse,
    PleaseListApiResponse,
    PetMissionInfoResponse,
    CreateMissionCommentRequest,
    CreateMissionCommentResponse,
    MissionAnswerInfoResponse,
} from '@/types/please';
import { http } from './base';

/**
 * GET	MissionList
 * 멍멍이 부탁을 조회합니다.
 */
export const getPleaseList = async (): Promise<PleaseListApiResponse> =>
    await http.get<PleaseListApiResponse>('/api/v1/pet/mission');

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

/**
 * 미션 돌봄일지를 등록합니다.
 * @param data 미션 돌봄일지 데이터
 * @returns API 응답
 */
export const createMissionContent = async ({
    askId,
    comment,
    imgURL,
}: CreateMissionCommentRequest): Promise<CreateMissionCommentResponse> =>
    await http.post<CreateMissionCommentResponse, CreateMissionCommentRequest>(
        '/api/v1/pet/mission/comment',
        { askId, comment, imgURL },
    );

/**
 * 특정 미션의 답변 정보를 조회합니다.
 * @param answerId 조회할 미션 답변의 ID
 * @returns 미션 답변 정보
 */
export const getMissionAnswerInfo = async (
    answerId: string,
): Promise<MissionAnswerInfoResponse> =>
    await http.get<MissionAnswerInfoResponse>(
        `/api/v1/pet/mission/comment/answer/info?answerId=${answerId}`,
    );

/**
 * 멍멍이 미션의 상태를 변경합니다.
 * @param petMissionId 미션 ID
 * @param missionStatusZip 변경할 상태 ('BEF' | 'INP' | 'AFT')
 * @returns API 응답
 */
export const updateMissionStatus = async (
    petMissionId: number,
    missionStatusZip: 'BEF' | 'INP' | 'AFT',
): Promise<void> => {
    return await http.put('/api/v1/pet/mission', {
        petMissionId,
        missionStatusZip,
    });
};
