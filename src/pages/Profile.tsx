import { Loading } from '@/components/common';
import { getProfileInfo } from '@/hooks/api/profile';
import { ProfileApiResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const userId = id || '';
    const { data, isLoading, error } = useQuery<ProfileApiResponse, Error>({
        queryKey: ['user', id],
        queryFn: () => getProfileInfo({ userId }),
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>에러 발생: {error.message}</div>;
    }

    if (!data || !data.data) {
        return <div>"데이터를 불러오는 데 실패했습니다."</div>;
    }

    const profileData = data.data;

    if (!profileData.isRegistered) {
        return <div>존재하지 않는 사용자입니다.</div>;
    }

    return (
        <div>
            <h1>{data.data.nickname}의 프로필</h1>
            {/* 여기에 더 많은 프로필 정보를 표시할 수 있습니다 */}
        </div>
    );
}
