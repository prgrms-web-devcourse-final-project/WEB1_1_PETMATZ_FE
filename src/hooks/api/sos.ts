import { http } from './base';
import {
    PetListResponse,
    SOSCreateRequest,
    SOSCreateApiResponse,
    SOSDetailsResponse,
    SOSDeleteResponse,
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

// sos 디테일 조회 API
export const getSOSDetails = async (
    userId: number,
): Promise<SOSDetailsResponse> => {
    return await http.get<SOSDetailsResponse>(`/api/sosboard/${userId}`);
};

// SOS 특정 게시글 삭제 API 함수
export const deleteSOSPost = async (id: number): Promise<SOSDeleteResponse> => {
    return await http.get<SOSDeleteResponse>(`/api/sosboard/${id}`);
};
