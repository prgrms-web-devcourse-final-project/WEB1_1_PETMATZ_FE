import { http } from './base';
import { DogInfoResponse } from '@/types/dogInfo';

// 강아지 정보 확인시 요청하는 api
export const fetchDogInfo = async (id: number): Promise<DogInfoResponse> => {
    return await http.get<DogInfoResponse>(`/api/sosboard/pets/${id}`);
};
