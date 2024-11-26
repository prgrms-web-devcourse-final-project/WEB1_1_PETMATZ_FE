import { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Signup form types
 */
export interface SignUpInputs {
    /** User's email address */
    email: string;
    /** User's verification code */
    verificationCode: number;
    /** User's password */
    password: string;
    /** User's confirm password */
    confirmPassword: string;
    /** User's nickname */
    nickname: string;
    /** User's introduce */
    introduce: string;
}

export interface emailValidationType {
    required: string;
    pattern: {
        value: RegExp;
        message: string;
    };
}

export interface verificationCodeValidationType {
    required: string;
}

export interface passwordValidationType {
    required: string;
    minLength: {
        value: number;
        message: string;
    };
    pattern: {
        value: RegExp;
        message: string;
    };
}

export interface confirmPasswordValidationType {
    required: string;
    validate: (value: string | number) => boolean | string;
}

export interface nicknameValidationType {
    required: string;
    minLength: {
        value: number;
        message: string;
    };
    maxLength: {
        value: number;
        message: string;
    };
    pattern: {
        value: RegExp;
        message: string;
    };
}

export interface introduceValidationType {
    maxLength: {
        value: number;
        message: string;
    };
}

/**
 * Custom hook for handling signup form logic
 * @returns {Object} Form methods and handlers
 */
export default function useSignupForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<SignUpInputs>({
        shouldFocusError: false,
        mode: 'onChange',
    });

    const [pageNumber, setPageNumber] = useState(1);

    /**
     * Handles form submission
     */
    const onSubmit = (data: SignUpInputs) => {
        console.log(data);
        // 여기에 로그인 로직을 구현하세요
    };

    /**
     * Email validation
     */
    const emailValidation = {
        required: '이메일은 필수입니다!',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '유효한 이메일 주소를 입력해주세요!',
        },
    };

    /**
     * Verification code validation
     */
    const verificationCodeValidation = {
        required: '인증번호는 필수입니다!',
    };

    /**
     * Password validation
     */
    const passwordValidation = {
        required: '비밀번호는 필수입니다!',
        minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다!',
        },
        pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            message: '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다!',
        },
    };

    /**
     * Confirm password validation
     */
    const confirmPasswordValidation = {
        required: '비밀번호 확인은 필수입니다!',
        validate: (value: string | number) =>
            value === watch('password') || '비밀번호가 일치하지 않아요!',
    };

    /**
     * nickname validation
     */
    const nicknameValidation = {
        required: '닉네임은 필수입니다!',
        minLength: {
            value: 2,
            message: '닉네임은 최소 2자 이상이어야 합니다!',
        },
        maxLength: {
            value: 10,
            message: '닉네임은 최대 10자 이하이어야 합니다!',
        },
        pattern: {
            value: /^[^\d]/,
            message: '닉네임은 숫자로 시작할 수 없습니다!',
        },
    };

    /**
     * introduce validation
     */
    const introduceValidation = {
        maxLength: {
            value: 50,
            message: '자기소개는 최대 50자 이하이어야 합니다!',
        },
    };

    return {
        pageNumber,
        setPageNumber,
        emailValidation,
        verificationCodeValidation,
        passwordValidation,
        confirmPasswordValidation,
        nicknameValidation,
        introduceValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        isValid,
    };
}
