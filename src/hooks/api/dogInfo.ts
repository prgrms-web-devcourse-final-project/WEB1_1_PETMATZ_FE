import { http } from './base';
import {
    DogInfoResponse,
    DogsInfoResponse,
    DogProfileRequestBody,
    DogProfileResponse,
    DeleteDogResponse,
    DeleteDogRequest,
} from '@/types/dogInfo';

// 유저에 등록된 강아지 목록 확인시 요청하는 api
export const fetchDogInfo = async (id: number): Promise<DogInfoResponse> => {
    return await http.get<DogInfoResponse>(`/api/sosboard/pets/${id}`);
};

// 유저에 등록된 강아지 목록 확인시 요청하는 api
export const fetchDogsInfo = async (id: number): Promise<DogsInfoResponse> => {
    return await http.get<DogsInfoResponse>(`/api/sosboard/pets/${id}`);
};

/**
 * PUT Edit Dog Profile Information
 * 강아지 프로필 정보를 수정합니다.
 */
export const editDogProfileInfo = async (
    id: number,
    data: DogProfileRequestBody,
): Promise<DogProfileResponse> =>
    await http.put<DogProfileResponse, DogProfileRequestBody>(
        `/api/pets/${id}`,
        data,
    );

// 강아지 정보 삭제 API 함수
export const deleteDogInfo = async (id: number): Promise<DeleteDogResponse> => {
    return await http.delete<DeleteDogResponse, DeleteDogRequest>(
        `/api/pets/${id}`,
    );
};
