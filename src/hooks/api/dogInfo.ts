import { http } from './base';
import { DogInfoResponse, DogsInfoResponse } from '@/types/dogInfo';

// 유저에 등록된 강아지 목록 확인시 요청하는 api
export const fetchDogInfo = async (id: number): Promise<DogInfoResponse> => {
    return await http.get<DogInfoResponse>(`/api/sosboard/pets/${id}`);
};

// 유저에 등록된 강아지 목록 확인시 요청하는 api
export const fetchDogsInfo = async (id: number): Promise<DogsInfoResponse> => {
    return await http.get<DogsInfoResponse>(`/api/sosboard/pets/${id}`);
};
