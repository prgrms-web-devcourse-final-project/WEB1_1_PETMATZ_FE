import { useEffect, useState } from 'react';
import { fetchDogInfo } from '@/hooks/api/dogInfo';
import { DogInfo } from '@/types/dogInfo';

//유저에 등록된 강아지 목록 조회
export const useDogInfo = (id: number) => {
    const [dogInfo, setDogInfo] = useState<DogInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getDogInfo = async () => {
            try {
                setLoading(true);
                const response = await fetchDogInfo(id);

                if (response.ok && response.data) {
                    setDogInfo(response.data);
                    console.log(dogInfo);
                } else {
                    setError(
                        response.error?.msg || '정보를 불러오지 못했습니다.',
                    );
                }
            } catch (err) {
                setError('오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        getDogInfo();
    }, [id]);

    return { dogInfo, loading, error };
};
