import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useFadeNavigate from './useFadeNavigate';
import { postLogin } from './api/login';
import { useUserStore } from '@/stores';
import useCustomToast from './useCustomToast';

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
    const { setUser } = useUserStore();
    const { showToast, isToastActive } = useCustomToast();
    const navigate = useFadeNavigate();

    /**
     * Handles form submission
     */
    const onSubmit = async (data: LoginInputs) => {
        // ⭐️ 중요: 토스트가 이미 활성화되어 있다면 폼 제출 중단
        if (isToastActive()) {
            return;
        }
        setLoading(true);
        // 여기에 로그인 로직을 구현하세요.
        await postLogin(data).then((response) => {
            console.log(response);
            if (response.ok) {
                const { id, accountId, nickname, isRegistered, region } =
                    response.data;
                setUser({
                    id,
                    accountId,
                    nickname,
                    isRegistered,
                    region,
                });
                setSuccess(true);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                if (response.error?.status === 400) {
                    showToast('유효하지 않은 입력값입니다!', 'warning');
                } else if (response.error?.status === 401) {
                    showToast('로그인 정보가 일치하지 않습니다!', 'warning');
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
