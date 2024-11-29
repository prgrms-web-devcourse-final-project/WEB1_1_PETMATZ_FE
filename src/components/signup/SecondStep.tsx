import {
    confirmPasswordValidationType,
    passwordValidationType,
    SignUpInputs,
} from '@/hooks/useSignupForm';
import { CustomInput } from '../common';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useCallback, useState } from 'react';
import Eye from '@/assets/images/change-password/eye.svg?react';

interface SecondStepPropsType {
    pageNumber: number;
    register: UseFormRegister<SignUpInputs>;
    watch: UseFormWatch<SignUpInputs>;
    passwordValidation: passwordValidationType;
    confirmPasswordValidation: confirmPasswordValidationType;
    errors: FieldErrors<SignUpInputs>;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function SecondStep({
    pageNumber,
    register,
    watch,
    passwordValidation,
    confirmPasswordValidation,
    errors,
    setPageNumber,
}: SecondStepPropsType) {
    const [show, setShow] = useState(false);

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const handlePasswordShowBtn = useCallback(() => {
        setShow((prev) => !prev);
    }, []);

    const handleNextBtn = useCallback(() => {
        // react-hook-form의 submit 함수와의 충돌 방지
        setPageNumber((prev) => prev + 1);
    }, []);

    return (
        <>
            <div className={`${pageNumber !== 2 && 'hidden'}`}>
                {/* 프로그래스바 */}
                <div className="w-full bg-white h-1">
                    <div className="bg-point-400 h-1 w-[50%]"></div>
                </div>
                <div className="bg-white pt-6 pb-12">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <div className="text-title-s font-extrabold text-gray-800 pb-12">
                            <p>비밀번호를</p>
                            <p>입력해주세요!</p>
                        </div>
                        {pageNumber === 2 && (
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <CustomInput
                                        id="password"
                                        label="비밀번호"
                                        type={show ? 'text' : 'password'}
                                        placeholder="비밀번호를 입력해주세요."
                                        register={register}
                                        watch={watch}
                                        validation={passwordValidation}
                                        error={errors.password?.message}
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
                                    label="비밀번호 확인"
                                    type="password"
                                    placeholder="비밀번호를 확인해주세요."
                                    register={register}
                                    watch={watch}
                                    validation={confirmPasswordValidation}
                                    error={errors.confirmPassword?.message}
                                    design="outline"
                                    successMsg="좋아요!"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <footer
                className={`w-full max-w-[600px] px-6 py-2.5 mx-auto ${pageNumber !== 2 && 'hidden'}`}
            >
                <button
                    form="none"
                    className="btn-solid"
                    disabled={
                        password === '' ||
                        confirmPassword === '' ||
                        !!errors.password?.message ||
                        !!errors.confirmPassword?.message
                    }
                    onClick={handleNextBtn}
                >
                    다음
                </button>
            </footer>
        </>
    );
}
