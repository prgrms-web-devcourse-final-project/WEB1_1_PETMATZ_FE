import Back from '@/assets/images/header/back.svg?react';
import { useFadeNavigate, useUserInfoForm } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import ImageSelectBox from '@/components/common/ImageSelectBox';
import { LocationChange } from '@/components/edit-profile';
import {
    CustomInput,
    CustomToggle,
    MultiSelectTag,
    ToastAnchor,
} from '@/components/common';
import Loading from '@/components/common/Loading';
import { editMyProfileInfo, getProfileInfo } from '@/hooks/api/user';
import { httpForImage } from '@/hooks/api/base';
import { BaseApiResponse } from '@/types/baseResponse';
import { useUserStore } from '@/stores';
import { ProfileApiResponse, ProfileEditInputs } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import {
    introduceValidation,
    nicknameValidation,
} from '@/constants/validations';
import { useParams } from 'react-router-dom';

export default function ProfileEdit() {
    // 강아지 크기 옵션 정의
    const dogSizeOptions = [
        { value: 'SMALL', label: '소형견' },
        { value: 'MEDIUM', label: '중형견' },
        { value: 'LARGE', label: '대형견' },
    ];

    /**
     * Handles form submission.
     * @param {ProfileEditInputs} data - The submitted form data.
     * @returns {Promise<void>}
     */
    const onSubmitCallback = async (data: ProfileEditInputs): Promise<void> => {
        console.log('프로필 수정 api 응답 : ', data);
        await editMyProfileInfo({
            nickname: data.nickname,
            preferredSizes: data.preferredSizes,
            introduction: data.introduction,
            careAvailable: data.careAvailable,
            profileImg: imgName,
        }).then(async (response) => {
            console.log(response);
            if (response.ok) {
                if (response.data.resultImgURL !== '') {
                    const imgURL = response.data.resultImgURL;
                    const img = imgFile!;

                    const result = await httpForImage.put<
                        BaseApiResponse,
                        File
                    >(imgURL, img);
                    console.log('이미지 업로드 api 응답 : ', result);
                }
                showToast('프로필 업데이트에 성공했습니다!', 'success');
            } else {
                showToast('프로필 업데이트에 실패했습니다!', 'warning');
            }
        });
    };

    const { id } = useParams<{ id: string }>();
    const { user } = useUserStore();
    const userId = id || '';
    const { data, isLoading: userLoading } = useQuery<
        ProfileApiResponse,
        Error
    >({
        queryKey: ['user', userId],
        queryFn: () => getProfileInfo({ userId }),
    });
    const {
        register,
        handleSubmit,
        watch,
        errors,
        control,
        isLoading,
        showToast,
        reset,
    } = useUserInfoForm<ProfileEditInputs>(onSubmitCallback);
    const [imgName, setImgName] = useState('profile1');
    const [imgFile, setImg] = useState<File | null>(null);
    const navigate = useFadeNavigate();

    const careAvailable = watch('careAvailable');

    useEffect(() => {
        if (!data) return;
        console.log(data);
        if (data.data?.profileImg) {
            setImgName(data.data.profileImg);
        }
        reset({
            nickname: data.data.nickname,
            preferredSizes: data.data.preferredSizes,
            introduction: data.data.introduction,
            careAvailable: data.data.isCareAvailable,
        });
    }, [data, setImgName, reset]);

    const handleBackBtn = useCallback(() => {
        navigate(`/profile/${user?.id}`);
    }, [navigate, user]);

    const handleButtonClick = useCallback(() => {
        showToast('위치가 변경되었습니다!', 'success');
    }, [showToast]);

    const handleChangePasswordBtn = useCallback(() => {
        navigate('/change-password');
    }, [navigate]);

    const handleDeleteAccountBtn = useCallback(() => {
        navigate('/delete-account');
    }, [navigate]);

    return (
        <>
            {(userLoading || isLoading) && <Loading />}
            <div
                className={`${isLoading && 'hidden'} h-screen bg-white flex flex-col overflow-y-auto`}
            >
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
                <form
                    id="profileEdit-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col p-6"
                >
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
                            imgName={imgName}
                            setImgName={setImgName}
                            setImg={setImg}
                        />
                    </div>
                    {/* Nickname */}
                    <div className="mb-[18px]">
                        <CustomInput
                            id="nickname"
                            label="닉네임"
                            type="text"
                            placeholder="닉네임을 알려주세요."
                            register={register}
                            watch={watch}
                            validation={nicknameValidation}
                            error={errors.nickname?.message}
                            design="outline"
                            successMsg="좋아요!"
                        />
                    </div>
                    {/* Preferred Sizes */}
                    <div className="mb-[18px]">
                        <MultiSelectTag
                            label="선호 애견 크기"
                            name="preferredSizes"
                            options={dogSizeOptions}
                            control={control}
                            rules={{
                                required: '최소 하나의 크기를 선택해주세요!',
                                validate: (value: string[]) =>
                                    value.length > 0 ||
                                    '최소 하나의 크기를 선택해주세요!',
                            }}
                        />
                    </div>
                    {/* Care Availability */}
                    <div className="mb-4">
                        <CustomToggle
                            name="careAvailable"
                            label="돌봄이 가능 여부"
                            leftText="가능"
                            rightText="불가능"
                            register={register}
                            watch={watch}
                            defaultChecked={careAvailable}
                        />
                    </div>
                    {/* Region */}
                    <LocationChange onLocationChange={handleButtonClick} />
                    {/* Introduction */}
                    <div className="mb-4">
                        <CustomInput
                            id="introduction"
                            label="자기소개 (최대 50글자)"
                            type="textarea"
                            placeholder="자기소개를 작성해주세요!"
                            register={register}
                            watch={watch}
                            validation={introduceValidation}
                            error={errors.introduction?.message}
                            design="outline"
                            successMsg="좋아요!"
                        />
                    </div>

                    {/* Submit Button */}
                    <ToastAnchor>
                        <button
                            type="submit"
                            form="profileEdit-form"
                            className="btn-solid"
                            disabled={
                                !!errors.nickname?.message ||
                                !!errors.preferredSizes?.message
                            }
                        >
                            수정 완료
                        </button>
                    </ToastAnchor>
                    <div className="flex items-center justify-center mt-8">
                        <button
                            onClick={handleChangePasswordBtn}
                            className="text-label-l  underline text-gray-400 p-1"
                        >
                            비밀번호 변경
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                        <button
                            onClick={handleDeleteAccountBtn}
                            className="text-label-l  underline text-gray-400 p-1"
                        >
                            회원탈퇴
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
