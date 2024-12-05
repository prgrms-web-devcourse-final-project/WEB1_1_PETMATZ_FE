import { FieldErrors } from 'react-hook-form';

const getFirstErrorMessage = (errors: FieldErrors<FormData>): string | null => {
    for (const key in errors) {
        const error = errors[key as keyof FormData];

        if (error && typeof error === 'object' && 'message' in error) {
            // 단일 필드 에러 처리
            return error.message as string;
        }

        if (Array.isArray(error)) {
            // 배열 필드 에러 처리
            for (const item of error) {
                if (item && typeof item === 'object' && 'value' in item) {
                    return item.value?.message as string;
                }
            }
        }

        if (typeof error === 'object' && error !== null) {
            // 중첩된 객체 필드 재귀 탐색
            const nestedError = getFirstErrorMessage(
                error as FieldErrors<FormData>,
            );
            if (nestedError) return nestedError;
        }
    }
    return null; // 에러 메시지가 없을 경우
};

export default getFirstErrorMessage;
