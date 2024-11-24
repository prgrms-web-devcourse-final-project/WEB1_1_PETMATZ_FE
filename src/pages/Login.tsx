import { useFadeNavigate, useLoginForm } from '@/hooks';
import Back from '@/assets/images/header/back.svg?react';
import Forward from '@/assets/images/login/forward.svg?react';
import { useCallback } from 'react';
import { Success } from '@/components/login';

export default function Login() {
    const {
        emailValidation,
        passwordValidation,
        handleSubmit,
        errors,
        onSubmit,
        isValid,
        success,
    } = useLoginForm();
    const navigate = useFadeNavigate();

    const handleBackBtn = useCallback(() => {
        navigate('/');
    }, []);

    const handleForgotPWBtn = useCallback(() => {
        navigate('/forgot-password');
    }, []);

    const handleRouteToSignUpBtn = useCallback(() => {
        navigate('/signup');
    }, []);

    if (success) {
        return <Success />;
    }

    return (
        <div className="h-screen bg-gray-100 flex flex-col justify-between overflow-hidden">
            <header className="bg-white sm:h-24 h-14 w-full flex items-center justify-center">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    로그인
                </h1>
            </header>
            <section className="flex-1 flex flex-col justify-start">
                <div className="bg-white px-6 pt-6 pb-12 flex flex-col">
                    <div className="text-title-s font-extrabold text-gray-800 pb-12">
                        <p>이메일로</p>
                        <p>로그인을 해주세요.</p>
                    </div>
                    <form
                        id="login-form"
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
                        <label
                            htmlFor="password"
                            className="text-label-m text-gray-500 pb-2"
                        >
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            {...passwordValidation}
                            className="mb-[22px]"
                        />
                        {errors.email ? (
                            <span>{errors.email.message}</span>
                        ) : (
                            errors.password && (
                                <span>{errors.password.message}</span>
                            )
                        )}
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
            </section>
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <div
                    onClick={handleRouteToSignUpBtn}
                    className="w-fit mx-auto mb-[18px] text-center text-point-400 text-label-l font-semibold flex flex-row justify-center items-center cursor-pointer"
                >
                    <span>아직 회원이 아니신가요?</span>
                    <Forward />
                </div>
                <button
                    type="submit"
                    form="login-form"
                    className="w-full text-body-l font-extrabold text-white py-3 mb-8 rounded-lg bg-point-500 active:bg-point-600 hover:bg-point-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={!isValid || !!errors.email || !!errors.password}
                >
                    로그인
                </button>
            </footer>
        </div>
    );
}
