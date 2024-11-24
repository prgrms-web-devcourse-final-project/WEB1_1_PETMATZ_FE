import { Datepicker } from 'flowbite-react';
import {
    UseFormRegister,
    UseFormWatch,
    UseFormSetValue,
    UseFormTrigger,
    FieldErrors,
} from 'react-hook-form';
import { TimeInput } from '@/components/sos';
import { FormData } from '@/types/Sos';
import { formatDateToString, parseStringToDate } from '@/utils';

interface DateTimeSectionProps {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    setValue: UseFormSetValue<FormData>;
    trigger: UseFormTrigger<FormData>;
    errors: FieldErrors<FormData>;
    dateTimeError: string | null;
}

export default function DateTimeSection({
    register,
    watch,
    setValue,
    errors,
    dateTimeError,
}: DateTimeSectionProps) {
    const startDate = watch('startDate');
    const endDate = watch('endDate');

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = formatDateToString(date);
            setValue('startDate', formattedDate, { shouldValidate: true });
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = formatDateToString(date);
            setValue('endDate', formattedDate, { shouldValidate: true });
        }
    };

    return (
        <div className="space-y-6 mt-2">
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                    돌봄 시작일
                </label>
                <div className="flex items-center space-x-4">
                    <div className="relative w-[fit-content]">
                        <Datepicker
                            language="ko-KR"
                            labelTodayButton="오늘"
                            labelClearButton="초기화"
                            onChange={handleStartDateChange}
                            value={parseStringToDate(startDate)}
                        />
                    </div>
                    <div className="max-w-[8rem]">
                        <TimeInput
                            register={register}
                            name="startTime"
                            required={true}
                            className={errors.startTime ? 'border-red-500' : ''}
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                    돌봄 종료
                </label>
                <div className="flex items-center space-x-4">
                    <div className="relative w-[fit-content]">
                        <Datepicker
                            language="ko-KR"
                            labelTodayButton="오늘"
                            labelClearButton="초기화"
                            minDate={parseStringToDate(startDate)}
                            onChange={handleEndDateChange}
                            value={parseStringToDate(endDate)}
                        />
                    </div>
                    <div className="max-w-[8rem]">
                        <TimeInput
                            register={register}
                            name="endTime"
                            required={true}
                            className={errors.endTime ? 'border-red-500' : ''}
                        />
                    </div>
                </div>
            </div>
            {dateTimeError && (
                <p
                    className="text-red-500 text-sm"
                    style={{ marginTop: '8px' }} // space-y-6 무시
                >
                    {dateTimeError}
                </p>
            )}
        </div>
    );
}
