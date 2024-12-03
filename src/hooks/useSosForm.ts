import { useState, useEffect } from 'react';
import { useFadeNavigate } from '@/hooks';
import { useForm } from 'react-hook-form';
import { FormData, SOSCreateRequest } from '@/types/Sos';
import { useCustomToast } from '@/components/common';
import { createSOSPost } from './api/sos';

export const useSosForm = () => {
    const [petIds, setpetIds] = useState<number[]>([]);
    const [dateTimeError, setDateTimeError] = useState<string | null>(null);
    const navigate = useFadeNavigate();
    const { showToast } = useCustomToast();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        trigger,
    } = useForm<FormData>({
        defaultValues: {
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
        },
        mode: 'onChange',
    });

    const startDate = watch('startDate');
    const startTime = watch('startTime');
    const endDate = watch('endDate');
    const endTime = watch('endTime');

    // 시간 검증 함수를 별도로 분리
    const validateDateTime = (
        startDate: string,
        startTime: string,
        endDate: string,
        endTime: string,
    ): string | null => {
        if (!startDate || !startTime || !endDate || !endTime) return null;

        const start = new Date(`${startDate}T${startTime}`);
        const end = new Date(`${endDate}T${endTime}`);

        if (end <= start) {
            return '돌봄 종료 시간은 시작 시간 이후여야 합니다.';
        }
        return null;
    };

    // 실시간 검증
    useEffect(() => {
        const error = validateDateTime(startDate, startTime, endDate, endTime);
        setDateTimeError(error);
    }, [startDate, startTime, endDate, endTime]);

    const getInputStyle = (fieldName: keyof FormData) => {
        return `input-solid ${errors[fieldName] ? 'border-red-500' : ''}`;
    };

    const handleDogSelect = (dogId: number) => {
        if (!petIds.includes(dogId)) {
            setpetIds([...petIds, dogId]);
        }
    };

    const handleRemoveDog = (dogId: number) => {
        setpetIds(petIds.filter((id) => id !== dogId));
    };

    const onSubmit = async (data: FormData) => {
        if (petIds.length === 0) {
            showToast('최소 한 마리의 멍멍이를 선택해주세요', 'warning');
            return;
        }

        // 제출 시점에 시간을 다시 한번 검증
        const error = validateDateTime(
            data.startDate,
            data.startTime,
            data.endDate,
            data.endTime,
        );

        if (error) {
            showToast(error, 'warning');
            return;
        }

        const sosData: SOSCreateRequest = {
            title: data.title,
            comment: data.comment,
            startDate: `${data.startDate} ${data.startTime}`,
            endDate: `${data.endDate} ${data.endTime}`,
            petIds,
            paymentType: data.paymentType,
            price: data.paymentType === 'NEGOTIABLE' ? 0 : data.price,
        };

        // API 호출 로직 추가
        const response = await createSOSPost(sosData);
        if (response.ok) {
            showToast('게시물이 성공적으로 등록되었습니다.', 'success');
            setTimeout(() => {
                navigate(`/sos/${response.data.result.id}`);
            }, 1000); // 1초 후 이동
        } else {
            showToast(
                response.error?.msg || '게시물 등록에 실패했습니다.',
                'warning',
            );
        }
    };

    const onError = (errors: any) => {
        const errorGroups = {
            basicInfo: ['title', 'comment'],
            timeInfo: ['startTime', 'endTime'],
            paymentInfo: ['paymentType', 'price'],
        };

        const missingGroups = [];

        if (errorGroups.basicInfo.some((field) => errors[field])) {
            missingGroups.push('기본 정보');
        }
        if (errorGroups.timeInfo.some((field) => errors[field])) {
            missingGroups.push('시간 정보');
        }
        if (errorGroups.paymentInfo.some((field) => errors[field])) {
            missingGroups.push('결제 정보');
        }
        if (petIds.length === 0) {
            missingGroups.push('강아지 정보');
        }

        if (missingGroups.length > 0) {
            showToast(`${missingGroups.join(', ')}를 입력해주세요.`, 'warning');
        }
    };

    return {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        trigger,
        petIds,
        dateTimeError,
        getInputStyle,
        handleDogSelect,
        handleRemoveDog,
        onSubmit,
        onError,
    };
};
