import { http } from './base';
import {
    PetListResponse,
    SOSCreateRequest,
    SOSCreateApiResponse,
} from '@/types/Sos';

// 강아지 목록 불러오는 API 함수
export const getPetList = async (userId: number): Promise<PetListResponse> => {
    return http.get(`/api/sosboard/pets/${userId}`);
};

// SOS 게시물 생성 API 함수
export const createSOSPost = async (
    formData: SOSCreateRequest,
): Promise<SOSCreateApiResponse> => {
    return http.post('/api/sosboard', formData);
};
