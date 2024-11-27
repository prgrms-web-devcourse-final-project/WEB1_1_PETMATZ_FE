import { useChangePasswordForm, useFadeNavigate } from '@/hooks';
import { useCallback, useState } from 'react';
import Back from '@/assets/images/header/back.svg?react';
import Eye from '@/assets/images/change-password/eye.svg?react';
import { CustomInput } from '@/components/common';

export default function ChangePassword() {
    const navigate = useFadeNavigate();
    const {
        currentPasswordValidation,
        newPasswordValidation,
        confirmPasswordValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        isValid,
    } = useChangePasswordForm();
    const [show, setShow] = useState(false);

    const handleBackBtn = useCallback(() => {
        navigate(-1);
    }, []);

    const handlePasswordShowBtn = useCallback(() => {
        setShow((prev) => !prev);
    }, []);

    return (
        <div className="h-screen bg-gray-100 flex flex-col justify-between overflow-hidden">
            <header className="bg-white h-14 w-full flex items-center justify-center">
                <Back
                    onClick={handleBackBtn}
                    className="absolute left-[26px] cursor-pointer"
                />
                <h1 className="text-point-900 text-body-l font-extrabold">
                    비밀번호 변경
                </h1>
            </header>
            <section className="flex-1 flex flex-col justify-start">
                <div className="bg-white pt-6 pb-12 flex flex-col">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <div className="text-title-s font-extrabold text-gray-800 pb-12">
                            <p>새로운 비밀번호를</p>
                            <p>입력해주세요!</p>
                        </div>
                        <form
                            id="change-form"
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-1"
                        >
                            <CustomInput
                                id="currentPassword"
                                label="현재 비밀번호"
                                type="text"
                                placeholder="현재 비밀번호를 입력해주세요."
                                register={register}
                                watch={watch}
                                validation={currentPasswordValidation}
                                error={errors.currentPassword?.message}
                                design="outline"
                                successMsg="좋아요!"
                            />
                            <div className="relative">
                                <CustomInput
                                    id="newPassword"
                                    label="새로운 비밀번호"
                                    type={show ? 'text' : 'password'}
                                    placeholder="새로운 비밀번호를 입력해주세요."
                                    register={register}
                                    watch={watch}
                                    validation={newPasswordValidation}
                                    error={errors.newPassword?.message}
                                    design="outline"
                                    successMsg="좋아요!"
                                />
                                <Eye
                                    onClick={handlePasswordShowBtn}
                                    className={`absolute bottom-8 right-6 ${show ? 'text-point-500' : 'text-point-200'} cursor-pointer`}
                                />
                            </div>
                            <CustomInput
                                id="confirmPassword"
                                label="새로운 비밀번호 확인"
                                type="password"
                                placeholder="비밀번호를 확인해주세요."
                                register={register}
                                watch={watch}
                                validation={confirmPasswordValidation}
                                error={errors.confirmPassword?.message}
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
                <button
                    type="submit"
                    form="change-form"
                    className="btn-solid"
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
