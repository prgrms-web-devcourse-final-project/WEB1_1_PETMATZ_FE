import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postTemporaryPassword } from './api/password';
import useCustomToast from './useCustomToast';

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
        watch,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordInputs>({
        mode: 'onChange',
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast, isToastActive } = useCustomToast();

    /**
     * Handles form submission
     */
    const onSubmit = async (data: ForgotPasswordInputs) => {
        if (isToastActive()) {
            return;
        }
        setLoading(true);
        const accountId = data.email;
        await postTemporaryPassword({ accountId }).then((response) => {
            if (response.ok) {
                setSuccess(true);
            } else {
                if (response.error?.status === 404) {
                    showToast('존재하지 않는 사용자입니다!', 'warning');
                } else {
                    showToast('서버 연결 문제가 발생했습니다!', 'warning');
                }
            }
        });
        setLoading(false);
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

    return {
        emailValidation,
        register,
        handleSubmit,
        watch,
        errors,
        onSubmit,
        isValid,
        success,
        loading,
    };
}
