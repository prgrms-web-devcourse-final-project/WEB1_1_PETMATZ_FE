import { http } from './base';
import { DogInfoResponse } from '@/types/dogInfo';

// 유저에 등록된 강아지 목록 확인시 요청하는 api
export const fetchDogInfo = async (id: number): Promise<DogInfoResponse> => {
    return await http.get<DogInfoResponse>(`/api/sosboard/pets/${id}`);
};
