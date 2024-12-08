import Back from '@/assets/images/header/back.svg?react';
import { useFadeNavigate } from '@/hooks';
import { useState, useCallback, useEffect } from 'react';
import ImageSelectBox from '@/components/common/ImageSelectBox';
import { LocationChange } from '@/components/edit-profile';
import { useCustomToast } from '@/hooks';
import { ToastAnchor } from '@/components/common';
import Loading from '@/components/common/Loading';
import { editMyProfileInfo, getMyProfileInfo } from '@/hooks/api/user';
import { httpForImage } from '@/hooks/api/base';
import { BaseApiResponse } from '@/types/baseResponse';
import { useUserStore } from '@/stores';

export default function ProfileEdit() {
    const { showToast } = useCustomToast();
    const navigate = useFadeNavigate();

    const [imgFile, setImg] = useState<File | null>(null);
    const [nickname, setNickname] = useState('');
    const [, setRegion] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [preferredSizes, setPreferredSizes] = useState<
        ('SMALL' | 'MEDIUM' | 'LARGE')[]
    >([]);
    const [careAvailable, setIsCareAvailable] = useState(false);
    const [profileImg, setProfileImg] = useState('');
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const { user } = useUserStore();

    const SIZE_LABELS: Record<'SMALL' | 'MEDIUM' | 'LARGE', string> = {
        SMALL: '소형견',
        MEDIUM: '중형견',
        LARGE: '대형견',
    };
    const isValidNickname = nickname.length >= 2;

    const handleButtonClick = () => {
        showToast('위치가 변경되었습니다!', 'success');
    };

    // 프로필 정보를 API에서 가져오기
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getMyProfileInfo();
            if (response.ok) {
                const profile = response.data;

                // 상태 초기화
                setNickname(profile.nickname || '');
                setRegion(profile.region || '');
                setIntroduction(profile.introduction || '');
                setPreferredSizes(profile.preferredSizes || []);
                setIsCareAvailable(profile.isCareAvailable || false);
                setProfileImg(profile.profileImg || '');
                setIsLoading(false); // 로딩 완료
            } else {
                console.log('Failed to retrieve profile', response.error);
            }
        };

        fetchProfile();
    }, []);

    const handleBackBtn = useCallback(() => {
        navigate(`/profile/${user?.id}`);
    }, [navigate, user]);

    const handleDeleteAccountBtn = useCallback(() => {
        navigate('/delete-account');
    }, [navigate]);

    const updateProfile = useCallback(async () => {
        const response = await editMyProfileInfo({
            nickname,
            preferredSizes,
            introduction,
            careAvailable,
            profileImg,
        });

        console.log('프로필 수정 api 응답 : ', response);

        if (response.ok) {
            if (response.data.resultImgURL !== '') {
                const imgURL = response.data.resultImgURL;
                const img = imgFile!;

                const result = await httpForImage.put<BaseApiResponse, File>(
                    imgURL,
                    img,
                );
                console.log('이미지 업로드 api 응답 : ', result);

                if (result.ok) {
                    showToast('프로필 업데이트에 성공했습니다!', 'success');
                } else {
                    showToast('이미지 업로드를 실패했습니다!', 'warning');
                }
            } else {
                showToast('프로필 업데이트에 성공했습니다!', 'success');
            }
        } else {
            showToast('프로필 업데이트에 실패했습니다!', 'warning');
        }
    }, [
        nickname,
        preferredSizes,
        introduction,
        careAvailable,
        navigate,
        imgFile,
    ]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white">
                <Loading />
            </div>
        );
    }

    return (
        <div className="h-screen bg-white flex flex-col overflow-y-auto">
            {/* Header */}
            <header className="bg-white min-h-14 w-full flex items-center justify-center sticky top-0 z-50">
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
                        setImg={setImg}
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
                        onChange={(e) => {
                            const value = e.target.value;
                            const regex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9]{0,10}$/; // 한글, 영문, 숫자 2~10글자 제한
                            if (regex.test(value) || value === '') {
                                setNickname(value); // 조건 만족 시 상태 업데이트
                            }
                        }}
                        className={`w-full text-body-m font-normal text-gray-900 outline-none focus:ring-0 border ${
                            isValidNickname
                                ? 'border-gray-200 focus:border-gray-200'
                                : 'border-1 border-warning-400 focus:border-warning-400'
                        } rounded-lg px-6 py-2.5`}
                    />
                    {!isValidNickname && (
                        <p className="text-label-m font-normal mt-2 ml-6 text-gray-400">
                            한글, 영문 또는 숫자 포함 2글자 이상 10글자 이하
                        </p>
                    )}
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
                    <div className="flex">
                        <div className="w-[170px] bg-gray-100 flex rounded-lg overflow-hidden">
                            <button
                                onClick={() => setIsCareAvailable(true)}
                                className={`flex-1 px-[18px] py-1.5 rounded-lg transition-colors duration-300 ${
                                    careAvailable
                                        ? 'bg-point-500 text-white '
                                        : 'text-gray-300 '
                                }  -mr-[5px]`}
                            >
                                가능
                            </button>
                            <button
                                onClick={() => setIsCareAvailable(false)}
                                className={`flex-1 px-[18px] py-1.5 rounded-lg transition-colorsm duration-300 ${
                                    !careAvailable
                                        ? 'bg-point-500 text-white '
                                        : 'text-gray-300 '
                                }  -ml-[5px]`}
                            >
                                불가능
                            </button>
                        </div>
                    </div>
                </div>
                {/* Region */}
                <LocationChange onLocationChange={handleButtonClick} />
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
                <ToastAnchor>
                    <button
                        onClick={updateProfile}
                        className={`w-full px-6 py-2.5 text-white rounded-lg ${
                            isValidNickname
                                ? 'bg-point-500 hover:bg-point-600'
                                : 'bg-gray-400'
                        }`}
                        disabled={!isValidNickname}
                    >
                        수정 완료
                    </button>
                </ToastAnchor>
                <div className="flex items-center justify-center mt-8">
                    <button
                        onClick={handleDeleteAccountBtn}
                        className="text-label-l  underline text-gray-400 p-1"
                    >
                        회원탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}
