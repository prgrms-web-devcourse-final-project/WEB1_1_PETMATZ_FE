import { useChangePasswordForm } from '@/hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '@/assets/images/header/back.svg?react';

export default function ChangePassword() {
    const navigate = useNavigate();
    const {
        currentPasswordValidation,
        newPasswordValidation,
        confirmPasswordValidation,
        handleSubmit,
        errors,
        onSubmit,
        isValid,
    } = useChangePasswordForm();

    const handleBackBtn = useCallback(() => {
        navigate('/profile');
    }, []);

    return (
        <div className="h-screen bg-gray-100 flex flex-col justify-between overflow-hidden">
            <header className="bg-white sm:h-24 h-14 w-full flex items-center justify-center">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    비밀번호 변경
                </h1>
            </header>
            <section className="flex-1 flex flex-col justify-start">
                <div className="bg-white px-6 pt-6 pb-12 flex flex-col">
                    <div className="text-title-s font-extrabold text-gray-800 pb-12">
                        <p>새로운 비밀번호를</p>
                        <p>입력해주세요!</p>
                    </div>
                    <form
                        id="change-form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col"
                    >
                        <label
                            htmlFor="currentPassword"
                            className="text-label-m text-gray-500 pb-2"
                        >
                            현재 비밀번호
                        </label>
                        <input
                            id="currentPassword"
                            type="text"
                            placeholder="현재 비밀번호"
                            {...currentPasswordValidation}
                            className="mb-[22px]"
                        />
                        <label
                            htmlFor="currentPassword"
                            className="text-label-m text-gray-500 pb-2"
                        >
                            새로운 비밀번호
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            placeholder="새 비밀번호"
                            {...newPasswordValidation}
                            className="mb-[22px]"
                        />
                        <label
                            htmlFor="currentPassword"
                            className="text-label-m text-gray-500 pb-2"
                        >
                            새로운 비밀번호 확인
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="새 비밀번호 재입력"
                            {...confirmPasswordValidation}
                            className="mb-[22px]"
                        />
                        {errors.currentPassword ? (
                            <span>{errors.currentPassword.message}</span>
                        ) : errors.newPassword ? (
                            <span>{errors.newPassword.message}</span>
                        ) : (
                            errors.confirmPassword && (
                                <span>{errors.confirmPassword.message}</span>
                            )
                        )}
                    </form>
                </div>
            </section>
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto flex flex-col gap-[10px]">
                <button
                    onClick={handleBackBtn}
                    className="w-full text-body-l font-extrabold text-point-600 py-3 rounded-lg bg-white active:bg-point-200 hover:bg-point-200 border-2 border-point-600"
                >
                    돌아가기
                </button>
                <button
                    type="submit"
                    form="change-form"
                    className="w-full text-body-l font-extrabold text-white py-3 mb-8 rounded-lg bg-point-500 active:bg-point-600 hover:bg-point-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={
                        !isValid ||
                        !!errors.currentPassword ||
                        !!errors.newPassword ||
                        !!errors.confirmPassword
                    }
                >
                    변경하기
                </button>
            </footer>
        </div>
    );
}
