import { useState } from 'react';
import { recommendCaregiver } from '@/hooks/api/please';
import { useCustomToast } from '@/hooks';

export const useRecommendation = () => {
    const [isRecommended, setIsRecommended] = useState(false);
    const { showToast } = useCustomToast();

    const handleRecommend = async (userId: number) => {
        try {
            await recommendCaregiver(userId);
            setIsRecommended(true);
            showToast('돌봄이를 추천했습니다!', 'success');
        } catch (error) {
            showToast('추천 중 오류가 발생했습니다.', 'warning');
        }
    };

    return { isRecommended, handleRecommend };
};

export default useRecommendation;
