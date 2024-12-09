import { useState, useEffect } from 'react';
import { getPetMissionInfo } from '../api/please';
import { PetMissionInfoResponse } from '@/types/please';

export default function usePetMissionInfo(petMissionId: string) {
    const [data, setData] = useState<PetMissionInfoResponse['data']>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMissionInfo = async () => {
        if (!petMissionId) return null;

        setIsLoading(true);
        try {
            const result = await getPetMissionInfo(petMissionId);

            if (result.ok && result.data) {
                setData(result.data);
                setError(null);
                return result.data;
            } else {
                setError(
                    result.error?.msg ||
                        '미션 정보를 불러오는 데 실패했습니다.',
                );
                return null;
            }
        } catch (err) {
            setError('네트워크 오류가 발생했습니다.');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMissionInfo();
    }, [petMissionId]);

    return { data, isLoading, error, refetchMissionInfo: fetchMissionInfo };
}
