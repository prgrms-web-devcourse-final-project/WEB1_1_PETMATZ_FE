import Back from '@/assets/images/header/back.svg?react';
import {
    FirstStep,
    FourthStep,
    SecondStep,
    Success,
    ThirdStep,
} from '@/components/signup';
import { useFadeNavigate, useSignupForm } from '@/hooks';
import { useCallback, useState } from 'react';

export default function Signup() {
    const navigate = useFadeNavigate();
    const {
        pageNumber,
        setPageNumber,
        emailValidation,
        verificationCodeValidation,
        passwordValidation,
        confirmPasswordValidation,
        nicknameValidation,
        introduceValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        isValid,
        control,
        success,
    } = useSignupForm();

    const [imgName, setImgName] = useState('profile=1');

    const handleBackBtn = useCallback(() => {
        if (pageNumber === 1) {
            navigate(-1);
        } else {
            setPageNumber((prev) => prev - 1);
        }
    }, [pageNumber]);

    if (success) return <Success />;

    return (
        <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
            <header className="bg-white sm:h-24 h-14 w-full flex items-center justify-center">
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
                onSubmit={handleSubmit(onSubmit)}
                className="h-full flex-1 flex flex-col justify-between"
            >
                <FirstStep
                    pageNumber={pageNumber}
                    register={register}
                    watch={watch}
                    emailValidation={emailValidation}
                    verificationCodeValidation={verificationCodeValidation}
                    errors={errors}
                    isValid={isValid}
                    setPageNumber={setPageNumber}
                />
                <SecondStep
                    pageNumber={pageNumber}
                    register={register}
                    watch={watch}
                    passwordValidation={passwordValidation}
                    confirmPasswordValidation={confirmPasswordValidation}
                    errors={errors}
                    setPageNumber={setPageNumber}
                />
                <ThirdStep
                    pageNumber={pageNumber}
                    register={register}
                    watch={watch}
                    nicknameValidation={nicknameValidation}
                    introduceValidation={introduceValidation}
                    errors={errors}
                    setPageNumber={setPageNumber}
                    imgName={imgName}
                    setImgName={setImgName}
                />
                <FourthStep
                    pageNumber={pageNumber}
                    register={register}
                    watch={watch}
                    errors={errors}
                    control={control}
                    isValid={isValid}
                />
            </form>
        </div>
    );
}
