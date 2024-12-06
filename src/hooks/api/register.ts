import axios from 'axios';
import { http } from './base';
import {
    AnimalRegistrationParams,
    AnimalRegistrationResponse,
    DogRegistrationRequest,
    DogRegistrationResponse,
} from '@/types/register';
import { useCustomToast } from '@/hooks';
import { putImageToS3 } from './auth';

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
        imgFile: File | null,
        userId: number,
    ): Promise<DogRegistrationResponse | null> => {
        console.log('imgFile :', imgFile);

        // 기본이미지일때(profile1~3), imgFile이 null로 온다.
        // 요청 보내기 전에, 이미지가 기본 프로필인 경우는 s3업로드를 skip하고 종료한다.
        if (formData.profileImg.startsWith('profile')) {
            const response = await http.post<
                DogRegistrationResponse,
                DogRegistrationRequest
            >('/api/pets/register', formData);

            if (response.ok) {
                showToast('반려견 등록이 완료되었습니다.', 'success');
                return response;
            } else {
                showToast(
                    response.error?.msg || '등록에 실패했습니다.',
                    'warning',
                );
                return null;
            }
        } else {
            // 사용자가 넣은 사진일 경우, s3업로드를 진행한다.
            formData.profileImg = '';
            const response = await http.post<
                DogRegistrationResponse,
                DogRegistrationRequest
            >('/api/pets/register', formData);

            const id = response.data.result.UUID;

            if (response.ok) {
                // 사용자가 넣은 사진일경우, s3에 이미지 업로드
                const img = imgFile!;

                const result = await putImageToS3({
                    id: Number(id),
                    imgURL: response.data.result.resultImgURL, // presigned URL, 기본이미지일때는 ""로 옴.
                    img,
                    type: 'P', // 예: 'PROFILE' 등 적절한 타입 지정
                });
                if (result) {
                    const updatedFormData = {
                        ...formData,
                        profileImg: response.data.result.resultImgURL, // S3 이미지 URL로 대체
                        id: userId,
                    };
                    // put 요청 보내기
                    const response2 = await http.put<
                        DogRegistrationResponse,
                        DogRegistrationRequest
                    >(`/api/pets/${id}`, updatedFormData);

                    if (response2.ok) {
                        showToast('반려견 등록이 완료되었습니다.', 'success');
                        return response2;
                    } else {
                        showToast(
                            response2.error?.msg || '등록에 실패했습니다.',
                            'warning',
                        );
                        return null;
                    }
                } else {
                    showToast('이미지 s3 업로드에 실패했습니다.', 'warning');
                    return null;
                }
            } else {
                showToast(
                    response.error?.msg || '등록에 실패했습니다.',
                    'warning',
                );
                return null;
            }
        }
    };

    return { registerDog };
}
