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

interface IPleaseItem {
    missionId: number;
    comment: string[];
    petMissionStarted: string;
    petMissionEnd: string;
    status: 'BEF' | 'INP' | 'AFT';
    petInfo: {
        petId: number;
        imgURL: string;
    }[];
    petMissionUsers: {
        roleType: 'DOL' | 'MAL';
        userId: number;
        userNickname: string;
        userProfileURL: string;
    }[];
}

// GET	MissionList
interface PleaseListApiResponse extends BaseApiResponse {
    data: {
        result: IPleaseItem[];
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
    petMissionAskInfos: any;
    data: {
        petMissionAskInfos: any;
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
    isRegistered: any;
    id: number;
    ask: string;
    comment?: string | null;
    imgURL?: string | null;
}

interface RequestListAccordionProps {
    petMissionAskInfos: Request[];
    status: 'BEF' | 'INP' | 'AFT';
    userId?: number;
    receiverId?: number;
}

interface CreateMissionCommentRequest {
    askId: string;
    comment: string;
    imgURL: string;
}

interface CreateMissionCommentResponse extends BaseApiResponse {
    data: string;
}

interface MissionDetailInfo {
    id: number;
    ask: string;
    comment: string;
    imgURL?: string;
}

interface MissionAnswerInfoResponse extends BaseApiResponse {
    data: MissionDetailInfo;
}

export type {
    FormData,
    CreatePleaseApiRequest,
    CreatePleaseApiResponse,
    PetMissionInfoResponse,
    MissionInfo,
    Request,
    RequestListAccordionProps,
    CreateMissionCommentRequest,
    CreateMissionCommentResponse,
    MissionAnswerInfoResponse,
    PleaseListApiResponse,
    IPleaseItem,
};
