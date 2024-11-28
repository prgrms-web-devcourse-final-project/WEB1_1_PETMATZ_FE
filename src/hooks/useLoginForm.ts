import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useFadeNavigate from './useFadeNavigate';
import { postLogin } from './api/login';
import { useUserStore } from '@/stores';

/**
 * Login form input type
 */
interface LoginInputs {
    /** User's email address */
    accountId: string;
    /** User's password */
    password: string;
}

/**
 * Custom hook for handling login form logic
 * @returns {Object} Form methods and handlers
 */
export default function useLoginForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<LoginInputs>({
        mode: 'onChange',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, setUser } = useUserStore();
    const navigate = useFadeNavigate();

    /**
     * Handles form submission
     */
    const onSubmit = async (data: LoginInputs) => {
        console.log(data);
        setLoading(true);
        // 여기에 로그인 로직을 구현하세요.
        await postLogin(data)
            .then((response) => {
                if (response.data.responseCode === 'SU') {
                    const {
                        id,
                        accountId,
                        nickname,
                        loginRole,
                        loginType,
                        role,
                        preferredSize,
                        gender,
                        isRegistered,
                        recommendationCount,
                        careCompletionCount,
                        isCareAvailable,
                        mbti,
                    } = response.data;
                    setUser({
                        id,
                        accountId,
                        nickname,
                        loginRole,
                        loginType,
                        role,
                        preferredSize,
                        gender,
                        isRegistered,
                        recommendationCount,
                        careCompletionCount,
                        isCareAvailable,
                        mbti,
                    });
                    setSuccess(true);
                    setTimeout(() => {
                        navigate('/home');
                    }, 3000);
                } else if (response.data.responseCode === 'VF') {
                } else if (response.data.responseCode === 'SF') {
                } else if (response.data.responseCode === 'DBE') {
                }
            })
            .catch((error) => {
                console.error(error);
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

    return {
        emailValidation,
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
