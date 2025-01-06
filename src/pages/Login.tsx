import { useFadeNavigate, useUserInfoForm } from '@/hooks';
import Back from '@/assets/images/header/back.svg?react';
import Forward from '@/assets/images/login/forward.svg?react';
import { useCallback } from 'react';
import { CustomInput, Loading, ToastAnchor } from '@/components/common';
import { Success } from '@/components/login';
import { LoginInputs } from '@/types/user';
import { postLogin } from '@/hooks/api/auth';
import { useUserStore } from '@/stores';
import { emailValidation, passwordValidation } from '@/constants/validations';

export default function Login() {
    /**
     * Handles form submission.
     * @param {LoginInputs} data - The submitted form data.
     * @returns {Promise<void>}
     */
    const onSubmitCallback = async (data: LoginInputs): Promise<void> => {
        await postLogin(data).then((response) => {
            console.log(response);
            if (response.ok) {
                const { id, accountId, nickname, isRegistered, region } =
                    response.data;
                setUser({
                    id,
                    accountId,
                    nickname,
                    isRegistered,
                    region,
                });
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                if (response.error?.status === 400) {
                    showToast('유효하지 않은 입력값입니다!', 'warning');
                } else if (response.error?.status === 401) {
                    showToast('로그인 정보가 일치하지 않습니다!', 'warning');
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
    } = useUserInfoForm<LoginInputs>(onSubmitCallback);
    const navigate = useFadeNavigate();
    const { setUser } = useUserStore();

    const handleBackBtn = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleForgotPWBtn = useCallback(() => {
        navigate('/forgot-password');
    }, [navigate]);

    const handleRouteToSignUpBtn = useCallback(() => {
        navigate('/signup');
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
                        로그인
                    </h1>
                </header>
                <section className="flex-1 flex flex-col justify-start">
                    <div className="bg-white pt-6 pb-12 flex flex-col">
                        <div className="w-full max-w-[600px] px-6 mx-auto">
                            <div className="text-title-s font-extrabold text-gray-800 pb-12">
                                <p>이메일로</p>
                                <p>로그인을 해주세요.</p>
                            </div>
                            <form
                                id="login-form"
                                onSubmit={handleSubmit}
                                className="flex flex-col"
                            >
                                <div className="flex flex-col gap-1">
                                    <CustomInput
                                        id="accountId"
                                        label="이메일"
                                        type="text"
                                        placeholder="이메일을 입력해주세요."
                                        register={register}
                                        watch={watch}
                                        validation={emailValidation}
                                        error={errors.accountId?.message}
                                        design="outline"
                                        successMsg="좋아요!"
                                    />
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
                                </div>
                                <div className="flex justify-end items-center w-full">
                                    <span
                                        onClick={handleForgotPWBtn}
                                        className="text-label-l font-semibold text-point-400 cursor-pointer"
                                    >
                                        비밀번호를 잊으셨나요?
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                    <div
                        onClick={handleRouteToSignUpBtn}
                        className="w-fit mx-auto mb-[18px] text-center text-point-400 text-label-l font-semibold flex flex-row justify-center items-center cursor-pointer"
                    >
                        <span>아직 회원이 아니신가요?</span>
                        <Forward />
                    </div>
                    <ToastAnchor>
                        <button
                            type="submit"
                            form="login-form"
                            className="btn-solid"
                            disabled={
                                !isValid ||
                                !!errors.accountId ||
                                !!errors.password
                            }
                        >
                            로그인
                        </button>
                    </ToastAnchor>
                </footer>
            </div>
        </>
    );
}
