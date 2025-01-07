import { useFadeNavigate, useUserInfoForm } from '@/hooks';
import { useCallback } from 'react';
import Back from '@/assets/images/header/back.svg?react';
import { CustomInput, Loading, ToastAnchor } from '@/components/common';
import { Success } from '@/components/delete-account';
import { DeleteAccountInputs } from '@/types/user';
import { passwordValidation } from '@/constants/validations';
import { postDeleteAccount } from '@/hooks/api/user';

export default function ForgotPassword() {
    /**
     * Handles form submission.
     * @param {DeleteAccountInputs} data - The submitted form data.
     * @returns {Promise<void>}
     */
    const onSubmitCallback = async (
        data: DeleteAccountInputs,
    ): Promise<void> => {
        await postDeleteAccount(data).then((response) => {
            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                console.log(response);
                if (response.error?.status === 403) {
                    showToast('비밀번호를 틀렸습니다!', 'warning');
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
        isSuccess,
        setIsSuccess,
        isLoading,
        showToast,
    } = useUserInfoForm<DeleteAccountInputs>(onSubmitCallback);
    const navigate = useFadeNavigate();

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    if (isSuccess) {
        return <Success />;
    }

    return (
        <>
            {isLoading && <Loading />}
            <div
                className={`${isLoading && 'hidden'} h-screen bg-gray-100 flex flex-col justify-between overflow-hidden`}
            >
                <header className="bg-white h-14 w-full flex items-center justify-center">
                    <Back
                        onClick={handleBackBtn}
                        className="absolute left-[26px] cursor-pointer"
                    />
                    <h1 className="text-point-900 text-body-l font-extrabold">
                        회원 탈퇴
                    </h1>
                </header>
                <section className="flex-1 flex flex-col justify-start">
                    <div className="bg-white pt-6 pb-12 flex flex-col">
                        <div className="w-full max-w-[600px] px-6 mx-auto">
                            <div className="text-title-s font-extrabold text-gray-800 pb-12">
                                <p>회원 탈퇴를 위해</p>
                                <p>비밀번호를 입력해주세요!</p>
                            </div>
                            <form
                                id="delete-form"
                                onSubmit={handleSubmit}
                                className="flex flex-col"
                            >
                                <CustomInput
                                    id="password"
                                    label="비밀번호"
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요."
                                    register={register}
                                    watch={watch}
                                    validation={passwordValidation}
                                    error={errors.password?.message}
                                    design="outline"
                                    successMsg="좋아요!"
                                />
                            </form>
                        </div>
                    </div>
                </section>
                <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto flex flex-col gap-[10px]">
                    <button onClick={handleBackBtn} className="btn-outline">
                        돌아가기
                    </button>
                    <ToastAnchor>
                        <button
                            type="submit"
                            form="delete-form"
                            className="btn-solid"
                            disabled={!isValid || !!errors.password}
                        >
                            탈퇴하기
                        </button>
                    </ToastAnchor>
                </footer>
            </div>
        </>
    );
}
