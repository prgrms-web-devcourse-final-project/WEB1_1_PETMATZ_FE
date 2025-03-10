import { ChangePasswordInputs, SignUpInputs } from '@/types/user';
import { UseFormWatch } from 'react-hook-form';

export const emailValidation = {
    required: '이메일은 필수입니다!',
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '유효한 이메일 주소를 입력해주세요!',
    },
};

export const passwordValidation = {
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

export const currentPasswordValidation = {
    required: '현재 비밀번호는 필수입니다!',
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

export function newPasswordValidation(
    watch: UseFormWatch<ChangePasswordInputs>,
) {
    return {
        required: '새 비밀번호는 필수입니다!',
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
        validate: (value: string) =>
            value !== watch('currentPassword') ||
            '새 비밀번호는 현재 비밀번호와 다르게 설정해야 합니다!',
    };
}

export function confirmPasswordValidation(
    watch: UseFormWatch<ChangePasswordInputs>,
) {
    return {
        required: '비밀번호 확인은 필수입니다!',
        validate: (value: string) =>
            value === watch('newPassword') ||
            '새 비밀번호와 일치하지 않습니다!',
    };
}

export const verificationCodeValidation = {
    required: '인증번호는 필수입니다!',
};

export function confirmPasswordValidationForSignup(
    watch: UseFormWatch<SignUpInputs>,
) {
    return {
        required: '비밀번호 확인은 필수입니다!',
        validate: (value: string | boolean | string[]) =>
            value === watch('password') || '비밀번호가 일치하지 않아요!',
    };
}

export const nicknameValidation = {
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

export const introduceValidation = {
    maxLength: {
        value: 50,
        message: '자기소개는 최대 50자 이하이어야 합니다!',
    },
};
