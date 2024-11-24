import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormData } from '@/types/Sos';

export const useSosForm = () => {
    const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
    const [dateTimeError, setDateTimeError] = useState<string | null>(null);

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
        return `input-outline ${errors[fieldName] ? 'border-red-500' : ''}`;
    };

    const handleDogSelect = (dogName: string) => {
        if (!selectedDogs.includes(dogName) && dogName) {
            setSelectedDogs([...selectedDogs, dogName]);
        }
    };

    const handleRemoveDog = (dogName: string) => {
        setSelectedDogs(selectedDogs.filter((dog) => dog !== dogName));
    };

    const onSubmit = (data: FormData) => {
        if (selectedDogs.length === 0) {
            toast.error('최소 한 마리의 멍멍이를 선택해주세요');
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
            toast.error(error);
            return;
        }

        const startDateTime = `${data.startDate} ${data.startTime}`;
        const endDateTime = `${data.endDate} ${data.endTime}`;

        const formData = {
            title: data.title,
            content: data.content,
            startDateTime,
            endDateTime,
            selectedDogs,
            paymentType: data.paymentType,
            paymentAmount: data.paymentType === '협의' ? 0 : data.paymentAmount,
        };

        console.log(formData);
        // API 호출 로직 추가
    };

    const onError = (errors: any) => {
        const errorGroups = {
            basicInfo: ['title', 'content'],
            timeInfo: ['startTime', 'endTime'],
            paymentInfo: ['paymentType', 'paymentAmount'],
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
        if (selectedDogs.length === 0) {
            missingGroups.push('강아지 정보');
        }

        if (missingGroups.length > 0) {
            toast.error(`${missingGroups.join(', ')}를 입력해주세요.`);
        }
    };

    return {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        trigger,
        selectedDogs,
        dateTimeError,
        getInputStyle,
        handleDogSelect,
        handleRemoveDog,
        onSubmit,
        onError,
    };
};
