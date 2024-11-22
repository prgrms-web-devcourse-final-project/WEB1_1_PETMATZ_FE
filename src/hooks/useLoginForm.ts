import { useForm } from 'react-hook-form';

/**
 * Login form input type
 */
interface LoginInputs {
    /** User's email address */
    email: string;
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
        formState: { errors },
    } = useForm<LoginInputs>();

    /**
     * Handles form submission
     */
    const onSubmit = (data: LoginInputs) => {
        console.log(data);
        // 여기에 로그인 로직을 구현하세요
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

    /**
     * Password validation
     */
    const passwordValidation = register('password', {
        required: '비밀번호는 필수입니다',
        minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다',
        },
        pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
            message: '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다',
        },
    });

    return {
        emailValidation,
        passwordValidation,
        handleSubmit,
        errors,
        onSubmit,
    };
}
