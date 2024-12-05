import { Datepicker } from 'flowbite-react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import TimeInput from './TimeInput';
import { formatDateToString } from '@/utils';
import { FormData } from '@/types/please';

interface DateTimeSectionProps {
    register: UseFormRegister<FormData>;
    setValue: UseFormSetValue<FormData>;
    validateDateTimeFields: () => void;
    errors: FieldErrors<FormData>;
}

export default function DateTimeSection({
    register,
    setValue,
    validateDateTimeFields,
    errors,
}: DateTimeSectionProps) {
    const handleDateChange = (
        type: 'startDate' | 'endDate',
        date: Date | null,
    ) => {
        if (date) {
            const formattedDate = formatDateToString(date);
            setValue(type, formattedDate, { shouldValidate: true });
            validateDateTimeFields();
        }
    };

    const customTheme = {
        root: {
            input: {
                field: {
                    input: {
                        base: 'cursor-pointer w-full focus:!border-point-500 focus:ring-0',
                    },
                },
            },
        },
        popup: {
            footer: {
                button: {
                    today: 'bg-point-500 text-white hover:bg-point-600 active:ring-0 active:border-none',
                    clear: 'border-1 text-point-500 border-point-600 hover:text-point-600 hover:border-point-600 hover:bg-point-50 active:text-point-600 active:border-point-600 active:bg-point-50 active:ring-0 active:border-0',
                },
            },
        },
        views: {
            days: {
                items: {
                    item: {
                        selected: 'bg-point-500 text-white hover:bg-point-500',
                    },
                },
            },
        },
    };

    return (
        <div className="flex flex-col gap-[22px]">
            <div>
                <label className="text-label-m text-gray-500">
                    돌봄 시작일
                </label>
                <div className="flex items-center justify-center gap-[8px]">
                    <div className="flex-1">
                        <Datepicker
                            language="ko-KR"
                            labelTodayButton="오늘"
                            labelClearButton="초기화"
                            onChange={(date) =>
                                handleDateChange('startDate', date)
                            }
                            theme={customTheme}
                        />
                    </div>
                    <div className="flex-2">
                        <TimeInput
                            register={register}
                            name="startTime"
                            required="시작 시간을 선택해주세요"
                            className={
                                errors.startTime ? 'border-warning-400' : ''
                            }
                        />
                    </div>
                </div>
            </div>
            <div>
                <label className="text-label-m text-gray-500">
                    돌봄 종료일
                </label>
                <div className="flex items-center justify-center gap-[8px]">
                    <div className="flex-1">
                        <Datepicker
                            language="ko-KR"
                            labelTodayButton="오늘"
                            labelClearButton="초기화"
                            onChange={(date) =>
                                handleDateChange('endDate', date)
                            }
                            theme={customTheme}
                        />
                    </div>
                    <div className="flex-2">
                        <TimeInput
                            register={register}
                            name="endTime"
                            required="종료 시간을 선택해주세요"
                            className={
                                errors.endTime ? 'border-warning-400' : ''
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
