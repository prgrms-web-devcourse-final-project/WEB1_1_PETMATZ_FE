import axios from 'axios';
import {
    AnimalRegistrationParams,
    AnimalRegistrationResponse,
} from '@/types/register';
import { useCustomToast } from '@/hooks';

export default function useAnimalRegistration() {
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
