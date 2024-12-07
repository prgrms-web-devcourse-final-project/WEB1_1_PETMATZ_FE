import { useFadeNavigate } from '@/hooks';
import { useCallback } from 'react';
import Back from '@/assets/images/header/back.svg?react';
import Heart from '@/assets/images/profile/heart.svg?react';
import { useQuery } from '@tanstack/react-query';
import { LikedUserListApiResponse } from '@/types/user';
import { useUserStore } from '@/stores';
import { getLikedUserList } from '@/hooks/api/user';
import { Loading } from '@/components/common';

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
                <li className="w-full max-w-[600px] mx-auto px-6 py-[10px] border-b-2 border-gray-200 flex items-center gap-6">
                    <div className="relative w-[75px] h-[75px] cursor-pointer">
                        <img
                            src="/src/assets/images/profile/profile1.svg"
                            alt="프로필 이미지"
                            className="object-cover w-full h-full rounded-full border-1 border-gray-200"
                        />
                    </div>
                    <section className="flex-1 flex flex-col justify-around gap-[10px]">
                        <h2 className="text-gray-900 text-body-l font-extrabold">
                            <span className="cursor-pointer">닉네임</span>
                        </h2>
                        <div className="flex flex-wrap gap-[10px] text-label-m text-point-500 font-extrabold">
                            <span>#돌봄 불가능</span>
                            <span>#소형</span>
                            <span>#중형</span>
                            <span>#대형</span>
                        </div>
                    </section>
                    <Heart className="cursor-pointer w-8 h-8 text-warning-200" />
                </li>
                <li className="w-full max-w-[600px] mx-auto px-6 py-[10px] border-b-2 border-gray-200 flex items-center gap-6">
                    <div className="relative w-[75px] h-[75px] cursor-pointer">
                        <img
                            src="/src/assets/images/profile/profile1.svg"
                            alt="프로필 이미지"
                            className="object-cover w-full h-full rounded-full border-1 border-gray-200"
                        />
                    </div>
                    <section className="flex-1 flex flex-col justify-around gap-[10px]">
                        <h2 className="text-gray-900 text-body-l font-extrabold">
                            <span className="cursor-pointer">닉네임</span>
                        </h2>
                        <div className="flex flex-wrap gap-[10px] text-label-m text-point-500 font-extrabold">
                            <span>#돌봄 불가능</span>
                            <span>#소형</span>
                            <span>#중형</span>
                            <span>#대형</span>
                        </div>
                    </section>
                    <Heart className="cursor-pointer w-8 h-8 text-warning-200" />
                </li>
                <li className="w-full max-w-[600px] mx-auto px-6 py-[10px] border-b-2 border-gray-200 flex items-center gap-6">
                    <div className="relative w-[75px] h-[75px] cursor-pointer">
                        <img
                            src="/src/assets/images/profile/profile1.svg"
                            alt="프로필 이미지"
                            className="object-cover w-full h-full rounded-full border-1 border-gray-200"
                        />
                    </div>
                    <section className="flex-1 flex flex-col justify-around gap-[10px]">
                        <h2 className="text-gray-900 text-body-l font-extrabold">
                            <span className="cursor-pointer">닉네임</span>
                        </h2>
                        <div className="flex flex-wrap gap-[10px] text-label-m text-point-500 font-extrabold">
                            <span>#돌봄 불가능</span>
                            <span>#소형</span>
                            <span>#중형</span>
                            <span>#대형</span>
                        </div>
                    </section>
                    <Heart className="cursor-pointer w-8 h-8 text-warning-200" />
                </li>
            </ul>
        </div>
    );
}
