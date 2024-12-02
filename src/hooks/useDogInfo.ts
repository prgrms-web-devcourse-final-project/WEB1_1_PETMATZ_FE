import { useEffect, useState } from 'react';
import { fetchDogInfo } from '@/hooks/api/dogInfo';
import { DogInfo } from '@/types/dogInfo';

export const useDogInfo = (id: number) => {
    const [dogInfo, setDogInfo] = useState<DogInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getDogInfo = async () => {
            try {
                setLoading(true);
                const response = await fetchDogInfo(id);

                if (response.ok && response.data?.length) {
                    setDogInfo(response.data[0]);
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
