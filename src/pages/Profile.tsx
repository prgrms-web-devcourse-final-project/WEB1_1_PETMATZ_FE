import { Loading } from '@/components/common';
import { getProfileInfo } from '@/hooks/api/profile';
import { useUserStore } from '@/stores';
import { ProfileApiResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Heart from '@/assets/images/profile/heart.svg?react';
import Lv5 from '@/assets/images/profile/lv-5.svg?react';
import { Label, Tag } from '@/components/profile';
import { useCallback, useEffect, useState } from 'react';
import { useFadeNavigate } from '@/hooks';

export default function Profile() {
    const { id } = useParams<{ id: string }>();
    const { user } = useUserStore();
    const navigate = useFadeNavigate();
    const [image, setImage] = useState(
        '/src/assets/images/profile/profile1.svg',
    );

    const userId = id || '';
    const isMyProfile = id == user?.id;

    const { data, isLoading } = useQuery<ProfileApiResponse, Error>({
        queryKey: ['user', userId],
        queryFn: () => getProfileInfo({ userId }),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setImage(data.data.profileImg);
    }, [data, setImage]);

    if (isLoading || !user) {
        return <Loading />;
    }

    if (!data || !data.data || data.error?.status === 500) {
        return <div>서버 에러</div>;
    } else if (data.error?.status === 400) {
        return <div>존재하지 않는 데이터입니다.</div>;
    }

    const profileData = data.data;

    const handleEditBtn = useCallback(() => {
        navigate('/edit-profile');
    }, []);

    const handleChatBtn = useCallback(() => {}, []);

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
                                <span className="text-label-s font-semibold text-white bg-blue-600 px-[12.5px] py-[4.5px] rounded-lg">
                                    남성
                                </span>
                            ) : (
                                <span className="text-label-s font-semibold text-white bg-warning-300 px-[12.5px] py-[4.5px] rounded-lg">
                                    여성
                                </span>
                            )}
                        </div>
                        <span className="text-label-l text-gray-400 font-semibold break-words max-w-full">
                            {profileData.introduction}
                        </span>
                        <div className="py-3 flex justify-center gap-4">
                            <article className="w-[88px] flex flex-col items-center gap-1">
                                <Heart />
                                <span className="text-label-s text-gray-500 font-semibold">
                                    추천수
                                </span>
                                <span className="text-label-l text-point-800 font-extrabold">
                                    {profileData.recommendationCount} 개
                                </span>
                            </article>
                            <article className="w-[88px] flex flex-col items-center gap-1">
                                <Lv5 />
                                <span className="text-label-s text-gray-500 font-semibold">
                                    돌봄등급
                                </span>
                                <span className="text-label-l text-point-800 font-extrabold">
                                    마스터
                                </span>
                            </article>
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
                            {profileData.preferredSizes.map((size, index) => (
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
                    <article className="flex flex-col gap-4">
                        등록된 멍멍이 정보(추가될 예정)
                    </article>
                </div>
            </div>
        </div>
    );
}
