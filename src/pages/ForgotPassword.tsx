import { useFadeNavigate, useForgotPasswordForm } from '@/hooks';
import { useCallback } from 'react';
import Back from '@/assets/images/header/back.svg?react';
import Success from '@/components/forgot-password/Success';

export default function ForgotPassword() {
    const navigate = useFadeNavigate();
    const {
        emailValidation,
        handleSubmit,
        errors,
        onSubmit,
        isValid,
        success,
    } = useForgotPasswordForm();

    const handleBackBtn = useCallback(() => {
        navigate('/login');
    }, []);

    return (
        <div className="h-screen bg-gray-100 flex flex-col justify-between overflow-hidden">
            <header className="bg-white sm:h-24 h-14 w-full flex items-center justify-center">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    비밀번호 재발급
                </h1>
            </header>
            {!success ? (
                <>
                    <section className="flex-1 flex flex-col justify-start">
                        <div className="bg-white px-6 pt-6 pb-12 flex flex-col">
                            <div className="text-title-s font-extrabold text-gray-800 pb-12">
                                <p>임시 비밀번호를</p>
                                <p>이메일로 보내드릴게요!</p>
                            </div>
                            <form
                                id="forgot-form"
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col"
                            >
                                <label
                                    htmlFor="email"
                                    className="text-label-m text-gray-500 pb-2"
                                >
                                    이메일
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="이메일을 입력해주세요."
                                    {...emailValidation}
                                    className="mb-[22px]"
                                />
                                {errors.email && (
                                    <span>{errors.email.message}</span>
                                )}
                            </form>
                        </div>
                    </section>
                    <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                        <button
                            type="submit"
                            form="forgot-form"
                            className="w-full text-body-l font-extrabold text-white py-3 mb-8 rounded-lg bg-point-500 active:bg-point-600 hover:bg-point-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                            disabled={!isValid || !!errors.email}
                        >
                            확인
                        </button>
                    </footer>
                </>
            ) : (
                <Success />
            )}
        </div>
    );
}
