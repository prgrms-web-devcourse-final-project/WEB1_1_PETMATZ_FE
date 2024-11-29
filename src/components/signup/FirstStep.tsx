import {
    emailValidationType,
    SignUpInputs,
    verificationCodeValidationType,
} from '@/hooks/useSignupForm';
import { CustomInput, ToastAnchor, useCustomToast } from '../common';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    postCheckVerificationCode,
    postEmailVerificationCode,
} from '@/hooks/api/signup';

interface FirstStepPropsType {
    pageNumber: number;
    register: UseFormRegister<SignUpInputs>;
    watch: UseFormWatch<SignUpInputs>;
    emailValidation: emailValidationType;
    verificationCodeValidation: verificationCodeValidationType;
    errors: FieldErrors<SignUpInputs>;
    isValid: boolean;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FirstStep({
    pageNumber,
    register,
    watch,
    emailValidation,
    verificationCodeValidation,
    errors,
    isValid,
    setPageNumber,
    setLoading,
}: FirstStepPropsType) {
    const emailTyped = useRef(false);
    const [sentNumber, setSentNumber] = useState(false);
    const [firstVisit, setFirstVisit] = useState(true);
    const [sending, setSending] = useState(false);
    const [readying, setReadying] = useState(false);
    const { showToast, isToastActive } = useCustomToast();

    const email = watch('email');
    const verificationCode = watch('verificationCode');

    useEffect(() => {
        emailTyped.current = true;
        setInterval(() => {
            if (isToastActive()) {
                setReadying(true);
            } else {
                setReadying(false);
            }
        }, 100);
    });

    useEffect(() => {
        setSentNumber(false);
    }, [email]);

    const handleVerificateEmailBtn = useCallback(async () => {
        if (sending) return;
        setSending(true);
        setFirstVisit(false);
        // api 요청
        const accountId = email;
        await postEmailVerificationCode({ accountId }).then((response) => {
            if (response.ok) {
                setSentNumber(true);
                setReadying(showToast('인증코드를 전송하였습니다!', 'success'));
            } else {
                if (response.error?.status === 400) {
                    showToast('이미 사용하고 있는 이메일입니다!', 'warning');
                } else {
                    showToast('서버 연결 문제가 발생했습니다!', 'warning');
                }
            }
        });
        setSending(false);
    }, [email, sending]);

    const handleNextBtn = useCallback(async () => {
        setLoading(true);
        // api 요청
        const accountId = email;
        const certificationNumber = verificationCode;
        await postCheckVerificationCode({
            accountId,
            certificationNumber,
        }).then((response) => {
            if (response.ok) {
                setPageNumber((prev) => prev + 1);
            } else {
                if (
                    response.error?.status === 400 ||
                    response.error?.status === 401
                ) {
                    showToast('인증에 실패했습니다!', 'warning');
                } else {
                    showToast('서버 연결 문제가 발생했습니다!', 'warning');
                }
            }
        });
        setLoading(false);
        setSentNumber(false);
    }, [email, verificationCode]);

    return (
        <>
            <div className={`${pageNumber !== 1 && 'hidden'}`}>
                {/* 프로그래스바 */}
                <div className="w-full bg-white h-1">
                    <div className="bg-point-400 h-1 w-[25%]"></div>
                </div>
                <div className="bg-white pt-6 pb-12">
                    <div className="w-full max-w-[600px] px-6 mx-auto">
                        <div className="text-title-s font-extrabold text-gray-800 pb-12">
                            <p>이메일을</p>
                            <p>입력해주세요!</p>
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
                                    form="verificateEmail"
                                    className="btn-solid btn-md"
                                    disabled={
                                        readying ||
                                        sending ||
                                        (!emailTyped.current && !isValid) ||
                                        !!errors.email ||
                                        email === ''
                                    }
                                    onClick={handleVerificateEmailBtn}
                                >
                                    {firstVisit
                                        ? '인증번호'
                                        : sending
                                          ? '잠시만요'
                                          : readying
                                            ? '준비중'
                                            : '재요청'}
                                </button>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="flex-1">
                                    <CustomInput
                                        id="verificationCode"
                                        label="인증번호"
                                        type="text"
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
            <footer
                className={`w-full max-w-[600px] px-6 py-2.5 mx-auto ${pageNumber !== 1 && 'hidden'}`}
            >
                <ToastAnchor>
                    <button
                        form="next"
                        className="btn-solid"
                        disabled={
                            readying ||
                            sending ||
                            !sentNumber ||
                            !!errors.email ||
                            !verificationCode
                        }
                        onClick={handleNextBtn}
                    >
                        {readying ? '준비중' : '인증번호 검사'}
                    </button>
                </ToastAnchor>
            </footer>
        </>
    );
}
