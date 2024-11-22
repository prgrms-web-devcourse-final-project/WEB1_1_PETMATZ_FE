import { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * ForgotPassword form input type
 */
interface ForgotPasswordInputs {
    /** User's email address */
    email: string;
}

/**
 * Custom hook for handling ForgotPassword form logic
 * @returns {Object} Form methods and handlers
 */
export default function useForgotPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordInputs>({
        mode: 'onChange',
    });
    const [success, setSuccess] = useState(false);

    /**
     * Handles form submission
     */
    const onSubmit = (data: ForgotPasswordInputs) => {
        console.log(data);
        // 여기에 로그인 로직을 구현하세요
        setSuccess(true);
    };

    /**
     * Email validation
     */
    const emailValidation = register('email', {
        required: '이메일은 필수입니다',
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '유효한 이메일 주소를 입력해주세요',
        },
    });

    return {
        emailValidation,
        handleSubmit,
        errors,
        onSubmit,
        isValid,
        success,
    };
}
