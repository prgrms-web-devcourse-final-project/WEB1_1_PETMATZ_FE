import axios from 'axios';
import { http } from './base';
import {
    AnimalRegistrationParams,
    AnimalRegistrationResponse,
    DogRegistrationRequest,
    DogRegistrationResponse,
} from '@/types/register';
import { useCustomToast } from '@/hooks';

// 동물 등록번호 조회 api 호출
export function useAnimalRegistration() {
    const { showToast } = useCustomToast();
    const apiKey = import.meta.env.VITE_REG_API_KEY;

    const fetchAnimalRegistration = async (
        params: AnimalRegistrationParams,
    ): Promise<AnimalRegistrationResponse | null> => {
        try {
            const response = await axios.get<AnimalRegistrationResponse>(
                'https://apis.data.go.kr/1543061/animalInfoSrvc/animalInfo',
                {
                    params: {
                        serviceKey: apiKey,
                        dog_reg_no: params.dog_reg_no,
                        owner_nm: params.owner_nm,
                        _type: 'json',
                    },
                },
            );

            if (response.data.response.body.item) {
                showToast('등록번호가 확인되었습니다.', 'success');
                return response.data;
            } else {
                showToast('등록번호를 다시 확인해주세요.', 'warning');
                return null;
            }
        } catch (error) {
            console.error('API 요청 중 오류:', error);
            showToast('조회 중 오류가 발생했습니다.', 'warning');
            return null;
        }
    };

    return { fetchAnimalRegistration };
}

// 동물 등록 api 호출
export function useDogRegistration() {
    const { showToast } = useCustomToast();

    const registerDog = async (
        formData: DogRegistrationRequest,
    ): Promise<DogRegistrationResponse | null> => {
        const response = await http.post<
            DogRegistrationResponse,
            DogRegistrationRequest
        >('/api/pets/register', formData);

        if (response.ok) {
            showToast('반려견 등록이 완료되었습니다.', 'success');
            return response;
        } else {
            showToast(response.error?.msg || '등록에 실패했습니다.', 'warning');
            return null;
        }
    };

    return { registerDog };
}
