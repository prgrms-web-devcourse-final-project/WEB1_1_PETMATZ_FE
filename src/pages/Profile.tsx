import ReactDOM from 'react-dom';
import { Loading, PageNotFound } from '@/components/common';
import { useTitleStore, useUserStore } from '@/stores';
import { ProfileApiResponse } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Star from '@/assets/images/profile/star.svg?react';
import Lvl from '@/assets/images/profile/lvl.svg?react';
import Heart from '@/assets/images/profile/heart.svg?react';
import Unheart from '@/assets/images/profile/unheart.svg?react';
import LvlInfoBtn from '@/assets/images/lvlInfoBtn.svg?react';
import FootCircle from '@/assets/images/footCircle.svg?react';
import { DogList, Label, Tag } from '@/components/profile';
import { useCallback, useEffect, useState } from 'react';
import { useFadeNavigate } from '@/hooks';
import { createChatRoom } from '@/hooks/api/Chat';
import { DogsInfoResponse } from '@/types/dogInfo';
import { fetchDogsInfo } from '@/hooks/api/dogInfo';
import { getProfileInfo, postLikeProfile } from '@/hooks/api/user';

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
    const [isOpen, setIsOpen] = useState(false);

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
    }, [setTitle]);

    useEffect(() => {
        if (!data) {
            return;
        }
        if (data.data?.profileImg) {
            setImage(data.data.profileImg);
        }
        if (!isMyProfile && data.data?.myHeartUser) {
            setLike(data.data.myHeartUser!);
        }
    }, [data, setImage, isMyProfile]);

    const handleEditBtn = useCallback(() => {
        navigate('/edit-profile');
    }, [navigate]);

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
    }, [data, user, navigate]);

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

    const handleModalBtn = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    }, []);

    if (userLoading || dogsLoading || !user) {
        return <Loading />;
    }

    if (!data || !dogsData || !data.ok || !dogsData.ok) {
        return <PageNotFound />;
    }

    const profileData = data.data;

    const modalContent = (
        <div
            onClick={handleModalBtn}
            className="fixed inset-0 mx-auto flex justify-center items-center z-50 w-full min-w-[360px] max-w-[768px]"
        >
            <div className="absolute inset-0 bg-dim opacity-90"></div>
            <section
                onClick={(e) => e.stopPropagation()}
                className="absolute rounded-2xl bg-white p-6 flex flex-col gap-4"
            >
                <div className="flex flex-col items-center gap-1">
                    <FootCircle className="text-point-500" />
                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-body-xl text-gray-900 font-extrabold">
                            돌봄등급
                        </h1>
                        <div className="flex flex-col items-center text-label-m text-gray-500">
                            <span>돌봄 완료 횟수에 따른</span>
                            <span>등급을 부여 받게 되요!!</span>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-col gap-2">
                    <li className="px-[18.5px] py-[10px] flex gap-[10px] justify-center items-center">
                        <Lvl className="text-[#FFE53E]" />
                        <span className="text-body-s text-gray-900 font-semibold">
                            펫비기너
                        </span>
                        <span className="text-body-s text-gray-900 font-semibold">
                            0~3회
                        </span>
                    </li>
                    <li className="px-[18.5px] py-[10px] flex gap-[10px] justify-center items-center">
                        <Lvl className="text-[#FFBF3E]" />
                        <span className="text-body-s text-gray-900 font-semibold">
                            펫프렌드
                        </span>
                        <span className="text-body-s text-gray-900 font-semibold">
                            4~12회
                        </span>
                    </li>
                    <li className="px-[18.5px] py-[10px] flex gap-[10px] justify-center items-center">
                        <Lvl className="text-[#BCFF3E]" />
                        <span className="text-body-s text-gray-900 font-semibold">
                            펫패밀리
                        </span>
                        <span className="text-body-s text-gray-900 font-semibold">
                            13~25회
                        </span>
                    </li>
                    <li className="px-[18.5px] py-[10px] flex gap-[10px] justify-center items-center">
                        <Lvl className="text-[#3EB2FF]" />
                        <span className="text-body-s text-gray-900 font-semibold">
                            펫메이트
                        </span>
                        <span className="text-body-s text-gray-900 font-semibold">
                            26~49회
                        </span>
                    </li>
                    <li className="px-[18.5px] py-[10px] flex gap-[10px] justify-center items-center">
                        <Lvl className="text-point-500" />
                        <span className="text-body-s text-gray-900 font-semibold">
                            펫마스터
                        </span>
                        <span className="text-body-s text-gray-900 font-semibold">
                            50회 이상
                        </span>
                    </li>
                </ul>
            </section>
        </div>
    );

    return (
        <div className="bg-gray-100 h-full overflow-y-auto">
            <div className="w-full bg-gray-50 pt-6 pb-12">
                <div className="w-full max-w-[600px] mx-auto px-6 flex flex-col gap-4">
                    <h2 className="text-title-s font-extrabold text-gray-800">
                        {isMyProfile ? <p>나의 프로필</p> : <p>안녕하세요!</p>}
                    </h2>
                    <section className="flex flex-col gap-2 items-center">
                        <div className="relative w-[100px] h-[100px]">
                            <img
                                src={image}
                                alt="프로필 이미지"
                                className="object-cover w-full h-full rounded-full border-2 border-gray-200"
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
                                                  13
                                                ? 'text-[#BCFF3E]'
                                                : profileData.recommendationCount >=
                                                    4
                                                  ? 'text-[#FFBF3E]'
                                                  : 'text-[#FFE53E]'
                                    }
                                />
                                <div
                                    onClick={handleModalBtn}
                                    className="flex cursor-pointer"
                                >
                                    <span className="text-label-s text-gray-500 font-semibold">
                                        돌봄등급
                                    </span>
                                    <LvlInfoBtn className="text-gray-500" />
                                </div>
                                <span className="text-label-l text-point-800 font-extrabold">
                                    {profileData.careCompletionCount >= 50
                                        ? '펫마스터'
                                        : profileData.careCompletionCount >= 26
                                          ? '펫메이트'
                                          : profileData.careCompletionCount >=
                                              13
                                            ? '펫패밀리'
                                            : profileData.careCompletionCount >=
                                                4
                                              ? '펫프렌드'
                                              : '펫비기너'}
                                </span>
                            </article>
                            {!isMyProfile && (
                                <article className="w-[88px] flex flex-col items-center gap-1">
                                    {like ? (
                                        <Heart
                                            onClick={handleLikeBtn}
                                            className="flex-1 cursor-pointer w-8 h-8 text-warning-200"
                                        />
                                    ) : (
                                        <Unheart
                                            onClick={handleLikeBtn}
                                            className="flex-1 cursor-pointer w-8 h-8 text-warning-200"
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
            {isOpen && ReactDOM.createPortal(modalContent, document.body)}
        </div>
    );
}
