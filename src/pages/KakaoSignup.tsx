import Back from '@/assets/images/header/back.svg?react';
import { Loading } from '@/components/common';
import { KakaoFourthStep, KakaoThirdStep } from '@/components/kakao';
import Success from '@/components/kakao/Success';
import { useFadeNavigate } from '@/hooks';
import useKakaoSignupForm from '@/hooks/useKakaoForm';
import { useCallback } from 'react';

export default function KakaoSignup() {
    const navigate = useFadeNavigate();
    const {
        pageNumber,
        setPageNumber,
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
        showModal,
        setShowModal,
        setImg,
    } = useKakaoSignupForm();

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
                    <KakaoThirdStep
                        pageNumber={pageNumber}
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
                    <KakaoFourthStep
                        pageNumber={pageNumber}
                        register={register}
                        watch={watch}
                        errors={errors}
                        control={control}
                        isValid={isValid}
                        loading={loading}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                </form>
            </div>
        </>
    );
}
