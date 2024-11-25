import { useForm } from 'react-hook-form';

/**
 * Signup form types
 */
export interface SignUpInputs {
    /** User's email address */
    email: string;
    /** User's verification code */
    verificationCode: number;
}

export interface emailValidationType {
    required: string;
    pattern: {
        value: RegExp;
        message: string;
    };
}

export interface verificationCodeValidation {
    required: string;
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
        trigger,
    } = useForm<SignUpInputs>({
        mode: 'onChange',
    });

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

    return {
        emailValidation,
        verificationCodeValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        trigger,
        isValid,
    };
}
