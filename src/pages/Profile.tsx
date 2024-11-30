import { Loading } from '@/components/common';
import { getProfileInfo } from '@/hooks/api/profile';
import { useUserStore } from '@/stores';
import { ProfileApiResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const { user } = useUserStore();

    const userId = id || '';
    const isMyProfile = id === user?.id;

    const { data, isLoading } = useQuery<ProfileApiResponse, Error>({
        queryKey: ['user', userId],
        queryFn: () => getProfileInfo({ userId }),
    });

    if (isLoading) {
        return <Loading />;
    }

    if (!data || !data.data || data.error?.status === 500) {
        return <div>서버 에러</div>;
    } else if (data.error?.status === 400) {
        return <div>존재하지 않는 사용자입니다.</div>;
    }

    const profileData = data.data;

    return (
        <div>
            <h1>{profileData?.nickname}의 프로필</h1>
            {/* 여기에 더 많은 프로필 정보를 표시할 수 있습니다 */}
        </div>
    );
}
