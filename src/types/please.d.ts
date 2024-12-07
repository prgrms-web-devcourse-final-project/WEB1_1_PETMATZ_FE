import { BaseApiResponse } from './baseResponse';

// 폼 데이터 타입
interface FormData {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    multiSelect: { id: number; label: string }[];
    dynamicInputs: [{ value: '' }];
}

// POST	Please	create
interface CreatePleaseApiRequest {
    receiverId: number;
    petId: string[];
    missionStarted: string;
    missionEnd: string;
    petMissionAsk: string[];
}
interface CreatePleaseApiResponse extends BaseApiResponse {
    data: {
        result: {
            chatRoomId: number;
            petMissionId: number[];
        };
    };
}

// 반려견 정보 타입
interface PetInfo {
    petName: string;
    breed: string;
    age: number;
    gender: 'MALE' | 'FEMALE';
    neuterYn: string; // '중성' | '미중성',
    temperament: string;
    size: string;
    profileImg: string;
}

// 미션 요청 정보 타입
interface PetMissionAskInfo {
    id: number | null;
    comment: string | null;
    ask: string;
    imgURL: string | null;
}

interface PetMissionInfoResponse extends BaseApiResponse {
    data: {
        result: {
            id: number;
            careName: string;
            careId: number;
            receiverName: string;
            receiverId: number;
            receiverStart: string;
            receiverEnd: string;
            petMissionPetInfos: PetInfo[];
            petMissionAskInfos: PetMissionAskInfo[];
            status: 'BEF' | 'INP' | 'AFT';
        };
    };
}

interface MissionInfo {
    id: number;
    careName: string;
    careId: number;
    receiverName: string;
    receiverId: number;
    receiverStart: string;
    receiverEnd: string;
    petMissionPetInfos: PetInfo[];
    petMissionAskInfos: PetMissionAskInfo[];
    status: 'BEF' | 'INP' | 'AFT';
}

interface Request {
    id: number | null;
    ask: string;
    comment?: string | null;
    imgURL?: string | null;
}

interface RequestListAccordionProps {
    petMissionAskInfos: Request[];
    status: string;
    userId?: number;
    receiverId?: number;
}

export type {
    FormData,
    CreatePleaseApiRequest,
    CreatePleaseApiResponse,
    PetMissionInfoResponse,
    MissionInfo,
    Request,
    RequestListAccordionProps,
};
