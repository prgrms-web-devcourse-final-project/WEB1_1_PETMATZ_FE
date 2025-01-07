import Back from '@/assets/images/header/back.svg?react';
import { Loading } from '@/components/common';
import {
    FirstStep,
    FourthStep,
    SecondStep,
    Success,
    ThirdStep,
} from '@/components/signup';
import { useFadeNavigate, useSelectBox, useUserInfoForm } from '@/hooks';
import { useCallback, useState } from 'react';
import { options } from '@/constants/signup';
import { SignUpInputs } from '@/types/user';
import {
    confirmPasswordValidationForSignup,
    emailValidation,
    introduceValidation,
    nicknameValidation,
    passwordValidation,
    verificationCodeValidation,
} from '@/constants/validations';
import { postSignup, putImageToS3 } from '@/hooks/api/auth';

// 위치 정보를 가져오는 함수
const getLocation = () => {
    return new Promise<{ latitude: string; longitude: string }>(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    });
                },
                (error) => {
                    reject(error);
                },
            );
        },
    );
};

export default function Signup() {
    /**
     * Handles form submission.
     * @param {SignUpInputs} data - The submitted form data.
     * @returns {Promise<void>}
     */
    const onSubmitCallback = async (data: SignUpInputs): Promise<void> => {
        console.log(data);
        const {
            email,
            verificationCode,
            password,
            nickname,
            introduce,
            genderBool,
            possible,
            dogSizes,
            mbti,
        } = data;
        const accountId = email;
        const certificationNumber = verificationCode;
        const introduction = introduce;
        const isCareAvailable = possible;
        const preferredSizes = dogSizes;
        const gender = genderBool ? 'FEMALE' : 'MALE';
        const profileImg = imgName.startsWith('profile') ? imgName : '';
        // 위치 정보 가져오기
        const { latitude, longitude } = await getLocation();
        await postSignup({
            accountId,
            password,
            certificationNumber,
            nickname,
            gender,
            preferredSizes,
            introduction,
            isCareAvailable,
            mbti,
            latitude,
            longitude,
            profileImg,
        }).then(async (response) => {
            console.log(response);
            setShowModal(false);
            if (response.ok) {
                if (response.data.imgURL !== '') {
                    const id = response.data.id!;
                    const imgURL = response.data.imgURL!;
                    const img = imgFile!;
                    const type = 'U';

                    const result = await putImageToS3({
                        id,
                        imgURL,
                        img,
                        type,
                    });

                    if (result) {
                        setIsSuccess(true);
                        setTimeout(() => {
                            navigate('/login');
                        }, 3000);
                    } else {
                        showToast('회원 등록에 실패했습니다!', 'warning');
                    }
                } else {
                    setIsSuccess(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            } else {
                if (response.error?.status === 401) {
                    showToast('회원 등록에 실패했습니다!', 'warning');
                } else {
                    showToast('서버 연결 문제가 발생했습니다!', 'warning');
                }
            }
        });
    };

    const {
        register,
        handleSubmit,
        watch,
        errors,
        isValid,
        control,
        isSuccess,
        setIsSuccess,
        isLoading,
        setIsLoading,
        showToast,
        isToastActive,
    } = useUserInfoForm<SignUpInputs>(onSubmitCallback);
    const {
        options: selectOptions,
        selectOption,
        isOpen,
        toggleSelectBox,
        selectedOption,
        selectBoxRef,
    } = useSelectBox(options);
    const [pageNumber, setPageNumber] = useState(1);
    const [imgName, setImgName] = useState('profile1');
    const [showModal, setShowModal] = useState(false);
    const [imgFile, setImg] = useState<File | null>(null);
    const navigate = useFadeNavigate();

    const handleBackBtn = useCallback(() => {
        if (pageNumber === 1) {
            navigate(-1);
        } else {
            setPageNumber((prev) => prev - 1);
        }
    }, [pageNumber, navigate, setPageNumber]);

    if (isSuccess) return <Success />;

    return (
        <>
            {isLoading && <Loading />}
            <div
                className={`${isLoading && 'hidden'} h-screen bg-gray-100 flex flex-col overflow-hidden`}
            >
                <header className="bg-white h-14 w-full flex items-center justify-center">
                    <Back
                        onClick={handleBackBtn}
                        className="absolute left-[26px] cursor-pointer"
                    />
                    <h1 className="text-point-900 text-body-l font-extrabold">
                        회원가입
                    </h1>
                </header>
                <form
                    id="signup-form"
                    onSubmit={handleSubmit}
                    className="h-full flex-1 flex flex-col justify-between"
                >
                    {pageNumber === 1 && (
                        <FirstStep
                            register={register}
                            watch={watch}
                            emailValidation={emailValidation}
                            verificationCodeValidation={
                                verificationCodeValidation
                            }
                            errors={errors}
                            isValid={isValid}
                            setPageNumber={setPageNumber}
                            setLoading={setIsLoading}
                            showToast={showToast}
                            isToastActive={isToastActive}
                        />
                    )}
                    {pageNumber === 2 && (
                        <SecondStep
                            register={register}
                            watch={watch}
                            passwordValidation={passwordValidation}
                            confirmPasswordValidation={confirmPasswordValidationForSignup(
                                watch,
                            )}
                            errors={errors}
                            setPageNumber={setPageNumber}
                        />
                    )}
                    {pageNumber === 3 && (
                        <ThirdStep
                            register={register}
                            watch={watch}
                            nicknameValidation={nicknameValidation}
                            introduceValidation={introduceValidation}
                            errors={errors}
                            setPageNumber={setPageNumber}
                            imgName={imgName}
                            setImgName={setImgName}
                            setImg={setImg}
                        />
                    )}
                    {pageNumber === 4 && (
                        <FourthStep
                            register={register}
                            watch={watch}
                            errors={errors}
                            control={control}
                            isValid={isValid}
                            loading={isLoading}
                            showModal={showModal}
                            setShowModal={setShowModal}
                            selectOptions={selectOptions}
                            selectOption={selectOption}
                            isOpen={isOpen}
                            toggleSelectBox={toggleSelectBox}
                            selectedOption={selectedOption}
                            selectBoxRef={selectBoxRef}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
