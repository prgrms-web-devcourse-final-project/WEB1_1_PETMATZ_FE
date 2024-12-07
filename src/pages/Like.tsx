import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';
import Back from '@/assets/images/header/back.svg?react';
import { useQuery } from '@tanstack/react-query';
import { LikedUserListApiResponse } from '@/types/user';
import { useUserStore } from '@/stores';
import { getLikedUserList } from '@/hooks/api/user';
import { Loading } from '@/components/common';
import { LikedUser } from '@/components/like';

export default function Like() {
    const navigate = useFadeNavigate();
    const { user } = useUserStore();

    const { data, isLoading } = useQuery<LikedUserListApiResponse, Error>({
        queryKey: ['likedList'],
        queryFn: () => getLikedUserList(),
    });

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, []);

    if (isLoading || !user) {
        return <Loading />;
    }

    console.log(data);

    return (
        <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
            <header className="bg-white h-14 w-full flex items-center justify-center">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    찜한 돌봄이
                </h1>
            </header>
            <ul className="bg-white flex-1 flex flex-col justify-start overflow-y-auto pb-2.5">
                <LikedUser />
                <LikedUser />
                <LikedUser />
            </ul>
        </div>
    );
}
