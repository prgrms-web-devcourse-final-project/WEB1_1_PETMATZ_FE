import { useForm } from 'react-hook-form';
import { useState } from 'react';

/**
 * ChangePassword form input type
 */
interface ChangePasswordInputs {
    /** User's current password */
    currentPassword: string;
    /** User's new password */
    newPassword: string;
    /** User's confirm password */
    confirmPassword: string;
}

/**
 * Custom hook for handling ChangePassword form logic
 * @returns {Object} Form methods and handlers
 */
export default function useChangePasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<ChangePasswordInputs>({
        mode: 'onChange',
    });
    const [success, setSuccess] = useState(false);

    /**
     * Handles form submission
     */
    const onSubmit = (data: ChangePasswordInputs) => {
        console.log(data);
        // 여기에 로직을 구현하세요
        setSuccess(true);
    };

    /**
     * current Password validation
     */
    const currentPasswordValidation = {
        required: '현재 비밀번호는 필수입니다!',
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
     * new Password validation
     */
    const newPasswordValidation = {
        required: '새 비밀번호는 필수입니다!',
        minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다!',
        },
        pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            message: '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다!',
        },
        validate: (value: string) =>
            value !== watch('currentPassword') ||
            '새 비밀번호는 현재 비밀번호와 다르게 설정해야 합니다!',
    };

    /**
     * confirm Password validation
     */
    const confirmPasswordValidation = {
        required: '비밀번호 확인은 필수입니다!',
        validate: (value: string) =>
            value === watch('newPassword') ||
            '새 비밀번호와 일치하지 않습니다!',
    };

    return {
        currentPasswordValidation,
        newPasswordValidation,
        confirmPasswordValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        isValid,
        success,
    };
}
