import {
    emailValidationType,
    SignUpInputs,
    verificationCodeValidation,
} from '@/hooks/useSignupForm';
import { CustomInput } from '../common';
import {
    FieldErrors,
    UseFormRegister,
    UseFormTrigger,
    UseFormWatch,
} from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';

interface FirstStep {
    register: UseFormRegister<SignUpInputs>;
    watch: UseFormWatch<SignUpInputs>;
    emailValidation: emailValidationType;
    verificationCodeValidation: verificationCodeValidation;
    errors: FieldErrors<SignUpInputs>;
    trigger: UseFormTrigger<SignUpInputs>;
    isValid: boolean;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function FirstStep({
    register,
    watch,
    emailValidation,
    verificationCodeValidation,
    errors,
    trigger,
    isValid,
    setPageNumber,
}: FirstStep) {
    const emailTyped = useRef(false);
    const [sentNumber, setSentNumber] = useState(false);

    const email = watch('email');
    const verificationCode = watch('verificationCode');

    useEffect(() => {
        if (email) {
            trigger('email');
        }
        if (verificationCode) {
            trigger('verificationCode');
        }
        emailTyped.current = true;
    }, [email, verificationCode, trigger]);

    const handleVerificateEmailBtn = useCallback(() => {
        console.log(email);
        // api 요청
        setSentNumber(true);
    }, []);

    const handleNextBtn = useCallback(() => {
        // api 요청
        console.log('1번 페이지 성공');
        setSentNumber(false);
        setPageNumber(2);
    }, []);

    return (
        <>
            <div>
                {/* 프로그래스바 */}
                <div className="w-full bg-white h-1">
                    <div className="bg-point-400 h-1 w-[25%]"></div>
                </div>
                <div className="bg-white pt-6 pb-12">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <div className="text-title-s font-extrabold text-gray-800 pb-12">
                            <p>이메일로</p>
                            <p>입력해주세요.</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <div className="flex-1">
                                    <CustomInput
                                        id="email"
                                        label="이메일"
                                        type="text"
                                        placeholder="이메일을 입력해주세요."
                                        register={register}
                                        watch={watch}
                                        validation={emailValidation}
                                        error={errors.email?.message}
                                        design="outline"
                                        successMsg="좋아요!"
                                    />
                                </div>
                                <button
                                    className="btn-solid btn-md"
                                    disabled={
                                        (!emailTyped.current && !isValid) ||
                                        !!errors.email
                                    }
                                    onClick={handleVerificateEmailBtn}
                                >
                                    인증번호
                                </button>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex-1">
                                    <CustomInput
                                        id="verificationCode"
                                        label="인증번호"
                                        type="number"
                                        placeholder="인증번호를 입력해주세요."
                                        register={register}
                                        watch={watch}
                                        validation={verificationCodeValidation}
                                        error={errors.verificationCode?.message}
                                        design="outline"
                                        successMsg="좋아요!"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="w-full max-w-[600px] px-6 py-2.5 mx-auto">
                <button
                    type="submit"
                    form="signup-form"
                    className="btn-solid mb-8"
                    disabled={!isValid || !sentNumber}
                    onClick={handleNextBtn}
                >
                    다음
                </button>
            </footer>
        </>
    );
}
