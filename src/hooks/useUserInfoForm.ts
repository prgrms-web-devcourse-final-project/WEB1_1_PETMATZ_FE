import { useCustomToast } from '@/components/common';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

/**
 * A custom hook for form handling with React Hook Form.
 *
 * @template T - The type of the form values.
 * @param {(data: T) => Promise<void>} onSubmitCallback - The callback function to be called on form submission.
 * @returns {Object} Form methods and handlers
 */
export default function useUserInfoForm<T extends FieldValues>(
    onSubmitCallback: (data: T) => Promise<void>,
) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        control,
        reset,
    } = useForm<T>({
        mode: 'onChange',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { showToast, isToastActive } = useCustomToast();

    /**
     * Handles form submission.
     * @param {T} data - The form data.
     */
    const onSubmit = async (data: T) => {
        // ⭐️ 중요: 토스트가 이미 활성화되어 있다면 폼 제출 중단
        if (isToastActive()) {
            return;
        }
        setIsLoading(true);
        await onSubmitCallback(data);
        setIsLoading(false);
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        watch,
        errors,
        isValid,
        control,
        isLoading,
        setIsLoading,
        isSuccess,
        setIsSuccess,
        showToast,
        isToastActive,
        reset,
    };
}
