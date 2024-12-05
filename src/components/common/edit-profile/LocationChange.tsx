import { useState } from 'react';
import { postLocation } from '@/hooks/api/location';
import { useUserStore } from '@/stores';
import { useLocation } from '@/hooks/useLocation';
import LoadingSpiner from '@/assets/images/profile/loadingSpiner.svg?react';

interface LocationChangeProps {
    onLocationChange: () => void; // 위치 변경 후 실행될 콜백
}

export default function LocationChange({
    onLocationChange,
}: LocationChangeProps) {
    const { user } = useUserStore(); // Zustand store에서 사용자 데이터 가져오기
    const { data } = useLocation(); // 현재 위치 정보 가져오기

    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

    const handleLocationChange = async () => {
        if (!data || data.latitude === null || data.longitude === null) {
            alert('위치 정보를 가져올 수 없습니다.');
            return;
        }

        setIsLoading(true); // 로딩 시작
        try {
            await postLocation(data); // 위치 업데이트 API 호출

            onLocationChange();
        } catch (error) {
            console.error('위치 업데이트 실패:', error);
            alert('위치 업데이트에 실패했습니다.');
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <div className="mb-[18px]">
            <p className="text-label-m font-normal text-gray-500 mb-2">지역</p>
            <div className="flex gap-2 items-center">
                {/* 사용자 지역 정보 표시 */}
                <p className="rounded-lg text-label-l font-semibold py-1">
                    {user?.region || '지역 정보 없음'}
                </p>
                {isLoading ? (
                    <LoadingSpiner className="w-6 h-6 text-purple-900 animate-spin" />
                ) : (
                    <button
                        onClick={handleLocationChange} // 위치 변경 버튼 클릭 핸들러
                        className="text-gray-400 text-label-m font-normal"
                    >
                        위치 변경
                    </button>
                )}
            </div>
        </div>
    );
}
