import { Loading } from '@/components/common';
import { getProfileInfo, postLikeProfile } from '@/hooks/api/profile';
import { useTitleStore, useUserStore } from '@/stores';
import { ProfileApiResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Star from '@/assets/images/profile/star.svg?react';
import Lvl from '@/assets/images/profile/lvl.svg?react';
import Heart from '@/assets/images/profile/heart.svg?react';
import Unheart from '@/assets/images/profile/unheart.svg?react';
import { DogList, Label, Tag } from '@/components/profile';
import { useCallback, useEffect, useState } from 'react';
import { useFadeNavigate } from '@/hooks';
import { createChatRoom } from '@/hooks/api/chat';
import { DogsInfoResponse } from '@/types/dogInfo';
import { fetchDogsInfo } from '@/hooks/api/dogInfo';

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const { user } = useUserStore();
    const navigate = useFadeNavigate();
    const [image, setImage] = useState(
        '/src/assets/images/profile/profile1.svg',
    );
    const [like, setLike] = useState(false);
    const { setTitle } = useTitleStore();
    const [showMenu, setShowMenu] = useState(false);

    const userId = id || '';
    const isMyProfile = id == user?.id;

    const { data, isLoading: userLoading } = useQuery<
        ProfileApiResponse,
        Error
    >({
        queryKey: ['user', userId],
        queryFn: () => getProfileInfo({ userId }),
    });

    const { data: dogsData, isLoading: dogsLoading } = useQuery<
        DogsInfoResponse,
        Error
    >({
        queryKey: ['dogs', userId],
        queryFn: () => fetchDogsInfo(Number(userId)),
    });

    useEffect(() => {
        setTitle('프로필');
    }, []);

    useEffect(() => {
        if (!data) {
            return;
        }
        setImage(data.data.profileImg);
        if (!isMyProfile) {
            setLike(data.data.myHeartUser!);
        }
    }, [data, setImage, isMyProfile]);

    const handleEditBtn = useCallback(() => {
        navigate('/edit-profile');
    }, []);

    const handleChatBtn = useCallback(async () => {
        const entrustedEmail = data!.data.accountId; // 상대방 이메일
        const caregiverEmail = user!.accountId; // 나의 이메일
        await createChatRoom({ entrustedEmail, caregiverEmail }).then(
            (response) => {
                if (response.ok) {
                    navigate(`/chat/${response.data.result}`);
                } else {
                    console.log(response.error?.msg);
                }
            },
        );
    }, [data, user]);

    const handleLikeBtn = useCallback(async () => {
        const heartedId = data!.data.id;
        await postLikeProfile({ heartedId }).then((response) => {
            if (response.ok) {
                setLike((prev) => !prev);
            } else {
                console.log(response.error?.msg);
            }
        });
    }, [data]);

    if (userLoading || dogsLoading || !user) {
        return <Loading />;
    }

    if (
        !data ||
        !dogsData ||
        !data.data ||
        !dogsData.data ||
        data.error?.status === 400 ||
        data.error?.status === 500 ||
        dogsData.error?.status === 500
    ) {
        return <div>404 not found</div>;
    }

    const profileData = data.data;

    return (
        <div className="bg-gray-100 h-full overflow-y-auto">
            <div className="w-full bg-white pt-6 pb-12">
                <div className="w-full max-w-[600px] mx-auto px-6 flex flex-col gap-4">
                    <h2 className="text-title-s font-extrabold text-gray-800">
                        {isMyProfile ? <p>나의 프로필</p> : <p>안녕하세요!</p>}
                    </h2>
                    <section className="flex flex-col gap-2 items-center">
                        <div className="relative w-[100px] h-[100px]">
                            <img
                                src={image}
                                alt="프로필 이미지"
                                className="object-cover w-full h-full rounded-full border-[1px] border-gray-200"
                            />
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <span className="text-body-l text-gray-800 font-extrabold">
                                {profileData.nickname}
                            </span>
                            {profileData.gender === 'MALE' ? (
                                <span className="text-label-s font-semibold text-white bg-point-500 px-[12.5px] py-[4.5px] rounded-lg">
                                    남성
                                </span>
                            ) : (
                                <span className="text-label-s font-semibold text-white bg-warning-200 px-[12.5px] py-[4.5px] rounded-lg">
                                    여성
                                </span>
                            )}
                        </div>
                        <span className="text-label-l text-gray-400 font-semibold break-words max-w-full">
                            {profileData.introduction}
                        </span>
                        <div className="py-3 flex justify-center gap-4">
                            <article className="w-[88px] flex flex-col items-center gap-1">
                                <Star />
                                <span className="text-label-s text-gray-500 font-semibold">
                                    추천수
                                </span>
                                <span className="text-label-l text-point-800 font-extrabold">
                                    {profileData.recommendationCount} 개
                                </span>
                            </article>
                            <article className="w-[88px] flex flex-col items-center gap-1">
                                <Lvl
                                    className={
                                        profileData.recommendationCount >= 50
                                            ? 'text-point-500'
                                            : profileData.recommendationCount >=
                                                26
                                              ? 'text-[#3EB2FF]'
                                              : profileData.recommendationCount >=
                                                  16
                                                ? 'text-[#BCFF3E]'
                                                : profileData.recommendationCount >=
                                                    4
                                                  ? 'text-[#FFBF3E]'
                                                  : 'text-[#FFE53E]'
                                    }
                                />
                                <span className="text-label-s text-gray-500 font-semibold">
                                    돌봄등급
                                </span>
                                <span className="text-label-l text-point-800 font-extrabold">
                                    마스터
                                </span>
                            </article>
                            {!isMyProfile && (
                                <article className="w-[88px] flex flex-col items-center gap-1">
                                    {like ? (
                                        <Heart
                                            onClick={handleLikeBtn}
                                            className="flex-1 cursor-pointer w-8 h-8"
                                        />
                                    ) : (
                                        <Unheart
                                            onClick={handleLikeBtn}
                                            className="flex-1 cursor-pointer w-8 h-8"
                                        />
                                    )}
                                    <span className="text-label-l text-point-800 font-extrabold">
                                        찜하기
                                    </span>
                                </article>
                            )}
                        </div>
                    </section>
                    {isMyProfile ? (
                        <button onClick={handleEditBtn} className="btn-solid">
                            프로필 편집하기
                        </button>
                    ) : (
                        <button onClick={handleChatBtn} className="btn-solid">
                            대화 시작해보기
                        </button>
                    )}
                    <article className="flex flex-col gap-2">
                        <Label text="이메일" />
                        <span className="text-body-s text-point-500 font-semibold">
                            {profileData.accountId}
                        </span>
                    </article>
                    <article className="flex flex-col gap-2">
                        <Label text="선호 애견 크기" />
                        <div className="flex gap-[10px]">
                            {profileData.preferredSize?.map((size, index) => (
                                <Tag
                                    text={
                                        size === 'SMALL'
                                            ? '소형견'
                                            : size === 'MEDIUM'
                                              ? '중형견'
                                              : '대형견'
                                    }
                                    key={index}
                                />
                            ))}
                        </div>
                    </article>
                    <article className="flex flex-col gap-2">
                        <Label text="돌봄 또는 산책 가능 여부" />
                        <Tag
                            text={
                                profileData.isCareAvailable ? '가능' : '불가능'
                            }
                        />
                    </article>
                    <article className="flex flex-col gap-2">
                        <Label text="MBTI" />
                        <Tag text={profileData.mbti} />
                    </article>
                    <article className="flex flex-col gap-2">
                        <Label text="나의 대략적인 위치 정보" />
                        <Tag text={profileData.region} />
                    </article>
                    <div className="border-[0.5px] border-gray-300 my-4"></div>
                    <DogList
                        dogsData={dogsData}
                        isMyProfile={isMyProfile}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                    />
                </div>
            </div>
        </div>
    );
}
