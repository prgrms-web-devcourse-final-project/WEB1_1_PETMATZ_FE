import { postLocation } from '@/hooks/api/location'; // postLocation API 호출
import { useUserStore } from '@/stores';
import { useLocation } from '@/hooks/useLocation';
import { useCustomToast } from '../CustomToast';

export default function LocationChange() {
    const { user } = useUserStore(); // Zustand store에서 사용자 데이터 가져오기
    const { data } = useLocation(); // 현재 위치 정보 가져오기

    const handleLocationChange = async () => {
        if (!data || data.latitude === null || data.longitude === null) {
            alert('위치 정보를 가져올 수 없습니다.');
            return;
        }

        try {
            const updatedLocation = await postLocation(data); // 위치 업데이트 API 호출
            console.log(updatedLocation);
            console.log('유저정보', user);
            useCustomToast;
            alert('위치가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.error('위치 업데이트 실패:', error);
            alert('위치 업데이트에 실패했습니다.');
        }
    };

    return (
        <div className="mb-[18px]">
            <p className="text-label-m font-normal text-gray-500 mb-2">지역</p>
            <div className="flex gap-2">
                {/* 사용자 지역 정보 표시 */}
                <p className="rounded-lg text-label-l font-normal">
                    {user?.region || '지역 정보 없음'}
                </p>
                <button
                    onClick={handleLocationChange} // 위치 변경 버튼 클릭 핸들러
                    className="text-gray-400 text-body-s font-normal"
                >
                    위치 변경
                </button>
            </div>
        </div>
    );
}
