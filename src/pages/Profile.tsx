import { Loading } from '@/components/common';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// 사용자 데이터 타입 정의
interface UserData {
    ok: boolean;
    // 필요한 다른 사용자 데이터 필드
}

// API 응답 타입 정의
interface ApiResponse {
    data: UserData;
}

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery<ApiResponse, Error>({
        queryKey: ['user', id],
        queryFn: () =>
            // api 요청
            fetch(`/api/${id}`).then((res) => res.json()),
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>에러 발생: {error.message}</div>;
    }

    if (!data?.data.ok) {
        return <div>"존재하지 않는 사용자"</div>;
    }

    return <div>프로필 페이지</div>;
}
