import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCustomToast } from '@/components/common';
import { postDeleteAccount } from './api/deleteAccount';
import useFadeNavigate from './useFadeNavigate';

/**
 * Delete account form input type
 */
interface DeleteAccountInputs {
    /** User's password */
    password: string;
}

/**
 * Custom hook for handling Delete account form logic
 * @returns {Object} Form methods and handlers
 */
export default function useDeleteAccountForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<DeleteAccountInputs>({
        mode: 'onChange',
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast, isToastActive } = useCustomToast();
    const navigate = useFadeNavigate();

    /**
     * Handles form submission
     */
    const onSubmit = async (data: DeleteAccountInputs) => {
        if (isToastActive()) {
            return;
        }
        setLoading(true);
        // api 로직 추가
        await postDeleteAccount(data).then((response) => {
            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                console.log(response);
                if (response.error?.status === 403) {
                    showToast('비밀번호를 틀렸습니다!', 'warning');
                } else {
                    showToast('서버 연결 문제가 발생했습니다!', 'warning');
                }
            }
        });
        setLoading(false);
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
        maxLength: {
            value: 20,
            message: '비밀번호는 최대 20자 이하이어야 합니다!',
        },
        pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            message: '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다!',
        },
    };

    return {
        passwordValidation,
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
