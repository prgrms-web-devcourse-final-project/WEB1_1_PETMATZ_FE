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

export type { FormData, CreatePleaseApiRequest, CreatePleaseApiResponse };
