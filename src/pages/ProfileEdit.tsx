import Back from '@/assets/images/header/back.svg?react';
import { useFadeNavigate } from '@/hooks';
import { useState, useCallback, useEffect } from 'react';
import { useUserStore } from '@/stores';
import { getMyProfileInfo } from '@/hooks/api/profile';
import { ProfileApiResponse } from '@/types/user';
import ImageSelectBox from '@/components/common/ImageSelectBox';

export default function ProfileEdit() {
    const navigate = useFadeNavigate();
    const { user, setUser } = useUserStore();

    const [profileData, setProfileData] = useState<
        ProfileApiResponse['data'] | null
    >(null);
    const [nickname, setNickname] = useState('');
    const [region, setRegion] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [preferredSizes, setPreferredSizes] = useState<
        ('SMALL' | 'MEDIUM' | 'LARGE')[]
    >([]);
    const [isCareAvailable, setIsCareAvailable] = useState(false);
    const [profileImg, setProfileImg] = useState('');

    const SIZE_LABELS: Record<'SMALL' | 'MEDIUM' | 'LARGE', string> = {
        SMALL: '소형견',
        MEDIUM: '중형견',
        LARGE: '대형견',
    };

    // 프로필 정보를 API에서 가져오기
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getMyProfileInfo();
                const profile = response.data;

                // Zustand에 사용자 데이터 저장
                setUser({
                    id: profile.id,
                    accountId: profile.accountId,
                    nickname: profile.nickname,
                    isRegistered: profile.isRegistered,
                    region: profile.region,
                });

                // 상태 초기화
                setProfileData(profile);
                setNickname(profile.nickname || '');
                setRegion(profile.region || '');
                setIntroduction(profile.introduction || '');
                setPreferredSizes(profile.preferredSizes || []);
                setIsCareAvailable(profile.isCareAvailable || false);
                setProfileImg(profile.profileImg || '');
            } catch (err) {
                console.log('Failed to retrieve profile', err);
            }
        };
        fetchProfile();
    }, [setUser]);

    const handleBackBtn = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleSubmit = () => {
        console.log({
            nickname,
            region,
            introduction,
            preferredSizes,
            isCareAvailable,
            profileImg,
        });
        console.log('user : ', user);

        // TODO: 업데이트된 정보를 백엔드에 전송하는 로직 추가
    };

    return (
        <div className="h-screen bg-white flex flex-col overflow-y-auto">
            {/* Header */}
            <header className="bg-white min-h-14 w-full flex items-center justify-center sticky top-0">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    프로필 수정
                </h1>
            </header>

            {/* Content */}
            <div className="flex flex-col p-6">
                {/* Title */}
                <p className="text-title-s font-extrabold mb-12">
                    어떤 프로필로
                    <br /> 대화할까요?
                </p>

                {/* Profile Image */}
                <div className="mb-[18px]">
                    <ImageSelectBox
                        label="프로필 사진"
                        bottomSheetLabel="프로필 이미지 선택"
                        imgName={profileImg}
                        setImgName={setProfileImg}
                    />
                </div>

                {/* Nickname */}
                <div className="mb-[18px]">
                    <p className="text-label-m font-normal text-gray-500 mb-2">
                        닉네임
                    </p>
                    <input
                        type="text"
                        placeholder="닉네임을 알려주세요."
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full text-body-m font-normal text-gray-900 border border-gray-200 rounded-lg px-6 py-2.5"
                    />
                </div>

                {/* Preferred Sizes */}
                <div className="mb-[18px]">
                    <p className="text-label-m font-normal text-gray-500 mb-2">
                        선호 애견 크기
                    </p>
                    <div className="flex gap-2">
                        {['SMALL', 'MEDIUM', 'LARGE'].map((size) => (
                            <button
                                key={size}
                                onClick={() =>
                                    setPreferredSizes((prev) =>
                                        prev.includes(
                                            size as
                                                | 'SMALL'
                                                | 'MEDIUM'
                                                | 'LARGE',
                                        )
                                            ? prev.filter((s) => s !== size)
                                            : [
                                                  ...prev,
                                                  size as
                                                      | 'SMALL'
                                                      | 'MEDIUM'
                                                      | 'LARGE',
                                              ],
                                    )
                                }
                                className={`px-[18px] py-1.5 rounded-lg border ${
                                    preferredSizes.includes(
                                        size as 'SMALL' | 'MEDIUM' | 'LARGE',
                                    )
                                        ? 'bg-point-500 text-white border-point-500'
                                        : 'bg-white text-gray-300 border-gray-200'
                                }`}
                            >
                                {
                                    SIZE_LABELS[
                                        size as 'SMALL' | 'MEDIUM' | 'LARGE'
                                    ]
                                }
                            </button>
                        ))}
                    </div>
                </div>

                {/* Care Availability */}
                <div className="mb-4">
                    <p className="text-label-m font-normal text-gray-500 mb-2">
                        돌봄이 가능 여부
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsCareAvailable(true)}
                            className={`px-[18px] py-1.5 rounded-lg border ${
                                isCareAvailable
                                    ? 'bg-point-500 text-white border-point-500'
                                    : 'bg-white text-gray-300 border-gray-200'
                            }`}
                        >
                            가능
                        </button>
                        <button
                            onClick={() => setIsCareAvailable(false)}
                            className={`px-[18px] py-1.5 rounded-lg border ${
                                !isCareAvailable
                                    ? 'bg-point-500 text-white border-point-500'
                                    : 'bg-white text-gray-300 border-gray-200'
                            }`}
                        >
                            불가능
                        </button>
                    </div>
                </div>

                {/* Region */}
                <div className="mb-[18px]">
                    <p className="text-label-m font-normal text-gray-500 mb-2">
                        지역
                    </p>
                    <div className="flex gap-2">
                        <p className="rounded-lg">{region}</p>
                        <button className="text-gray-400 text-body-s font-normal">
                            위치 변경
                        </button>
                    </div>
                </div>

                {/* Introduction */}
                <div className="mb-4">
                    <p className="text-label-m font-normal text-gray-500 mb-2">
                        자기소개 (최대 50글자)
                    </p>
                    <textarea
                        placeholder="자기소개를 작성해주세요!"
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        className="w-full px-6 py-2.5 border border-gray-200 text-gray-900 rounded-lg"
                        maxLength={50}
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-point-500 text-white font-bold rounded-md"
                >
                    수정 완료
                </button>
            </div>
        </div>
    );
}
