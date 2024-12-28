import Back from '@/assets/images/header/back.svg?react';
import { Loading } from '@/components/common';
import {
    FirstStep,
    FourthStep,
    SecondStep,
    Success,
    ThirdStep,
} from '@/components/signup';
import { useFadeNavigate, useSelectBox, useSignupForm } from '@/hooks';
import { useCallback } from 'react';
import { options } from '@/constants/signup';

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
        imgName,
        setImgName,
        loading,
        setLoading,
        showModal,
        setShowModal,
        showToast,
        isToastActive,
        setImg,
    } = useSignupForm();
    const {
        options: selectOptions,
        selectOption,
        isOpen,
        toggleSelectBox,
        selectedOption,
        selectBoxRef,
    } = useSelectBox(options);

    const handleBackBtn = useCallback(() => {
        if (pageNumber === 1) {
            navigate(-1);
        } else {
            setPageNumber((prev) => prev - 1);
        }
    }, [pageNumber]);

    if (success) return <Success />;

    return (
        <>
            {loading && <Loading />}
            <div
                className={`${loading && 'hidden'} h-screen bg-gray-100 flex flex-col overflow-hidden`}
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
                    onSubmit={handleSubmit(onSubmit)}
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
                            setLoading={setLoading}
                            showToast={showToast}
                            isToastActive={isToastActive}
                        />
                    )}
                    {pageNumber === 2 && (
                        <SecondStep
                            register={register}
                            watch={watch}
                            passwordValidation={passwordValidation}
                            confirmPasswordValidation={
                                confirmPasswordValidation
                            }
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
                            loading={loading}
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
